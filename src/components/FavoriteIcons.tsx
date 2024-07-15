import React, { useState } from "react";
import {
  IconButton,
  MenuItem,
  TextField,
  Button,
  Popover,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  ListItem,
} from "@mui/material";
import { Star, StarBorder, Delete, Add } from "@mui/icons-material";
import * as favoriteService from "../utils/favoritesService";

interface FavoriteIconsProps {
  type: string;
  targetId: string;
  favorites: { [key: string]: string[] };
  setFavorites: (favorites: { [key: string]: string[] }) => void;
}

const FavoriteIcons: React.FC<FavoriteIconsProps> = ({
  type,
  targetId,
  favorites,
  setFavorites,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [newFavoriteListName, setNewFavoriteListName] = useState<string>("");
  const [currentFavoriteTarget, setCurrentFavoriteTarget] = useState<
    string | null
  >(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const handleOpenPopover = (
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
      setFavorites(favoriteService.getAllFavorites(type));
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
    setFavorites(favoriteService.getAllFavorites(type));
  };

  const handleRemoveFavorite = (targetId: string, listId: string) => {
    favoriteService.removeItemFromList({ targetType: type, targetId, listId });
    setFavorites(favoriteService.getAllFavorites(type));
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
      setFavorites(favoriteService.getAllFavorites(type));
      handleClosePopover();
    }
  };

  return (
    <>
      <IconButton onClick={() => handleFavoriteToggle(targetId)}>
        {favorites["default"]?.includes(targetId) ? (
          <Star color="primary" />
        ) : (
          <StarBorder />
        )}
      </IconButton>
      <IconButton onClick={(e) => handleOpenPopover(e, targetId)}>
        <Add />
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl) && currentFavoriteTarget === targetId}
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
        <List sx={{ width: '100%', maxWidth: 360, maxHeight:300, overflow: 'auto' }}>
          {favoriteService
            .allLists()
            .filter((list) => list.id !== "default")
            .map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            function handleToggle(value: string): React.MouseEventHandler<HTMLDivElement> | undefined {
              return 
            }

            return (
              <ListItem
                key={value.id}
                disablePadding
              >
                <ListItemButton role={undefined} onClick={handleToggle(value.id)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={value.id} primary={value.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
          </List>
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
    </>
  );
};

export default FavoriteIcons;
