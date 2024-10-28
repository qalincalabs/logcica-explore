import { ArrowDropDown, ArrowDropUp, MoreVert } from "@mui/icons-material";
import {
  AppBar,
  Box,
  BoxProps,
  Button,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
} from "@mui/material";
import React from "react";
import OpportunitiesBottomBarMenu from "./opportunities-bottom-bar-menu";

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

export default MainBottomListDrawer;
