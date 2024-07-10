import React, { useState, useEffect } from "react";
import { graphql, HeadFC, navigate, PageProps } from "gatsby";
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
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import Layout from "../components/layout";
import { Store, Star, StarBorder, Delete } from "@mui/icons-material";
import Markdown from "markdown-to-jsx";
import * as favoriteService from "../utils/favoritesService";
import FilterBar from "../components/filter-bar";

const MarketplacePage: React.FC<PageProps> = ({ data }: any) => {
  const getAllFavorites = () => {
    const allLists = favoriteService.allLists();
    const allFavorites = allLists.reduce((acc, list) => {
      const favorites = favoriteService.findItems({ listIds: [list.id], targetTypes: ["counter"] }).map(e => e.targetId);
      acc[list.id] = favorites;
      return acc;
    }, {} as { [key: string]: string[] });
    return allFavorites;
  };

  const [favorites, setFavorites] = useState<{ [key: string]: string[] }>(getAllFavorites());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [newFavoriteListName, setNewFavoriteListName] = useState<string>("");
  const [currentFavoriteTarget, setCurrentFavoriteTarget] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  useEffect(() => {
    setFavorites(getAllFavorites());
  }, []);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, targetId: string) => {
    setAnchorEl(event.currentTarget);
    setCurrentFavoriteTarget(targetId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setCurrentFavoriteTarget(null);
  };

  const handleAddFavoriteList = () => {
    if (newFavoriteListName) {
      favoriteService.addList({ name: newFavoriteListName });
      setNewFavoriteListName("");
      setFavorites(getAllFavorites());
      handleCloseMenu();
    }
  };

  const handleFavoriteToggle = (targetId: string) => {
    const defaultFavorites = favorites['default'] || [];
    const isFavorite = defaultFavorites.includes(targetId);
    favoriteService.assignItemToList({
      targetType: "counter",
      targetId,
      listId: "default",
      assign: !isFavorite,
    });
    setFavorites(getAllFavorites());
  };

  const handleRemoveFavorite = (targetId: string, listId: string) => {
    favoriteService.removeItemFromList({ targetType: "counter", targetId, listId });
    setFavorites(getAllFavorites());
  };

  const handleAddToList = (listId: string) => {
    if (favorites[listId]?.includes(currentFavoriteTarget!)) {
      setSnackbarMessage("Cet élément est déjà dans la liste de favoris.");
      setSnackbarOpen(true);
    } else {
      favoriteService.assignItemToList({
        targetType: "counter",
        targetId: currentFavoriteTarget!,
        listId,
        assign: true,
      });
      setFavorites(getAllFavorites());
      handleCloseMenu();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

  const filteredMarketplaces = showFavoritesOnly
    ? data.marketplaces.nodes.filter((m: any) => Object.values(favorites).flat().includes(m._id))
    : data.marketplaces.nodes;

  return (
    <Layout>
      <Box display="flex" justifyContent="center" alignItems="center" my={4}>
        <Typography align="center" variant="h3" mr={2}>
          Marchés
        </Typography>
      </Box>
      <FilterBar
        favoriteFilterToggle={showFavoritesOnly}
        favoriteFilterToggleCallback={() => setShowFavoritesOnly(!showFavoritesOnly)}
      />
      <Box display="flex" justifyContent="center" alignItems="center">
        <List sx={{ maxWidth: "1000px" }}>
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
                      <Typography>{m.availabilityStatement.short.markdown}</Typography>
                      {m.description && (
                        <Markdown>{m.description.short.markdown}</Markdown>
                      )}
                    </Stack>
                  }
                />
              </ListItemButton>
              <ListItemIcon>
                <div onMouseLeave={handleCloseMenu}>
                  <IconButton
                    onClick={() => handleFavoriteToggle(m._id)}
                    onMouseEnter={(e) => handleOpenMenu(e, m._id)}
                  >
                    {Object.values(favorites).flat().includes(m._id) ? <Star color="primary" /> : <StarBorder />}
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && currentFavoriteTarget === m._id}
                    onClose={handleCloseMenu}
                    MenuListProps={{
                      onMouseLeave: handleCloseMenu,
                      sx: { padding: 0 },
                    }}
                    PaperProps={{
                      elevation: 3,
                      sx: {
                        borderRadius: 2,
                        padding: 1,
                        backgroundColor: '#f0f0f0',
                        minWidth: 250,
                      },
                    }}
                  >
                    {favoriteService.allLists().map((list) => (
                      <MenuItem
                        key={list.id}
                        onClick={() => handleAddToList(list.id)}
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                          padding: 1.5,
                          backgroundColor: '#fff',
                          borderRadius: 1,
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          transition: 'transform 0.3s, background-color 0.3s',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            backgroundColor: '#d1c4e9',
                          },
                        }}
                      >
                        <Typography variant="body1" sx={{ flexGrow: 1, color: '#000', fontWeight: 'bold' }}>
                          {list.name}
                        </Typography>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFavorite(currentFavoriteTarget!, list.id);
                          }}
                          sx={{ color: '#d32f2f', marginLeft: 2 }}
                        >
                          <Delete />
                        </IconButton>
                      </MenuItem>
                    ))}
                    <MenuItem
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: 1.5,
                        backgroundColor: '#e8eaf6',
                        borderRadius: 1,
                        marginTop: 1,
                      }}
                    >
                      <TextField
                        value={newFavoriteListName}
                        onChange={(e) => setNewFavoriteListName(e.target.value)}
                        label="Nouvelle liste"
                        size="small"
                        sx={{ marginRight: 1, flexGrow: 1 }}
                      />
                      <Button onClick={handleAddFavoriteList} sx={{ backgroundColor: '#FFD700', color: '#000', '&:hover': { backgroundColor: '#FFC107' } }}>
                        Créer
                      </Button>
                    </MenuItem>
                  </Menu>
                </div>
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
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
