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
  disableFavorites?: boolean 
}

export default function MainContent(props: MainContentProps) {
  const type = props.type;
  const dataList = props.dataList;

  const getAllFavorites = () =>
    favoriteService.findItems({ listIds: ["default"], targetTypes: [type] });

  const [favorites, setFavorites] = useState<favoriteService.FavoriteItem[]>(
    getAllFavorites()
  );

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredDataList = showFavoritesOnly
    ? dataList.filter((m: any) =>
        favorites.map((f) => f.targetId).includes(m._id)
      )
    : dataList;

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" my={4}>
        <Typography align="center" variant="h3" mr={2}>
          {props.title}
        </Typography>
      </Box>
      { !props.disableFavorites && 
        <FilterBar
          favoriteFilterToggle={showFavoritesOnly}
          favoriteFilterToggleCallback={() => {
            setShowFavoritesOnly(!showFavoritesOnly);
            setFavorites(getAllFavorites());
          }}
        />
      }
      <Box display="flex" justifyContent="center" alignItems="center">
        <List sx={{ maxWidth: "1000px" }}>
          {filteredDataList.map((m: any) => (
            <ListItem key={m._id}>
              {props.listItemContent(m)}
              { !props.disableFavorites && <FavoriteIcons type={type} targetId={m._id} /> }
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}
