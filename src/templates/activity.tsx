import React from "react";
import { graphql, navigate } from "gatsby";
import AppTopBar from "../components/app-top-bar";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  CalendarMonth,
  Facebook,
  Language,
  Place,
  Link,
} from "@mui/icons-material";
import Layout from "../components/layout";
import Markdown from "markdown-to-jsx";

export default function PartnershipTemplate({ data }: any) {
  const activity = data.activity;
  const contacts = activity.contacts;
  const profiles = activity.profiles;
  const organisation = data.organisation || {};;

  return (
    <Layout>
      <Box>
        <Typography align="center" variant="h3" component="h3">
          {activity.name}
        </Typography>
              
        {activity.description?.short?.markdown && (
          <Paper sx={{ p: 1, m: 2 }}>
            <Markdown>
              {activity.description?.short?.markdown}
            </Markdown>
          </Paper>
        )}
        {activity.profiles?.find(
          (p: any) => p.description?.long && p.type == "web_element"
        ) && (
          <Paper sx={{ p: 1, m: 2 }}>
            <Markdown>
              {
                activity.profiles.find(
                  (p: any) => p.description?.long && p.type == "web_element"
                ).description?.long?.markdown
              }
            </Markdown>
          </Paper>
        )}
        <Grid container>
          {contacts && contacts.length > 0 && (
            <Grid item xs={12} sm={12} md={6} xl={6}>
              <Box sx={{ m: 2 }}>
                <Typography variant="h4" component="h4">
                  Contacts
                </Typography>
                <Stack direction="row">
                  {contacts.map((contact: any) => (
                    <Paper sx={{ p: 1, m: 2 }}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {contact.purpose}
                      </Typography>
                      <Typography>{contact.name}</Typography>
                      <Typography>{contact.mainEmail}</Typography>
                      <Typography>
                        {contact.mainPhoneNumberFormatted ?? contact.mainPhoneNumber}
                      </Typography>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            </Grid>
          )}
        </Grid>
        <Grid container>
          {profiles && profiles.length > 0 && (
            <Grid item xs={12} sm={12} md={6} xl={6}>
              <Box sx={{ m: 2 }}>
                <Typography variant="h4" component="h4">
                  Profiles
                </Typography>
                <Stack direction="row">
                  {profiles.map((profile: any) => (
                    <Paper sx={{ p: 1, m: 2 }}>
                      <Typography sx={{ fontWeight: 'bold' }}>{profile.type}</Typography>
                      <Typography><a href={profile.link} target="_blank">{profile.localKey ?? profile.key}</a></Typography>
                    </Paper>
                  ))}
                </Stack>
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
                    Numéro : {organisation.number}
                  </Typography>
                  <Typography variant="subtitle1" component="p">
                    Forme juridique : {organisation.legalFormShort}
                  </Typography>
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
  query ($id: String!) {
    activity: mongodbActivities(_id: { eq: $id }) {
      _id
      name
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
    organisation: mongodbOrganisations(_id: { eq: $id }) {
      number
      legalFormShort
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
