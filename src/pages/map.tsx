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
  DrawerProps,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Inbox,
  Image,
  Mail,
  Storefront,
  Event,
  VolunteerActivism,
  More,
  ArrowDropUp,
  ArrowDropDown,
  Sort,
  ListRounded,
  GridView,
  ViewStream,
  ViewList,
  Add,
  BeachAccess,
  Star,
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

interface MainBottomListDrawerProps {
  open: boolean;
  onChange: (open: boolean) => void;
}

const opportunitiesFirstMenu = [
  {
    title: "Se nourrir",
    icon: <Storefront fontSize="large" />,
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
          <ListSortMenu />
          <Divider sx={{ width: "100%" }} />
          <FolderList />
        </Stack>
      </Drawer>
    </div>
  );
}

function OpportunitiesBottomBarMenu() {
  return (
    <>
      {opportunitiesFirstMenu.map((m) => (
        <IconButton color="inherit">{m.icon}</IconButton>
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
            sx={{ border: 2, paddingTop: 2, paddingBottom: 3 }}
            size="large"
          >
            <Stack direction="column" alignItems="center">
              {m.icon}
              <Typography variant="overline">{m.title}</Typography>
            </Stack>
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

function ListSortMenu() {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
    >
      <IconButton size="large">
        <Sort fontSize="small" />
      </IconButton>
      <Stack direction="row">
        <IconButton size="large">
          <ViewList fontSize="small" />
        </IconButton>
        <IconButton size="large">
          <GridView fontSize="small" />
        </IconButton>
      </Stack>
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
