import * as React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  Typography,
} from "@mui/material";

export const ProductCart = () => {
  return (
    <Grid container spacing={2}>
      {itemData.map((item) => (
        <Grid item xs={12} md={6}>
          <Card>
            <Grid container>
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
              <Grid item xs={12} sm={8} md={12} lg={9}>
                <CardHeader
                  title="Shrimp and Chorizo Paella"
                  subheader="September 14, 2016"
                />
                <CardContent>
                  <Typography>
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests. Add 1 cup of frozen
                    peas. I need a much longer text I think. To see how far I
                    can go
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];
