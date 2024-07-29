import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as favoriteService from "../utils/favoritesService";

interface RenameDialogProps {
  open: boolean;
  onClose: () => void;
  listToRename: string | undefined;
}

const RenameDialog: React.FC<RenameDialogProps> = ({
  open,
  onClose,
  listToRename,
}) => {
  const [newListName, setNewListName] = useState("");

  useEffect(() => {
    if (open) {
      const list = favoriteService
        .allLists()
        .find((list) => list.id === listToRename);
      setNewListName(list?.name || "");
    }
  }, [open, listToRename]);

  const handleRenameFavoriteList = () => {
    if (listToRename && newListName.trim()) {
      favoriteService.renameList({
        id: listToRename,
        name: newListName.trim(),
      });
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Renommer la Liste</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Veuillez entrer un nouveau nom pour la liste.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Nom de la Liste"
          fullWidth
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Annuler
        </Button>
        <Button onClick={handleRenameFavoriteList} color="primary">
          Renommer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RenameDialog;
