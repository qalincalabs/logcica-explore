import {
  AccountCircle,
  FilterAlt,
  Hexagon,
  MyLocation,
  Place,
  Settings,
  Star,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  GlobalStyles,
  Grid,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  ThemeProvider,
  Toolbar,
  createTheme,
} from "@mui/material";
import { HeadFC, PageProps, graphql } from "gatsby";

import * as React from "react";
import { useState } from "react";
import places from "../../data/map_counters.json";
import ListGrid from "./list-grid";
import ListMap from "./list-map";
import MainBottomListDrawer from "./main-bottom-list-drawer";
import OpportunitiesListMenu from "./opportunities-list-menu";

const pageStyles = {
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  height: "100vh",
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFC300", //#ffcb01
    },
    secondary: {
      main: "#000000", //#ffcb01
    },
  },
  components: {
    // Name of the component
    MuiChip: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "outlined" && {
            color: "black",
            borderWidth: 2,
          }),
        }),
      },
      defaultProps: {
        color: "primary",
      },
    },
  },
  typography: {
    overline: {
      color: "black",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440, // changed from 1536 to fit mac book pro
    },
  },
});

const Map: React.FC<PageProps> = () => {
  const [bottomDrawerOpen, setBottomDrawerOpen] = React.useState(false);

  const [visibleMarkers, setVisibleMarkers] = useState(places);

  const opportunitiesView = () => (
    <Stack alignItems="center" overflow="auto">
      <OpportunitiesListMenu />
      <ListGrid data={visibleMarkers} />
    </Stack>
  );

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <main style={pageStyles}>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar color="secondary">
            <Button color="secondary" startIcon={<Hexagon></Hexagon>}>
              Explore
            </Button>
            <Box
              display="flex"
              sx={{
                flexGrow: 1,
                m: 1,
                backgroundColor: "white",
                borderRadius: 2,
              }}
            >
              <InputBase sx={{ flexGrow: 1 }}></InputBase>
              <IconButton color="secondary">
                <FilterAlt />
              </IconButton>
            </Box>
            <Button
              color="secondary"
              onClick={handleOpenNavMenu}
              startIcon={<Place />}
            >
              Kilmessan
            </Button>
            <Menu
              id="menu-geo"
              anchorEl={anchorElNav}
              keepMounted
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              <MenuItem>
                <IconButton>
                  <MyLocation></MyLocation>
                </IconButton>
                <p>Me géolocaliser</p>
              </MenuItem>
            </Menu>

            <IconButton color="secondary" onClick={handleOpenUserMenu}>
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-user"
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <IconButton>
                  <Star></Star>
                </IconButton>
                <p>Favorites</p>
              </MenuItem>
              <MenuItem>
                <IconButton>
                  <Settings></Settings>
                </IconButton>
                <p>Preferences</p>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Grid sx={{ height: { xs: "80vh", md: "88vh" } }} container>
          <Grid md={5} lg={4} sx={{ display: { xs: "none", md: "block" } }}>
            {opportunitiesView()}
          </Grid>
          <Grid xs={12} md={7} lg={8}>
            <GlobalStyles
              styles={() => ({
                ".logcicaSvgIcon": {
                  color: "white",
                  width: "1.8rem",
                  height: "1.8rem",
                  background: "white",
                  padding: "3px",
                  borderRadius: "10px",
                },
              })}
            />
            <ListMap
              data={visibleMarkers}
              options={{ center: [50.5, 4.1], zoom: 8 }}
              // options={{ center: [53.2, -8.2], zoom: 7 }}
            />
          </Grid>
        </Grid>

        <MainBottomListDrawer
          sx={{ display: { sm: "block", md: "none" } }}
          open={bottomDrawerOpen}
          onChange={(open) => {
            setBottomDrawerOpen(open);
          }}
        >
          {opportunitiesView()}
        </MainBottomListDrawer>
      </ThemeProvider>
    </main>
  );
};

export default Map;

export const Head: HeadFC = () => <title>Map</title>;

export const query = graphql`
  query {
    activities: allMongodbActivities(sort: [{ name: ASC }]) {
      nodes {
        _id
        name
        place {
          center {
            coordinates
          }
        }
        profiles {
          type
          link
        }
      }
    }
  }
`;
