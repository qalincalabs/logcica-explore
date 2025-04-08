import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import ContrastIcon from "@mui/icons-material/Contrast";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import {
  Box,
  CardContent,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { graphql } from "gatsby";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AllergenList from "../components/allergen-list";
import ProfilesCard from "../components/cards/profiles-card";
import HeaderWithImage from "../components/header-with-image";
import Layout from "../components/layout";
import NutrientListTable from "../components/nutrient-list-table";
import SubtitleTemplate from "../components/subtitle-template";

export default function RecipeTemplate({ data }: any) {
  const recipe = data.recipe;

  return (
    <Layout>
      <Box
        sx={{
          p: 2,
        }}
      >
        <HeaderWithImage data={recipe} type={"recipe"} />
        <Grid container>
          {recipe.description?.short?.markdown && (
            <Grid item xs={12} sm={8} sx={{ display: "flex" }}>
              <DescriptionCard recipe={recipe} />
            </Grid>
          )}
          {(recipe.author?.organisation?.name ||
            recipe.author?.partnership?.name) && (
            <Grid item xs={12} sm={4}>
              <AuthorListCard recipe={recipe} />
            </Grid>
          )}
          {(recipe.difficulty?.name ||
            recipe.seasonality?.name ||
            recipe.costCategory?.name) && (
            <Grid item xs={12} sm={6}>
              <InformationsListCard recipe={recipe} />
            </Grid>
          )}
          {(recipe.cookTime || recipe.prepTime || recipe.totalTime) && (
            <Grid item xs={12} sm={6}>
              <CookTimeListCard recipe={recipe} />
            </Grid>
          )}
        </Grid>
        <Grid container>
          {recipe.ingredientList && recipe.ingredientList.length > 0 && (
            <Grid item xs={12} md={3}>
              <IngredientListCard recipe={recipe} />
            </Grid>
          )}
          {recipe.stepStatement?.long?.markdown && (
            <Grid item xs={12} md={9}>
              <StepsCard recipe={recipe} />
            </Grid>
          )}
        </Grid>
        <Grid container>
          {recipe.allergenList && recipe.allergenList.length > 0 && (
            <Grid item xs={12} sm={4} md={4} lg={3}>
              <AllergenListCard recipe={recipe} />
            </Grid>
          )}
          {recipe.nutrientList && recipe.nutrientList.length > 0 && (
            <Grid item xs={12} sm={5} md={5}>
              <NutrientListCard recipe={recipe} />
            </Grid>
          )}
          {recipe.profiles && recipe.profiles.length > 0 && (
            <Grid item xs={12} sm={7} md={4}>
              <ProfilesCard profiles={recipe.profiles} />
            </Grid>
          )}
        </Grid>
      </Box>
    </Layout>
  );
}

export function DescriptionCard({ recipe }: any) {
  return (
    <Box sx={{ m: 1, flexGrow: 1 }}>
      <Paper elevation={7} sx={{ height: "100%" }}>
        <CardContent>
          <Typography sx={{ fontSize: "h6.fontSize", textAlign: "center" }}>
            {recipe.description.short.markdown}
          </Typography>
        </CardContent>
      </Paper>
    </Box>
  );
}

export function AuthorListCard({ recipe }: any) {
  return (
    <Box sx={{ m: 1 }}>
      <Paper
        elevation={7}
        square={false}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { sm: "space-evenly" },
          alignItems: "center",
        }}
      >
        {recipe.author?.partnership?.name && (
          <CardContent>
            <SubtitleTemplate text={"Partenariat"} />
            <Typography sx={{ textAlign: "center" }}>
              {recipe.author.partnership.name}
            </Typography>
          </CardContent>
        )}
        {recipe.author?.organisation?.name && (
          <CardContent>
            <SubtitleTemplate text={"Entreprise"} />
            <Typography sx={{ textAlign: "center" }}>
              {recipe.author.organisation.name}
            </Typography>
          </CardContent>
        )}
      </Paper>
    </Box>
  );
}

export function StepsCard({ recipe }: any) {
  let stepCount = 1;
  return (
    <Box
      sx={{
        m: 1,
        flexGrow: 1,
      }}
    >
      <Paper
        elevation={7}
        sx={{ display: "flex", justifyContent: "space-around", height: "100%" }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]} //remark = parseur Markdown. Iic on fournit un plugin ('remarkGfm')
          components={{
            ol: ({ node, ...props }) => {
              return (
                <Box component="ul" sx={{ paddingLeft: "1.5rem" }} {...props} />
              );
            },
            li: ({ node, ...props }) => {
              const step = `Étape ${stepCount}`;
              stepCount += 1;
              return (
                <Box
                  component="li"
                  sx={{
                    marginBottom: "1rem",
                    "&::marker": { fontWeight: "bold", color: "#ffcb01" },
                  }}
                  {...props}
                >
                  <Typography sx={{ fontWeight: "bold", color: "#ffcb01" }}>
                    {step}
                  </Typography>
                  <Typography variant="body1" component="span" {...props} />
                </Box>
              );
            },
          }}
        >
          {recipe.stepStatement.long.markdown}
        </ReactMarkdown>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <ReceiptLongIcon sx={{ fontSize: 40 }} />
        </Box>
      </Paper>
    </Box>
  );
}

