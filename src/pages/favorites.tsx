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
  Divider,
  Grid,
  ButtonGroup,
  Button,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Layout from "../components/layout";
import { Store, Delete, GetApp, PictureAsPdf } from "@mui/icons-material"; // Ajout de l'icône PDF
import * as favoriteService from "../utils/favoritesService";
import { exportToJSON, exportToCSV, exportToXLSX, exportToText, exportToPDF } from "../utils/exportUtils"; // Assurez-vous que l'importation est correcte

// Utility functions
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
  return filterKey ? favorites.filter(f => f.targetType === dataKey).map(e => e.targetId) : [];
};

const FavoritesList = ({ title, favorites, handleItemClick, handleRemoveFavorite, dataKey, dataNodes }) => {
  if (favorites.length === 0) return null;

  return (
    <Grid item xs={12} md={3}>
      <Box>
        <Typography variant="h6" style={{ color: 'black', marginBottom: '16px' }}>{title}</Typography>
        <List>
          {favorites.map((id: string) => {
            const item = dataNodes.find(p => p._id === id);
            return (
              <ListItem key={id} onClick={() => handleItemClick(dataKey, id, item?.producer?.activity?._id)} sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar>
                      <Store />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item?.name || `${title} inconnu`} />
                  <ListItemIcon>
                    <IconButton onClick={(e) => { e.stopPropagation(); handleRemoveFavorite(id, dataKey); }}>
                      <Delete />
                    </IconButton>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Grid>
  );
};

const FavoritesPage: React.FC<PageProps> = ({ data }: any) => {
  const refreshFavorites = () => favoriteService.findItems({ listIds: ['default'] });

  const [favorites, setFavorites] = useState(refreshFavorites());
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

  const handleRemoveFavorite = (id: string, type: string) => {
    favoriteService.removeItemFromList({ targetType: type, targetId: id });
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

  const filteredPartnershipFavorites = createFilteredList(favorites, filter.partnership, 'partnership');
  const filteredFavorites = createFilteredList(favorites, filter.marketplace, 'counter');
  const filteredActivityFavorites = createFilteredList(favorites, filter.activity, 'activity');
  const filteredProductFavorites = createFilteredList(favorites, filter.product, 'product');

  const exportFavorites = (format: 'json' | 'csv' | 'xlsx' | 'text' | 'pdf') => {
    const favoritesData = {
      partnerships: filteredPartnershipFavorites.map(id => data.partnerships.nodes.find((p: any) => p._id === id)),
      marketplaces: filteredFavorites.map(id => data.marketplaces.nodes.find((m: any) => m._id === id)),
      activities: filteredActivityFavorites.map(id => data.activities.nodes.find((a: any) => a._id === id)),
      products: filteredProductFavorites.map(id => data.products.nodes.find((p: any) => p._id === id))
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
        partnerships: filteredPartnershipFavorites.map(id => ({ name: data.partnerships.nodes.find((p: any) => p._id === id)?.name })),
        marketplaces: filteredFavorites.map(id => ({ name: data.marketplaces.nodes.find((m: any) => m._id === id)?.name })),
        activities: filteredActivityFavorites.map(id => ({ name: data.activities.nodes.find((a: any) => a._id === id)?.name })),
        products: filteredProductFavorites.map(id => ({ name: data.products.nodes.find((p: any) => p._id === id)?.name }))
      };
      exportToPDF(pdfData, 'favorites');
    }
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Layout>
      <Typography align="center" variant="h3" my={4}>
        Mes Favoris
      </Typography>
      <Box display="flex" justifyContent="center" my={2}>
        <ButtonGroup variant="outlined" orientation={isSmallScreen ? "vertical" : "horizontal"}>
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
            handleRemoveFavorite={handleRemoveFavorite}
            dataKey="partnership"
            dataNodes={data.partnerships.nodes}
          />
          <FavoritesList
            title="Marchés"
            favorites={filteredFavorites}
            handleItemClick={handleItemClick}
            handleRemoveFavorite={handleRemoveFavorite}
            dataKey="counter"
            dataNodes={data.marketplaces.nodes}
          />
          <FavoritesList
            title="Producteurs"
            favorites={filteredActivityFavorites}
            handleItemClick={handleItemClick}
            handleRemoveFavorite={handleRemoveFavorite}
            dataKey="activity"
            dataNodes={data.activities.nodes}
          />
          <FavoritesList
            title="Produits"
            favorites={filteredProductFavorites}
            handleItemClick={handleItemClick}
            handleRemoveFavorite={handleRemoveFavorite}
            dataKey="product"
            dataNodes={data.products.nodes}
          />
        </Grid>
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
