import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Add, Facebook, Star, Web } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import React from "react";
import { TitleWithLabel } from "./title-with-label";

type TProfileIcons = {
  [dict_key: string]: ReactJSXElement;
};

const profileIcons: TProfileIcons = {
  website: <Web />,
  facebook: <Facebook />,
};

export function FolderGrid({ data }: any) {
  return (
    <Box display="flex" flex={1} gap={2} flexWrap="wrap">
      {data.map((e: any) => (
        <Box flex={1}>
          <Card sx={{ minWidth: "300px" }}>
            <CardHeader
              avatar={<Avatar aria-label="recipe">{e.avatar}</Avatar>}
              action={
                <>
                  <IconButton aria-label="settings">
                    <Add />
                  </IconButton>
                  <IconButton aria-label="settings">
                    <Star />
                  </IconButton>
                </>
              }
              title={<TitleWithLabel data={e.properties} />}
              subheader={e.properties.place?.address?.locality}
            />
            <CardContent>
              {e.properties.description?.short?.markdown}
            </CardContent>
            <CardActions>
              {e.properties.profiles
                ?.filter((p: any) => Object.keys(profileIcons).includes(p.type))
                .map((p: any) => (
                  <IconButton href={p.link}>{profileIcons[p.type]}</IconButton>
                ))}
            </CardActions>
          </Card>
        </Box>
      ))}
    </Box>
  );
}

export default FolderGrid;
