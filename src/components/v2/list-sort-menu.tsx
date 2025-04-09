import { MoreVert, Sort, ViewList, ViewModule } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React from "react";

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

export default ListSortMenu;
