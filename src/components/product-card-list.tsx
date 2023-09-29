import * as React from "react";
import { Button, Grid } from "@mui/material";
import { ProductCard } from "./product-card";
import { graphql, useStaticQuery } from "gatsby";

interface Food {
  key?: string;
  img?: string;
  title?: string;
}

const itemData: Food[] = [
  {
    key: "1",
    //img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    key: "2",
    // img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    key: "3",
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    key: "4",
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    key: "5",
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    key: "6",
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    key: "7",
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    key: "8",
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    key: "9",
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    key: "10",
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    key: "11",
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    key: "12",
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
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
      itemData.push({ key: i._id, title: i.name });
    }
    setLoaded(true)
  }

  // State for the list
  const [list, setList] = React.useState<Food[]>([...itemData.slice(0, 20)]);

  // State to trigger oad more
  const [loadMore, setLoadMore] = React.useState<boolean>(false);

  // State of whether there is more to load
  const [hasMore, setHasMore] = React.useState<boolean>(itemData.length > 20);

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
        ? itemData.slice(currentLength, currentLength + 20)
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
        <Grid item xs={12} md={6} key={item.key}>
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
