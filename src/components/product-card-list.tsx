import * as React from "react";
import { Button, Grid } from "@mui/material";
import { ProductCard } from "./product-card";
import { graphql, useStaticQuery } from "gatsby";

const itemData = [
  {
    _id: "1",
    //img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    name: "Breakfast",
  },
  {
    _id: "2",
    // img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    name: "Burger",
  },
  {
    _id: "3",
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    name: "Camera",
  },
  {
    _id: "4",
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    name: "Coffee",
  },
  {
    _id: "5",
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    name: "Hats",
  },
  {
    _id: "6",
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    name: "Honey",
  },
  {
    _id: "7",
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    name: "Basketball",
  },
  {
    _id: "8",
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    name: "Fern",
  },
  {
    _id: "9",
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    name: "Mushrooms",
  },
  {
    _id: "10",
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    name: "Tomato basil",
  },
  {
    _id: "11",
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    name: "Sea star",
  },
  {
    _id: "12",
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    name: "Bike",
  },
];

export function ProductCardList() {
  const data = useStaticQuery(graphql`
    query {
      allMongodbProduct {
        nodes {
          _id
          name
          producer {
            organisation {
              _id
              name
            }
            workspace {
              _id
              name
            }
            activity {
              _id
              name
            }
          }
          allergenList {
            allergenKey
            containmentLevelKey
          }
          categories {
            _id
            name
          }
          netWeight {
            unit
            value
          }
          dimensions {
            length {
              value
              unit
            }
            width {
              value
              unit
            }
            height {
              value
              unit
            }
          }
        }
      }
      allMongodbOrganisation {
        nodes {
          _id
          name
        }
      }
    }
  `);

  const [loaded, setLoaded] = React.useState<boolean>(false);

  if (loaded == false) {
    for (const i of data.allMongodbProduct.nodes) {
      itemData.push(i);
    }
    setLoaded(true);
  }

  const products = itemData;

  // State for the list
  const [list, setList] = React.useState([...products.slice(0, 20)]);

  // State to trigger oad more
  const [loadMore, setLoadMore] = React.useState<boolean>(false);

  // State of whether there is more to load
  const [hasMore, setHasMore] = React.useState<boolean>(products.length > 20);

  // Load more button click
  const handleLoadMore = () => {
    setLoadMore(true);
  };

  // Handle loading more articles
  React.useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = list.length;
      const isMore = currentLength < products.length;
      const nextResults = isMore
        ? products.slice(currentLength, currentLength + 20)
        : [];
      setList([...list, ...nextResults]);
      setLoadMore(false);
    }
  }, [loadMore, hasMore]); //eslint-disable-line

  //Check if there is more
  React.useEffect(() => {
    const isMore = list.length < products.length;
    setHasMore(isMore);
  }, [list]); //eslint-disable-line

  return (
    <Grid container spacing={2}>
      {list.map((item: any): any => (
        <Grid item xs={12} md={6} key={item._id}>
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
