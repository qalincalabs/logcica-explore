import * as React from "react";
import { HeadFC, PageProps, graphql } from "gatsby";
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
import {
  Image,
  Storefront,
  Event,
  VolunteerActivism,
  ArrowDropUp,
  ArrowDropDown,
  Sort,
  ViewList,
  Add,
  BeachAccess,
  Star,
  ViewModule,
  Shop,
  Facebook,
  Web,
  Place,
  MyLocation,
  Hexagon,
  AccountCircle,
  FilterAlt,
  MoreVert,
  Settings,
} from "@mui/icons-material";

const pageStyles = {
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
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

  const opportunitiesView = () => (
    <Stack alignItems="center" overflow="auto">
      <OpportunitiesListMenu />
      <ListGrid />
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
        <AppBar>
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
              Paliseul
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
                <p>Favoris</p>
              </MenuItem>
              <MenuItem>
                <IconButton>
                  <Settings></Settings>
                </IconButton>
                <p>Préférences</p>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Grid container>
          <Grid md={5} lg={4} sx={{ display: { xs: "none", md: "block" } }}>
            {opportunitiesView()}
          </Grid>
          <Grid md={7} lg={8}>
            <p>New design</p>
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
    title: "Se nourrir",
    icon: <Storefront fontSize="large" />,
    checked: true,
  },
  {
    title: "Rencontrer",
    icon: <Event fontSize="large" />,
  },
  {
    title: "Participer",
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

function ListGrid() {
  const [alignement, setAlignment] = React.useState("list");

  return (
    <Box sx={{ width: "100%" }}>
      <ListSortMenu alignement={alignement} onAlignementChange={setAlignment} />
      {alignement == "list" ? <FolderList /> : <FolderGrid />}
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
      title: "Magasins",
      checked: true,
    },
    {
      title: "Marchés",
      checked: true,
    },
    {
      title: "Groupements",
      checked: true,
    },
    {
      title: "En ligne",
    },
  ];

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1} useFlexGap>
        {opportunitiesFirstMenu.map((m) => (
          <IconButton
            size="large"
            color="primary"
            sx={{ flexDirection: "column", border: m.checked ? 3 : 0 }}
          >
            {m.icon}
            <Typography variant="overline">{m.title}</Typography>
          </IconButton>
        ))}
      </Stack>

      <Stack direction="row" spacing={1} useFlexGap m={2}>
        {opportunitiesSecondMenu.map((m) => (
          <Chip
            label={m.title}
            variant={m.checked ? "filled" : "outlined"}
            clickable
          />
        ))}
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

const list = [
  {
    avatar: <Image />,
    title: "Les dingues du Marais",
    subtitle: "Paliseul",
  },
];

export function FolderGrid() {
  // add dummy data
  list.push(
    ...[...Array(10)].map((_, i) => {
      return {
        avatar: <BeachAccess />,
        title: "Test " + i,
        subtitle: "Paliseul",
      };
    }),
  );

  return (
    <Box display="flex" flex={1} gap={2} flexWrap="wrap">
      {list.map((e) => (
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
              title={e.title}
              subheader={e.subtitle}
            />
            <CardContent>
              Implanté à Froidlieu, petit village de la Calestienne situé à
              Wellin, entre l'Ardenne et la Famenne, le Pressoir d'Hortus est un
              lieu pour valoriser les fruits de vos vergers. Au-delà du
              pressage, nous proposons différents services autour de ce lieu si
              particulier qu'est le verger.
            </CardContent>
            <CardActions>
              <IconButton>
                <Web />
              </IconButton>
              <IconButton>
                <Facebook />
              </IconButton>
              <IconButton>
                <Shop />
              </IconButton>
            </CardActions>
          </Card>
        </Box>
      ))}
    </Box>
  );
}

export function FolderList() {
  // add dummy data
  list.push(
    ...[...Array(10)].map((_, i) => {
      return {
        avatar: <BeachAccess />,
        title: "Test " + i,
        subtitle: "Paliseul",
      };
    }),
  );

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {list.map((e, i) => (
        <>
          <ListSubheader
            sx={{ width: "100%", display: i == 0 || i == 5 ? "block" : "none" }}
          >
            Moins de {i * 2 + 5}km
          </ListSubheader>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Image />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={e.title} secondary={e.subtitle} />
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
