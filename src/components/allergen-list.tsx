import { CrisisAlert } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

export default function AllergenList({ allergenList }: any) {
  return (
    <Box>
      {allergenList.map((productAllergen: any) => (
        <Stack
          direction="row"
          gap={1}
          flexGrow={1}
          key={productAllergen.allergen._id} // TODO : don't know why I need this ...
        >
          <CrisisAlert />
          <Typography>
            {productAllergen.containmentLevel.name +
              " " +
              productAllergen.allergen.name?.toLowerCase()}
          </Typography>
        </Stack>
      ))}
    </Box>
  );
}
