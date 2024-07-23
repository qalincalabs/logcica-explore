import React, { useState, useEffect } from "react";
import LZString from 'lz-string';
import { graphql, navigate } from "gatsby";
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
  Button,
  Tooltip,
  Drawer,
  Hidden,
  CssBaseline,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Store, Menu } from "@mui/icons-material";
import Layout from "../components/layout";
import * as favoriteService from "../utils/favoritesService";

const SharePage = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [sharedFavorites, setSharedFavorites] = useState(null);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const decompressedData = LZString.decompressFromEncodedURIComponent(hash);
      const favorites = JSON.parse(decompressedData);
      setSharedFavorites(favorites);
    }
  }, []);

  const handleAddToFavorites = () => {
    if (sharedFavorites) {
      Object.keys(sharedFavorites).forEach(sectionKey => {
        sharedFavorites[sectionKey].forEach(item => {
          favoriteService.assignItemToList({ targetId: item.id, targetType: sectionKey, assign: true });
        });
      });
      navigate('/');
    }
  };

  const filters = [
    { key: 'partnership', title: 'Groupements', dataKey: 'partnership', dataNodes: data.partnerships.nodes },
    { key: 'marketplace', title: 'Marchés', dataKey: 'counter', dataNodes: data.marketplaces.nodes },
    { key: 'activity', title: 'Producteurs', dataKey: 'activity', dataNodes: data.activities.nodes },
    { key: 'product', title: 'Produits', dataKey: 'product', dataNodes: data.products.nodes },
  ];

  if (!sharedFavorites) return <Typography>Chargement...</Typography>;

  return (
    <Layout>
      <CssBaseline />
      <Grid container sx={{ height: '100vh' }}>
        <Hidden smDown>
          <Grid item xs={12} md={3} lg={2}>
            <Box sx={{ height: '100%', bgcolor: 'lightgray' }}>
              <Box p={2} width="100%">
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#000', textAlign: 'center' }}>Favoris partagés</Typography>
                <Button variant="contained" color="primary" onClick={handleAddToFavorites} fullWidth>
                  Ajouter à mes favoris
                </Button>
              </Box>
            </Box>
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <Drawer anchor="left" open={false} onClose={() => {}}>
            <Box sx={{ height: '100%', bgcolor: 'lightgray', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box p={2} width="100%">
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#000', textAlign: 'center' }}>Favoris partagés</Typography>
                <Button variant="contained" color="primary" onClick={handleAddToFavorites} fullWidth>
                  Ajouter à mes favoris
                </Button>
              </Box>
            </Box>
          </Drawer>
        </Hidden>
        <Grid item xs={12} md={9} lg={10} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box>
            <Box display="flex" alignItems="center" mb={2}>
              <Hidden smUp>
                <IconButton onClick={() => {}}>
                  <Menu />
                </IconButton>
              </Hidden>
              <Typography align="center" variant="h3" my={4} sx={{ flexGrow: 1, fontWeight: 'bold', color: '#FFD700' }}>Favoris partagés</Typography>
            </Box>
            <Box display="flex" justifyContent="center" my={2}>
              <Button variant="contained" color="primary" onClick={handleAddToFavorites}>
                Ajouter à mes favoris
              </Button>
            </Box>
            <Box p={2} width="100%" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
              <Grid container spacing={2} justifyContent="center" alignItems="flex-start">
                {filters.map(({ title, dataKey, dataNodes }) => (
                  sharedFavorites[dataKey]?.length > 0 && (
                    <Grid item xs={12} key={dataKey}>
                      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="h6" sx={{ color: '#333', mb: 2 }}>{title}</Typography>
                      </Box>
                      <List>
                        {sharedFavorites[dataKey].map(item => {
                          const dataNode = dataNodes.find(p => p._id === item.id);
                          return (
                            <ListItem 
                              key={item.id} 
                              sx={{ 
                                transition: 'transform 0.3s, box-shadow 0.3s', 
                                '&:hover': { transform: 'scale(1.02)', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)' },
                                borderRadius: '8px',
                                mb: 2,
                                bgcolor: '#fff',
                                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)'
                              }}
                            >
                              <ListItemButton>
                                <ListItemAvatar>
                                  <Avatar sx={{ bgcolor: '#FFD700', color: '#fff' }}>
                                    <Store />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={dataNode?.name || `${title} inconnu`} sx={{ color: '#555' }} />
                              </ListItemButton>
                            </ListItem>
                          );
                        })}
                      </List>
                    </Grid>
                  )
                ))}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default SharePage;

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
