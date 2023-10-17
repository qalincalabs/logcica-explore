import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { CssBaseline, AppBar, Box, Stack } from "@mui/material";

export default function AppTopBar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flex: 1 }}>
          logCiCa discover
        </Typography>
        <Typography textAlign="center" sx={{ flex: 1 }}>
          <Stack direction="row" gap={2}>
            <strong>PRODUITS</strong>
            <strong>MARCHÉS</strong>
          </Stack>
        </Typography>
        <Typography
          sx={{ flex: 1, display: { xs: "none", sm: "block" } }}
        ></Typography>
      </Toolbar>
    </AppBar>
  );
}
