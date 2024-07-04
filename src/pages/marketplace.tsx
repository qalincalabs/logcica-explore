import React, { useState, useEffect } from "react";
import { graphql, navigate, PageProps } from "gatsby";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  IconButton,
  Drawer,
  ListItemIcon,
  FormControlLabel,
  Checkbox,
  Divider,
  Button,
  ButtonGroup,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import Layout from "../components/layout";
import {
  Store,
  Star,
  StarBorder,
  Favorite,
  Delete,
  FilterAlt,
  Close
} from "@mui/icons-material";
import Markdown from "markdown-to-jsx";
import * as favoriteService from "../utils/favoritesService";

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  '&.Mui-checked': {
    color: 'black',
  },
  '&.MuiCheckbox-root': {
    color: 'white',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 28,
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderRadius: '50%',
  },
  transition: theme.transitions.create(['background-color', 'border']),
}));

const FilterBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  border: '1px solid lightgrey',
  borderRadius: 8,
  backgroundColor: '#FFD700',
  display: 'flex',
  alignItems: 'center',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  backgroundColor: '#FFD700',
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

type FavoriteData = {
  activities: string[];
  products: string[];
  counters: string[];
  partnerships: string[];
};

const MarketplacePage: React.FC<PageProps> = ({ data }: any) => {

  const getFavorites = () => favoriteService.findItems({targetTypes: ['counter']}).map(e => e.targetId)

  const [favorites, setFavorites] = useState<string[]>(getFavorites);

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const handleShowFavoritesOnlyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowFavoritesOnly(event.target.checked);
  };

  const filteredMarketplaces = showFavoritesOnly
    ? data.marketplaces.nodes.filter((m: any) => favorites.includes(m._id))
    : data.marketplaces.nodes;

  return (
    <Layout>
      <Box display="flex" justifyContent="center" alignItems="center" my={4}>
        <Typography align="center" variant="h3" mr={2}>
          Marchés
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ButtonGroup variant="outlined">
          <Button disabled>
            <FilterAlt />
          </Button>
          <Button>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showFavoritesOnly}
                  onChange={handleShowFavoritesOnlyChange}
                  name="showFavoritesOnly"
                />
              }
              label="Favoris"
            />
          </Button>
        </ButtonGroup>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <List>
          {filteredMarketplaces.map((m: any) => (
            <ListItem key={m._id}>
              <ListItemButton onClick={() => navigate("/marketplace/" + m._id)}>
                <ListItemAvatar>
                  <Avatar>
                    <Store />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={m.name}
                  secondary={
                    <Stack>
                      <Typography>
                        {m.availabilityStatement.short.markdown}
                      </Typography>
                      {m.description && (
                        <Markdown>{m.description.short.markdown}</Markdown>
                      )}
                    </Stack>
                  }
                />
              </ListItemButton>
              <ListItemIcon>
                <IconButton onClick={() => {
                  favoriteService.assignItemToList({targetType: 'counter', targetId: m._id, assign: !favorites.includes(m._id)})
                  setFavorites(getFavorites())
                }}>
                  {favorites.includes(m._id) ? (
                    <Star />
                  ) : (
                    <StarBorder />
                  )}
                </IconButton>
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Box>
    </Layout>
  );
};

export default MarketplacePage;

export const Head: HeadFC = () => <title>Marchés</title>;

export const query = graphql`
  query {
    marketplaces: allMongodbCounters(filter: { type: { eq: "marketplace" } }) {
      nodes {
        _id
        name
        description {
          short {
            markdown
          }
        }
        place {
          address {
            street
            locality
          }
        }
        availabilityStatement {
          short {
            markdown
          }
        }
        profiles {
          localKey
          type
          link
        }
      }
    }
    products: allMongodbProducts { 
      nodes {
        _id
        name
      }
    }
    partnerships: allMongodbPartnerships {
      nodes {
        _id
        name
      }
    }
    activities: allMongodbActivities {
      nodes {
        _id
        name
      }
    }
  }
`;
