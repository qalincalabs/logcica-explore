import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AppBar, Stack, IconButton, Box, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { navigate } from "gatsby";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "../components/search";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const searchIndices = [{ name: `Activities`, title: `Activité` }];

export default function AppTopBar() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { label: "PRODUITS", path: "/product" },
    { label: "MARCHÉS", path: "/marketplace" },
    { label: "GROUPEMENTS", path: "/partnership" },
    { label: "PRODUCTEURS", path: "/activity" },
  ];

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index} onClick={() => navigate(item.path)}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flex: 1 }}>
          logCiCa explore
        </Typography>
        <Box sx={{ flex: 1, display: { xs: "none", sm: "flex" }, justifyContent: "center" }}>
        <Stack direction="row" gap={2} sx={{ marginLeft: 2 }}>
            <Button
              sx={{
                color: "black",
                fontWeight: "bold",
                padding: "8px 16px",
                textTransform: "uppercase",
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                }
              }}
              onClick={() => navigate("/product")}
            >
              PRODUITS
            </Button>
            <Button
              sx={{
                color: "black",
                fontWeight: "bold",
                padding: "8px 16px",
                textTransform: "uppercase",
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                }
              }}
              onClick={() => navigate("/marketplace")}
            >
              MARCHÉS
            </Button>
            <Button
              sx={{
                color: "black",
                fontWeight: "bold",
                padding: "8px 16px",
                textTransform: "uppercase",
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                }
              }}
              onClick={() => navigate("/partnership")}
            >
              GROUPEMENTS
            </Button>
            <Button
              sx={{
                color: "black",
                fontWeight: "bold",
                padding: "8px 16px",
                textTransform: "uppercase",
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                }
              }}
              onClick={() => navigate("/activity")}
            >
              PRODUCTEURS
            </Button>
          </Stack>
        </Box>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          
            <Search indices={searchIndices} />
          
          {isSmallScreen && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
