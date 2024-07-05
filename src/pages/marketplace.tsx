import React, { useState } from "react";
import { graphql, HeadFC, navigate, PageProps } from "gatsby";
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
  ListItemIcon,
} from "@mui/material";
import Layout from "../components/layout";
import {
  Store,
  Star,
  StarBorder,
} from "@mui/icons-material";
import Markdown from "markdown-to-jsx";
import * as favoriteService from "../utils/favoritesService";
import FilterBar from "../components/filter-bar";

const MarketplacePage: React.FC<PageProps> = ({ data }: any) => {

  const getFavorites = () => favoriteService.findItems({targetTypes: ['counter']}).map(e => e.targetId)

  const [favorites, setFavorites] = useState<string[]>(getFavorites);

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

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
      <FilterBar favoriteFilterToggle={showFavoritesOnly} favoriteFilterToggleCallback={() => setShowFavoritesOnly(!showFavoritesOnly)} />
      <Box display="flex" justifyContent="center" alignItems="center">
        <List sx={{maxWidth: "1000px"}}>
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
