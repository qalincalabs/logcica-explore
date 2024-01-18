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
  const partnership = data.partnership;

  const producers = data.contributions.nodes
    .map((c: any) => c.contributor.activity)
    .filter((p: any) => p != null);

  const workspaces = partnership.workspaces;
  const contacts = partnership.contacts;

  const members = data.contributions.nodes
    .map((c: any) => c.contributor.partnership)
    .filter((p: any) => p != null && p.name)
    .sort((a: any, b: any) => {
      return a.name.localeCompare(b.name);
    });

  const mainOrganisation = data.partnership?.mainOrganisation;

  /*
  const stalls = data.stalls.nodes.sort((a: any, b: any) =>
    a.name.localeCompare(b.name)
  );
  const marketplaceFacebookProfile = marketplace.profiles?.find(
    (p: any) => p.type == "facebook"
  );

  */

  return (
    <Layout>
      <Box>
        <Typography align="center" variant="h3" component="h3">
          {partnership.name}
        </Typography>
        {partnership.profiles.find(
          (p: any) => p.description?.short && p.type == "web_element"
        ) && (
          <Paper sx={{ p: 1, m: 2 }}>
            <Markdown>
              {
                partnership.profiles.find(
                  (p: any) => p.description?.short && p.type == "web_element"
                ).description?.short?.markdown
              }
            </Markdown>
          </Paper>
        )}
        {mainOrganisation && (
          <Box sx={{ m: 2 }}>
            <Typography variant="h4" component="h4">
              Entreprise principale
            </Typography>
            <Paper sx={{ p: 1 }}>
              <Box>
                <Box>
                  {mainOrganisation.legalName ?? mainOrganisation.name}
                  {mainOrganisation.legalFormShort && (
                    <span> ({mainOrganisation?.legalFormShort})</span>
                  )}
                </Box>
                {mainOrganisation.number && (
                  <Box>
                    <span>Numéro d'entreprise : </span>
                    <a
                      target="_blank"
                      href={
                        "https://kbopub.economie.fgov.be/kbopub/zoeknummerform.html?nummer=" +
                        mainOrganisation.number.replace(/\D/g, "")
                      }
                    >
                      {mainOrganisation.number}
                    </a>
                  </Box>
                )}
                <Box>
                  {mainOrganisation.bankAccountNumber && (
                    <span>
                      {"Numéro de compte : " +
                        mainOrganisation?.bankAccountNumber}
                    </span>
                  )}
                </Box>
              </Box>
            </Paper>
          </Box>
        )}
        <Grid container>
        {workspaces.length > 0 && (
          <Grid item xs={12} sm={12} md={6} xl={6}>
          <Box sx={{ m: 2 }}>
            <Typography variant="h4" component="h4">
              Espaces de travail
            </Typography>
            <Stack direction="row">
              {workspaces.map((workspace: any) => (
                <Paper sx={{ p: 1, m: 2 }}>
                  <Typography sx={{fontWeight: 'bold'}}>{workspace.name}</Typography>
                  <Box>{workspace.place?.address?.street}</Box>
                  <Box>{workspace.place?.address?.postalCode} {workspace.place?.address?.locality}</Box>
                </Paper>
              ))}
            </Stack>
          </Box>
          </Grid>
        )}
        { contacts && contacts.length > 0 && (
          <Grid item xs={12} sm={12} md={6} xl={6}>
          <Box sx={{ m: 2 }}>
            <Typography variant="h4" component="h4">
              Contacts
            </Typography>
            <Stack direction="row">
              {contacts.map((contact: any) => (
                <Paper sx={{ p: 1, m: 2 }}>
                  <Typography sx={{fontWeight: 'bold'}}>{contact.purpose}</Typography>
                  <Typography>{contact.mainEmail}</Typography>
                  <Typography>{contact.mainPhoneNumberFormatted}</Typography>
                </Paper>
              ))}
            </Stack>
          </Box>
          </Grid>
        )}
        </Grid>
        {members.length > 0 && (
          <Box sx={{ m: 2 }}>
            <Typography variant="h4" component="h4">
              Membres
            </Typography>
            <Grid container spacing={1}>
              {members.map((member: any) => (
                <Grid item xs={4} sm={3} md={3} xl={2}>
                  <Card>
                    <CardActionArea>
                      <CardContent
                        onClick={() => navigate("/partnership/" + member._id)}
                      >
                        {member.name}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        {producers.length > 0 && (
          <Box sx={{ m: 2 }}>
            <Typography variant="h4" component="h4">
              Producteurs
            </Typography>
            <Grid container spacing={2}>
              {producers.map((activity: any) => (
                <Grid item xs={12} sm={6} md={4} xl={3}>
                  <Paper sx={{ p: 1 }}>
                    <Stack direction="row">
                      <Typography variant="h6">{activity.name}</Typography>
                      {activity.profiles?.find(
                        (p: any) => p.type == "facebook"
                      ) && (
                        <a
                          href={
                            "https://www.facebook.com/" +
                            activity.profiles.find(
                              (p: any) => p.type == "facebook"
                            ).key
                          }
                        >
                          <IconButton size="small">
                            <Facebook />
                          </IconButton>
                        </a>
                      )}
                      {activity.profiles?.find(
                        (p: any) => p.type == "website"
                      ) && (
                        <a
                          href={
                            activity.profiles.find(
                              (p: any) => p.type == "website"
                            ).link
                          }
                        >
                          <IconButton size="small">
                            <Language />
                          </IconButton>
                        </a>
                      )}
                    </Stack>
                    {activity.place && (
                      <Typography variant="subtitle1">
                        {activity.place.name}
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Layout>
  );
}

export const query = graphql`
  query ($id: String!) {
    partnership: mongodbPartnership(_id: { eq: $id }) {
      _id
      name
      mainOrganisation {
        number
        name
        legalFormShort
        legalName
        bankAccountNumber
      }
      profiles {
        type
        link
        mainImage {
          url
        }
        description {
          short {
            markdown
          }
        }
      }
      workspaces {
        name
        place {
          address {
            street
            locality
            postalCode
          }
        }
      }
      contacts {
        purpose
        mainEmail
        mainPhoneNumber
        mainPhoneNumberFormatted
      }
    }
    contributions: allMongodbContribution(
      filter: { subject: { partnership: { _id: { eq: $id } } } }
    ) {
      nodes {
        contributor {
          activity {
            _id
            name
          }
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
