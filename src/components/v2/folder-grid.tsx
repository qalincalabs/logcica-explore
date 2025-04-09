import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Add, Facebook, Star, Web } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import React from "react";
import { VariableSizeList as List } from "react-window";
import IconForItem from "./icon-for-item";
import { TitleWithLabel } from "./title-with-label";

type TProfileIcons = {
  [dict_key: string]: ReactJSXElement;
};

const profileIcons: TProfileIcons = {
  website: <Web />,
  facebook: <Facebook />,
};

function getItemSize({ data, index }: any) {
  const descriptionExists = data[index].description?.short?.markdown != null;
  const profilesExists =
    data[index].profiles?.some((p: any) =>
      ["facebook", "website"].includes(p.type),
    ) ?? false;

  if (descriptionExists && profilesExists) return 250;
  if (descriptionExists && !profilesExists) return 200;
  if (!descriptionExists && profilesExists) return 100;

  return 85;
}

export function FolderGrid({ data }: any) {
  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <List
        height={350}
        width="95%"
        itemSize={(index) => getItemSize({ data, index })}
        itemCount={data.length}
      >
        {({ index, style }) => {
          return (
            <Box flex={1} style={style}>
              <Card sx={{ minWidth: "300px" }}>
                <CardHeader
                  avatar={<IconForItem item={data[index]} />}
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
                  title={<TitleWithLabel data={data[index]} />}
                  subheader={data[index].place?.address?.locality}
                />
                <CardContent>
                  {data[index].description?.short?.markdown}
                </CardContent>
                <CardActions>
                  {data[index].profiles
                    ?.filter((p: any) =>
                      Object.keys(profileIcons).includes(p.type),
                    )
                    .map((p: any) => (
                      <IconButton href={p.link}>
                        {profileIcons[p.type]}
                      </IconButton>
                    ))}
                </CardActions>
              </Card>
            </Box>
          );
        }}
      </List>
    </Box>
  );
}

export default FolderGrid;
