import * as React from "react";
import { graphql, Link, type HeadFC, type PageProps, navigate } from "gatsby";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Layout from "../components/layout";
import { Store } from "@mui/icons-material";
import Markdown from "markdown-to-jsx";

const MarketplacePage = ({ data }: any) => {
  return (
    <Layout>
      <Typography align="center" variant="h3">
        Marchés
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center">
        <List>
          {data.marketplaces.nodes.map((m: any) => (
            <ListItem>
              <ListItemButton onClick={() => navigate("/marketplace/" + m._id)}>
                <ListItemAvatar>
                  <Avatar>
                    <Store />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={m.name}
                  secondary={
                    <Stack>
                      <Typography>
                        {m.availabilityStatement.short.markdown}
                      </Typography>
                      {m.description && (
                        <Markdown>{m.description.short.markdown}</Markdown>
                      )}
                    </Stack>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Layout>
  );
};

export default MarketplacePage;

export const Head: HeadFC = () => <title>Marchés</title>;

export const query = graphql`
  query {
    marketplaces: allMongodbCounters(filter: { type: { eq: "marketplace" } }) {
      nodes {
        _id
        name
        description {
          short {
            markdown
          }
        }
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
    }
  }
`;
