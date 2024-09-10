import { Box } from "@mui/material";
import React from "react";

export function ImageCard({ media }: any) {
  return (
    <Box
      component="img"
      src={"https://cms.logcica.org/media/" + media?.filename}
      alt="image"
      loading="lazy"
      sx={{
        height: "10rem",
      }}
    />
  );
}

export default ImageCard;
