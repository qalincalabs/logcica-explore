import { Email, OpenInNew, Phone } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Link as MuiLink,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { graphql, navigate } from "gatsby";
import Markdown from "markdown-to-jsx";
import React from "react";
import Layout from "../components/layout";

import Counters from "../components/counters";
import { HeaderWithImage } from "../components/header-with-image";
import Producers from "../components/producers";
export default function PartnershipTemplate({ data }: any) {
  const partnership = data.partnership;

  const workspaces = partnership.workspaces;
  const counters = partnership.counters;
  const contacts = partnership.contacts;

  const members = data.contributions.nodes
    .map((c: any) => c.contributor.partnership)
    .filter((p: any) => p != null && p.name)
    .sort((a: any, b: any) => a.name.localeCompare(b.name));

  const mainOrganisation = data.partnership?.mainOrganisation;

  return (
    <Layout>
      <Box sx={{ p: 2 }}>
        <HeaderWithImage data={partnership} type={"partnership"} />
        {partnership.profiles.find(
          (p: any) => p.description?.short && p.type == "web_element",
        ) && (
          <Paper sx={{ p: 2, mb: 3 }}>
            <Markdown
              options={{
                overrides: {
                  a: {
                    component: (props: any) => (
                      <MuiLink
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
                      </MuiLink>
                    ),
                  },
                },
              }}
            >
              {
                partnership.profiles.find(
                  (p: any) => p.description?.short && p.type == "web_element",
                ).description?.short?.markdown
              }
            </Markdown>
          </Paper>
        )}
        {mainOrganisation && (
          <Box sx={{ m: 2 }}>
            <Typography variant="h4" component="h4" sx={{ mb: 2 }}>
              Entreprise principale
            </Typography>
            <Paper sx={{ p: 2 }}>
              <Box>
                <Box>
                  {mainOrganisation.legalName ?? mainOrganisation.name}
                  {mainOrganisation.legalFormShort && (
                    <span> ({mainOrganisation?.legalFormShort})</span>
                  )}
                </Box>
                {mainOrganisation.number && (
                  <Box>
                    <span>
                      <strong>Numéro d'entreprise : </strong>
                    </span>
                    <MuiLink
                      target="_blank"
                      href={
                        "https://kbopub.economie.fgov.be/kbopub/zoeknummerform.html?nummer=" +
                        mainOrganisation.number.replace(/\D/g, "")
                      }
                      sx={{
                        color: "primary.main",
                        textDecoration: "underline",
                      }}
                    >
                      {mainOrganisation.number}
                    </MuiLink>
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
        <Grid container spacing={2}>
          {workspaces.length > 0 && (
            <Grid item xs={12} sm={6}>
              <Box sx={{ m: 2 }}>
                <Typography variant="h4" component="h4" sx={{ mb: 2 }}>
                  Espaces de travail
                </Typography>
                <Paper sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    {workspaces.map((workspace: any, index: number) => (
                      <Box key={index}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          {workspace.name}
                        </Typography>
                        <Typography>
                          {workspace.place?.address?.street},{" "}
                          {workspace.place?.address?.postalCode}{" "}
                          {workspace.place?.address?.locality}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Paper>
              </Box>
            </Grid>
          )}
          <Counters counters={counters}></Counters>
          {contacts && contacts.length > 0 && (
            <Grid item xs={12}>
              <Box sx={{ m: 2 }}>
                <Typography variant="h4" component="h4" sx={{ mb: 2 }}>
                  Contacts
                </Typography>
                <Paper sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    {contacts.map((contact: any, index: number) => (
                      <Box
                        key={index}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        {contact.mainEmail && (
                          <>
                            <Email sx={{ mr: 1 }} />
                            <Typography>{contact.mainEmail}</Typography>
                          </>
                        )}
                      </Box>
                    ))}
                    {contacts.map((contact: any, index: number) => (
                      <Box
                        key={index}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        {contact.mainPhoneNumberFormatted && (
                          <>
                            <Phone sx={{ mr: 1 }} />
                            <Typography>
                              {contact.mainPhoneNumberFormatted}
                            </Typography>
                          </>
                        )}
                      </Box>
                    ))}
                  </Stack>
                </Paper>
              </Box>
            </Grid>
          )}
        </Grid>
        {members.length > 0 && (
          <Box sx={{ m: 2 }}>
            <Typography variant="h4" component="h4" sx={{ mb: 2 }}>
              Membres
            </Typography>
            <Grid container spacing={2}>
              {members.map((member: any, index: number) => (
                <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
                  <Card>
                    <CardActionArea
                      onClick={() => navigate("/partnership/" + member._id)}
                    >
                      <CardContent>
                        <Typography variant="h6">{member.name}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        <Producers contributions={data.contributions.nodes} />
      </Box>
    </Layout>
  );
}

export const query = graphql`
  query ($id: String!) {
    partnership: mongodbPartnerships(_id: { eq: $id }) {
      _id
      name
      mainOrganisation {
        number
        name
        legalFormShort
        legalName
        bankAccountNumber
      }
      mainImage {
        filename
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
      counters {
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
        }
      }
    }
    contributions: allMongodbContributions(
      filter: { subject: { partnership: { _id: { eq: $id } } } }
    ) {
      nodes {
        contributor {
          activity {
            _id
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
          partnership {
            _id
            name
          }
        }
      }
    }
  }
`;
