import React, { useState } from "react";
import { graphql, navigate, type PageProps, type HeadFC } from "gatsby";
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Layout from "../components/layout";
import { Store } from "@mui/icons-material";
import MainContent from "../components/main-content";

const PartnershipPage: React.FC<PageProps> = ({ data }: any) => {
  return (
    <Layout>
      <MainContent
        title="Recettes"
        type="recipe"
        dataList={data.recipes.nodes}
        listItemContent={PartnershipListItem}
      />
    </Layout>
  );
};

function PartnershipListItem(p: any) {
  return (
    <ListItemButton onClick={() => navigate("/recipe/" + p._id)}>
      <ListItemAvatar>
        <Avatar>
          <Store />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={p.name}
      />
    </ListItemButton>
  );
}

export default PartnershipPage;

export const Head: HeadFC = () => <title>Recettes</title>;

export const query = graphql`
  {
    recipes: allMongodbRecipes {
      nodes {
        name
      }
    }
  }
`;
