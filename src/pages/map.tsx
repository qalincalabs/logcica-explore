import * as React from "react";
import { HeadFC, PageProps, graphql } from "gatsby";
import { Box, Typography } from "@mui/material";
import Layout from "../components/layout";

const Map: React.FC<PageProps> = () => {
  return (
    <p>New design</p>
  );
};

export default Map;

export const Head: HeadFC = () => <title>Map</title>;

export const query = graphql`
  query {
    activities: allMongodbActivities(sort: [{ name: ASC }]) {
      nodes {
        _id
        name
        place {
          center {
            coordinates
          }
        }
        profiles {
          type
          link
        }
      }
    }
  }
`;
