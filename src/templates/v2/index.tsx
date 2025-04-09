import {
  AccountCircle,
  MyLocation,
  Place,
  Settings,
  Star,
} from "@mui/icons-material";
import {
  AppBar,
  Button,
  GlobalStyles,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  ThemeProvider,
  Toolbar,
  createTheme,
} from "@mui/material";
import { PageProps, graphql } from "gatsby";

import * as React from "react";
import { useState } from "react";
import { Trans } from "react-i18next";
import ListGrid from "../../components/v2/list-grid";
import ListMap from "../../components/v2/list-map";
import MainBottomListDrawer from "../../components/v2/main-bottom-list-drawer";
import OpportunitiesListMenu from "../../components/v2/opportunities-list-menu";
import Search from "../../components/v2/search";

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

const Map = ({ data }: PageProps<any>) => {
  const [bottomDrawerOpen, setBottomDrawerOpen] = React.useState(false);

  const [visibleMarkers, setVisibleMarkers] = useState(data.activities.nodes);

  const area = data.area;

  const opportunitiesView = () => (
    <Stack
      alignItems="center"
      overflow="auto"
      sx={{
        height: { xs: "80vh", md: "88vh" },
      }}
    >
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
            <Button
              sx={{
                display: { xs: "none", md: "block" },
              }}
              color="secondary"
            >
              Explore
            </Button>
            <Search area={area} />
            <Button
              color="secondary"
              onClick={handleOpenNavMenu}
              startIcon={<Place />}
            >
              {area.name}
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
                <p>
                  <Trans>menu.favorites</Trans>
                </p>
              </MenuItem>
              <MenuItem>
                <IconButton>
                  <Settings></Settings>
                </IconButton>
                <p>
                  <Trans>menu.preferences</Trans>
                </p>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Grid sx={{ height: { xs: "80vh", md: "88vh" } }} container>
          <Grid
            item
            md={5}
            lg={4}
            sx={{
              display: { xs: "none", md: "block" },
            }}
          >
            {opportunitiesView()}
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
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
              data={visibleMarkers
                .filter((a: any) => a.place?.center?.coordinates?.length == 2)
                .map((a: any) => {
                  return {
                    type: "Feature",
                    geometry: a.place.center,
                    properties: {
                      _id: a._id,
                      name: a.name,
                      categories: a.categories,
                    },
                  };
                })}
              area={area}
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

// filter: { place: { within: { elemMatch: { _id: { eq: $areaId } } } } }

export const query = graphql`
  query (
    $filter: mongodbActivitiesFilterInput!
    $areaId: String!
    $language: String!
  ) {
    activities: allMongodbActivities(filter: $filter, sort: [{ name: ASC }]) {
      nodes {
        _id
        name
        description {
          short {
            markdown
          }
        }
        place {
          address {
            locality
          }
          center {
            type
            coordinates
          }
        }
        profiles {
          type
          link
        }
        categories {
          key
        }
        productionCategories {
          key
        }
      }
    }
    area: mongodbPlaces(_id: { eq: $areaId }) {
      _id
      name
      geoShape {
        type
        coordinates
      }
    }
    locales: allLocale(
      filter: { ns: { in: ["common"] }, language: { eq: $language } }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
