import { Box, FormControlLabel, Checkbox } from "@mui/material";
import React from "react";

const backgroundColor = '#FFD700'; // Couleur de fond pour le bouton et la barre de filtres
const textColor = '#000000'; // Couleur de texte pour le bouton et la barre de filtres

export interface Props {
    favoriteFilterToggle: boolean;
    favoriteFilterToggleCallback: () => void
  }

function FilterBar(props: Props){
    return (
        <Box sx={{ 
            padding: '10px 20px', 
            backgroundColor: backgroundColor, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            borderBottom: '1px solid #ccc',
            marginBottom: '20px',
            color: textColor // Couleur du texte de la barre de filtres
          }}>
            <Box sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: textColor }}>Filtres :</Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={props.favoriteFilterToggle}
                  onChange={props.favoriteFilterToggleCallback}
                  name="showFavoritesOnly"
                  sx={{
                    color: textColor,
                    '&.Mui-checked': {
                      color: textColor,
                    },
                    '& .MuiSvgIcon-root': {
                      fill: '#FFFFFF',
                    },
                  }}
                />
              }
              label="Afficher uniquement les favoris"
              sx={{ color: textColor }}
            />
          </Box>
    )
}

export default FilterBar