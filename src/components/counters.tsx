import {
  Box,
  Grid,
  Link as MuiLink,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Contact from "./contact";
import PlaceNameAndRedirect from "./placeNameAndRedirect";

export function Counters({ counters }: any) {
  return (
    <>
      {counters && counters.length > 0 && (
        <Grid item xs={12} sm={6}>
          <Box sx={{ m: 2 }}>
            <Typography variant="h4" component="h4" sx={{ mb: 2 }}>
              Comptoirs
            </Typography>
            <Paper sx={{ p: 2 }}>
              <Stack spacing={2}>
                {counters.map((counter: any, index: number) => (
                  <Box key={index}>
                    {counter.name && (
                      <Typography sx={{ fontWeight: "bold" }}>
                        {counter.name}
                      </Typography>
                    )}
                    {counter.place && (
                      <PlaceNameAndRedirect place={counter.place} />
                    )}
                    {counter.contacts && (
                      <>
                        {counter.contacts.map((contact: any) => (
                          <Contact contact={contact} />
                        ))}
                      </>
                    )}
                    {counter.link && (
                      <MuiLink
                        href={counter.link}
                        target="_blank"
                        sx={{ display: "block", mb: 1 }}
                      >
                        {counter.link}
                      </MuiLink>
                    )}
                    <Typography sx={{ fontWeight: "bold" }}>
                      {counter.purpose}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Box>
        </Grid>
      )}
    </>
  );
}

export default Counters;
