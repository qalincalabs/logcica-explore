import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ContrastIcon from "@mui/icons-material/Contrast";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { graphql, HeadFC, navigate, type PageProps } from "gatsby";
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
        {p.mainImage?.url ? (
          <Avatar src={p.mainImage?.url}></Avatar>
        ) : (
          <Avatar>
            <RestaurantIcon />
          </Avatar>
        )}
      </ListItemAvatar>
      <ListItemText
        primary={p.name}
        secondary={
          <>
            {p.author?.organisation?.name && (
              <Typography
                variant="subtitle1"
                component={"span"}
                display="inline-block"
              >
                {p.author.organisation.name}
              </Typography>
            )}

            {p.description?.short?.markdown && (
              <>
                {p.author?.organisation?.name && <br />}
                <Typography
                  variant="subtitle2"
                  component={"span"}
                  display="inline-block"
                >
                  {p.description.short.markdown}
                </Typography>
              </>
            )}

            <>
              {p.description?.short?.markdown && <br />}
              {p.totalTime && (
                <Typography
                  variant="subtitle2"
                  component={"span"}
                  sx={{
                    marginRight: 1,
                    verticalAlign: "middle",
                    display: "inline-flex",
                  }}
                >
                  <AccessAlarmIcon fontSize="small" /> {p.totalTime}
                </Typography>
              )}

              {p.seasonality?.name && (
                <Typography
                  variant="subtitle2"
                  component={"span"}
                  sx={{
                    marginRight: 1,
                    verticalAlign: "middle",
                    display: "inline-flex",
                  }}
                >
                  <ContrastIcon fontSize="small" /> {p.seasonality.name}
                </Typography>
              )}

              {p.difficulty?.name && (
                <Typography
                  variant="subtitle2"
                  component={"span"}
                  sx={{
                    marginRight: 1,
                    verticalAlign: "middle",
                    display: "inline-flex",
                  }}
                >
                  <FitnessCenterIcon fontSize="small" /> {p.difficulty.name}
                </Typography>
              )}
            </>
          </>
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
        categories {
          name
        }
        author {
          organisation {
            name
          }
          partnership {
            name
          }
        }
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
        mainImage {
          filename
        }
      }
    }
  }
`;