export function InformationsListCard({ recipe }: any) {
  return (
    <Box
      sx={{
        m: 1,
      }}
    >
      <Paper
        elevation={7}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {recipe.difficulty?.name && (
          <CardContent sx={{ display: "flex" }}>
            <Stack sx={{ p: 2 }}>
              <FitnessCenterIcon sx={{ fontSize: 30 }} />
            </Stack>
            <Stack>
              <SubtitleTemplate text={"Difficulté"} />
              <Typography sx={{ textAlign: "center" }}>
                {recipe.difficulty.name}
              </Typography>
            </Stack>
          </CardContent>
        )}
        {recipe.seasonnality?.name && (
          <CardContent sx={{ display: "flex" }}>
            <Stack sx={{ p: 2 }}>
              <ContrastIcon sx={{ fontSize: 30 }} />
            </Stack>
            <Stack>
              <SubtitleTemplate text={"Saison"} />
              <Typography sx={{ textAlign: "center" }}>
                {recipe.seasonality.name}
              </Typography>
            </Stack>
          </CardContent>
        )}
        {recipe.costCategory?.name && (
          <CardContent sx={{ display: "flex" }}>
            <Stack sx={{ p: 2 }}>
              <MonetizationOnIcon sx={{ fontSize: 30 }} />
            </Stack>
            <Stack>
              <SubtitleTemplate text={"Coût"} />
              <Typography sx={{ textAlign: "center" }}>
                {recipe.costCategory.name}
              </Typography>
            </Stack>
          </CardContent>
        )}
      </Paper>
    </Box>
  );
}

export function CookTimeListCard({ recipe }: any) {
  return (
    <Box
      sx={{
        m: 1,
        flexGrow: 1,
      }}
    >
      <Paper
        elevation={7}
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          height: "100%",
        }}
      >
        <AccessAlarmsIcon sx={{ fontSize: 30 }} />
        {recipe.totalTime && (
          <CardContent sx={{ display: "flex" }}>
            <Typography sx={{ textAlign: "center" }}>
              <SubtitleTemplate text={"Total"} />
              {recipe.totalTime + "'"}
            </Typography>
          </CardContent>
        )}
        {recipe.prepTime && (
          <CardContent sx={{ display: "flex" }}>
            <Typography sx={{ textAlign: "center" }}>
              <SubtitleTemplate text={"Prep."} />
              {recipe.prepTime + "'"}
            </Typography>
          </CardContent>
        )}
        {recipe.cookTime && (
          <CardContent sx={{ display: "flex" }}>
            <Typography sx={{ textAlign: "center" }}>
              <SubtitleTemplate text={"Cuisson"} />
              {recipe.cookTime + "'"}
            </Typography>
          </CardContent>
        )}
      </Paper>
    </Box>
  );
}

function getIngredientTitle(ingredient: any) {
  if (ingredient.title) return ingredient.title;

  if (!ingredient.quantity?.value) return ingredient.name;

  if (!ingredient.quantity?.unit?.name)
    return ingredient.quantity.value + " " + ingredient.name;

  return (
    ingredient.name +
    " - " +
    ingredient.quantity.value +
    " " +
    ingredient.quantity.unit.name
  );
}

export function IngredientListCard({ recipe }: any) {
  return (
    <Box
      sx={{
        m: 1,
        flexGrow: 1,
      }}
    >
      <Paper elevation={7} square={false}>
        <SubtitleTemplate text={"Ingrédients"} />
        <List
          sx={{
            display: "flex",
            flexFlow: { xs: "row wrap", md: "column nowrap" },
            overflow: "auto",
          }}
        >
          {recipe.ingredientList.map((ingredient: any) => {
            return (
              <ListItem
                key={ingredient}
                disablePadding
                sx={{ width: { xs: "50%", md: "100%" } }}
              >
                <ListItemButton role={undefined} dense>
                  <ListItemIcon>
                    <Checkbox edge="start" disableRipple />
                  </ListItemIcon>
                  <ListItemText
                    primary={getIngredientTitle(ingredient)}
                  ></ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </Box>
  );
}

export function AllergenListCard({ recipe }: any) {
  return (
    <Box
      sx={{
        m: 1,
        flexGrow: 1,
      }}
    >
      <Paper elevation={7} square={false}>
        <SubtitleTemplate text={"Allergènes"} />
        <Box
          sx={{
            display: "flex",
            alignItens: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            <AllergenList allergenList={recipe.allergenList} />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export function NutrientListCard({ recipe }: any) {
  return (
    <Box
      sx={{
        m: 1,
        flexGrow: 1,
      }}
    >
      <Paper elevation={7} square={false}>
        <SubtitleTemplate text={"Nutriments"} />
        <Box
          sx={{
            display: "flex",
            alignItens: "center",
            justifyContent: "center",
          }}
        >
          <NutrientListTable nutrientList={recipe.nutrientList} />
        </Box>
      </Paper>
    </Box>
  );
}

export const query = graphql`
  query ($id: String!) {
    recipe: mongodbRecipes(_id: { eq: $id }) {
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
        title
        name
        quantity {
          value
          unit {
            name
          }
        }
      }
      stepStatement {
        long {
          markdown
        }
      }
      mainImage {
        url
      }
      allergenList {
        allergen {
          _id
          name
        }
        containmentLevel {
          name
        }
      }
      nutrientList {
        nutrient {
          _id
          code
          name
        }
        quantity {
          value
          unit
        }
      }
      mainImage {
        url
      }
      profiles {
        link
        type
        key
        localKey
      }
    }
  }
`;
