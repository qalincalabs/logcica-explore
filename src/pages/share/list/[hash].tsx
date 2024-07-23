import React, { useState, useEffect } from "react";
import LZString from 'lz-string';
import { navigate, graphql } from "gatsby";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
  Grid,
  Button,
  Drawer,
  Hidden,
  CssBaseline,
  useTheme,
} from "@mui/material";
import { Store, Menu } from "@mui/icons-material";
import Layout from "../../../components/layout";
import * as favoriteService from "../../../utils/favoritesService";
import { FavoriteListContent } from "../../../components/favorite-list-content";

const SharePage = ({ params }) => {

  const hash = params[`hash`]
  const decompressedData = LZString.decompressFromEncodedURIComponent(hash);

  const exportedList = JSON.parse(decompressedData);
  const sharedFavorites = exportedList.data

  console.log(exportedList)

  // TODO: directly create a method in favoritesService to create a list from shared content
  const handleAddToFavorites = () => {
    favoriteService.importList(exportedList)
    navigate('/');
  };

  return (
    <Layout>
      <CssBaseline />
      <Grid container sx={{ height: '100vh' }}>
        <Grid item xs={12} md={9} lg={10} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box>
            <Box display="flex" alignItems="center" mb={2}>
              <Typography align="center" variant="h3" my={4} sx={{ flexGrow: 1, fontWeight: 'bold', color: '#FFD700' }}>Favoris partagés</Typography>
            </Box>
            <Box display="flex" justifyContent="center" my={2}>
              <Button variant="contained" color="primary" onClick={handleAddToFavorites}>
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

/*
export const query = graphql`
  query {
    marketplaces: allMongodbCounters(filter: { type: { eq: "marketplace" } }) {
      nodes {
        _id
        name
      }
    }
    products: allMongodbProducts { 
      nodes {
        _id
        name
        producer { 
          activity { 
            _id 
            name 
          } 
        }
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
*/
