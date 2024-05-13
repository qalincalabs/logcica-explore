import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AppBar, Stack } from "@mui/material";
import { navigate } from "gatsby";

export default function AppTopBar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flex: 1 }}>
          logCiCa explore
        </Typography>
        <Typography textAlign="center" sx={{ flex: 1 }}>
          <Stack direction="row" gap={2}>
            <Button
              sx={{ color: "black" }}
              onClick={() => navigate("/product")}
            >
              PRODUITS
            </Button>
            <Button
              sx={{ color: "black" }}
              onClick={() => navigate("/marketplace")}
            >
              MARCHÉS
            </Button>
            <Button
              sx={{ color: "black" }}
              onClick={() => navigate("/partnership")}
            >
              GROUPEMENTS
            </Button>
            <Button
              sx={{ color: "black" }}
              onClick={() => navigate("/activity")}
            >
              PRODUCTEURS
            </Button>
            {/*
            <Button
              sx={{ color: "black" }}
              onClick={() => navigate("/counter")}
            >
              COMPTOIRS
            </Button>
            */}
          </Stack>
        </Typography>
        <Typography
          sx={{ flex: 1, display: { xs: "none", sm: "block" } }}
        ></Typography>
      </Toolbar>
    </AppBar>
  );
}
