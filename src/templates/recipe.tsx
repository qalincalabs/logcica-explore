import React from "react";
import { graphql } from "gatsby";
import {
  Box,
  CardContent,
  Grid,
  Paper,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
  ListItemIcon
} from "@mui/material";
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import Layout from "../components/layout";
import ContrastIcon from '@mui/icons-material/Contrast';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


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

          {(recipe.author?.organisation?.name || recipe.author?.partnership?.name) && (
            <Grid item xs={12} sm={4}>
              <AuthorListCard recipe={recipe} />
            </Grid>
          )}

          {(recipe.difficulty?.name || recipe.seasonality?.name || recipe.costCategory?.name) && (
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

          {recipe.ingredientList && (
            <Grid item xs={12} md={3}>
              <IngredientListCard recipe={recipe} />
            </Grid>
          )}

          {recipe.stepStatement?.short?.markdown && (
            <Grid item xs={12} md={9}>
              <StepsCard recipe={recipe} />
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
      <Paper elevation={7}  sx={{ height: '100%' }}>
        <CardContent >
          <Typography sx={{ fontSize: 'h6.fontSize', textAlign: 'center' }}>
            {recipe.description.short.markdown}
          </Typography>
        </CardContent>
      </Paper>
    </Box>
  )
}

export function AuthorListCard({ recipe }: any) {
  return (
    <Box sx={{ m: 1 }}>
      <Paper
        elevation={7}
        square={false}
        sx={{ display: 'flex', justifyContent: 'space-around' }}
      >
        {recipe.author?.partnership?.name && (
          <CardContent >
            <SubtitleTemplate text={"Partenariat"} />
            <Typography sx={{ textAlign: 'center' }}>
              {recipe.author.partnership.name}
            </Typography>
          </CardContent>
        )}

        {recipe.author?.organisation?.name && (
          <CardContent>
            <SubtitleTemplate text={"Entreprise"} />
            <Typography sx={{ textAlign: 'center' }}>
              {recipe.author.organisation.name}
            </Typography>
          </CardContent>
        )}

      </Paper>
    </Box>
  )
}

export function StepsCard({ recipe }: any) {
  let stepCount = 1;
  return (
    <Box sx={{
      m: 1,
      flexGrow: 1
    }}>
      <Paper
        elevation={7}
        sx={{ display: 'flex', justifyContent: 'space-around', height: '100%' }}
      >
        <Stack>
          <SubtitleTemplate text={"Étapes"} />
          <Typography>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]} //remark = parseur Markdown. Iic on fournit un plugin ('remarkGfm')
                components={{
                  ol: ({ node, ...props}) => {
                    return (
                      <Box component="ol" sx={{ paddingLeft: '1.5rem' }} {...props} />
                    )
                  },
                  li: ({ node, ...props}) => {
                    return (
                      <Box component="li" sx={{marginBottom: '1rem', '&::marker': { fontWeight: 'bold', color: '#ffcb01' }}}{...props}>
                        <Typography variant="body1" component="span" {...props} />
                      </Box>
                    )
                  }
                }}
            >
                {recipe.stepStatement.short.markdown}
            </ReactMarkdown>
          </Typography>
        </Stack>
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
        sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center' }}
      >

        {recipe.difficulty?.name && (
          <CardContent sx={{ display: 'flex' }}>
            <Stack sx={{ p: 2 }}>
              {/* <EuroIcon sx={{fontSize: 30}}/> */}
              <FitnessCenterIcon sx={{ fontSize: 30 }} />
            </Stack>
            <Stack>
              <SubtitleTemplate text={"Difficulté"} />
              <Typography sx={{ textAlign: 'center' }}>
                {recipe.difficulty.name}
              </Typography>
            </Stack>
          </CardContent>
        )}

        {recipe.seasonnality?.name && (
          <CardContent sx={{ display: 'flex' }}>
            <Stack sx={{ p: 2 }}>
              <ContrastIcon sx={{ fontSize: 30 }} />
              {/* <EditCalendarIcon sx={{fontSize: 30}}/> */}
              {/* <FiberSmartRecordIcon sx={{fontSize: 30}}/> */}
            </Stack>
            <Stack>
              <SubtitleTemplate text={"Saison"} />
              <Typography sx={{ textAlign: 'center' }}>
                {recipe.seasonality.name}
              </Typography>
            </Stack>
          </CardContent>
        )}

        {recipe.costCategory?.name && (
          <CardContent sx={{ display: 'flex' }}>
            <Stack sx={{ p: 2 }}>
              {/* <EuroIcon sx={{fontSize: 30}}/> */}
              <MonetizationOnIcon sx={{ fontSize: 30 }} />
            </Stack>
            <Stack>
              <SubtitleTemplate text={"Coût"} />
              <Typography sx={{ textAlign: 'center' }}>
                {recipe.costCategory.name}
              </Typography>
            </Stack>
          </CardContent>
        )}
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
        sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-evenly', height: '100%' }}
      >
        <AccessAlarmsIcon sx={{ fontSize: 30 }} />

        {recipe.totalTime && (
          <CardContent sx={{ display: 'flex' }}>
            <Typography sx={{ textAlign: 'center' }}>
              <SubtitleTemplate text={"Total"} />
              {recipe.totalTime + "'"}
            </Typography>
          </CardContent>
        )}

        {recipe.prepTime && (
          <CardContent sx={{ display: 'flex' }}>
            <Typography sx={{ textAlign: 'center' }}>
              <SubtitleTemplate text={"Prep."} />
              {recipe.prepTime + "'"}
            </Typography>
          </CardContent>
        )}

        {recipe.cookTime && (
          <CardContent sx={{ display: 'flex' }}>
            <Typography sx={{ textAlign: 'center' }}>
              <SubtitleTemplate text={"Cuisson"} />
              {recipe.cookTime + "'"}
            </Typography>
          </CardContent>
        )}

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

        <List sx={{ display: 'flex', flexFlow: { xs: 'row wrap', md: 'column nowrap' }, overflow: 'auto' }}>
          {recipe.ingredientList.map((ingredient: any) => {
            return (
              <ListItem key={ingredient} disablePadding sx={{ width: { xs: '50%', md: '100%' } }} >
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
