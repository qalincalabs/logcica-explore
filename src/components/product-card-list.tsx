import * as React from "react";
import { Button, Grid } from "@mui/material";
import { ProductCard } from "./product-card";
import { graphql, useStaticQuery } from "gatsby";
import LoadingButton from "@mui/lab/LoadingButton";

export function ProductCardList() {
  const data = useStaticQuery(graphql`
    query {
      allMongodbProduct {
        nodes {
          _id
          name
          owner {
            organisation {
              _id
              name
              mainImage {
                url
              }
              place {
                address {
                  street
                  locality
                  postalCode
                  country
                }
              }
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
          ownerRoles
          description {
            short {
              markdown
            }
          }
          mainImage {
            url
          }
          availabilities {
            season {
              year {
                months
              }
            }
          }
          ingredientStatement {
            short {
              markdown
            }
          }
          allergenList {
            allergenKey {
              name
            }
            containmentLevelKey {
              name
            }
          }
          alcoholPercentage
          nutrientList {
            nutrientKey {
              _id
              code
              name
            }
            quantity {
              value
              unit
            }
          }
          consumerUsageInstructions {
            short {
              markdown
            }
          }
          consumerStorageInstructions {
            short {
              markdown
            }
          }
          categories {
            _id
            name
          }
          netWeight {
            unit
            value
          }
          netVolume {
            unit
            value
          }
          netContent {
            unit {
              _id
              name
            }
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
          references {
            number
            system {
              _id
              key
            }
          }
        }
      }
    }
  `);

  const products = data.allMongodbProduct.nodes.sort((a: any, b: any) =>
    a.name?.length < b.name?.length ? 1 : -1
  );

  // State for the list
  const [list, setList] = React.useState([...products.slice(0, 24)]);

  // State to trigger oad more
  const [loadMore, setLoadMore] = React.useState<boolean>(false);

  // State of whether there is more to load
  const [hasMore, setHasMore] = React.useState<boolean>(products.length > 24);

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
        ? products.slice(currentLength, currentLength + 24)
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

  // TODO LoadingButton was for mobile but it's not really working

  return (
    <Grid container spacing={2}>
      {list.map((item: any): any => (
        <Grid item xs={12} md={6} xl={4} key={item._id}>
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
          <LoadingButton
            onClick={handleLoadMore}
            loading={loadMore}
            loadingPosition="end"
            variant="contained"
            fullWidth
          >
            Load more
          </LoadingButton>
        ) : (
          <p>No more results</p>
        )}
      </Grid>
    </Grid>
  );
}
