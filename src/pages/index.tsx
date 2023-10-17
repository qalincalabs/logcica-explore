import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { ProductCardList } from "../components/product-card-list";
import AppTopBar from "../components/app-top-bar";
import { Box, ThemeProvider, Toolbar, createTheme } from "@mui/material";
import { purple } from "@mui/material/colors";

const pageStyles = {
  color: "#ffcb01",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffcb01",
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440, // changed from 1536 to fit mac book pro
    },
  },
});

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main style={pageStyles}>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppTopBar />
          <Toolbar />
          <ProductCardList />
        </Box>
      </ThemeProvider>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
