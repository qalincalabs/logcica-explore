import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button
} from '@mui/material';

interface RenameDialogProps {
  open: boolean;
  onClose: () => void;
  onRename: () => void;
  newListName: string;
  setNewListName: (name: string) => void;
}

const RenameDialog: React.FC<RenameDialogProps> = ({ open, onClose, onRename, newListName, setNewListName }) => {
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
        <Button onClick={onRename} color="primary">
          Renommer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RenameDialog;
