import React from "react";
import { graphql, navigate } from "gatsby";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  Link as MuiLink,
  Table,
  TableContainer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
  ListItemIcon
} from "@mui/material";
import {
  Email,
  Facebook,
  Language,
  Phone,
  Place,
  OpenInNew
} from "@mui/icons-material";
import Layout from "../components/layout";
import Markdown from "markdown-to-jsx";

export default function PartnershipTemplate({ data }: any) {
  const recipe = data.recipe;

  return (
    <Layout>
      <Box sx={{ p: 2 }}>

        <Typography align="center" variant="h3" component="h3" sx={{ mb: 3 }}>
          {recipe.name}
        </Typography>

        <Paper elevation={7}>
          <Typography sx={{ fontSize: 'h6.fontSize', textAlign: 'center' }}>
            {recipe.description.short.markdown}
          </Typography>
        </Paper>

        <InformationsListCard recipe={recipe} />

        <IngredientListCard recipe={recipe} />

      </Box>
    </Layout>
  );
}

export function InformationsListCard({ recipe }: any) {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "left",
      p: 2,
    }}>
      <Paper
        elevation={7}
        square={false}
        sx={{ display: 'flex' }}
      >
        <CardContent>
          <SubtitleTemplate text={"Difficulty"} />
          <Typography sx={{ textAlign: 'center' }}>
            {recipe.difficulty.name}
          </Typography>
        </CardContent>

        <CardContent>
          <SubtitleTemplate text={"Seasonality"} />
          <Typography sx={{ textAlign: 'center' }}>
            {recipe.seasonality.name}
          </Typography>
        </CardContent>

        <CardContent>
          <SubtitleTemplate text={"costCategory"} />
          <Typography sx={{ textAlign: 'center' }}>
            {recipe.costCategory.name}
          </Typography>
        </CardContent>

      </Paper>
    </Box>
  )
}

export function SubtitleTemplate({ text }: any) {
  return (
    <Typography
      sx={{
        textAlign: "center",
        color: "#ffcb01",
        fontFamily: "-apple-system, Roboto, sans-serif, serif",
        fontStyle: "bold",
      }}
      variant={"h6"}
    >
      {text} :
    </Typography>
  )
}


export function IngredientListCard({ recipe }: any) {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "left",
      p: 2,
    }}>
      <Paper
        elevation={7}
        square={false}
      >
        <Typography
          sx={{
            textAlign: "center",
            color: "#ffcb01",
            fontFamily: "-apple-system, Roboto, sans-serif, serif",
            fontStyle: "bold",
          }}
          variant={"h6"}
        >
          Ingrédients :
        </Typography>

        <List>
          {recipe.ingredientList.map((ingredient) => {
            return (
              <ListItem key={ingredient} disablePadding>
                <ListItemButton role={undefined} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={ingredient.name}></ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </Box>
  )
}

export const query = graphql`
  query ($id: String!) {
    recipe: mongodbRecipes(_id: { eq: $id }) {
      _id
      name
      area
      categories
      author {
        organisation {
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
`;
