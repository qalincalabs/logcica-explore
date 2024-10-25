import {
  AccountCircle,
  Add,
  ArrowDropDown,
  ArrowDropUp,
  Event,
  Facebook,
  FilterAlt,
  Hexagon,
  Image,
  MoreVert,
  MyLocation,
  Place,
  Settings,
  Sort,
  Star,
  Storefront,
  ViewList,
  ViewModule,
  VolunteerActivism,
  Web,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Drawer,
  GlobalStyles,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Stack,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import { HeadFC, PageProps, graphql } from "gatsby";
import L, { divIcon } from "leaflet";

import "leaflet/dist/leaflet.css";
import * as React from "react";
import { useState } from "react";
import ReactDOMServer from "react-dom/server";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import { activityIconsWithLinks } from "../../assets/activity-icons";
import AddLocate from "../../components/AddLocate";
import MarkerClusterGroup from "../../components/MarkerClusterGroup";
import places from "../../data/map_counters.json";

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
            <ListMap data={visibleMarkers} />
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

const opportunitiesFirstMenu = [
  {
    title: "Shop", // "Se nourrir",
    icon: <Storefront fontSize="large" />,
    checked: true,
  },
  {
    title: "Meet", // "Rencontrer"
    icon: <Event fontSize="large" />,
  },
  {
    title: "Volunteer", // "Participer"
    icon: <VolunteerActivism fontSize="large" />,
  },
];

type MainBottomListDrawerProps = {
  open: boolean;
  onChange: (open: boolean) => void;
};

function MainBottomListDrawer(
  props: BoxProps<"div", MainBottomListDrawerProps>,
) {
  return (
    <Box sx={props.sx}>
      <AppBar position="fixed" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => props.onChange(true)}>
            <ArrowDropUp fontSize="large" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <OpportunitiesBottomBarMenu />
          <Box sx={{ flexGrow: 1 }} />
          <MoreVert />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={props.sx}
        open={props.open}
        anchor="bottom"
        onClose={() => props.onChange(false)}
        PaperProps={{
          sx: {
            overflow: "hidden",
            height: "calc(100% - 100px)",
            top: 100,
          },
        }}
      >
        <Stack alignItems="center">
          <Button color="inherit" onClick={() => props.onChange(false)}>
            <ArrowDropDown fontSize="large" />
          </Button>
        </Stack>
        {props.children}
      </Drawer>
    </Box>
  );
}

function ListMap({ data }: any) {
  const customMarkerIcon = (name: string) =>
    divIcon({
      html: ReactDOMServer.renderToString(activityIconsWithLinks[name]?.[0]),
      className: "icon",
    });

  const setIcon = ({ properties }: any, latlng: any) => {
    return L.marker(latlng, { icon: customMarkerIcon(properties.icon) });
  };

  return (
    <MapContainer style={{ height: "100%" }} center={[53.2, -8.2]} zoom={7}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        <GeoJSON
          data={data}
          pointToLayer={setIcon}
          onEachFeature={(feature, leafletLayer) => {
            const popupOptions = {
              minWidth: 100,
              maxWidth: 250,
              className: "popup-classname",
            };

            leafletLayer.bindPopup(
              ReactDOMServer.renderToString(
                <TitleWithLabel data={feature.properties} />,
              ),
              popupOptions,
            );
          }}
          style={(reference) => {
            return {
              color: "blue",
            };
          }}
        ></GeoJSON>
      </MarkerClusterGroup>
      <AddLocate />
    </MapContainer>
  );
}

function ListGrid({ data }: any) {
  const [alignement, setAlignment] = React.useState("list");

  return (
    <Box sx={{ width: "100%" }}>
      <ListSortMenu alignement={alignement} onAlignementChange={setAlignment} />
      {alignement == "list" ? (
        <FolderList data={data} />
      ) : (
        <FolderGrid data={data} />
      )}
    </Box>
  );
}

function OpportunitiesBottomBarMenu() {
  return (
    <>
      {opportunitiesFirstMenu.map((m) => (
        <Button color="inherit" variant={m.checked ? "outlined" : "text"}>
          {m.icon}
        </Button>
      ))}
    </>
  );
}

