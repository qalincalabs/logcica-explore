import React, { useState } from "react";
import { graphql, navigate, type PageProps, type HeadFC } from "gatsby";
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
import { Store, Star, StarBorder } from "@mui/icons-material";
import * as favoriteService from "../utils/favoritesService";
import FilterBar from "../components/filter-bar";



const PartnershipPage: React.FC<PageProps> = ({ data }: any) => {

  const getFavorites = () => favoriteService.findItems({targetTypes: ['partnership']}).map(e => e.targetId)

  const [favorites, setFavorites] = useState<string[]>(getFavorites);

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredPartnerships = showFavoritesOnly
    ? data.partnerships.nodes.filter((m: any) => favorites.includes(m._id))
    : data.partnerships.nodes;

  return (
    <Layout>
      <Box display="flex" justifyContent="center" alignItems="center" my={4}>
        <Typography align="center" variant="h3" mr={2}>
          Groupements
        </Typography>
      </Box>
      <FilterBar favoriteFilterToggle={showFavoritesOnly} favoriteFilterToggleCallback={() => setShowFavoritesOnly(!showFavoritesOnly)} />
      <Box display="flex" justifyContent="center" alignItems="center">
        <List sx={{maxWidth: "1000px"}}>
          {filteredPartnerships.map((p: any) => (
            <ListItem key={p._id}>
              <ListItemButton onClick={() => navigate("/partnership/" + p._id)}>
                <ListItemAvatar>
                  <Avatar>
                    <Store />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={p.name}
                  secondary={
                    <Stack>
                      {p.area && <Typography sx={{fontWeight: 'bold'}}>{p.area.name}</Typography>}
                      {p.profiles.find(
                        (p: any) => p.description?.short && p.type == "website"
                      )?.description?.short && (
                        <Typography>
                          {
                            p.profiles.find(
                              (p: any) =>
                                p.description?.short && p.type == "website"
                            )?.description?.short?.markdown
                          }
                        </Typography>
                      )}
                    </Stack>
                  }
                />
              </ListItemButton>
              <ListItemIcon>
                <IconButton onClick={() => {
                  favoriteService.assignItemToList({targetType: 'partnership', targetId: p._id, assign: !favorites.includes(p._id)})
                  setFavorites(getFavorites())
                }}>
                  {favorites.includes(p._id) ? <Star /> : <StarBorder />}
                </IconButton>
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Box>
    </Layout>
  );
};

export default PartnershipPage;

export const Head: HeadFC = () => <title>Groupements</title>;

export const query = graphql`
  query {
    partnerships: allMongodbPartnerships(
      sort: [{ name: ASC }],
      filter: {
        categories: { elemMatch: { _id: { eq: "64d4ceeca4d6089295a8a753" } } }
      }
    ) {
      nodes {
        _id
        name
        area {
          name
        }
        profiles {
          type
          link
          description {
            short {
              markdown
            }
          }
        }
      }
    }
  }
`;
