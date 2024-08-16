import { Box, Typography } from "@mui/material";
import React from "react";
import FavoriteIcons from "./FavoriteIcons";
import ImageCard from "./cards/image-card";

export function HeaderWithImage({ data, type }: any) {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      gap={2}
      my={4}
      mx={2}
    >
      {data.mainImage?.filename && <ImageCard media={data.mainImage} />}
      <Box
        sx={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
          flex: "1 1 60%",
        }}
      >
        <Typography
          align="center"
          variant="h3"
          component="span"
          sx={{
            textAlign: "center",
          }}
        >
          {data.name}
          <FavoriteIcons type={type} targetId={data._id} />
        </Typography>
      </Box>
    </Box>
  );
}

export default HeaderWithImage;
