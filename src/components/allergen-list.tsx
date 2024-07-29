import { CrisisAlert } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import React from "react";

export function AllergenList({ allergenList }: any) {
  return allergenList.map((productAllergen: any) => (
    <Stack
      direction="row"
      gap={1}
      flexGrow={1}
      key={productAllergen.allergen._id}
    >
      <CrisisAlert />
      <Typography>
        {productAllergen.containmentLevel.name +
          " " +
          productAllergen.allergen.name?.toLowerCase()}
      </Typography>
    </Stack>
  ));
}

export default AllergenList;
