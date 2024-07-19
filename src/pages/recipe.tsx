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

const RecipePage: React.FC<PageProps> = ({ data }: any) => {
  return (
    <Layout>
      <MainContent
        title="Recettes"
        type="recipe"
        dataList={data.recipes.nodes}
        listItemContent={RecipeListItem}
      />
    </Layout>
  );
};

function RecipeListItem(p: any) {
  return (
    <ListItemButton onClick={() => navigate("/recipe/" + p._id)}>
      <ListItemAvatar>
        <Avatar>
          <Store />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={p.name}
        secondary={
          <Stack>
            <Typography sx={{fontWeight: "bold"}}>{p.description.short.markdown}</Typography>
            <Typography>Proposé par : {p.author.organisation.name}</Typography>
          </Stack>
        }
      />
    </ListItemButton>
  );
}

export default RecipePage;

export const Head: HeadFC = () => <title>Recettes</title>;

export const query = graphql`
  {
    recipes: allMongodbRecipes {
      nodes {
        _id
        name
        description {
          short {
            markdown
          }
        }
        author {
          organisation {
            name
          }
        }
      }
    }
  }
`;
