import React, { useState, useEffect } from "react";
import { graphql, HeadFC, navigate, PageProps } from "gatsby";
import {
  Box,
  List,
  ListItem,
  Typography,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
  Button,
  Snackbar,
  Alert,
  Popover,
} from "@mui/material";
import { Star, StarBorder, Delete, Add } from "@mui/icons-material";
import * as favoriteService from "../utils/favoritesService";
import FilterBar from "../components/filter-bar";

interface MainContentProps {
  title: string;
  type: string;
  listItemContent: (arg0: any) => any;
  dataList: any;
}

export default function MainContent(props: MainContentProps) {
  const type = props.type;
  const dataList = props.dataList;

  const getAllFavorites = () => {
    const allLists = favoriteService.allLists();
    const allFavorites = allLists.reduce((acc, list) => {
      const favorites = favoriteService
        .findItems({ listIds: [list.id], targetTypes: [type] })
        .map((e) => e.targetId);
      acc[list.id] = favorites;
      return acc;
    }, {} as { [key: string]: string[] });
    return allFavorites;
  };

  const [favorites, setFavorites] = useState<{ [key: string]: string[] }>(
    getAllFavorites()
  );
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [newFavoriteListName, setNewFavoriteListName] = useState<string>("");
  const [currentFavoriteTarget, setCurrentFavoriteTarget] = useState<
    string | null
  >(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  useEffect(() => {
    setFavorites(getAllFavorites());
  }, []);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    targetId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setCurrentFavoriteTarget(targetId);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setCurrentFavoriteTarget(null);
    setNewFavoriteListName(""); // Reset new favorite list name
  };

  const handleAddFavoriteList = () => {
    if (newFavoriteListName.trim() !== "") {
      favoriteService.addList({ name: newFavoriteListName });
      setNewFavoriteListName("");
      setFavorites(getAllFavorites());
      handleClosePopover();
    } else {
      setSnackbarMessage("Le nom de la liste ne peut pas être vide.");
      setSnackbarOpen(true);
    }
  };

  const handleFavoriteToggle = (targetId: string) => {
    const defaultFavorites = favorites["default"] || [];
    const isFavorite = defaultFavorites.includes(targetId);
    favoriteService.assignItemToList({
      targetType: type,
      targetId,
      listId: "default",
      assign: !isFavorite,
    });
    setFavorites(getAllFavorites());
  };

  const handleRemoveFavorite = (targetId: string, listId: string) => {
    favoriteService.removeItemFromList({ targetType: type, targetId, listId });
    setFavorites(getAllFavorites());
  };

  const handleAddToList = (listId: string) => {
    if (favorites[listId]?.includes(currentFavoriteTarget!)) {
      setSnackbarMessage("Cet élément est déjà dans la liste de favoris.");
      setSnackbarOpen(true);
    } else {
      favoriteService.assignItemToList({
        targetType: type,
        targetId: currentFavoriteTarget!,
        listId,
        assign: true,
      });
      setFavorites(getAllFavorites());
      handleClosePopover();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

  const filteredDataList = showFavoritesOnly
    ? dataList.filter((m: any) =>
        Object.values(favorites).flat().includes(m._id)
      )
    : dataList;

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" my={4}>
        <Typography align="center" variant="h3" mr={2}>
          {props.title}
        </Typography>
      </Box>
      <FilterBar
        favoriteFilterToggle={showFavoritesOnly}
        favoriteFilterToggleCallback={() =>
          setShowFavoritesOnly(!showFavoritesOnly)
        }
      />
      <Box display="flex" justifyContent="center" alignItems="center">
        <List sx={{ maxWidth: "1000px" }}>
          {filteredDataList.map((m: any) => (
            <ListItem key={m._id}>
              {props.listItemContent(m)}
              <ListItemIcon>
                <IconButton onClick={() => handleFavoriteToggle(m._id)}>
                  {favorites["default"]?.includes(m._id) ? (
                    <Star color="primary" />
                  ) : (
                    <StarBorder />
                  )}
                </IconButton>
                <IconButton onClick={(e) => handleOpenMenu(e, m._id)}>
                  <Add />
                </IconButton>
                <Popover
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && currentFavoriteTarget === m._id}
                  onClose={handleClosePopover}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Box sx={{ padding: 2, minWidth: 200 }}>
                    {favoriteService
                      .allLists()
                      .filter((list) => list.id !== "default")
                      .map((list) => (
                        <MenuItem
                          key={list.id}
                          onClick={() => handleAddToList(list.id)}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "8px 16px",
                            "&:hover": {
                              backgroundColor: "#f0f0f0",
                            },
                          }}
                        >
                          <Typography variant="body1" sx={{ color: "#000" }}>
                            {list.name}
                          </Typography>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFavorite(
                                currentFavoriteTarget!,
                                list.id
                              );
                            }}
                            sx={{ color: "#d32f2f" }}
                          >
                            <Delete />
                          </IconButton>
                        </MenuItem>
                      ))}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: "8px 16px",
                      }}
                    >
                      <TextField
                        value={newFavoriteListName}
                        onChange={(e) => setNewFavoriteListName(e.target.value)}
                        label="Nouvelle liste"
                        size="small"
                        sx={{ marginRight: 1, flexGrow: 1 }}
                      />
                      <Button
                        onClick={handleAddFavoriteList}
                        sx={{
                          backgroundColor: "#FFD700",
                          color: "#000",
                          "&:hover": { backgroundColor: "#FFC107" },
                        }}
                      >
                        Créer
                      </Button>
                    </Box>
                  </Box>
                </Popover>
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
    </>
  );
}
