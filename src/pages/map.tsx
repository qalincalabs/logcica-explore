import * as React from "react";
import { HeadFC, PageProps, graphql } from "gatsby";
import { AppBar, Box, Button, Chip, Divider, Drawer, DrawerProps, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from "@mui/material";
import { Inbox, Mail, Storefront, Event, VolunteerActivism, More, ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import PrimarySearchAppBar from "../components/PrimaryAppSearchBar";
import { FolderList } from "../components/FolderList";

const Map: React.FC<PageProps> = () => {

  const [bottomDrawerOpen, setBottomDrawerOpen] = React.useState(false);


  return (
    <div>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <p>New design</p>
      <MainBottomListDrawer open={bottomDrawerOpen} onChange={(open) => {setBottomDrawerOpen(open)}} />
    </div>
  );
};

function ButtonGroupIconButton(props) {
  // intercept props only implemented by `Button`
  const { disableElevation, fullWidth, variant, ...iconButtonProps } = props;
  return <IconButton {...iconButtonProps} />;
}

interface MainBottomListDrawerProps {
  open: boolean
  onChange: (open: boolean) => void
}

function MainBottomListDrawer(props: MainBottomListDrawerProps){
  return (
    <div>
      <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => props.onChange(true)}>
            <ArrowDropUp fontSize="large" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <Storefront fontSize="large"  />
          </IconButton>
          <IconButton color="inherit">
            <Event fontSize="large" />
          </IconButton>
          <IconButton color="inherit">
            <VolunteerActivism fontSize="large"  />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
      <Drawer open={props.open} anchor="bottom" onClose={() => props.onChange(false)}
              PaperProps={{
                sx: {
                  overflow: 'hidden',
                  height: 'calc(100% - 100px)',
                  top: 100,
                },
              }} >
        <Stack alignItems="center">
          <IconButton color="inherit" onClick={() => props.onChange(false)}>
            <ArrowDropDown fontSize="large" />
          </IconButton>
        </Stack>
        <Stack alignItems="center" overflow="auto">

          <Stack direction="row" alignItems="center" spacing={1} useFlexGap>
            <IconButton sx={{ border: 2, paddingTop: 2, paddingBottom:3 }} size="large">
              <Stack direction="column" alignItems="center">
                <Storefront fontSize="large" />
                <Typography variant="overline">
                Se nourrir
                </Typography>
              </Stack>
            </IconButton>
            <IconButton size="large">
              <Stack direction="column" alignItems="center">
                <Event fontSize="large" />
                <Typography variant="overline">
                Rencontrer
                </Typography>
              </Stack>
            </IconButton>
            <IconButton size="large">
              <Stack direction="column" alignItems="center">
                <VolunteerActivism fontSize="large" />
                <Typography variant="overline">
                Participer
                </Typography>
              </Stack>
            </IconButton>
          </Stack>

          <Stack direction="row" spacing={1} useFlexGap m={2} >
            <Chip label="Magasins" />
            <Chip label="Marchés" />
            <Chip label="Groupements" />
            <Chip label="En ligne" variant="outlined" />
          </Stack>

          <FolderList/>
        </Stack>
      </Drawer>
    </div>
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
