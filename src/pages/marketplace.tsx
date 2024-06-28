import React, { useState, useEffect } from "react";
import { graphql, Link, HeadFC, PageProps, navigate } from "gatsby";
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
import Layout from "../components/layout";
import { Store, Star, StarBorder, Favorite, Delete } from "@mui/icons-material";
import Markdown from "markdown-to-jsx";

type favoriteItem = {
  targetId: string;
};

const MarketplacePage: React.FC<PageProps> = ({ data }: any) => {
  const [favorites, setFavorites] = useState<favoriteItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (id: string) => {
    const updatedFavorites = favorites.some((fav) => fav.targetId == id)
      ? favorites.filter((fav) => fav.targetId !== id)
      : [...favorites, { targetId: id }];

    console.log(updatedFavorites);
    setFavorites(updatedFavorites);
    console.log(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const removeFavorite = (id: string) => {
    const updatedFavorites = favorites.filter((fav) => fav.targetId !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleShowFavoritesOnlyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowFavoritesOnly(event.target.checked);
  };

  const filteredMarketplaces = showFavoritesOnly
    ? data.marketplaces.nodes.filter((m: any) =>
        favorites.some((fav) => fav.targetId == m._id)
      )
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
      <Box display="flex">
        <Box
          width="250px"
          p={2}
          mr={2}
          borderRight="1px solid #ccc"
          bgcolor="lightgrey"
        >
          <Typography
            variant="h6"
            style={{ color: "black", fontWeight: "bold" }}
          >
            Filtres
          </Typography>
          <Divider />
          <FormControlLabel
            control={
              <Checkbox
                checked={showFavoritesOnly}
                onChange={handleShowFavoritesOnlyChange}
                name="showFavoritesOnly"
              />
            }
            label={<Typography style={{ color: "black" }}>Favoris</Typography>}
          />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <List>
            {filteredMarketplaces.map((m: any) => (
              <ListItem key={m._id}>
                <ListItemButton
                  onClick={() => navigate("/marketplace/" + m._id)}
                >
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
                    {favorites.some((fav) => fav.targetId == m._id) ? (
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
      </Box>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        <Box p={2} width={250}>
          <Typography variant="h6" style={{ color: "black" }}>
            Favoris
          </Typography>
          <List>
            {data.marketplaces.nodes
              .filter((m: any) =>
                favorites.some((fav) => fav.targetId == m._id)
              )
              .map((m: any) => (
                <ListItem key={m._id}>
                  <ListItemButton
                    onClick={() => navigate("/marketplace/" + m._id)}
                  >
                    <ListItemText primary={m.name} />
                  </ListItemButton>
                  <ListItemIcon>
                    <IconButton onClick={() => removeFavorite(m._id)}>
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
  }
`;
