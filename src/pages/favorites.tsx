import React, { useState, useEffect } from "react";
import { graphql, PageProps } from "gatsby";
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

  return (
    <Layout>
      <Typography align="center" variant="h3" my={4}>
        Mes Favoris
      </Typography>
      <Box p={2} width="100%" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
        <Grid container spacing={2} justifyContent="center" alignItems="flex-start">
          <Grid item xs={12} md={3}>
            <Box>
              <Typography variant="h6" style={{ color: 'black', marginBottom: '16px' }}>Groupements</Typography>
              <List>
                {partnershipFavorites.map((id: string) => (
                  <ListItem key={id}>
                    <ListItemButton>
                      <ListItemText primary={data.partnerships?.nodes?.find((p: any) => p._id === id)?.name || "Groupement inconnu"} />
                      <ListItemIcon>
                        <IconButton onClick={() => removePartnershipFavorite(id)}>
                          <Delete />
                        </IconButton>
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={12} md={3}>
            <Box>
              <Typography variant="h6" style={{ color: 'black', marginBottom: '16px' }}>Marchés</Typography>
              <List>
                {favorites.map((fav: favoriteItem) => (
                  <ListItem key={fav.targetId}>
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
                        <IconButton onClick={() => removeFavorite(fav.targetId)}>
                          <Delete />
                        </IconButton>
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={12} md={3}>
            <Box>
              <Typography variant="h6" style={{ color: 'black', marginBottom: '16px' }}>Producteurs</Typography>
              <List>
                {activityFavorites.map((name: string) => (
                  <ListItem key={name}>
                    <ListItemButton>
                      <ListItemText primary={name} />
                      <ListItemIcon>
                        <IconButton onClick={() => removeActivityFavorite(name)}>
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
        <Divider style={{ width: '100%', margin: '16px 0' }} />
        <Grid container spacing={2} justifyContent="center" alignItems="flex-start">
          <Grid item xs={12} md={3}>
            <Box>
              <Typography variant="h6" style={{ color: 'black', marginBottom: '16px' }}>Produits</Typography>
              <List>
                {productFavorites.map((id: string) => (
                  <ListItem key={id}>
                    <ListItemButton>
                      <ListItemText primary={data.products?.nodes?.find((p: any) => p._id === id)?.name || "Produit inconnu"} />
                      <ListItemIcon>
                        <IconButton onClick={() => removeProductFavorite(id)}>
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
