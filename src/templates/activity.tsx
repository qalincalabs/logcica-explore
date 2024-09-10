import { OpenInNew } from "@mui/icons-material";
import { Box, Grid, Link, Paper, Stack, Typography } from "@mui/material";
import { compareAsc, parseISO, startOfDay, subDays } from "date-fns";
import { graphql, navigate, PageProps } from "gatsby";
import Markdown from "markdown-to-jsx";
import React from "react";
import Contact from "../components/contact";
import Counters from "../components/counters";
import { HeaderWithImage } from "../components/header-with-image";
import Layout from "../components/layout";
import PlaceNameAndRedirect from "../components/placeNameAndRedirect";
import { ProductCard } from "../components/product-card";

const ActivityTemplate = ({ data }: PageProps<any>) => {
  const activity = data.activity;
  const contacts = activity.contacts;
  const profiles = activity.profiles;
  const organisation = activity.manager?.organisation || {};
  const place = activity.place;
  const contributions = data.contributions.nodes;
  const products = data.products.nodes;

  const date = startOfDay(subDays(new Date(), 7)); // 7 days in the past
  const sessions = data.sessions.nodes.filter(
    (s: any) => compareAsc(parseISO(s.timeRange.to), date) > 0,
  );

  return (
    <Layout>
      <Box>
        <HeaderWithImage data={activity} type={"activity"} />

        {activity.description?.short?.markdown && (
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
              {activity.description?.short?.markdown}
            </Markdown>
          </Paper>
        )}

        {activity.profiles?.find(
          (p: any) => p.description?.long && p.type === "web_element",
        ) && (
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
              {
                activity.profiles.find(
                  (p: any) => p.description?.long && p.type === "web_element",
                ).description?.long?.markdown
              }
            </Markdown>
          </Paper>
        )}

        {activity.mainVideo && (
          <Box display="flex" justifyContent="center">
            <video width="320" height="240" controls>
              <source
                src={
                  "https://cms.logcica.org/media/" + activity.mainVideo.filename
                }
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </Box>
        )}

        <Grid container>
          {place && (
            <Grid item xs={12} sm={12} md={6} xl={4}>
              <Box sx={{ m: 2 }}>
                <Typography variant="h4" component="h4">
                  Adresse
                </Typography>
                <Paper sx={{ p: 2 }}>
                  <PlaceNameAndRedirect place={place} />
                </Paper>
              </Box>
            </Grid>
          )}

          {contacts && contacts.length > 0 && (
            <Grid item xs={12} sm={12} md={6} xl={3}>
              <Box sx={{ m: 2 }}>
                <Typography variant="h4" component="h4">
                  Contact
                </Typography>
                <Stack spacing={2}>
                  {contacts.map((contact: any) => (
                    <Paper key={contact.mainEmail} sx={{ p: 2 }}>
                      <Contact contact={contact} />
                    </Paper>
                  ))}
                </Stack>
              </Box>
            </Grid>
          )}

          {profiles && profiles.length > 0 && (
            <Grid item xs={12} sm={12} md={6} xl={5}>
              <Box sx={{ m: 2 }}>
                <Typography variant="h4" component="h4">
                  Profiles
                </Typography>
                <Paper sx={{ p: 1, m: 2 }}>
                  <Stack direction="column" spacing={1}>
                    {profiles.map((profile: any) => (
                      <Stack direction="row" gap={1} key={profile.key}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          {profile.type}
                        </Typography>
                        {profile.link ? (
                          <Link
                            href={profile.link}
                            target="_blank"
                            sx={{
                              color: "primary.main",
                              textDecoration: "underline",
                              display: "inline-flex",
                              alignItems: "center",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {profile.localKey ?? profile.key}{" "}
                            <OpenInNew sx={{ ml: 0.5 }} />
                          </Link>
                        ) : (
                          <Typography>
                            {profile.localKey ?? profile.key}
                          </Typography>
                        )}
                      </Stack>
                    ))}
                  </Stack>
                </Paper>
              </Box>
            </Grid>
          )}

          {organisation.number && organisation.legalFormShort && (
            <Grid item xs={12} sm={12} md={6} xl={6}>
              <Box sx={{ m: 2 }}>
                <Typography variant="h4" component="h4">
                  Entreprise
                </Typography>
                <Paper sx={{ p: 2 }}>
                  <Stack direction="row">
                    <Typography variant="subtitle1" component="p">
                      <strong>Numéro : </strong>
                      {organisation.number}
                    </Typography>
                    <Link
                      href={`https://kbopub.economie.fgov.be/kbopub/zoeknummerform.html?nummer=${organisation.number
                        .match(/\d+/g)
                        .join("")}`}
                      target="_blank"
                      sx={{
                        color: "primary.main",
                        textDecoration: "underline",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      {place?.localKey ?? place?.key}{" "}
                      <OpenInNew sx={{ ml: 0.5 }} />
                    </Link>
                  </Stack>
                  <Typography variant="subtitle1" component="p">
                    <strong>Forme juridique : </strong>
                    {organisation.legalFormShort}
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          )}

          <Counters counters={data.counters.nodes}></Counters>

          {sessions && sessions.length > 0 && (
            <Grid item xs={12}>
              <Box sx={{ m: 2 }}>
                <Typography variant="h4" component="h4">
                  Événements
                </Typography>
                <Grid container spacing={2}>
                  {sessions.map((session: any) => (
                    <Grid item xs={12} md={6} xl={4} key={session._id}>
                      <Paper
                        sx={{ p: 2 }}
                        onClick={() => navigate("/event/" + session._id)}
                      >
                        <Typography variant="h6" component="h6">
                          {session.name}
                        </Typography>
                        <Typography variant="body1" component="p">
                          {`Début: ${new Date(session.timeRange.from).toLocaleString()}`}
                        </Typography>
                        <Typography variant="body1" component="p">
                          {`Fin: ${new Date(session.timeRange.to).toLocaleString()}`}
                        </Typography>
                        {session.place && (
                          <Typography variant="body1" component="p">
                            {`Lieu: ${session.place.title}`}
                          </Typography>
                        )}
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          )}

          {products && products.length > 0 && (
            <Grid item xs={12}>
              <Box sx={{ m: 2 }}>
                <Typography variant="h4" component="h4">
                  Produits
                </Typography>
                <Grid container spacing={2}>
                  {products.map((item: any): any => (
                    <Grid item xs={12} md={6} xl={4} key={item._id}>
                      <ProductCard item={item} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Layout>
  );
};

export const query = graphql`
  query GetActivityAndRelatedData($id: String!) {
    activity: mongodbActivities(_id: { eq: $id }) {
      _id
      name
      manager {
        organisation {
          name
          number
          legalFormShort
        }
      }
      mainImage {
        filename
      }
      mainVideo {
        filename
      }
      description {
        short {
          markdown
        }
      }
      profiles {
        type
        localKey
        key
        link
        mainImage {
          url
        }
        description {
          long {
            markdown
          }
        }
      }
      contacts {
        purpose
        name
        mainEmail
        mainPhoneNumber
        mainPhoneNumberFormatted
      }
      place {
        title
        gmaps {
          id
          title
        }
        center {
          coordinates
        }
      }
    }
    contributions: allMongodbContributions(
      filter: { contributor: { activity: { _id: { eq: $id } } } }
    ) {
      nodes {
        subject {
          partnership {
            _id
            name
          }
        }
      }
    }
    products: allMongodbProducts(
      sort: [{ name: ASC }]
      filter: { producer: { activity: { _id: { eq: $id } } } }
    ) {
      nodes {
        _id
        name
        description {
          short {
            markdown
          }
        }
        mainImage {
          url
        }
        availabilities {
          season {
            year {
              months
            }
          }
        }
        ingredientStatement {
          short {
            markdown
          }
        }
        allergenList {
          allergen {
            _id
            name
          }
          containmentLevel {
            name
          }
        }
        alcoholPercentage
        nutrientList {
          nutrient {
            _id
            code
            name
          }
          quantity {
            value
            unit
          }
        }
        consumerUsageInstructions {
          short {
            markdown
          }
        }
        consumerStorageInstructions {
          short {
            markdown
          }
        }
        categories {
          _id
          name
        }
        netWeight {
          unit
          value
        }
        netVolume {
          unit
          value
        }
        netContent {
          unit {
            _id
            name
          }
          value
        }
        dimensions {
          length {
            value
            unit
          }
          width {
            value
            unit
          }
          height {
            value
            unit
          }
        }
        references {
          number
          system {
            _id
            key
          }
        }
      }
    }
    counters: allMongodbCounters(
      filter: { manager: { activity: { _id: { eq: $id } } } }
    ) {
      nodes {
        name
        online
        link
        purpose
        availabilityStatement {
          short {
            markdown
          }
        }
        place {
          title
          gmaps {
            id
            title
          }
          center {
            coordinates
          }
        }
        contacts {
          purpose
          name
          mainEmail
          mainPhoneNumber
          mainPhoneNumberFormatted
        }
      }
    }
    sessions: allMongodbSessions(
      filter: { manager: { activity: { _id: { eq: $id } } } }
    ) {
      nodes {
        _id
        name
        timeRange {
          from
          to
        }
        description {
          short {
            markdown
          }
        }
        place {
          title
        }
      }
    }
  }
`;

export default ActivityTemplate;