function OpportunitiesListMenu() {
  const opportunitiesSecondMenu = [
    {
      title: "Stores", // "Magasins",
      checked: true,
    },
    {
      title: "Markets", // "Marchés",
      checked: true,
    },
    {
      title: "Hubs", // "Groupements",
      checked: true,
    },
    {
      title: "Online", // "En ligne",
    },
  ];

  const opportunitiesThirdMenu = [
    {
      title: "organic",
      checked: false,
    },
  ];

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1} useFlexGap>
        {opportunitiesFirstMenu.map((m) => (
          <IconButton
            size="large"
            color="primary"
            sx={{
              flexDirection: "column",
              width: "3.5em",
              border: m.checked ? 3 : 0,
            }}
          >
            {m.icon}
            <Typography variant="overline">{m.title}</Typography>
          </IconButton>
        ))}
      </Stack>

      <Stack direction="column" m={2}>
        <Stack direction="row" spacing={1} useFlexGap m={0.5}>
          {opportunitiesSecondMenu.map((m) => (
            <Chip
              label={m.title}
              variant={m.checked ? "filled" : "outlined"}
              clickable
            />
          ))}
        </Stack>

        <Stack direction="row" spacing={1} useFlexGap m={0.5}>
          {opportunitiesThirdMenu.map((m) => (
            <Chip
              size="small"
              label={m.title}
              color="secondary"
              variant={m.checked ? "filled" : "outlined"}
              clickable
            />
          ))}
        </Stack>
      </Stack>
    </>
  );
}

interface ListSortMenuProps {
  alignement?: string;
  onAlignementChange?: (alignement: string) => void;
}

function ListSortMenu(props: ListSortMenuProps) {
  return (
    <Box display="flex" justifyContent="space-between" m={1}>
      <ButtonGroup size="small">
        <Button variant="text">
          <Sort fontSize="small" />
        </Button>
      </ButtonGroup>
      <Box flexGrow={1}></Box>
      <ToggleButtonGroup
        value={props.alignement}
        color="primary"
        size="small"
        exclusive
        onChange={(_, newAlignment) => {
          if (props.onAlignementChange) props.onAlignementChange(newAlignment);
        }}
      >
        <ToggleButton value="list">
          <ViewList fontSize="small" />
        </ToggleButton>
        <ToggleButton value="grid">
          <ViewModule fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>
      <ButtonGroup size="small">
        <Button variant="text">
          <MoreVert fontSize="small" />
        </Button>
      </ButtonGroup>
    </Box>
  );
}

export function FolderGrid({ data }: any) {
  // add dummy data
  /*
  list.push(
    ...[...Array(10)].map((_, i) => {
      return {
        avatar: <BeachAccess />,
        title: "Test " + i,
        subtitle: "Trim",
      };
    }),
  );
  */

  const profileIcons = {
    website: <Web />,
    facebook: <Facebook />,
  };

  return (
    <Box display="flex" flex={1} gap={2} flexWrap="wrap">
      {data.map((e) => (
        <Box flex={1}>
          <Card sx={{ minWidth: "300px" }}>
            <CardHeader
              avatar={<Avatar aria-label="recipe">{e.avatar}</Avatar>}
              action={
                <>
                  <IconButton aria-label="settings">
                    <Add />
                  </IconButton>
                  <IconButton aria-label="settings">
                    <Star />
                  </IconButton>
                </>
              }
              title={<TitleWithLabel data={e.properties} />}
              subheader={e.properties.place?.address?.locality}
            />
            <CardContent>
              {e.properties.description?.short?.markdown}
            </CardContent>
            <CardActions>
              {e.properties.profiles
                ?.filter((p: any) => Object.keys(profileIcons).includes(p.type))
                .map((p: any) => (
                  <IconButton href={p.link}>{profileIcons[p.type]}</IconButton>
                ))}
            </CardActions>
          </Card>
        </Box>
      ))}
    </Box>
  );
}

export function TitleWithLabel({ data }: any) {
  return (
    <Stack alignItems="center" direction="row" gap={1}>
      <Typography component="span">{data.name}</Typography>
      {data.categories?.some(
        (c: any) => c.key == "logcica.labels.eu.organic",
      ) && (
        <img
          width="25px"
          src="https://upload.wikimedia.org/wikipedia/commons/2/25/Organic-Logo.svg"
        ></img>
      )}
    </Stack>
  );
}

export function FolderList({ data }: any) {
  // add dummy data
  /*
  list.push(
    ...[...Array(10)].map((_, i) => {
      return {
        avatar: <BeachAccess />,
        title: "Test " + i,
        subtitle: "Trim",
      };
    }),
  );
  */

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {data.map((e, i) => (
        <>
          <ListSubheader
            sx={{ width: "100%", display: i == 0 || i == 1 ? "block" : "none" }}
          >
            Less than {i * 10 + 5}km
          </ListSubheader>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Image />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<TitleWithLabel data={e.properties} />}
              secondary={e.properties.place?.address?.locality}
            />
            <ListItemIcon>
              <IconButton>
                <Add />
              </IconButton>
              <IconButton>
                <Star />
              </IconButton>
            </ListItemIcon>
          </ListItem>
        </>
      ))}
    </List>
  );
}

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
