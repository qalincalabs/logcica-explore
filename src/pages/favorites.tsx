import React, { useState, useEffect } from "react";
import { graphql, PageProps, navigate } from "gatsby";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
  ListItemIcon,
  Grid,
  ButtonGroup,
  Button,
  Tooltip,
  Divider,
} from "@mui/material";
import Layout from "../components/layout";
import { Store, Delete, GetApp, PictureAsPdf, DeleteForever } from "@mui/icons-material";
import * as favoriteService from "../utils/favoritesService";
import { exportToJSON, exportToCSV, exportToXLSX, exportToText, exportToPDF } from "../utils/exportUtils";

const generateShareText = (favorites, data) => {
  const sections = [
    { key: 'partnerships', title: 'Groupements', nodes: data.partnerships.nodes },
    { key: 'counters', title: 'Marchés', nodes: data.marketplaces.nodes },
    { key: 'activities', title: 'Producteurs', nodes: data.activities.nodes },
    { key: 'products', title: 'Produits', nodes: data.products.nodes },
  ];

  let shareText = "Mes Favoris:\n\n";

  sections.forEach(({ key, title, nodes }) => {
    if (favorites[key] && favorites[key].length > 0) {
      shareText += `${title}:\n`;
      favorites[key].forEach(id => {
        const item = nodes.find(p => p._id === id);
        if (item) {
          shareText += `•⁠  ⁠${item.name}\n`;
        }
      });
      shareText += "\n";
    }
  });

  return shareText;
};

const createFilteredList = (favorites, filterKey, dataKey) => {
  return filterKey ? favorites.filter(f => f.targetType === dataKey) : [];
};

