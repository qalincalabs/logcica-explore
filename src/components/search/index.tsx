import algoliasearch from "algoliasearch/lite";
import React, { createRef, useMemo, useState } from "react";
import { InstantSearch } from "react-instantsearch";
import { ThemeProvider } from "styled-components";
import StyledSearchBox from "./styled-search-box";
import StyledSearchResult from "./styled-search-result";
import StyledSearchRoot from "./styled-search-root";
import useClickOutside from "./use-click-outside";

const theme = {
  foreground: "#050505",
  background: "white",
  faded: "#888",
};

export default function Search() {
  const indices = [
    { name: "activity" },
    { name: "partnership" },
    { name: "marketplace" },
    { name: "product" },
    { name: "recipe" },
    { name: "event" },
  ];

  const rootRef = createRef<HTMLDivElement>();
  const [query, setQuery] = useState<any>();
  const [hasFocus, setFocus] = useState(false);
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID as string,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY as string,
      ),
    [],
  );

  useClickOutside(rootRef, () => setFocus(false));

  return (
    <ThemeProvider theme={theme}>
      <StyledSearchRoot ref={rootRef}>
        <InstantSearch
          searchClient={searchClient}
          indexName={indices[0].name}
          future={{
            preserveSharedStateOnUnmount: true,
          }}
        >
          <StyledSearchBox
            onChange={(query: any) => setQuery(query)}
            onFocus={() => setFocus(true)}
            hasFocus={hasFocus}
          />
          <StyledSearchResult
            show={query && query.length > 0 && hasFocus}
            indices={indices}
          />
        </InstantSearch>
      </StyledSearchRoot>
    </ThemeProvider>
  );
}
