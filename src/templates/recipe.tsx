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

        <Grid container>
          {recipe.description?.short?.markdown && (
            <Grid item xs={12} sm={8} sx={{ display: 'flex' }} >
              <DescriptionCard recipe={recipe} />
            </Grid>
          )}
          <Grid item xs={12} sm={4}>
            <CreatorsListCard recipe={recipe} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InformationsListCard recipe={recipe} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CookTimeListCard recipe={recipe} />
          </Grid>
          <Grid item xs={12} md={3}>
            <IngredientListCard recipe={recipe} />
          </Grid>
          <Grid item xs={12} md={9}>
            <StepsCard recipe={recipe} />
          </Grid>
        </Grid>

      </Box>
    </Layout>
  );
}

export function DescriptionCard({ recipe }: any) {
  return (
    <Box sx={{ m: 1, flexGrow: 1 }}>
      <Paper elevation={7} sx={{ height: '100%' }}>
        <Typography sx={{ fontSize: 'h6.fontSize', textAlign: 'center' }}>
          {recipe.description.short.markdown}
        </Typography>
      </Paper>
    </Box>
  )
}

export function CreatorsListCard({ recipe }: any) {
  return (
    <Box sx={{ m: 1 }}>
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
      m: 1,
      flexGrow: 1
    }}>
      <Paper
        elevation={7}
        sx={{ display: 'flex', justifyContent: 'space-around', height: '100%' }}
      >
        <Typography>
          <Markdown>
            {recipe.stepStatement.short.markdown}
          </Markdown>
        </Typography>
      </Paper>
    </Box>
  )
}

export function InformationsListCard({ recipe }: any) {
  return (
    <Box sx={{
      m: 1
    }}>
      <Paper
        elevation={7}
        sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: { xs: 'column', sm:'row' }, justifyContent: { sm: 'space-evenly'} , alignItems: 'center' }}
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
      m: 1,
      flexGrow: 1
    }}>
      <Paper
        elevation={7}
        sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', flexDirection: { xs: 'column', sm:'row' }, justifyContent: { sm: 'space-evenly'}, height: '100%' }}
      >
        <AccessAlarmsIcon sx={{ fontSize: 30 }} />

        <CardContent sx={{ display: 'flex' }}>
          <Typography sx={{ textAlign: 'center' }}>
            <SubtitleTemplate text={"Total Time"} />
            {recipe.totalTime}
          </Typography>
        </CardContent>

        <CardContent sx={{ display: 'flex' }}>
          <Typography sx={{ textAlign: 'center' }}>
            <SubtitleTemplate text={"Prep Time"} />
            {recipe.prepTime}
          </Typography>
        </CardContent>
        
        <CardContent sx={{ display: 'flex' }}>
          <Typography sx={{ textAlign: 'center' }}>
            <SubtitleTemplate text={"Cook Time"} />
            {recipe.cookTime}
          </Typography>
        </CardContent>
        
      </Paper>
    </Box>

  )
}

export function IngredientListCard({ recipe }: any) {
  return (
    <Box sx={{
      m: 1,
      flexGrow: 1
    }}>
      <Paper
        elevation={7}
        square={false}
        
      >
        <SubtitleTemplate text={"Ingrédients"} />

        <List sx= {{display: 'flex', flexFlow: { xs: 'row wrap', md: 'column nowrap'}, overflow: 'auto'}}>
          {recipe.ingredientList.map((ingredient) => {
            return (
              <ListItem key={ingredient} disablePadding sx={{width: 'auto'}} >
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
      {text}
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
