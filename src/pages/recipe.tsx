import React, { useState } from "react";
import { graphql, navigate, type PageProps, type HeadFC } from "gatsby";
import {
  Box,
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Layout from "../components/layout";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ContrastIcon from '@mui/icons-material/Contrast';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
          <RestaurantIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={p.name}
        secondary={
          <Stack>
            {p.author?.organisation?.name && (
              <Box sx={{ display: 'flex', m: 1 }}>
                <AccountCircleIcon />
                <Typography sx={{ fontWeight: "bold" }}>
                  {p.author.organisation.name}
                </Typography>
              </Box>
            )}

            {p.description?.short?.markdown && (
              <Box sx={{ display: 'flex' }}>
                <Typography>
                  {p.description.short.markdown}
                </Typography>
              </Box>
            )}

            {p.totalTime && (
              <Box sx={{ display: 'flex', m: 1 }}>
                <AccessAlarmIcon />
                <Typography>
                  {p.totalTime}
                </Typography>
              </Box>
            )}

            {p.seasonality?.name && (
              <Box sx={{ display: 'flex', m: 1 }}>
                <ContrastIcon />
                <Typography>
                  {p.seasonality.name}
                </Typography>
              </Box>
            )}

            {p.difficulty?.name && (
              <Box sx={{ display: 'flex', m: 1 }}>
                <FitnessCenterIcon />
                <Typography>
                  {p.difficulty.name}
                </Typography>
              </Box>
            )}

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
        area
        categories
        author {
          organisation {
            name
          }
          partnership {
            name
          }
        }
        yieldStatement
        costCategory {
          name
        }
        difficulty {
          name
        }
        seasonality {
          name
        }
        description {
          short {
            markdown
          }
        }
        cookTime
        prepTime
        totalTime
        ingredientList {
          name
        }
        stepStatement {
          short {
            markdown
          }
        }
        mainImage
        allergenList {
          id
        }
        nutrientList {
          id
        }
      }
    }
  }
`;