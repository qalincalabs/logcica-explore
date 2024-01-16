import React from "react";
import { graphql } from "gatsby";
import AppTopBar from "../components/app-top-bar";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Icon,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { CalendarMonth, Facebook, Language, Place, ShoppingBasket } from "@mui/icons-material";
import Markdown from "markdown-to-jsx";
import Layout from "../components/layout";

export function ProfileExternalLink({ profile }: any) {
  return (
    <a href={"https://www.facebook.com/" + profile.key}>
      <Button startIcon={<Facebook />}>{profile.key}</Button>
    </a>
  );
}

export default function MarketplaceTemplate({ data }: any) {
  const marketplace = data.marketplace;
  const stalls = data.stalls.nodes.sort((a: any, b: any) =>
    a.name.localeCompare(b.name)
  );
  const marketplaceFacebookProfile = marketplace.profiles?.find(
    (p: any) => p.type == "facebook"
  );

  return (
    <Layout>
      <Box>
        <Typography align="center" variant="h3" component="h3">
          {marketplace.name}
        </Typography>
        <Paper variant="outlined" sx={{ p: 1, m: 1 }}>
          {marketplace.availabilityStatement && (
            <Stack direction="row" gap={1} flexGrow={1}>
              <CalendarMonth />
              <Typography>
                {marketplace.availabilityStatement.short.markdown}
              </Typography>
            </Stack>
          )}
          {marketplace.place && (
            <Stack direction="row" gap={1} flexGrow={1}>
              <Place />
              <Typography>
                {marketplace.place.address.street} à{" "}
                {marketplace.place.address.locality}
              </Typography>
            </Stack>
          )}
          {marketplaceFacebookProfile && (
            <ProfileExternalLink profile={marketplaceFacebookProfile} />
          )}
        </Paper>
        <Typography variant="h4" component="h4">
          Producteurs
        </Typography>
        <Grid container spacing={2}>
          {stalls.map((stall: any) => (
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <Paper sx={{ p: 1 }}>
                <Stack direction="row">
                  <Typography variant="h6">
                    {stall.manager.activity.name}
                  </Typography>
                  {stall.manager.activity.profiles?.find(
                    (p: any) => p.type == "facebook"
                  ) && (
                    <a
                      href={
                        "https://www.facebook.com/" +
                        stall.manager.activity.profiles.find(
                          (p: any) => p.type == "facebook"
                        ).key
                      }
                    >
                      <IconButton size="small">
                        <Facebook />
                      </IconButton>
                    </a>
                  )}
                  {stall.manager.activity.profiles?.find(
                    (p: any) => p.type == "website"
                  ) && (
                    <a
                      href={
                        stall.manager.activity.profiles.find(
                          (p: any) => p.type == "website"
                        ).link
                      }
                    >
                      <IconButton size="small">
                        <Language />
                      </IconButton>
                    </a>
                  )}
                  {stall.actions?.map((a: any) => 
                      <a href={a.url}>
                      <IconButton size="small" sx={{ color: "black" }}>
                        <ShoppingBasket />
                      </IconButton>
                    </a>
                  )}
                </Stack>
                <Typography variant="subtitle1">
                  {stall.manager.activity.place.name}
                </Typography>
                <Typography variant="body2">
                  {stall.catalog.description.short.markdown}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
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
      availabilityStatement {
        short {
          markdown
        }
      }
      profiles {
        key
        type
        link
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
        actions {
          name
          fontAwesomeIcon
          url
        }
        manager {
          activity {
            name
            place {
              _id
              name
            }
            profiles {
              key
              type
              link
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
