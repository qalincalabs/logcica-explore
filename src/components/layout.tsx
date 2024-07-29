import { Box, ThemeProvider, Toolbar, createTheme } from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";
import AppTopBar from "../components/app-top-bar";

const pageStyles = {
  color: "#ffcb01",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffcb01",
    },
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

const Layout = ({ pageTitle, children }: any) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <main style={pageStyles}>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppTopBar />
          <Toolbar />
          {children}
        </Box>
      </ThemeProvider>
    </main>
  );
};

export default Layout;
