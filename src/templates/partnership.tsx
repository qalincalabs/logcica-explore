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
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { CalendarMonth, Facebook, Language, Place } from "@mui/icons-material";
import Layout from "../components/layout";

export default function PartnershipTemplate({ data }: any) {
  const partnership = data.partnership;

  const producers = data.producerContributions.nodes
    .map((c: any) => c.contributor.activity)
    .filter((p: any) => p != null);

  const mainOrganisation = data.partnership?.mainOrganisation

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
        {mainOrganisation && (
          <Paper  sx={{ p: 1 }}>
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
                      <a target="_blank" href= {"https://kbopub.economie.fgov.be/kbopub/zoeknummerform.html?nummer=" + mainOrganisation.number.replace(/\D/g,'')} >
                        <span>{mainOrganisation.number}</span>
                      </a>
                  </Box>
                  )}
                  <Box>
                    {mainOrganisation.bankAccountNumber && (
                          <span>{"Numéro de compte : " + mainOrganisation?.bankAccountNumber}</span>
                      )}
                  </Box>
                </Box>
          </Paper>
        )}
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
                        activity.profiles.find((p: any) => p.type == "facebook")
                          .key
                      }
                    >
                      <IconButton size="small">
                        <Facebook />
                      </IconButton>
                    </a>
                  )}
                  {activity.profiles?.find((p: any) => p.type == "website") && (
                    <a
                      href={
                        activity.profiles.find((p: any) => p.type == "website")
                          .link
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
    }
    producerContributions: allMongodbContribution(
      filter: { subject: { partnership: { _id: { eq: $id } } } }
    ) {
      nodes {
        contributor {
          activity {
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
