import React, { useState, useEffect } from "react";
import { graphql, HeadFC, navigate, PageProps } from "gatsby";
import {
  Box,
  List,
  ListItem,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import * as favoriteService from "../utils/favoritesService";
import FilterBar from "../components/filter-bar";
import FavoriteIcons from "../components/FavoriteIcons";

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
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  useEffect(() => {
    setFavorites(getAllFavorites());
  }, []);

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
              <FavoriteIcons
                type={type}
                targetId={m._id}
                favorites={favorites}
                setFavorites={setFavorites}
              />
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
