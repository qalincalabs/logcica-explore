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

type favoriteItem = {
  targetId: string;
};

const FavoritesPage: React.FC<PageProps> = ({ data }: any) => {
  const [favorites, setFavorites] = useState<favoriteItem[]>([]);
  const [activityFavorites, setActivityFavorites] = useState<string[]>([]);
  const [productFavorites, setProductFavorites] = useState<string[]>([]);
  const [partnershipFavorites, setPartnershipFavorites] = useState<string[]>([]);
  const [filter, setFilter] = useState({
    partnership: true,
    marketplace: true,
    activity: true,
    product: true,
  });

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const storedActivityFavorites = JSON.parse(localStorage.getItem('activityFavorites') || '[]');
    const storedProductFavorites = JSON.parse(localStorage.getItem('productFavorites') || '[]');
    const storedPartnershipFavorites = JSON.parse(localStorage.getItem('partnershipFavorites') || '[]');
    setFavorites(storedFavorites);
    setActivityFavorites(storedActivityFavorites);
    setProductFavorites(storedProductFavorites);
    setPartnershipFavorites(storedPartnershipFavorites);
  }, []);

  const removeFavorite = (id: string) => {
    const updatedFavorites = favorites.filter((fav) => fav.targetId !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const removeActivityFavorite = (name: string) => {
    const updatedActivityFavorites = activityFavorites.filter(fav => fav !== name);
    setActivityFavorites(updatedActivityFavorites);
    localStorage.setItem('activityFavorites', JSON.stringify(updatedActivityFavorites));
  };

  const removeProductFavorite = (id: string) => {
    const updatedProductFavorites = productFavorites.filter(fav => fav !== id);
    setProductFavorites(updatedProductFavorites);
    localStorage.setItem('productFavorites', JSON.stringify(updatedProductFavorites));
  };

  const removePartnershipFavorite = (id: string) => {
    const updatedPartnershipFavorites = partnershipFavorites.filter(fav => fav !== id);
    setPartnershipFavorites(updatedPartnershipFavorites);
    localStorage.setItem('partnershipFavorites', JSON.stringify(updatedPartnershipFavorites));
  };

  const handleItemClick = (type: string, id: string) => {
    switch(type) {
      case 'marketplace':
        navigate(`/marketplace/${id}`);
        break;
      case 'activity':
        navigate(`/activity/${id}`);
        break;
      case 'product':
        navigate(`/product/${id}`);
        break;
      case 'partnership':
        navigate(`/partnership/${id}`);
        break;
      default:
        break;
    }
  };

  const handleFilterChange = (name: string) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      [name]: !prevFilter[name]
    }));
  };

  const filteredPartnershipFavorites = filter.partnership ? partnershipFavorites : [];
  const filteredFavorites = filter.marketplace ? favorites : [];
  const filteredActivityFavorites = filter.activity ? activityFavorites : [];
  const filteredProductFavorites = filter.product ? productFavorites : [];

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
                        <ListItemText primary={data.partnerships?.nodes?.find((p: any) => p._id === id)?.name || "Groupement inconnu"} />
                        <ListItemIcon>
                          <IconButton onClick={(e) => { e.stopPropagation(); removePartnershipFavorite(id); }}>
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
                    {filteredFavorites.map((fav: favoriteItem) => (
                      <ListItem key={fav.targetId} onClick={() => handleItemClick('marketplace', fav.targetId)}>
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar>
                              <Store />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={data.marketplaces.nodes.find((m: any) => m._id === fav.targetId)?.name || "Marché inconnu"}
                          />
                          <ListItemIcon>
                            <IconButton onClick={(e) => { e.stopPropagation(); removeFavorite(fav.targetId); }}>
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
                    {filteredActivityFavorites.map((name: string) => (
                      <ListItem key={name} onClick={() => handleItemClick('activity', name)}>
                        <ListItemButton>
                          <ListItemText primary={name} />
                          <ListItemIcon>
                            <IconButton onClick={(e) => { e.stopPropagation(); removeActivityFavorite(name); }}>
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
                    {filteredProductFavorites.map((id: string) => (
                      <ListItem key={id} onClick={() => handleItemClick('product', id)}>
                        <ListItemButton>
                          <ListItemText primary={data.products?.nodes?.find((p: any) => p._id === id)?.name || "Produit inconnu"} />
                          <ListItemIcon>
                            <IconButton onClick={(e) => { e.stopPropagation(); removeProductFavorite(id); }}>
                              <Delete />
                            </IconButton>
                          </ListItemIcon>
                        </ListItemButton>
                      </ListItem>
                    ))}
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
      }
    }
    partnerships: allMongodbPartnerships {
      nodes {
        _id
        name
      }
    }
  }
`;
