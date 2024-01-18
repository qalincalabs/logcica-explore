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

const PartnershipPage = ({ data }: any) => {
  return (
    <Layout>
      <Typography align="center" variant="h3">
        Groupements
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center">
        <List>
          {data.partnerships.nodes.map((p: any) => (
            <ListItem>
              <ListItemButton onClick={() => navigate("/partnership/" + p._id)}>
                <ListItemAvatar>
                  <Avatar>
                    <Store />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={p.name}
                  secondary={
                    <Stack>
                      {p.area && <Typography sx={{fontWeight: 'bold'}}>{p.area.name}</Typography>}
                      {p.profiles.find(
                        (p: any) => p.description?.short && p.type == "website"
                      )?.description?.short && (
                        <Typography>
                          {
                            p.profiles.find(
                              (p: any) =>
                                p.description?.short && p.type == "website"
                            )?.description?.short?.markdown
                          }
                        </Typography>
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

export default PartnershipPage;

export const Head: HeadFC = () => <title>Groupements</title>;

/*
description {
          short {
            markdown
          }
        }
        profiles {
          key
          type
          link
        }
*/

export const query = graphql`
  query {
    partnerships: allMongodbPartnership(
      sort: [{ name: ASC }],
      filter: {
        categories: { elemMatch: { _id: { eq: "64d4ceeca4d6089295a8a753" } } }
      }
    ) {
      nodes {
        _id
        name
        area {
          name
        }
        profiles {
          type
          link
          description {
            short {
              markdown
            }
          }
        }
      }
    }
  }
`;
