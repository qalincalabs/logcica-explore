import * as React from "react";
import { HeadFC, PageProps, graphql } from "gatsby";
import { AppBar, Box, Button, Divider, Drawer, DrawerProps, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { Inbox, Mail, Storefront, Event, VolunteerActivism } from "@mui/icons-material";
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
        <Button sx={{color: 'black'}} onClick={() => props.onChange(true)}>Open</Button>
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
          <Button size="small" onClick={() => props.onChange(false)}>Fermer</Button>
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

          <Divider flexItem sx={{margin: 2}} />

          <FolderList/>
        </Stack>
      </Drawer>
    </div>
  );
}

function TemporaryDrawer(props: DrawerProps) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={open} anchor={props.anchor} onClose={toggleDrawer(false)}>
        {DrawerList}
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
