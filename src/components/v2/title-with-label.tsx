import { Stack, Typography } from "@mui/material";
import React from "react";

export function TitleWithLabel({ data }: any) {
  return (
    <Stack alignItems="center" direction="row" gap={1}>
      <Typography component="span">{data.name}</Typography>
      {data.categories?.some(
        (c: any) => c.key == "logcica.labels.eu.organic",
      ) && (
        <img
          width="25px"
          src="https://upload.wikimedia.org/wikipedia/commons/2/25/Organic-Logo.svg"
        ></img>
      )}
    </Stack>
  );
}

export default TitleWithLabel;
