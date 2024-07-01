import * as React from "react";
import { graphql, Link, type HeadFC, type PageProps, navigate } from "gatsby";
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
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Layout from "../components/layout";
import { Store, Star, StarBorder } from "@mui/icons-material";
import Markdown from "markdown-to-jsx";

const backgroundColor = '#FFD700'; // Couleur de fond pour le bouton et la barre de filtres
const textColor = '#000000'; // Couleur de texte pour le bouton et la barre de filtres

const PartnershipPage = ({ data }: any) => {
  const [favorites, setFavorites] = React.useState<string[]>(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('partnershipFavorites') || '[]');
    return storedFavorites;
  });

  const [showFavorites, setShowFavorites] = React.useState(false);

  const toggleFavorite = (id: string) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter(fav => fav !== id)
      : [...favorites, id];

    setFavorites(updatedFavorites);
    localStorage.setItem('partnershipFavorites', JSON.stringify(updatedFavorites));
  };

  const filteredPartnerships = showFavorites
    ? data.partnerships.nodes.filter((p: any) => favorites.includes(p._id))
    : data.partnerships.nodes;

  return (
    <Layout>
      <Typography align="center" variant="h3">
        Groupements
      </Typography>
      <Box sx={{ 
        padding: '10px 20px', 
        backgroundColor: backgroundColor, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottom: '1px solid #ccc',
        marginBottom: '20px',
        color: textColor // Couleur du texte de la barre de filtres
      }}>
        <Box sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: textColor }}>Filtres :</Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={showFavorites}
              onChange={() => setShowFavorites(!showFavorites)}
              name="showFavoritesOnly"
              sx={{
                color: textColor,
                '&.Mui-checked': {
                  color: textColor,
                },
                '& .MuiSvgIcon-root': {
                  fill: '#FFFFFF',
                },
              }}
            />
          }
          label="Afficher uniquement les favoris"
          sx={{ color: textColor }}
        />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <List>
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
                <IconButton onClick={() => toggleFavorite(p._id)}>
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
