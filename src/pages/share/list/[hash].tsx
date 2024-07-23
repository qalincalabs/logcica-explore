import React from "react";
import LZString from "lz-string";
import { navigate, PageProps } from "gatsby";
import { Box, Typography, Grid, Button, CssBaseline } from "@mui/material";
import Layout from "../../../components/layout";
import * as favoriteService from "../../../utils/favoritesService";
import { FavoriteListContent } from "../../../components/favorite-list-content";

const SharePage = ({ params }: PageProps) => {
  const hash = params[`hash`];
  const decompressedData = LZString.decompressFromEncodedURIComponent(hash);

  const exportedList = JSON.parse(decompressedData);
  const sharedFavorites = exportedList.data;

  const handleAddToFavorites = () => {
    favoriteService.importList(exportedList);
    navigate("/");
  };

  return (
    <Layout>
      <CssBaseline />
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          item
          xs={12}
          md={9}
          lg={10}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Box display="flex" alignItems="center" mb={2}>
              <Typography
                align="center"
                variant="h3"
                my={4}
                sx={{ flexGrow: 1, fontWeight: "bold", color: "#FFD700" }}
              >
                Favoris partagés
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center" my={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToFavorites}
              >
                Ajouter à mes favoris
              </Button>
            </Box>
            <FavoriteListContent favorites={sharedFavorites} />
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default SharePage;
