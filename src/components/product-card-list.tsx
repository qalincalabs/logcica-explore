import * as React from "react";
import { Button, Grid } from "@mui/material";
import { ProductCard } from "./product-card";

interface Food {
  img?: string;
  title?: string;
}

const itemData: Food[] = [
  {
    //img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    // img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
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

export function ProductCardList() {
  // State for the list
  const [list, setList] = React.useState<Food[]>([...itemData.slice(0, 6)]);

  // State to trigger oad more
  const [loadMore, setLoadMore] = React.useState<boolean>(false);

  // State of whether there is more to load
  const [hasMore, setHasMore] = React.useState<boolean>(itemData.length > 6);

  // Load more button click
  const handleLoadMore = () => {
    setLoadMore(true);
  };

  // Handle loading more articles
  React.useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = list.length;
      const isMore = currentLength < itemData.length;
      const nextResults = isMore
        ? itemData.slice(currentLength, currentLength + 6)
        : [];
      setList([...list, ...nextResults]);
      setLoadMore(false);
    }
  }, [loadMore, hasMore]); //eslint-disable-line

  //Check if there is more
  React.useEffect(() => {
    const isMore = list.length < itemData.length;
    setHasMore(isMore);
  }, [list]); //eslint-disable-line

  return (
    <Grid container spacing={2}>
      {list.map((item: any): any => (
        <Grid item xs={12} md={6}>
          <ProductCard item={item} />
        </Grid>
      ))}
      <Grid
        item
        xs={12}
        style={{
          textAlign: "center", // this does the magic
        }}
      >
        {hasMore ? (
          <Button onClick={handleLoadMore} variant="contained" fullWidth>
            Load more
          </Button>
        ) : (
          <p>No more results</p>
        )}
      </Grid>
    </Grid>
  );
}
