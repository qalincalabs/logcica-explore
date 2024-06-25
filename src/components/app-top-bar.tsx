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
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const menuItems = [
    { label: "PRODUCTEURS", path: "/" },
    { label: "GROUPEMENTS", path: "/partnership" },
    { label: "MARCHÉS", path: "/marketplace" },
    { label: "PRODUITS", path: "/product" },
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
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="fixed" sx={{ height: "64px" }}>
      <Toolbar>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
        {isSmallScreen && (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
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
          <Stack direction="row" gap={1} sx={{ 
            marginLeft: 2 
            }}>
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
