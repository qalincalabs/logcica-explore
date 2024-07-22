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
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import EuroIcon from '@mui/icons-material/Euro';
import Layout from "../components/layout";
import ContrastIcon from '@mui/icons-material/Contrast';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import FiberSmartRecordIcon from '@mui/icons-material/FiberSmartRecord';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

import Markdown from "markdown-to-jsx";

export default function RecipeTemplate({ data }: any) {
  const recipe = data.recipe;

  return (
    <Layout>
      <Box
        sx={{
          p: 2
        }}
      >

        <Typography align="center" variant="h3" component="h3" sx={{ mb: 3 }}>
          {recipe.name}
        </Typography>

        {recipe.description?.short?.markdown &&(
          <Paper elevation={7}>
          <Typography sx={{ fontSize: 'h6.fontSize', textAlign: 'center' }}>
            {recipe.description.short.markdown}
          </Typography>
          </Paper>
        )}

        <Grid container spacing={2}>
          <Grid xs={8}>
            <InformationsListCard recipe={recipe} />
          </Grid>
          <Grid xs={4}>
            <CreatorsListCard recipe={recipe} />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid xs={2}>
            <IngredientListCard recipe={recipe} />
          </Grid>
          <Grid xs={8}>
            <StepsCard recipe={recipe} />
          </Grid>
          <Grid xs={2}>
            <CookTimeListCard recipe={recipe} />
          </Grid>
        </Grid>

      </Box>
    </Layout>
  );
}

export function CreatorsListCard({ recipe }: any) {
  return (
    <Box sx={{
      p: 2,
      m: 2
    }}>
      <Paper
        elevation={7}
        square={false}
        sx={{ display: 'flex', justifyContent: 'space-around' }}
      >
        {recipe.author?.partnership?.name && (
          <CardContent >
            <SubtitleTemplate text={"Partnership"} />
            <Typography sx={{ textAlign: 'center' }}>
              {recipe.author.partnership.name}
            </Typography>
          </CardContent>
        )}

        <CardContent>
          <SubtitleTemplate text={"Organisation"} />
          <Typography sx={{ textAlign: 'center' }}>
            {recipe.author.organisation.name}
          </Typography>
        </CardContent>

      </Paper>
    </Box>
  )
}

export function StepsCard({ recipe }: any) {
  return (
    <Box sx={{
      p: 2,
      m: 1
    }}>
      <Paper
        elevation={7}
        sx={{ display: 'flex', justifyContent: 'space-around' }}
      >
        <Typography>
          {recipe.stepStatement.short.markdown}
        </Typography>
      </Paper>
    </Box>
  )
}

export function InformationsListCard({ recipe }: any) {
  return (
    <Box sx={{
      p: 2,
      m: 2
    }}>
      <Paper
        elevation={7}
        sx={{ display: 'flex', justifyContent: 'space-around' }}
      >
        <CardContent sx={{ display: 'flex' }}>
          <Stack sx={{ p: 2 }}>
            {/* <EuroIcon sx={{fontSize: 30}}/> */}
            <FitnessCenterIcon sx={{ fontSize: 30 }} />
          </Stack>
          <Stack>
            <SubtitleTemplate text={"Difficulty"} />
            <Typography sx={{ textAlign: 'center' }}>
              {recipe.difficulty.name}
            </Typography>
          </Stack>
        </CardContent>

        <CardContent sx={{ display: 'flex' }}>
          <Stack sx={{ p: 2 }}>
            <ContrastIcon sx={{ fontSize: 30 }} />
            {/* <EditCalendarIcon sx={{fontSize: 30}}/> */}
            {/* <FiberSmartRecordIcon sx={{fontSize: 30}}/> */}
          </Stack>
          <Stack>
            <SubtitleTemplate text={"Seasonality"} />
            <Typography sx={{ textAlign: 'center' }}>
              {recipe.seasonality.name}
            </Typography>
          </Stack>
        </CardContent>

        <CardContent sx={{ display: 'flex' }}>
          <Stack sx={{ p: 2 }}>
            {/* <EuroIcon sx={{fontSize: 30}}/> */}
            <MonetizationOnIcon sx={{ fontSize: 30 }} />
          </Stack>
          <Stack>
            <SubtitleTemplate text={"costCategory"} />
            <Typography sx={{ textAlign: 'center' }}>
              {recipe.costCategory.name}
            </Typography>
          </Stack>
        </CardContent>

      </Paper>
    </Box>
  )
}

export function CookTimeListCard({ recipe }: any) {
  return (
    <Box sx={{
      p: 2,
      m: 1
    }}>
      <Paper
        elevation={7}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <AccessAlarmsIcon sx={{ fontSize: 30 }} />
        <Typography sx={{ textAlign: 'center' }}>
          <SubtitleTemplate text={"Total Time"} />
          {recipe.totalTime}
        </Typography>
        <Typography sx={{ textAlign: 'center' }}>
          <SubtitleTemplate text={"Prep Time"} />
          {recipe.prepTime}
        </Typography>
        <Typography sx={{ textAlign: 'center' }}>
          <SubtitleTemplate text={"Cook Time"} />
          {recipe.cookTime}
        </Typography>
      </Paper>
    </Box>

  )
}

export function IngredientListCard({ recipe }: any) {
  return (
    <Box sx={{
      p: 2,
      m: 1
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
`;
