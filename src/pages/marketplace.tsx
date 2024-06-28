import React, { useState, useEffect } from "react";
import { graphql, navigate, PageProps } from "gatsby";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  IconButton,
  Drawer,
  ListItemIcon,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import Layout from "../components/layout";
import { Store, Star, StarBorder, Favorite, Delete, Close } from "@mui/icons-material";
import Markdown from "markdown-to-jsx";

type favoriteItem = {
  targetId: string;
}

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  '&.Mui-checked': {
    color: 'black',
  },
  '&.MuiCheckbox-root': {
    color: 'white',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 28,
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderRadius: '50%',
  },
  transition: theme.transitions.create(['background-color', 'border']),
}));

const FilterBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  border: '1px solid lightgrey',
  borderRadius: 8,
  backgroundColor: '#FFD700',
  display: 'flex',
  alignItems: 'center',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  backgroundColor: '#FFD700',
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const MarketplacePage: React.FC<PageProps> = ({ data }: any) => {
  const [favorites, setFavorites] = useState<favoriteItem[]>([]);
  const [activityFavorites, setActivityFavorites] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [productFavorites, setProductFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const storedActivityFavorites = JSON.parse(localStorage.getItem('activityFavorites') || '[]');
    const storedProductFavorites = JSON.parse(localStorage.getItem('productFavorites') || '[]');
    setFavorites(storedFavorites);
    setActivityFavorites(storedActivityFavorites);
    setProductFavorites(storedProductFavorites);
  }, []);

  const toggleFavorite = (id: string) => {
    const updatedFavorites = favorites.some(fav => fav.targetId === id)
      ? favorites.filter(fav => fav.targetId !== id)
      : [...favorites, { targetId: id }];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const removeFavorite = (id: string) => {
    const updatedFavorites = favorites.filter(fav => fav.targetId !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
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

  const handleShowFavoritesOnlyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowFavoritesOnly(event.target.checked);
  };

  const filteredMarketplaces = showFavoritesOnly
    ? data.marketplaces.nodes.filter((m: any) => favorites.some(fav => fav.targetId === m._id))
    : data.marketplaces.nodes;

  return (
    <Layout>
      <Box display="flex" justifyContent="center" alignItems="center" my={4}>
        <Typography align="center" variant="h3" mr={2}>
          Marchés
        </Typography>
        <IconButton onClick={handleDrawerOpen}>
          <Favorite />
        </IconButton>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
        <FilterBox>
          <Typography variant="h6" style={{ color: 'black', fontWeight: 'bold', marginRight: '100px' }}>Filtres</Typography>
          <FormControlLabel
            control={
              <CustomCheckbox
                checked={showFavoritesOnly}
                onChange={handleShowFavoritesOnlyChange}
                name="showFavoritesOnly"
              />
            }
            label={<Typography style={{ color: 'black' }}>Favoris</Typography>}
          />
        </FilterBox>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <List>
          {filteredMarketplaces.map((m: any) => (
            <ListItem key={m._id}>
              <ListItemButton onClick={() => navigate("/marketplace/" + m._id)}>
                <ListItemAvatar>
                  <Avatar>
                    <Store />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={m.name}
                  secondary={
                    <Stack>
                      <Typography>
                        {m.availabilityStatement.short.markdown}
                      </Typography>
                      {m.description && (
                        <Markdown>{m.description.short.markdown}</Markdown>
                      )}
                    </Stack>
                  }
                />
              </ListItemButton>
              <ListItemIcon>
                <IconButton onClick={() => toggleFavorite(m._id)}>
                  {favorites.some(fav => fav.targetId === m._id) ? <Star /> : <StarBorder />}
                </IconButton>
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Box>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        <DrawerHeader>
          <Typography variant="h6">Favoris</Typography>
          <IconButton onClick={handleDrawerClose}>
            <Close />
          </IconButton>
        </DrawerHeader>
        <Box p={2} width={250}>
          <Typography variant="h6" style={{ color: 'black', marginTop: '16px' }}>Marchés</Typography>
          <List>
            {favorites.map((fav: favoriteItem) => (
              <ListItem key={fav.targetId}>
                <ListItemText primary={data.marketplaces.nodes.find((m: any) => m._id === fav.targetId)?.name} />
                <ListItemIcon>
                  <IconButton onClick={() => removeFavorite(fav.targetId)}>
                    <Delete />
                  </IconButton>
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Typography variant="h6" style={{ color: 'black', marginTop: '16px' }}>Producteurs</Typography>
          <List>
            {activityFavorites.map((name: string) => (
              <ListItem key={name}>
                <ListItemText primary={name} />
                <ListItemIcon>
                  <IconButton onClick={() => removeActivityFavorite(name)}>
                    <Delete />
                  </IconButton>
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Typography variant="h6" style={{ color: 'black', marginTop: '16px' }}>Produits</Typography>
          <List>
            {productFavorites.map((id: string) => (
              <ListItem key={id}>
                <ListItemText primary={data.products?.nodes?.find((p: any) => p._id === id)?.name || "Produit inconnu"} />
                <ListItemIcon>
                  <IconButton onClick={() => removeProductFavorite(id)}>
                    <Delete />
                  </IconButton>
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Layout>
  );
};

export default MarketplacePage;

export const Head: HeadFC = () => <title>Marchés</title>;

export const query = graphql`
  query {
    marketplaces: allMongodbCounters(filter: { type: { eq: "marketplace" } }) {
      nodes {
        _id
        name
        description {
          short {
            markdown
          }
        }
        place {
          address {
            street
            locality
          }
        }
        availabilityStatement {
          short {
            markdown
          }
        }
        profiles {
          localKey
          type
          link
        }
      }
    }
    products: allMongodbProducts { 
      nodes {
        _id
        name
      }
    }
  }
`;
