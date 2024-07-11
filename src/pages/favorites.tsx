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
} from "@mui/material";
import Layout from "../components/layout";
import { Store, Delete, GetApp, PictureAsPdf, DeleteForever } from "@mui/icons-material";
import * as favoriteService from "../utils/favoritesService";
import { exportToJSON, exportToCSV, exportToXLSX, exportToText, exportToPDF } from "../utils/exportUtils";

// Utility functions
const generateShareText = (favorites, data) => {
  const sections = [
    { key: 'partnerships', title: 'Groupements', nodes: data.partnerships.nodes },
    { key: 'counters', title: 'Marchés', nodes: data.marketplaces.nodes },
    { key: 'activities', title: 'Producteurs', nodes: data.activities.nodes },
    { key: 'products', title: 'Produits', nodes: data.products.nodes },
  ];

  return sections.reduce((text, { key, title, nodes }) => {
    if (favorites[key]?.length) {
      text += `${title}:\n${favorites[key].map(id => `•⁠  ⁠${nodes.find(p => p._id === id)?.name}\n`).join('')}\n`;
    }
    return text;
  }, "Mes Favoris:\n\n");
};

const createFilteredList = (favorites, filterKey, dataKey) => (
  filterKey ? favorites.filter(f => f.targetType === dataKey) : []
);

