import { HeadFC, type PageProps } from "gatsby";
import React from "react";

import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { activityIcons } from "../assets/activity-icons";
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
                {Object.entries(activityIcons).map(([key, IconComponent]) => (
                  <ListItem
                    key={key}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: "0.5rem",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {IconComponent}
                    </ListItemIcon>
                    <ListItemText
                      primary={key
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                    />
                    <ListItemText primary={"nom des créditeurs"} />
                  </ListItem>
                ))}
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
