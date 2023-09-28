import * as React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  CardActions,
  IconButton,
  Typography,
} from "@mui/material";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

export function ProductCard({ item }: any){
  return (
    <Card>
      <Grid container>
        {item.img ? (
          <Grid item xs={12} sm={4} md={12} lg={3}>
            <CardMedia
              component="img"
              image={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              alt={item.title}
              sx={{
                objectFit: "contain",
                maxHeight: 200,
                ml: 0,
                mr: "auto",
              }}
            />
          </Grid>
        ) : null}
        <Grid item xs={12} sm={8} md={12} lg={9}>
          <CardHeader
            title="Shrimp and Chorizo Paella test"
            subheader="September 14, 2016"
          />
          <CardContent>
            <Typography>
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas. I need a
              much longer text I think. To see how far I can go
            </Typography>
          </CardContent>
          <CardContent>
            <Typography>Ingrédients:</Typography>
          </CardContent>
          <CardActions>
            <IconButton>
              <AccessAlarmIcon />
            </IconButton>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};
