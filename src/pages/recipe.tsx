import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContrastIcon from "@mui/icons-material/Contrast";
import DescriptionIcon from "@mui/icons-material/Description";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import {
  Avatar,
  Box,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { graphql, navigate, type HeadFC, type PageProps } from "gatsby";
import React from "react";
import Layout from "../components/layout";
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
        primary={<Box sx={{ display: "flex", p: 1 }}>{p.name}</Box>}
        secondary={
          <Stack>
            {p.author?.organisation?.name && (
              <Box sx={{ display: "flex" }}>
                <AccountCircleIcon />
                <Typography sx={{ fontWeight: "bold" }}>
                  {p.author.organisation.name}
                </Typography>
              </Box>
            )}

            {p.description?.short?.markdown && (
              <Box sx={{ display: "flex" }}>
                <DescriptionIcon />
                <Typography>{p.description.short.markdown}</Typography>
              </Box>
            )}

            <Box sx={{ display: "flex" }}>
              {p.totalTime && (
                <Box sx={{ display: "flex", p: 1 }}>
                  <AccessAlarmIcon />
                  <Typography>{p.totalTime}</Typography>
                </Box>
              )}

              {p.seasonality?.name && (
                <Box sx={{ display: "flex", p: 1 }}>
                  <ContrastIcon />
                  <Typography>{p.seasonality.name}</Typography>
                </Box>
              )}

              {p.difficulty?.name && (
                <Box sx={{ display: "flex", p: 1 }}>
                  <FitnessCenterIcon />
                  <Typography>{p.difficulty.name}</Typography>
                </Box>
              )}
            </Box>
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
