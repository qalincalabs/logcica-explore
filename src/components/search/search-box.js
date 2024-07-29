import React from "react";
import { useSearchBox } from "react-instantsearch";
import { Search as SearchIcon } from "@styled-icons/fa-solid";
import "./search-box.css"; // Import the CSS file

const SearchBox = ({ className, onFocus, onChange }) => {
  const { query, refine } = useSearchBox();

  return (
    <div className="container">
      <form className={`search-form ${className}`}>
        <div className="search-input-container">
          <SearchIcon className="search-icon" />
          <input
            className="search-input"
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
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
