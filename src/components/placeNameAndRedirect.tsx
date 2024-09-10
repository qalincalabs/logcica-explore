import { OpenInNew } from "@mui/icons-material";
import { Link, Stack, Typography } from "@mui/material";
import React from "react";

export function PlaceNameAndRedirect({ place }: any) {
  return (
    <Stack direction="row">
      <Typography key={place._id}>{place.title}</Typography>

      {place.center?.coordinates && (
        <Link
          href={`https://www.google.com/maps/search/?api=1&query=${place.center.coordinates[1]}%2C${place.center.coordinates[0]}&query_place_id=${place.gmaps?.id}`}
          target="_blank"
          sx={{
            color: "primary.main",
            textDecoration: "underline",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          {place.localKey ?? place.key} <OpenInNew sx={{ ml: 0.5 }} />
        </Link>
      )}
    </Stack>
  );
}

export default PlaceNameAndRedirect;
