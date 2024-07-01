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
  ListItemIcon,
  Badge,
} from "@mui/material";
import { navigate } from "gatsby";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "../components/search";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const searchIndices = [{ name: `Activities`, title: `Activité` }];

const backgroundColor = '#FFD700';
const textColor = '#000000';

type favoriteItem = {
  targetId: string;
};

export default function AppTopBar() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [menuDrawerOpen, setMenuDrawerOpen] = React.useState(false);
  const [favorites, setFavorites] = React.useState<favoriteItem[]>([]);
  const [activityFavorites, setActivityFavorites] = React.useState<string[]>([]);
  const [productFavorites, setProductFavorites] = React.useState<string[]>([]);
  const [partnershipFavorites, setPartnershipFavorites] = React.useState<string[]>([]);

  React.useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const storedActivityFavorites = JSON.parse(localStorage.getItem('activityFavorites') || '[]');
    const storedProductFavorites = JSON.parse(localStorage.getItem('productFavorites') || '[]');
    const storedPartnershipFavorites = JSON.parse(localStorage.getItem('partnershipFavorites') || '[]');
    setFavorites(storedFavorites);
    setActivityFavorites(storedActivityFavorites);
    setProductFavorites(storedProductFavorites);
    setPartnershipFavorites(storedPartnershipFavorites);
  }, []);

  const addFavorite = (id: string) => {
    const updatedFavorites = [...favorites, { targetId: id }];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const removeFavorite = (id: string) => {
    const updatedFavorites = favorites.filter(fav => fav.targetId !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const addActivityFavorite = (name: string) => {
    const updatedActivityFavorites = [...activityFavorites, name];
    setActivityFavorites(updatedActivityFavorites);
    localStorage.setItem('activityFavorites', JSON.stringify(updatedActivityFavorites));
  };

  const removeActivityFavorite = (name: string) => {
    const updatedActivityFavorites = activityFavorites.filter(fav => fav !== name);
    setActivityFavorites(updatedActivityFavorites);
    localStorage.setItem('activityFavorites', JSON.stringify(updatedActivityFavorites));
  };

  const addProductFavorite = (id: string) => {
    const updatedProductFavorites = [...productFavorites, id];
    setProductFavorites(updatedProductFavorites);
    localStorage.setItem('productFavorites', JSON.stringify(updatedProductFavorites));
  };

  const removeProductFavorite = (id: string) => {
    const updatedProductFavorites = productFavorites.filter(fav => fav !== id);
    setProductFavorites(updatedProductFavorites);
    localStorage.setItem('productFavorites', JSON.stringify(updatedProductFavorites));
  };

  const addPartnershipFavorite = (id: string) => {
    const updatedPartnershipFavorites = [...partnershipFavorites, id];
    setPartnershipFavorites(updatedPartnershipFavorites);
    localStorage.setItem('partnershipFavorites', JSON.stringify(updatedPartnershipFavorites));
  };

  const removePartnershipFavorite = (id: string) => {
    const updatedPartnershipFavorites = partnershipFavorites.filter(fav => fav !== id);
    setPartnershipFavorites(updatedPartnershipFavorites);
    localStorage.setItem('partnershipFavorites', JSON.stringify(updatedPartnershipFavorites));
  };

  const handleMenuDrawerOpen = () => {
    setMenuDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setMenuDrawerOpen(false);
  };

  const menuItems = [
    { label: "PRODUCTEURS", path: "/" },
    { label: "GROUPEMENTS", path: "/partnership" },
    { label: "MARCHÉS", path: "/marketplace" },
    { label: "PRODUITS", path: "/product" },
    { label: "FAVORIS", path: "/favorites" }, // Ajout du bouton Favoris
  ];

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
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuDrawerOpen}
              sx={{
                mr: 1
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flexGrow: { xs: 1, sm: 1, md: 0 },
              p: 3,
              pl: 0
            }}
          >
            <Badge badgeContent="beta" color="primary">
              logCiCa explore
            </Badge>
          </Typography>
          <Box
            sx={{
              display: { xs: "none", sm: "none", md: "flex" },
              flexGrow: 1,
            }}
          >
            <Stack direction="row" gap={1} sx={{ marginLeft: 2 }}>
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
          <Box>
            <Search indices={searchIndices} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
