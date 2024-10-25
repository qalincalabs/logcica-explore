import { Button } from "@mui/material";
import React from "react";
import { opportunitiesFirstMenu } from "./menu";

function OpportunitiesBottomBarMenu() {
  return (
    <>
      {opportunitiesFirstMenu.map((m) => (
        <Button
          key={"opportunities-bottom-bar-menu-" + m.title}
          color="inherit"
          variant={m.checked ? "outlined" : "text"}
        >
          {m.icon}
        </Button>
      ))}
    </>
  );
}

export default OpportunitiesBottomBarMenu;
