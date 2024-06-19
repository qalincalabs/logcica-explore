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

const CounterPage = ({ data }: any) => {
  return (
    <Layout>
      <Typography align="center" variant="h3">
        Comptoirs
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
                  secondary={m.availabilityStatement?.short?.markdown}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Layout>
  );
};

export default CounterPage;

export const Head: HeadFC = () => <title>Marchés</title>;

export const query = graphql`
  query {
    marketplaces: allMongodbCounters(filter: { type: { ne: "marketplace" }, marketplace: { _id: { eq: null } } }) {
      nodes {
        _id
        name
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
          localKey
          type
          link
        }
      }
    }
  }
`;
