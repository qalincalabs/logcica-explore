import { Store } from "@mui/icons-material";
import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";

export function FavoriteListContent({ favorites }: any) {

  const data = useStaticQuery(graphql`
  query {
    marketplaces: allMongodbCounters(filter: { type: { eq: "marketplace" } }) {
      nodes {
        _id
        name
      }
    }
    products: allMongodbProducts { 
      nodes {
        _id
        name
        producer { 
          activity { 
            _id 
            name 
          } 
        }
      }
    }
    partnerships: allMongodbPartnerships {
      nodes {
        _id
        name
      }
    }
    activities: allMongodbActivities {
      nodes {
        _id
        name
      }
    }
  }
  `);

  console.log(data)

  const filters = [
    {
      key: "partnership",
      title: "Groupements",
      dataKey: "partnership",
      dataNodes: data?.partnerships?.nodes || [],
    },
    {
      key: "counter",
      title: "Marchés",
      dataKey: "counter",
      dataNodes: data?.marketplaces?.nodes || [],
    },
    {
      key: "activity",
      title: "Producteurs",
      dataKey: "activity",
      dataNodes: data?.activities?.nodes || [],
    },
    {
      key: "product",
      title: "Produits",
      dataKey: "product",
      dataNodes: data?.products?.nodes || [],
    },
  ];

  console.log(filters)

  return (
    <Box
      p={2}
      width="100%"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="flex-start"
      >
        {filters.map(
          ({ title, dataKey, dataNodes }) =>
            favorites[dataKey]?.length > 0 && (
              <Grid item xs={12} key={dataKey}>
                <Box
                  sx={{
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#333", mb: 2 }}>
                    {title}
                  </Typography>
                </Box>
                <List>
                  {favorites[dataKey].map((item) => {
                    const dataNode = dataNodes.find((p) => p._id === item);
                    return (
                      <ListItem
                        key={item.id}
                        sx={{
                          transition: "transform 0.3s, box-shadow 0.3s",
                          "&:hover": {
                            transform: "scale(1.02)",
                            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                          },
                          borderRadius: "8px",
                          mb: 2,
                          bgcolor: "#fff",
                          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: "#FFD700", color: "#fff" }}>
                              <Store />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={dataNode?.name || `${title} inconnu`}
                            sx={{ color: "#555" }}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
            )
        )}
      </Grid>
    </Box>
  );
}
