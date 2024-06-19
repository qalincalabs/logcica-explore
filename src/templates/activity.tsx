import React from "react";
import { graphql, PageProps } from "gatsby";
import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  Link,
} from "@mui/material";
import { OpenInNew, Email, Phone } from '@mui/icons-material';
import Layout from "../components/layout";
import Markdown from "markdown-to-jsx";

export default function PartnershipTemplate({ data }: PageProps<any>) {
  const activity = data.activity;
  const contacts = activity.contacts;
  const profiles = activity.profiles;
  const organisation = activity.manager?.organisation || {};
  const places = data.places.nodes;
  const contributions = data.contributions.nodes;
  const products = data.products.nodes;

  return (
    <Layout>
      <Box>
        <Typography align="center" variant="h3" component="h3">
          {activity.name}
        </Typography>

        {activity.description?.short?.markdown && (
          <Paper sx={{ p: 1, m: 2 }}>
            <Markdown
              options={{
                overrides: {
                  a: {
                    component: (props: any) => (
                      <Link href={props.href} target="_blank" sx={{ color: 'primary.main', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center' }}>
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
          (p: any) => p.description?.long && p.type === "web_element"
        ) && (
          <Paper sx={{ p: 1, m: 2 }}>
            <Markdown
              options={{
                overrides: {
                  a: {
                    component: (props: any) => (
                      <Link href={props.href} target="_blank" sx={{ color: 'primary.main', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center' }}>
                        {props.children} <OpenInNew sx={{ ml: 0.5 }} />
                      </Link>
                    ),
                  },
                },
              }}
            >
              {
                activity.profiles.find(
                  (p: any) => p.description?.long && p.type === "web_element"
                ).description?.long?.markdown
              }
            </Markdown>
          </Paper>
        )}
        <Grid container>
          {contacts && contacts.length > 0 && (
            <Box sx={{ m: 2 }}>
              <Typography variant="h4" component="h4">
                Contact
              </Typography>
              <Stack spacing={2}>
                {contacts.map((contact: any) => (
                  <Paper key={contact.mainEmail} sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Email sx={{ mr: 1 }} />
                      <Typography>{contact.mainEmail}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Phone sx={{ mr: 1 }} />
                      <Typography>{contact.mainPhoneNumberFormatted ?? contact.mainPhoneNumber}</Typography>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </Box>
          )}
          {profiles && profiles.length > 0 && (
            <Grid item xs={12} sm={12} md={6} xl={6}>
              <Box sx={{ m: 2 }}>
                <Typography variant="h4" component="h4">
                  Profiles
                </Typography>
                <Paper sx={{ p: 1, m: 2 }}>
                  <Stack direction="column" spacing={1}>
                    {profiles.map((profile: any) => (
                      <Box key={profile.key} sx={{ display: 'inline-flex', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 'bold' }}>{profile.type} : {""}</Typography>
                        <Link href={profile.link} target="_blank" sx={{ color: 'primary.main', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center' }}>
                          {profile.localKey ?? profile.key} <OpenInNew sx={{ ml: 0.5 }} />
                        </Link>
                      </Box>
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
                  Numéro d'entreprise
                </Typography>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1" component="p">
                    <strong>Numéro BE : </strong>{organisation.number}
                  </Typography>
                  <Typography variant="subtitle1" component="p">
                    <strong>Forme juridique : </strong>{organisation.legalFormShort}
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          )}
          {places && places.length > 0 && (
            <Grid item xs={12} sm={12} md={6} xl={6}>
              <Box sx={{ m: 2 }}>
                <Typography variant="h4" component="h4">
                  Adresse
                </Typography>
                <Paper sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    {places.map((place: any) => (
                      <Typography key={place.title}>{place.title}</Typography>
                    ))}
                  </Stack>
                </Paper>
              </Box>
            </Grid>
          )}
          {products && products.length > 0 && (
            <Grid item xs={12} sm={12} md={6} xl={6}>
              <Box sx={{ m: 2 }}>
                <Typography variant="h4" component="h4">
                  Products
                </Typography>
                <Paper sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    {products.map((product: any) => (
                      <Typography key={product._id}>{product.name}</Typography>
                    ))}
                  </Stack>
                </Paper>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Layout>
  );
}

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
  }
  places: allMongodbPlaces(filter: { id: { eq: $id } }) {
    nodes {
      title
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
  products: allMongodbProducts(filter: { owner: {activity: { _id: { eq: $id } } }}) {
    nodes {
      _id
      name
    }
  }
}
`;
