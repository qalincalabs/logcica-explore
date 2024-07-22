import React from "react";
import { graphql, PageProps } from "gatsby";
import { Box, Grid, Paper, Stack, Typography, Link } from "@mui/material";
import { OpenInNew, Event as EventIcon, AccessTime as AccessTimeIcon } from "@mui/icons-material";
import Layout from "../components/layout";
import Markdown from "markdown-to-jsx";
import FavoriteIcons from "../components/FavoriteIcons";
import { format } from 'date-fns';

export default function EventTemplate({ data }: PageProps<any>) {
  const event = data.event || {};
  const place = event.place || {};
  const manager = event.manager?.organisation || {};
  const categories = event.categories || [];
  const profiles = event.profiles || [];
  const formattedFrom = event.timeRange?.from ? format(new Date(event.timeRange.from), 'PPPpp') : null;
  const formattedTo = event.timeRange?.to ? format(new Date(event.timeRange.to), 'PPPpp') : null;

  return (
    <Layout>
      <Box>
        <Box display="flex" alignItems="center" justifyContent="center" my={4}>
          <Typography align="center" variant="h3" component="h3" mr={2}>
            {event.name}
          </Typography>
          <FavoriteIcons type="event" targetId={event._id} />
        </Box>

        {event.description?.short?.markdown && (
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
              {event.description.short.markdown}
            </Markdown>
          </Paper>
        )}

        <Grid container>
          {place.address && (
            <Grid item xs={12} sm={12} md={6} xl={4}>
              <Box sx={{ m: 2 }}>
                <Typography variant="h4" component="h4">
                  Adresse
                </Typography>
                <Paper sx={{ p: 2 }}>
                  <Stack direction="column">
                    <Typography>{place.address.street}, {place.address.locality}</Typography>
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
            <Grid item xs={12} sm={12} md={6} xl={4}>
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

          {categories.length > 0 && (
            <Grid item xs={12} sm={12} md={6} xl={4}>
              <Box sx={{ m: 2 }}>
                <Typography variant="h4" component="h4">
                  Catégories
                </Typography>
                <Paper sx={{ p: 2 }}>
                  <Stack>
                    {categories.map((category: any) => (
                      <Typography key={category._id}>{category.name}</Typography>
                    ))}
                  </Stack>
                </Paper>
              </Box>
            </Grid>
          )}

          {profiles.length > 0 && (
            <Grid item xs={12} sm={12} md={6} xl={4}>
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
                          my: 0.5
                        }}
                      >
                        {profile.type}: {event.name} ({profile.localKey}) <OpenInNew sx={{ ml: 0.5 }} />
                      </Link>
                    ))}
                  </Stack>
                </Paper>
              </Box>
            </Grid>
          )}
        </Grid>

        {formattedFrom && formattedTo && (
          <Box sx={{ m: 2 }}>
            <Typography variant="h4" component="h4">
              Durée
            </Typography>
            <Paper sx={{ p: 2 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <EventIcon sx={{ mr: 1 }} />
                <Typography>
                  {formattedFrom} - {formattedTo}
                </Typography>
              </Stack>
            </Paper>
          </Box>
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
      description {
        short {
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