const FavoritesList = ({ title, favorites, handleItemClick, handleRemoveFavorite, dataKey, dataNodes }) => {
  if (favorites.length === 0) return null;

  return (
    <Grid item xs={12} md={3}>
      <Box>
        <Typography variant="h6" style={{ color: 'black', marginBottom: '16px' }}>{title}</Typography>
        <List>
          {favorites.map((item) => (
            <ListItem key={item.targetId} onClick={() => handleItemClick(dataKey, item.targetId, item?.producer?.activity?._id)} sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar>
                    <Store />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={dataNodes.find(p => p._id === item.targetId)?.name || `${title} inconnu`} />
                <ListItemIcon>
                  <IconButton onClick={(e) => { e.stopPropagation(); handleRemoveFavorite(item.targetId, dataKey, item.listId); }}>
                    <Delete />
                  </IconButton>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Grid>
  );
};

const FavoritesPage: React.FC<PageProps> = ({ data }: any) => {
  const refreshFavorites = () => {
    const allLists = favoriteService.allLists();
    const allFavorites = allLists.reduce((acc, list) => {
      const favorites = favoriteService.findItems({ listIds: [list.id] });
      acc[list.id] = favorites;
      return acc;
    }, {} as { [key: string]: any[] });
    return allFavorites;
  };

  const [favorites, setFavorites] = useState<{ [key: string]: any[] }>(refreshFavorites());
  const [shareText, setShareText] = useState(generateShareText(refreshFavorites(), data));

  const [filter, setFilter] = useState({
    partnership: true,
    marketplace: true,
    activity: true,
    product: true,
  } as Record<string, boolean>);

  useEffect(() => {
    const updatedFavorites = refreshFavorites();
    setFavorites(updatedFavorites);
    setShareText(generateShareText(updatedFavorites, data));
  }, [data]);

  const handleRemoveFavorite = (id: string, type: string, listId: string) => {
    favoriteService.removeItemFromList({ targetType: type, targetId: id, listId });
    const updatedFavorites = refreshFavorites();
    setFavorites(updatedFavorites);
    setShareText(generateShareText(updatedFavorites, data));
  };

  const handleRemoveFavoriteList = (listId: string) => {
    favoriteService.removeList({ id: listId });
    const updatedFavorites = refreshFavorites();
    setFavorites(updatedFavorites);
    setShareText(generateShareText(updatedFavorites, data));
  };

  const handleItemClick = (type: string, id: string, activityId?: string) => {
    switch (type) {
      case 'product':
        navigate(`/activity/${activityId}#${id}`);
        break;
      case 'counter':
        navigate(`/marketplace/${id}`);
        break;
      default:
        navigate(`/${type}/${id}`);
        break;
    }
  };

  const handleFilterChange = (name: string) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      [name]: !prevFilter[name]
    }));
  };

  const filteredPartnershipFavorites = createFilteredList(favorites['default'] || [], filter.partnership, 'partnership');
  const filteredFavorites = createFilteredList(favorites['default'] || [], filter.marketplace, 'counter');
  const filteredActivityFavorites = createFilteredList(favorites['default'] || [], filter.activity, 'activity');
  const filteredProductFavorites = createFilteredList(favorites['default'] || [], filter.product, 'product');

  const exportFavorites = (format: 'json' | 'csv' | 'xlsx' | 'text' | 'pdf') => {
    const favoritesData = {
      partnerships: filteredPartnershipFavorites.map(item => data.partnerships.nodes.find((p: any) => p._id === item.targetId)),
      marketplaces: filteredFavorites.map(item => data.marketplaces.nodes.find((m: any) => m._id === item.targetId)),
      activities: filteredActivityFavorites.map(item => data.activities.nodes.find((a: any) => a._id === item.targetId)),
      products: filteredProductFavorites.map(item => data.products.nodes.find((p: any) => p._id === item.targetId))
    };

    if (format === 'json') {
      exportToJSON(favoritesData, 'favorites');
    } else if (format === 'csv') {
      const csvData = [
        ...favoritesData.partnerships.map((p: any) => ({ type: 'partnership', ...p })),
        ...favoritesData.marketplaces.map((m: any) => ({ type: 'marketplace', ...m })),
        ...favoritesData.activities.map((a: any) => ({ type: 'activity', ...a })),
        ...favoritesData.products.map((p: any) => ({ type: 'product', ...p })),
      ];
      exportToCSV(csvData, 'favorites');
    } else if (format === 'xlsx') {
      exportToXLSX(favoritesData, 'favorites');
    } else if (format === 'text') {
      const textData = generateShareText(favorites, data);
      exportToText(textData, 'favorites');
    } else if (format === 'pdf') {
      const pdfData = {
        partnerships: filteredPartnershipFavorites.map(item => ({ name: data.partnerships.nodes.find((p: any) => p._id === item.targetId)?.name })),
        marketplaces: filteredFavorites.map(item => ({ name: data.marketplaces.nodes.find((m: any) => m._id === item.targetId)?.name })),
        activities: filteredActivityFavorites.map(item => ({ name: data.activities.nodes.find((a: any) => a._id === item.targetId)?.name })),
        products: filteredProductFavorites.map(item => ({ name: data.products.nodes.find((p: any) => p._id === item.targetId)?.name }))
      };
      exportToPDF(pdfData, 'favorites');
    }
  };

  const allLists = favoriteService.allLists();

  return (
    <Layout>
      <Typography align="center" variant="h3" my={4}>
        Mes Favoris
      </Typography>
      <Box display="flex" justifyContent="center" my={2}>
        <ButtonGroup variant="outlined">
          <Button
            onClick={() => handleFilterChange('partnership')}
            sx={{ color: 'black', backgroundColor: filter.partnership ? 'rgba(0, 0, 0, 0.1)' : 'transparent' }}
          >
            Groupements
          </Button>
          <Button
            onClick={() => handleFilterChange('marketplace')}
            sx={{ color: 'black', backgroundColor: filter.marketplace ? 'rgba(0, 0, 0, 0.1)' : 'transparent' }}
          >
            Marchés
          </Button>
          <Button
            onClick={() => handleFilterChange('activity')}
            sx={{ color: 'black', backgroundColor: filter.activity ? 'rgba(0, 0, 0, 0.1)' : 'transparent' }}
          >
            Producteurs
          </Button>
          <Button
            onClick={() => handleFilterChange('product')}
            sx={{ color: 'black', backgroundColor: filter.product ? 'rgba(0, 0, 0, 0.1)' : 'transparent' }}
          >
            Produits
          </Button>
        </ButtonGroup>
      </Box>
      <Box p={2} width="100%" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
        <Grid container spacing={2} justifyContent="center" alignItems="flex-start">
          <FavoritesList
            title="Groupements"
            favorites={filteredPartnershipFavorites}
            handleItemClick={handleItemClick}
            handleRemoveFavorite={(id) => handleRemoveFavorite(id, 'partnership', 'default')}
            dataKey="partnership"
            dataNodes={data.partnerships.nodes}
          />
          <FavoritesList
            title="Marchés"
            favorites={filteredFavorites}
            handleItemClick={handleItemClick}
            handleRemoveFavorite={(id) => handleRemoveFavorite(id, 'counter', 'default')}
            dataKey="counter"
            dataNodes={data.marketplaces.nodes}
          />
          <FavoritesList
            title="Producteurs"
            favorites={filteredActivityFavorites}
            handleItemClick={handleItemClick}
            handleRemoveFavorite={(id) => handleRemoveFavorite(id, 'activity', 'default')}
            dataKey="activity"
            dataNodes={data.activities.nodes}
          />
          <FavoritesList
            title="Produits"
            favorites={filteredProductFavorites}
            handleItemClick={handleItemClick}
            handleRemoveFavorite={(id) => handleRemoveFavorite(id, 'product', 'default')}
            dataKey="product"
            dataNodes={data.products.nodes}
          />
        </Grid>
        {allLists.length > 1 && (
          <Box mt={4} width="100%">
            <Typography variant="h4" align="center" my={4}>
              Nouvelles Listes de Favoris
            </Typography>
            <Grid container spacing={2} justifyContent="center" alignItems="flex-start">
              {allLists.filter(list => list.id !== 'default').map(list => (
                <Box key={list.id} width="100%">
                  <Box display="flex" alignItems="center">
                    <Typography variant="h5" style={{ marginBottom: '16px' }}>{list.name}</Typography>
                    <IconButton onClick={() => handleRemoveFavoriteList(list.id)} sx={{ color: '#d32f2f', marginLeft: 1 }}>
                      <DeleteForever />
                    </IconButton>
                  </Box>
                  <FavoritesList
                    title="Marchés"
                    favorites={favorites[list.id]?.filter(item => item.targetType === 'counter') || []}
                    handleItemClick={handleItemClick}
                    handleRemoveFavorite={(id) => handleRemoveFavorite(id, 'counter', list.id)}
                    dataKey="counter"
                    dataNodes={data.marketplaces.nodes}
                  />
                </Box>
              ))}
            </Grid>
          </Box>
        )}
        <Box mt={4} display="flex" justifyContent="center" alignItems="center" gap={2}>
          <Tooltip title="Exporter en JSON">
            <IconButton onClick={() => exportFavorites('json')} sx={{ backgroundColor: '#FFD700', color: 'black' }}>
              <GetApp />
              <Typography variant="button" sx={{ ml: 1 }}>JSON</Typography>
            </IconButton>
          </Tooltip>
          <Tooltip title="Exporter en CSV">
            <IconButton onClick={() => exportFavorites('csv')} sx={{ backgroundColor: '#FFD700', color: 'black' }}>
              <GetApp />
              <Typography variant="button" sx={{ ml: 1 }}>CSV</Typography>
            </IconButton>
          </Tooltip>
          <Tooltip title="Exporter en XLSX">
            <IconButton onClick={() => exportFavorites('xlsx')} sx={{ backgroundColor: '#FFD700', color: 'black' }}>
              <GetApp />
              <Typography variant="button" sx={{ ml: 1 }}>XLSX</Typography>
            </IconButton>
          </Tooltip>
          <Tooltip title="Exporter en PDF">
            <IconButton onClick={() => exportFavorites('pdf')} sx={{ backgroundColor: '#FFD700', color: 'black' }}>
              <PictureAsPdf />
              <Typography variant="button" sx={{ ml: 1 }}>PDF</Typography>
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Layout>
  );
};

export default FavoritesPage;

export const query = graphql`
  query {
    marketplaces: allMongodbCounters(filter: { type: { eq: "marketplace" } }) {
      nodes {
        _id
        name
      }
    }
    products: allMongodbProducts { 
      nodes {
        _id
        name
        producer {	
          activity {	
            _id	
            name	
          }	
        }
      }
    }
    partnerships: allMongodbPartnerships {
      nodes {
        _id
        name
      }
    }
    activities: allMongodbActivities {
      nodes {
        _id
        name
      }
    }
  }
`;
