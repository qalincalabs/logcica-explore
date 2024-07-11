import * as React from "react";
import { HeadFC, PageProps, graphql } from "gatsby";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Chip,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
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
} from "@mui/icons-material";
import PrimarySearchAppBar from "../components/PrimaryAppSearchBar";

const Map: React.FC<PageProps> = () => {
  const [bottomDrawerOpen, setBottomDrawerOpen] = React.useState(false);

  return (
    <div>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <p>New design</p>
      <MainBottomListDrawer
        open={bottomDrawerOpen}
        onChange={(open) => {
          setBottomDrawerOpen(open);
        }}
      />
    </div>
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

interface MainBottomListDrawerProps {
  open: boolean;
  onChange: (open: boolean) => void;
}

function MainBottomListDrawer(props: MainBottomListDrawerProps) {
  return (
    <div>
      <AppBar position="fixed" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => props.onChange(true)}>
            <ArrowDropUp fontSize="large" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <OpportunitiesBottomBarMenu />
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
      <Drawer
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
        <Stack alignItems="center" overflow="auto">
          <OpportunitiesListMenu />
          <Box sx={{ width: "100%" }}>
            <ListSortMenu />
            <Divider sx={{ marginTop: 1 }} />
            <FolderList />
          </Box>
        </Stack>
      </Drawer>
    </div>
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
          <Button
            size="large"
            variant={m.checked ? "contained" : "outlined"}
            sx={{ borderRadius: 10 }}
          >
            <Stack direction="column" alignItems="center">
              {m.icon}
              <Typography variant="caption">{m.title}</Typography>
            </Stack>
          </Button>
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

function ListSortMenu() {
  return (
    <Box display="flex" justifyContent="space-between" m={1}>
      <ButtonGroup size="small">
        <Button variant="text">
          <Sort fontSize="small" />
        </Button>
      </ButtonGroup>
      <ListSortMenuToggle />
    </Box>
  );
}

export function ListSortMenuToggle() {
  const [alignment, setAlignment] = React.useState<string | null>("list");

  return (
    <ToggleButtonGroup
      value={alignment}
      color="primary"
      size="small"
      exclusive
      onChange={(_, newAlignment) => setAlignment(newAlignment)}
    >
      <ToggleButton value="list">
        <ViewList fontSize="small" />
      </ToggleButton>
      <ToggleButton value="grid">
        <ViewModule fontSize="small" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

const list = [
  {
    avatar: <Image />,
    title: "Les dingues du Marais",
    subtitle: "Paliseul",
  },
];

export function FolderList() {
  // add dummy data
  list.push(
    ...[...Array(10)].map((_, i) => {
      return {
        avatar: <BeachAccess />,
        title: "Test " + i,
        subtitle: "Paliseul",
      };
    })
  );

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {list.map((e) => (
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
