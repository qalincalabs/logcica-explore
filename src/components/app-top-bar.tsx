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

const searchIndices = [{ name: 'Activities', title: 'Activité' }];

export default function AppTopBar() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [menuDrawerOpen, setMenuDrawerOpen] = React.useState(false);

  const menuItems = [
    { label: "PRODUCTEURS", path: "/" },
    { label: "GROUPEMENTS", path: "/partnership" },
    { label: "MARCHÉS", path: "/marketplace" },
    { label: "PRODUITS", path: "/product" },
    { label: "RECETTES", path: "/recipe" },
    { label: "FAVORIS", path: "/favorites" } // Ajout du bouton Favoris
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
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              flexDirection: { xs: 'column', md: 'row' },
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
              <Typography
                variant="h6"
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontSize: { xs: '1rem', md: '1.5rem' },
                }}
              >
                logCiCa explore
              </Typography>
              <Badge
                badgeContent="beta"
                color="primary"
                sx={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '-1rem',
                  transform: 'translate(0%, -50%)',
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'none', md: 'flex' },
              flexGrow: 1,
            }}
          >
            <Stack direction="row" gap={1} sx={{ marginLeft: 2 }}>
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  sx={{
                    color: 'black',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                    },
                  }}
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          </Box>
          <Box>
            <Search indices={searchIndices} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
