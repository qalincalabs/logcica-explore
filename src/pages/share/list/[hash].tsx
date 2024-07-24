import React, { useEffect, useState } from "react";
import LZString from "lz-string";
import { navigate, PageProps } from "gatsby";
import { Box, Typography, Grid, Button, CssBaseline } from "@mui/material";
import Layout from "../../../components/layout";
import * as favoriteService from "../../../utils/favoritesService";
import { FavoriteListContent } from "../../../components/favorite-list-content";

const SharePage = ({ params }: PageProps) => {
  const [exportedList, setExportedList] = useState({name: "Loading", data: {}});

  useEffect(() => {
    if (typeof window == "undefined") return;

    const hash = params[`hash`];
    const decompressedData = LZString.decompressFromEncodedURIComponent(hash);

    setExportedList(JSON.parse(decompressedData));
  }, []);

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
                onClick={() => {
                  favoriteService.importList(exportedList);
                  navigate("/favorites");
                }}
              >
                Ajouter à mes favoris
              </Button>
            </Box>
            <FavoriteListContent favorites={exportedList.data} />
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default SharePage;
