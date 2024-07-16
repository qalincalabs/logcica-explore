import React, { useEffect, useState } from "react";
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
}

const FavoriteIcons: React.FC<FavoriteIconsProps> = ({
  type,
  targetId,
}) => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [newFavoriteListName, setNewFavoriteListName] = useState<string>("");
  const [currentFavoriteTarget, setCurrentFavoriteTarget] = useState<
    string | null
  >(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const [selectedItems, setSelectedItems] = useState<favoriteService.FavoriteItem[]>([]);
  const [favoriteLists, setFavoriteLists] = useState<favoriteService.FavoriteList[]>([])

  useEffect(() => {
    setSelectedItems(favoriteService.findItems({targetIds: [targetId], targetTypes: [type]}))
    setFavoriteLists(favoriteService.allLists())
  }, []);

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
      setFavoriteLists(favoriteService.allLists());
    } else {
      setSnackbarMessage("Le nom de la liste ne peut pas être vide.");
      setSnackbarOpen(true);
    }
  };

  function handleToggle(assignement: favoriteService.FavoriteItemAssignement, e: any) {
    e.preventDefault();
    favoriteService.assignItemToList(assignement) 
    setSelectedItems(favoriteService.findItems({targetIds: [assignement.targetId], targetTypes: [assignement.targetType]}))
    return
  }

  const favouriteChecked =  selectedItems.some(f => f.listId == "default" && f.targetId == targetId && f.targetType == type)

  return (
    <>
      <IconButton onClick={e => handleToggle({listId: "default", targetId: targetId, targetType: type, assign: !favouriteChecked},e)}>
        {favouriteChecked ? (
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
          { favoriteLists.filter(l => l.name != "default").map((value) => {
            const labelId = `checkbox-list-label-${value}`;


            const listChecked =  selectedItems.some(i => i.listId == value.id && i.targetId == targetId && i.targetType == type)

            return (
              <ListItem
                key={value.id}
                disablePadding
              >
                <ListItemButton role={undefined} onClick={e => handleToggle({listId: value.id, targetId: targetId, targetType: type, assign: !listChecked}, e)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      tabIndex={-1}
                      checked={listChecked}
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
