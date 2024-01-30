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

  return (
    <Layout>
      <Box>
        <Typography align="center" variant="h3" component="h3">
          {activity.name}
        </Typography>
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
                        {contact.mainPhoneNumberFormatted}
                      </Typography>
                    </Paper>
                  ))}
                </Stack>
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
    activity: mongodbActivity(_id: { eq: $id }) {
      _id
      name
      profiles {
        type
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
    contributions: allMongodbContribution(
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
