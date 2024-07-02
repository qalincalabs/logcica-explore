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
  Button,
  ButtonGroup,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import Layout from "../components/layout";
import {
  Store,
  Star,
  StarBorder,
  Favorite,
  Delete,
  FilterAlt,
  Close
} from "@mui/icons-material";
import Markdown from "markdown-to-jsx";

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

type FavoriteData = {
  activities: string[];
  products: string[];
  counters: string[];
  partnerships: string[];
};

const MarketplacePage: React.FC<PageProps> = ({ data }: any) => {
  const [favorites, setFavorites] = useState<FavoriteData>({
    activities: [],
    products: [],
    counters: [],
    partnerships: [],
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites.default') || '{"data": {"activities": [], "products": [], "counters": [], "partnerships": []}}');
    setFavorites(storedFavorites.data);
  }, []);

  const saveFavorites = (updatedFavorites: FavoriteData) => {
    localStorage.setItem('favorites.default', JSON.stringify({ data: updatedFavorites }));
  };

  const toggleFavorite = (id: string) => {
    const updatedFavorites = favorites.counters.includes(id)
      ? { ...favorites, counters: favorites.counters.filter(fav => fav !== id) }
      : { ...favorites, counters: [...favorites.counters, id] };

    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const removeFavorite = (id: string, type: keyof FavoriteData) => {
    const updatedFavorites = {
      ...favorites,
      [type]: favorites[type].filter(fav => fav !== id),
    };
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  const handleShowFavoritesOnlyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowFavoritesOnly(event.target.checked);
  };

  const filteredMarketplaces = showFavoritesOnly
    ? data.marketplaces.nodes.filter((m: any) => favorites.counters.includes(m._id))
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
      <Box
        sx={{
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ButtonGroup variant="outlined">
          <Button disabled>
            <FilterAlt />
          </Button>
          <Button>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showFavoritesOnly}
                  onChange={handleShowFavoritesOnlyChange}
                  name="showFavoritesOnly"
                />
              }
              label="Favoris"
            />
          </Button>
        </ButtonGroup>
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
                  {favorites.counters.includes(m._id) ? (
                    <Star />
                  ) : (
                    <StarBorder />
                  )}
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
            {favorites.counters.map((id: string) => (
              <ListItem key={id}>
                <ListItemText primary={data.marketplaces.nodes.find((m: any) => m._id === id)?.name || "Marché inconnu"} />
                <ListItemIcon>
                  <IconButton onClick={() => removeFavorite(id, 'counters')}>
                    <Delete />
                  </IconButton>
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Typography variant="h6" style={{ color: 'black', marginTop: '16px' }}>Producteurs</Typography>
          <List>
            {favorites.activities.map((name: string) => (
              <ListItem key={name}>
                <ListItemText primary={data.activities?.nodes?.find((a: any) => a._id === name)?.name || name} />
                <ListItemIcon>
                  <IconButton onClick={() => removeFavorite(name, 'activities')}>
                    <Delete />
                  </IconButton>
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Typography variant="h6" style={{ color: 'black', marginTop: '16px' }}>Produits</Typography>
          <List>
            {favorites.products.map((id: string) => (
              <ListItem key={id}>
                <ListItemText primary={data.products?.nodes?.find((p: any) => p._id === id)?.name || "Produit inconnu"} />
                <ListItemIcon>
                  <IconButton onClick={() => removeFavorite(id, 'products')}>
                    <Delete />
                  </IconButton>
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Typography variant="h6" style={{ color: 'black', marginTop: '16px' }}>Groupements</Typography>
          <List>
            {favorites.partnerships.map((id: string) => (
              <ListItem key={id}>
                <ListItemText primary={data.partnerships?.nodes?.find((p: any) => p._id === id)?.name || "Groupement inconnu"} />
                <ListItemIcon>
                  <IconButton onClick={() => removeFavorite(id, 'partnerships')}>
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