const FavoritesList = ({ title, favorites, handleItemClick, handleRemoveFavorite, dataKey, dataNodes }) => (
  !favorites.length ? null : (
    <Grid item xs={12} md={3}>
      <Box>
        <Typography variant="h6" sx={{ color: 'black', mb: 2 }}>{title}</Typography>
        <List>
          {favorites.map((item) => {
            const dataNode = dataNodes.find(p => p._id === item.targetId);
            return (
              <ListItem key={item.targetId} onClick={() => handleItemClick(dataKey, item.targetId, dataNode?._id)} sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar>
                      <Store />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={dataNode?.name || `${title} inconnu`} />
                  <ListItemIcon>
                    <IconButton onClick={(e) => { e.stopPropagation(); handleRemoveFavorite(item.targetId, dataKey, item.listId); }}>
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
  )
);

const FavoritesPage: React.FC<PageProps> = ({ data }: any) => {
  const refreshFavorites = () => favoriteService.allLists().reduce((acc, list) => {
    acc[list.id] = favoriteService.findItems({ listIds: [list.id] });
    return acc;
  }, {} as { [key: string]: any[] });

  const [favorites, setFavorites] = useState<{ [key: string]: any[] }>(refreshFavorites());
  const [shareText, setShareText] = useState(generateShareText(favorites, data));
  const [filter, setFilter] = useState({ partnership: true, marketplace: true, activity: true, product: true });

  useEffect(() => {
    const updatedFavorites = refreshFavorites();
    setFavorites(updatedFavorites);
    setShareText(generateShareText(updatedFavorites, data));
  }, [data]);

  const handleRemoveFavorite = (id: string, type: string, listId: string) => {
    console.log(`Removing favorite with id: ${id}, type: ${type}, from list: ${listId}`);  // Debugging
    favoriteService.removeItemFromList({ targetType: type, targetId: id, listId });
    const updatedFavorites = refreshFavorites();
    console.log(`Updated Favorites after removal:`, updatedFavorites);  // Debugging
    setFavorites(updatedFavorites);
    setShareText(generateShareText(updatedFavorites, data));
  };

  const handleRemoveFavoriteList = (listId: string) => {
    favoriteService.removeList({ id: listId });
    const updatedFavorites = refreshFavorites();
    setFavorites(updatedFavorites);
    setShareText(generateShareText(updatedFavorites, data));
  };

  const handleItemClick = (type: string, id: string) => {
    const paths = { product: `/activity/${id}`, counter: `/marketplace/${id}` };
    navigate(paths[type] || `/${type}/${id}`);
  };

  const handleFilterChange = (name: string) => setFilter(prev => ({ ...prev, [name]: !prev[name] }));

  const filters = [
    { key: 'partnership', title: 'Groupements', dataKey: 'partnership', dataNodes: data.partnerships.nodes },
    { key: 'marketplace', title: 'Marchés', dataKey: 'counter', dataNodes: data.marketplaces.nodes },
    { key: 'activity', title: 'Producteurs', dataKey: 'activity', dataNodes: data.activities.nodes },
    { key: 'product', title: 'Produits', dataKey: 'product', dataNodes: data.products.nodes },
  ];

  const filteredFavoritesList = filters.map(({ key, dataKey }) => createFilteredList(favorites['default'] || [], filter[key], dataKey));

  const exportFavorites = (format: 'json' | 'csv' | 'xlsx' | 'text' | 'pdf') => {
    const favoritesData = filters.reduce((acc, { key, dataKey }) => {
      acc[key] = filteredFavoritesList[filters.findIndex(f => f.key === key)].map(item => data[`${key}s`]?.nodes?.find((p: any) => p._id === item.targetId));
      return acc;
    }, {} as Record<string, any[]>);
    
    const exportFunctions = { json: exportToJSON, csv: exportToCSV, xlsx: exportToXLSX, text: exportToText, pdf: exportToPDF };
    exportFunctions[format](favoritesData, 'favorites');
  };

  const allLists = favoriteService.allLists();

  return (
    <Layout>
      <Typography align="center" variant="h3" my={4}>Mes Favoris</Typography>
      <Box display="flex" justifyContent="center" my={2}>
        <ButtonGroup variant="outlined">
          {filters.map(({ title, key }) => (
            <Button key={title} onClick={() => handleFilterChange(key)}
              sx={{ color: 'black', backgroundColor: filter[key] ? 'rgba(0, 0, 0, 0.1)' : 'transparent' }}>
              {title}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      <Box p={2} width="100%" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
        <Grid container spacing={2} justifyContent="center" alignItems="flex-start">
          {filters.map(({ title, key, dataKey, dataNodes }, index) => (
            <FavoritesList key={title} title={title} favorites={filteredFavoritesList[index]} handleItemClick={handleItemClick}
              handleRemoveFavorite={(id) => handleRemoveFavorite(id, dataKey, 'default')}
              dataKey={dataKey} dataNodes={dataNodes} />
          ))}
        </Grid>
        {allLists.length > 1 && (
          <Box mt={4} width="100%">
            <Typography variant="h4" align="center" my={4}>Nouvelles Listes de Favoris</Typography>
            <Grid container spacing={2} justifyContent="center" alignItems="flex-start">
              {allLists.filter(list => list.id !== 'default').map(list => (
                <Box key={list.id} width="100%">
                  <Box display="flex" alignItems="center">
                    <Typography variant="h5" sx={{ mb: 2 }}>{list.name}</Typography>
                    <IconButton onClick={() => handleRemoveFavoriteList(list.id)} sx={{ color: '#d32f2f', ml: 1 }}>
                      <DeleteForever />
                    </IconButton>
                  </Box>
                  {filters.map(({ title, dataKey, dataNodes }) => (
                    <FavoritesList
                      key={`${list.id}-${title}`}
                      title={title}
                      favorites={favorites[list.id]?.filter(item => item.targetType === dataKey) || []}
                      handleItemClick={handleItemClick}
                      handleRemoveFavorite={(id) => handleRemoveFavorite(id, dataKey, list.id)}
                      dataKey={dataKey}
                      dataNodes={dataNodes}
                    />
                  ))}
                </Box>
              ))}
            </Grid>
          </Box>
        )}
        <Box mt={4} display="flex" justifyContent="center" alignItems="center" gap={2}>
          {['json', 'csv', 'xlsx', 'pdf'].map(format => (
            <Tooltip key={format} title={`Exporter en ${format.toUpperCase()}`}>
              <IconButton onClick={() => exportFavorites(format)} sx={{ backgroundColor: '#FFD700', color: 'black' }}>
                {format === 'pdf' ? <PictureAsPdf /> : <GetApp />}
                <Typography variant="button" sx={{ ml: 1 }}>{format.toUpperCase()}</Typography>
              </IconButton>
            </Tooltip>
          ))}
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
