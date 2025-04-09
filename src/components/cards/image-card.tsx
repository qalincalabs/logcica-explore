import { Box } from "@mui/material";
import React from "react";

export function ImageCard({ media }: any) {
  return (
    <Box
      component="img"
      src={media?.url}
      alt="image"
      loading="lazy"
      sx={{
        height: "10rem",
      }}
    />
  );
}

export default ImageCard;
