import { Add, Star } from "@mui/icons-material";
import {
  Box,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { TitleWithLabel } from "./title-with-label";

import { navigate } from "gatsby";
import { FixedSizeList } from "react-window";
import IconForItem from "./icon-for-item";

export function FolderList({ data }: any) {
  /*
          <ListSubheader
            sx={{ width: "100%", display: i == 0 || i == 1 ? "block" : "none" }}
          >
            Less than {i * 10 + 5}km
          </ListSubheader>
    */

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <FixedSizeList
        height={350}
        width="95%"
        itemSize={60}
        itemCount={data.length}
      >
        {({ index, style }) => {
          return (
            <ListItemButton
              style={style}
              onClick={() => navigate("/activity/" + data[index]._id)}
            >
              <ListItemIcon>
                <IconForItem item={data[index]} />
              </ListItemIcon>
              <ListItemText
                primary={<TitleWithLabel data={data[index]} />}
                secondary={data[index].place?.address?.locality}
              />
              <ListItemIcon>
                <IconButton>
                  <Add />
                </IconButton>
                <IconButton>
                  <Star />
                </IconButton>
              </ListItemIcon>
            </ListItemButton>
          );
        }}
      </FixedSizeList>
    </Box>
  );
}

export default FolderList;
