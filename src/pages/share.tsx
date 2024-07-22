import React, { useEffect, useState } from "react";
import LZString from 'lz-string';
import { Box, Typography, CircularProgress, Paper } from "@mui/material";

const SharePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sharedFavorites, setSharedFavorites] = useState<any>(null);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const decompressedData = LZString.decompressFromEncodedURIComponent(hash);
      if (decompressedData) {
        try {
          const favorites = JSON.parse(decompressedData);
          setSharedFavorites(favorites);
          setLoading(false);
        } catch (e) {
          setError("Erreur lors de la restauration des favoris.");
          setLoading(false);
        }
      } else {
        setError("Données de partage invalides.");
        setLoading(false);
      }
    } else {
      setError("Aucune donnée de partage trouvée.");
      setLoading(false);
    }
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" flexDirection="column">
      {loading && <CircularProgress />}
      {error && <Typography variant="h6" color="error">{error}</Typography>}
      {sharedFavorites && (
        <Paper sx={{ p: 2, m: 2, width: '80%' }}>
          <Typography variant="h6">Favoris partagés :</Typography>
          <Typography component="pre" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {JSON.stringify(sharedFavorites, null, 2)}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default SharePage;
