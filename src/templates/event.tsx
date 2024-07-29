import { Event as EventIcon, OpenInNew } from "@mui/icons-material";
import { Box, Grid, Link, Paper, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { graphql, PageProps } from "gatsby";
import Markdown from "markdown-to-jsx";
import React from "react";
import FavoriteIcons from "../components/FavoriteIcons";
import Layout from "../components/layout";

export default function EventTemplate({ data }: PageProps<any>) {
  const event = data.event || {};
  const place = event.place || {};
  const manager =
    event.manager?.organisation ||
    event.manager?.activity ||
    event.manager?.partnership ||
    {};
  const categories = event.categories || [];
  const profiles = event.profiles || [];
  const formattedFrom = event.timeRange?.from
    ? format(new Date(event.timeRange.from), "PPP p", { locale: fr })
    : null;
  const formattedTo = event.timeRange?.to
    ? format(new Date(event.timeRange.to), "PPP p", { locale: fr })
    : null;

  return (
    <Layout>
      <Box>
        <Box display="flex" alignItems="center" justifyContent="center" my={4}>
          <Typography align="center" variant="h3" component="h3" mr={2}>
            {event.name}
          </Typography>
          <FavoriteIcons type="session" targetId={event._id} />
        </Box>

        <Grid container>
          {formattedFrom && formattedTo && (
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <Box sx={{ m: 2 }}>
                <Typography variant="h4" component="h4">
                  Durée
                </Typography>
                <Paper sx={{ p: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <EventIcon sx={{ mr: 1 }} />
                    <Typography>
                      {formattedFrom}
                      <br />
                      {formattedTo}
                    </Typography>
                  </Stack>
                </Paper>
              </Box>
            </Grid>
          )}

          {categories.length > 0 && (
            <Grid item xs={12} sm={6} md={3} xl={2}>
              <Box sx={{ m: 2 }}>
                <Typography variant="h4" component="h4">
                  Catégories
                </Typography>
                <Paper sx={{ p: 2 }}>
                  <Stack>
                    {categories.map((category: any) => (
                      <Typography key={category._id}>
                        {category.name}
                      </Typography>
                    ))}
                  </Stack>
                </Paper>
              </Box>
            </Grid>
          )}

          {place.address && (
            <Grid item xs={12} sm={6} md={5} xl={4}>
              <Box sx={{ m: 2 }}>
                <Typography variant="h4" component="h4">
                  Adresse
                </Typography>
                <Paper sx={{ p: 2 }}>
                  <Stack direction="column">
                    <Typography>
                      {place.address.street}, {place.address.locality}
                    </Typography>
                    {place.center?.coordinates && (
                      <Link
                        href={`https://www.google.com/maps/search/?api=1&query=${place.center.coordinates[1]}%2C${place.center.coordinates[0]}&query_place_id=${place.gmaps?.id}`}
                        target="_blank"
                        sx={{
                          color: "primary.main",
                          textDecoration: "underline",
                          display: "inline-flex",
                          alignItems: "center",
                        }}
                      >
                        Voir sur Google Maps <OpenInNew sx={{ ml: 0.5 }} />
                      </Link>
                    )}
                  </Stack>
                </Paper>
              </Box>
            </Grid>
          )}

          {manager.name && (
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <Box sx={{ m: 2 }}>
                <Typography variant="h4" component="h4">
                  Organisateur
                </Typography>
                <Paper sx={{ p: 2 }}>
                  <Typography>{manager.name}</Typography>
                </Paper>
              </Box>
            </Grid>
          )}

          {profiles.length > 0 && (
            <Grid item xs={12} sm={6} md={6} xl={3}>
              <Box sx={{ m: 2 }}>
                <Typography variant="h4" component="h4">
                  Profils
                </Typography>
                <Paper sx={{ p: 2 }}>
                  <Stack>
                    {profiles.map((profile: any) => (
                      <Link
                        key={profile.key}
                        href={profile.link}
                        target="_blank"
                        sx={{
                          color: "primary.main",
                          textDecoration: "underline",
                          display: "inline-flex",
                          alignItems: "center",
                          my: 0.5,
                        }}
                      >
                        {profile.type}: {event.name} ({profile.localKey}){" "}
                        <OpenInNew sx={{ ml: 0.5 }} />
                      </Link>
                    ))}
                  </Stack>
                </Paper>
              </Box>
            </Grid>
          )}
        </Grid>

        {(event.description?.long?.markdown ||
          event.description?.short?.markdown) && (
          <Paper sx={{ p: 1, m: 2 }}>
            <Markdown
              options={{
                overrides: {
                  a: {
                    component: (props: any) => (
                      <Link
                        href={props.href}
                        target="_blank"
                        sx={{
                          color: "primary.main",
                          textDecoration: "underline",
                          display: "inline-flex",
                          alignItems: "center",
                        }}
                      >
                        {props.children} <OpenInNew sx={{ ml: 0.5 }} />
                      </Link>
                    ),
                  },
                },
              }}
            >
              {event.description?.long?.markdown ??
                event.description?.short?.markdown}
            </Markdown>
          </Paper>
        )}
      </Box>
    </Layout>
  );
}

export const query = graphql`
  query GetEvent($id: String!) {
    event: mongodbSessions(_id: { eq: $id }) {
      _id
      name
      manager {
        activity {
          name
        }
        organisation {
          name
        }
        partnership {
          name
        }
      }
      description {
        short {
          markdown
        }
        long {
          markdown
        }
      }
      timeRange {
        from
        to
      }
      place {
        title
        address {
          street
          locality
        }
        center {
          coordinates
        }
        gmaps {
          id
          title
        }
      }
      profiles {
        type
        localKey
        key
        link
      }
      categories {
        name
      }
    }
  }
`;
