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
} from "@mui/material";
import Layout from "../components/layout";
import { Store, Delete } from "@mui/icons-material";
import * as favoriteService from "../utils/favoritesService";

const FavoritesPage: React.FC<PageProps> = ({ data }: any) => {

  const refreshFavorites = () => favoriteService.findItems({listIds: ['default']})

  const [favorites, setFavorites] = useState(refreshFavorites);
  
  const [filter, setFilter] = useState({
    partnership: true,
    marketplace: true,
    activity: true,
    product: true,
  });

  const handleRemoveFavorite = (id: string, type: string) => {
    favoriteService.removeItemFromList({targetType: type, targetId: id})
    setFavorites(refreshFavorites());
  };

  const handleItemClick = (type: string, id: string, activityId?: string) => {
    switch(type) {
      case 'product':
        navigate(`/activity/${activityId}#${id}`);
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

  const filteredPartnershipFavorites = filter.partnership ? favorites.filter(f => f.targetType == 'partnership').map(e => e.targetId) : [];
  const filteredFavorites = filter.marketplace ? favorites.filter(f => f.targetType == 'counter').map(e => e.targetId)   : [];
  const filteredActivityFavorites = filter.activity ? favorites.filter(f => f.targetType == 'activity').map(e => e.targetId)   : [];
  const filteredProductFavorites = filter.product ? favorites.filter(f => f.targetType == 'product').map(e => e.targetId)   : [];

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
          {filteredPartnershipFavorites.length > 0 && (
            <Grid item xs={12} md={3}>
              <Box>
                <Typography variant="h6" style={{ color: 'black', marginBottom: '16px' }}>Groupements</Typography>
                <List>
                  {filteredPartnershipFavorites.map((id: string) => (
                    <ListItem key={id} onClick={() => handleItemClick('partnership', id)}>
                      <ListItemButton>
                        <ListItemText primary={data.partnerships.nodes.find((p: any) => p._id === id)?.name || "Groupement inconnu"} />
                        <ListItemIcon>
                          <IconButton onClick={(e) => { e.stopPropagation(); handleRemoveFavorite(id, 'partnership'); }}>
                            <Delete />
                          </IconButton>
                        </ListItemIcon>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
          )}
          {filteredFavorites.length > 0 && (
            <>
              {filter.partnership && filteredPartnershipFavorites.length > 0 && <Divider orientation="vertical" flexItem />}
              <Grid item xs={12} md={3}>
                <Box>
                  <Typography variant="h6" style={{ color: 'black', marginBottom: '16px' }}>Marchés</Typography>
                  <List>
                    {filteredFavorites.map((id: string) => (
                      <ListItem key={id} onClick={() => handleItemClick('marketplace', id)}>
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar>
                              <Store />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={data.marketplaces.nodes.find((m: any) => m._id === id)?.name || "Marché inconnu"}
                          />
                          <ListItemIcon>
                            <IconButton onClick={(e) => { e.stopPropagation(); handleRemoveFavorite(id, 'counter'); }}>
                              <Delete />
                            </IconButton>
                          </ListItemIcon>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>
            </>
          )}
          {filteredActivityFavorites.length > 0 && (
            <>
              {filter.marketplace && filteredFavorites.length > 0 && <Divider orientation="vertical" flexItem />}
              <Grid item xs={12} md={3}>
                <Box>
                  <Typography variant="h6" style={{ color: 'black', marginBottom: '16px' }}>Producteurs</Typography>
                  <List>
                    {filteredActivityFavorites.map((id: string) => (
                      <ListItem key={id} onClick={() => handleItemClick('activity', id)}>
                        <ListItemButton>
                          <ListItemText primary={data.activities?.nodes?.find((a: any) => a._id === id)?.name || "Producteur inconnu"} />
                          <ListItemIcon>
                            <IconButton onClick={(e) => { e.stopPropagation(); handleRemoveFavorite(id, 'activity'); }}>
                              <Delete />
                            </IconButton>
                          </ListItemIcon>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>
            </>
          )}
        </Grid>
        {filteredProductFavorites.length > 0 && (
          <>
            {(filter.activity && filteredActivityFavorites.length > 0) && <Divider style={{ width: '100%', margin: '16px 0' }} />}
            <Grid container spacing={2} justifyContent="center" alignItems="flex-start">
              <Grid item xs={12} md={3}>
                <Box>
                  <Typography variant="h6" style={{ color: 'black', marginBottom: '16px' }}>Produits</Typography>
                  <List>
                    {filteredProductFavorites.map((id: string) => { 
                      const product = data.products.nodes.find((p: any) => p._id === id)
                      return (
                        <ListItem key={id} onClick={() => handleItemClick('product', id, product?.producer?.activity?._id)}>
                          <ListItemButton>
                            <ListItemText primary={product?.name || "Produit inconnu"} />
                            <ListItemIcon>
                              <IconButton onClick={(e) => { e.stopPropagation(); handleRemoveFavorite(id, 'product'); }}>
                                <Delete />
                              </IconButton>
                            </ListItemIcon>
                          </ListItemButton>
                        </ListItem>
                    )})}
                  </List>
                </Box>
              </Grid>
            </Grid>
          </>
        )}
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
