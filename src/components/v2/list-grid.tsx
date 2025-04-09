import { Box } from "@mui/material";
import React from "react";
import { FolderGrid } from "./folder-grid";
import { FolderList } from "./folder-list";
import ListSortMenu from "./list-sort-menu";

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

export default ListGrid;
