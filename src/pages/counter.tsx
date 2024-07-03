import * as React from "react";
import { graphql, type HeadFC, type PageProps, navigate } from "gatsby";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import Layout from "../components/layout";
import { Store, Star, StarBorder } from "@mui/icons-material";
import { toggleFavorite, isFavoriteItem } from "../utils/favorite";

const CounterPage = ({ data }: any) => {
  const [favorites, setFavorites] = React.useState<string[]>([]);

  React.useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites.default') || '{"data": {"activities": [], "products": [], "counters": [], "partnerships": []}}');
    setFavorites(storedFavorites.data.counters);
  }, []);

  const handleToggleFavorite = (id: string) => {
    toggleFavorite('counters', id);
    const updatedFavorites = isFavoriteItem('counters', id)
      ? favorites.filter(fav => fav !== id)
      : [...favorites, id];
    setFavorites(updatedFavorites);
  };

  return (
    <Layout>
      <Typography align="center" variant="h3">
        Comptoirs
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center">
        <List>
          {data.marketplaces.nodes.map((m: any) => (
            <ListItem key={m._id}>
              <ListItemButton onClick={() => navigate("/marketplace/" + m._id)}>
                <ListItemAvatar>
                  <Avatar>
                    <Store />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={m.name}
                  secondary={m.availabilityStatement?.short?.markdown}
                />
                <IconButton onClick={(e) => { e.stopPropagation(); handleToggleFavorite(m._id); }}>
                  {favorites.includes(m._id) ? <Star /> : <StarBorder />}
                </IconButton>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Layout>
  );
};

export default CounterPage;

export const Head: HeadFC = () => <title>Marchés</title>;

export const query = graphql`
  query {
    marketplaces: allMongodbCounters(filter: { type: { ne: "marketplace" }, marketplace: { _id: { eq: null } } }) {
      nodes {
        _id
        name
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
  }
`;
