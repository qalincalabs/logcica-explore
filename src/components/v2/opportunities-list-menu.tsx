import { Chip, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { opportunitiesFirstMenu } from "./menu";

function OpportunitiesListMenu() {
  const opportunitiesSecondMenu = [
    {
      title: "Stores", // "Magasins",
      checked: true,
    },
    {
      title: "Markets", // "Marchés",
      checked: true,
    },
    {
      title: "Hubs", // "Groupements",
      checked: true,
    },
    {
      title: "Online", // "En ligne",
    },
  ];

  const opportunitiesThirdMenu = [
    {
      title: "organic",
      checked: false,
    },
  ];

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1} useFlexGap>
        {opportunitiesFirstMenu.map((m) => (
          <IconButton
            key={"opportunities-list-menu-1" + m.title}
            size="large"
            color="primary"
            sx={{
              flexDirection: "column",
              width: "3.5em",
              border: m.checked ? 3 : 0,
            }}
          >
            {m.icon}
            <Typography variant="overline">{m.title}</Typography>
          </IconButton>
        ))}
      </Stack>

      <Stack direction="column" m={2}>
        <Stack direction="row" spacing={1} useFlexGap m={0.5}>
          {opportunitiesSecondMenu.map((m) => (
            <Chip
              key={"opportunities-list-menu-2" + m.title}
              label={m.title}
              variant={m.checked ? "filled" : "outlined"}
              clickable
            />
          ))}
        </Stack>

        <Stack direction="row" spacing={1} useFlexGap m={0.5}>
          {opportunitiesThirdMenu.map((m) => (
            <Chip
              key={"opportunities-list-menu-3" + m.title}
              size="small"
              label={m.title}
              color="secondary"
              variant={m.checked ? "filled" : "outlined"}
              clickable
            />
          ))}
        </Stack>
      </Stack>
    </>
  );
}

export default OpportunitiesListMenu;
