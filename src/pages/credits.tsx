import { HeadFC, type PageProps } from "gatsby";
import React from "react";

import { OpenInNew } from "@mui/icons-material";
import {
  Box,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { activityIconsWithLinks } from "../assets/activity-icons";
import Layout from "../components/layout";

const CreditPage: React.FC<PageProps> = ({ data }: any) => {
  return (
    <Layout>
      <Box
        sx={{
          p: 2,
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" my={4}>
          <Typography align="center" variant="h3" component="h3" mr={2}>
            Icônes et Crédits
          </Typography>
        </Box>
        <Box>
          <Paper elevation={7} square={false}>
            <Grid item xs={12} md={3}>
              <List sx={{ display: "flex", flexDirection: "column" }}>
                {Object.entries(activityIconsWithLinks("2.5rem")).map(
                  ([key, IconComponent]) => (
                    <ListItem
                      key={key}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 0,
                        m: 0,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {IconComponent?.[0]}
                      </ListItemIcon>
                      <ListItemText
                        primary={key
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase())}
                        sx={{
                          flex: "0 1 auto",
                          textAlign: "center",
                          marginRight: 1,
                          marginLeft: 1,
                        }}
                      />
                      <Link
                        target="_blank"
                        href={IconComponent?.[1] || "#"}
                        sx={{
                          color: "primary.main",
                          textDecoration: "underline",
                          display: "inline-flex",
                          alignItems: "center",
                        }}
                      >
                        <OpenInNew sx={{ ml: 0.5 }} />
                      </Link>
                      <ListItemText
                        primary={`Designé par ${IconComponent?.[2]}`}
                        sx={{
                          flex: "0 1 auto",
                          textAlign: "center",
                          marginRight: 1,
                          marginLeft: 1,
                        }}
                      />
                    </ListItem>
                  ),
                )}
              </List>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Layout>
  );
};

export default CreditPage;

export const Head: HeadFC = () => <title>Crédits</title>;
