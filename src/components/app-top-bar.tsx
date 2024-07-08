import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  AppBar,
  Stack,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Badge,
} from "@mui/material";
import { navigate } from "gatsby";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "../components/search";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const searchIndices = [{ name: `Activities`, title: `Activité` }];

export default function AppTopBar() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [menuDrawerOpen, setMenuDrawerOpen] = React.useState(false);

  const menuItems = [
    { label: "PRODUCTEURS", path: "/" },
    { label: "GROUPEMENTS", path: "/partnership" },
    { label: "MARCHÉS", path: "/marketplace" },
    { label: "PRODUITS", path: "/product" },
    { label: "FAVORIS", path: "/favorites" }, // Ajout du bouton Favoris
  ];

  const handleMenuDrawerOpen = () => {
    setMenuDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setMenuDrawerOpen(false);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={handleDrawerClose}
      onKeyDown={handleDrawerClose}
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ height: "64px" }}>
        <Toolbar>
          <Drawer anchor="left" open={menuDrawerOpen} onClose={handleDrawerClose}>
            {list()}
          </Drawer>
          {isSmallScreen && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuDrawerOpen}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: { xs: 'left', md: 'left' } }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '0.75rem', sm: '1rem', md: '1.5rem' }, // Adjust font size for different screen sizes
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: 'block',
                }}
              >
                logCiCa
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '0.75rem', sm: '1rem', md: '1.5rem' }, // Adjust font size for different screen sizes
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: 'block',
                }}
              >
                explore
                <Badge badgeContent="beta" color="primary" sx={{ ml: 1 }} />
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "flex", md: "flex" },
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
          >
            <Search indices={searchIndices} />
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 0,
              marginLeft: 2
            }}
          >
            <Stack direction="row" gap={1}>
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
