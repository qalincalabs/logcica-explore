import { Add, Image, Star } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import React from "react";
import { TitleWithLabel } from "./title-with-label";

export function FolderList({ data }: any) {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {data.map((e: any, i: number) => (
        <>
          <ListSubheader
            sx={{ width: "100%", display: i == 0 || i == 1 ? "block" : "none" }}
          >
            Less than {i * 10 + 5}km
          </ListSubheader>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Image />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<TitleWithLabel data={e.properties} />}
              secondary={e.properties.place?.address?.locality}
            />
            <ListItemIcon>
              <IconButton>
                <Add />
              </IconButton>
              <IconButton>
                <Star />
              </IconButton>
            </ListItemIcon>
          </ListItem>
        </>
      ))}
    </List>
  );
}

export default FolderList;
