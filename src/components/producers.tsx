import { Facebook, Language } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { navigate } from "gatsby";
import React from "react";

export function Producers({ contributions }: any) {
  const producers = contributions
    .map((c: any) => c.contributor.activity)
    .filter((p: any) => p != null);
  return (
    <>
      {producers.length > 0 && (
        <Box sx={{ m: 2 }}>
          <Typography variant="h4" component="h4" sx={{ mb: 2 }}>
            Producteurs
          </Typography>
          <Grid container spacing={2}>
            {producers.map((activity: any, index: number) => (
              <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
                <Card>
                  <CardActionArea
                    onClick={() => navigate("/activity/" + activity._id)}
                  >
                    <CardContent>
                      <Typography variant="h6">{activity.name}</Typography>
                      {activity.place && (
                        <Typography variant="subtitle1">
                          {activity.place.address?.locality ??
                            activity.place.name}
                        </Typography>
                      )}
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    {activity.profiles?.find(
                      (p: any) => p.type === "facebook",
                    ) && (
                      <a
                        href={
                          activity.profiles.find(
                            (p: any) => p.type === "facebook",
                          )?.link ??
                          `https://www.facebook.com/${activity.profiles.find((p: any) => p.type === "facebook").key}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconButton size="small">
                          <Facebook />
                        </IconButton>
                      </a>
                    )}
                    {activity.profiles?.find(
                      (p: any) => p.type === "website",
                    ) && (
                      <a
                        href={
                          activity.profiles.find(
                            (p: any) => p.type === "website",
                          ).link
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconButton size="small">
                          <Language />
                        </IconButton>
                      </a>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
}

export default Producers;
