import { FilterAlt } from "@mui/icons-material";
import { IconButton, InputBase } from "@mui/material";
import React from "react";
import { useSearchBox } from "react-instantsearch";

const SearchBox = ({ className, onFocus, onChange }: any) => {
  const { query, refine } = useSearchBox();

  return (
    <>
      <InputBase
        sx={{ flexGrow: 1, paddingLeft: "10px" }}
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => {
          refine(e.target.value);
          onChange(e.target.value);
        }}
        value={query}
        onFocus={onFocus}
      />

      <IconButton color="secondary">
        <FilterAlt />
      </IconButton>
    </>
  );
};

export default SearchBox;
