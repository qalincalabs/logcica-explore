import React from "react";
import { graphql } from "gatsby";
import AppTopBar from "../components/app-top-bar";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";

const pageStyles = {
  // color: "black",
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

export default function MarketplaceTemplate({ data }: any) {
  const marketplace = data.marketplace;
  const stalls = data.stalls.nodes.sort((a:any,b:any)=>a.name.localeCompare(b.name));
  return (
    <main style={pageStyles}>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppTopBar />
          <Toolbar />
          <Box>
            <Typography align="center" variant="h2" component="h2">
              {marketplace.name}
            </Typography>
            <Paper variant="outlined" sx={{ p: 1, m: 1 }}>
              <Typography>
                Adresse: {marketplace.place.address.street} à{" "}
                {marketplace.place.address.locality}
              </Typography>
            </Paper>
            <Typography variant="h3" component="h3">
              Producteurs
            </Typography>
            <Grid container spacing={2}>
              {stalls.map((stall: any) => (
                <Grid item xs={12} sm={6} md={4} xl={3}>
                <Paper sx={{ p: 1}}>
                  <Typography variant="h6">
                    {stall.owner.activity.name}
                  </Typography>
                  <Typography variant="subtitle1">
                    {stall.owner.activity.place.name}
                  </Typography>
                  <Typography variant="body2">
                    {stall.catalog.description.short.markdown}
                  </Typography>
                </Paper>
                </Grid>
              ))}
              </Grid>
          </Box>
        </Box>
      </ThemeProvider>
    </main>
  );
}

export const query = graphql`
  query ($id: String!) {
    marketplace: mongodbCounter(_id: { eq: $id }) {
      _id
      name
      place {
        address {
          street
          locality
        }
      }
    }
    stalls: allMongodbCounter(filter: { marketplace: { eq: $id } }) {
      nodes {
        _id
        name
        catalog {
          description {
            short {
              markdown
            }
          }
        }
        owner {
          activity {
            name
            place {
              _id
              name
            }
          }
        }
      }
    }
  }
`;

/*
export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
*/
