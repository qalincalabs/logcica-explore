import React, { useState, useEffect } from "react";
import { graphql, PageProps, navigate } from "gatsby";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
  ListItemIcon,
  Grid,
  ButtonGroup,
  Button,
  Tooltip,
  Drawer,
  Hidden,
  CssBaseline,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Store, Delete, GetApp, PictureAsPdf, DeleteForever, Menu, ArrowUpward, ArrowDownward } from "@mui/icons-material";
import Layout from "../components/layout";
import * as favoriteService from "../utils/favoritesService";
import { exportToJSON, exportToXLSX, exportToPDF } from "../utils/exportUtils";

const LOCAL_STORAGE_KEY = "favoritesPageSectionsOrder";

// Utility functions
const generateShareText = (favorites, data) => {
  const sections = [
    { key: 'partnerships', title: 'Groupements', nodes: data.partnerships.nodes },
    { key: 'counters', title: 'Marchés', nodes: data.marketplaces.nodes },
    { key: 'activities', title: 'Producteurs', nodes: data.activities.nodes },
    { key: 'products', title: 'Produits', nodes: data.products.nodes },
  ];

  return sections.reduce((text, { key, title, nodes }) => {
    if (favorites[key]?.length) {
      text += `${title}:\n${favorites[key].map(id => `•⁠  ⁠${nodes.find(p => p._id === id)?.name}\n`).join('')}\n`;
    }
    return text;
  }, "Mes Favoris:\n\n");
};

const createFilteredList = (favorites, filterKey, dataKey) => (
  filterKey ? favorites.filter(f => f.targetType === dataKey) : []
);

const FavoritesList = ({ title, favorites, handleItemClick, handleRemoveFavorite, dataKey, dataNodes, moveSection, index, totalSections }) => (
  !favorites.length ? null : (
    <Grid item xs={12}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ color: '#333', mb: 2 }}>{title}</Typography>
        <Box>
          <IconButton onClick={() => moveSection(index, -1)} disabled={index === 0}>
            <ArrowUpward />
          </IconButton>
          <IconButton onClick={() => moveSection(index, 1)} disabled={index === totalSections - 1}>
            <ArrowDownward />
          </IconButton>
        </Box>
      </Box>
      <List>
        {favorites.map((item) => {
          const dataNode = dataNodes.find(p => p._id === item.targetId);
          return (
            <ListItem 
              key={item.targetId} 
              onClick={() => handleItemClick(dataKey, item.targetId, dataNode?._id)} 
              sx={{ 
                transition: 'transform 0.3s, box-shadow 0.3s', 
                '&:hover': { transform: 'scale(1.02)', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)' },
                borderRadius: '8px',
                mb: 2,
                bgcolor: '#fff',
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#FFD700', color: '#fff' }}>
                    <Store />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={dataNode?.name || `${title} inconnu`} sx={{ color: '#555' }} />
                <ListItemIcon>
                  <IconButton onClick={(e) => { e.stopPropagation(); handleRemoveFavorite(item.targetId, dataKey, item.listId); }}>
                    <Delete />
                  </IconButton>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Grid>
  )
);

const FavoritesPage: React.FC<PageProps> = ({ data }: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const refreshFavorites = () => favoriteService.allLists().reduce((acc, list) => {
    acc[list.id] = favoriteService.findItems({ listIds: [list.id] });
    return acc;
  }, {} as { [key: string]: any[] });

  const [favorites, setFavorites] = useState<{ [key: string]: any[] }>(refreshFavorites());
  const [shareText, setShareText] = useState(generateShareText(favorites, data));
  const [filter, setFilter] = useState({ partnership: true, marketplace: true, activity: true, product: true });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedList, setSelectedList] = useState("default");
  const [sectionsOrder, setSectionsOrder] = useState(() => {
    const savedOrder = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedOrder ? JSON.parse(savedOrder) : ["partnership", "marketplace", "activity", "product"];
  });

  useEffect(() => {
    const updatedFavorites = refreshFavorites();
    setFavorites(updatedFavorites);
    setShareText(generateShareText(updatedFavorites, data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sectionsOrder));
  }, [sectionsOrder]);

  const handleRemoveFavorite = (id: string, type: string, listId: string) => {
    favoriteService.removeItemFromList({ targetType: type, targetId: id, listId });
    const updatedFavorites = refreshFavorites();
    setFavorites(updatedFavorites);
    setShareText(generateShareText(updatedFavorites, data));
  };

  const handleRemoveFavoriteList = (listId: string) => {
    favoriteService.removeList({ id: listId });
    const updatedFavorites = refreshFavorites();
    setFavorites(updatedFavorites);
    setShareText(generateShareText(updatedFavorites, data));
  };

  const handleItemClick = (type: string, id: string, activityId?: string) => {
    switch (type) {
      case 'product':
        navigate(`/activity/${activityId}#${id}`);
        break;
      case 'counter':
        navigate(`/marketplace/${id}`);
        break;
      default:
        navigate(`/${type}/${id}`);
        break;
    }
  };

  const handleFilterChange = (name: string) => setFilter(prev => ({ ...prev, [name]: !prev[name] }));

  const handleListSelect = (listId: string) => {
    setSelectedList(listId);
    setDrawerOpen(false);
  };

  const moveSection = (index: number, direction: number) => {
    const newOrder = [...sectionsOrder];
    const [removed] = newOrder.splice(index, 1);
    newOrder.splice(index + direction, 0, removed);
    setSectionsOrder(newOrder);
  };

  const filters = [
    { key: 'partnership', title: 'Groupements', dataKey: 'partnership', dataNodes: data.partnerships.nodes },
    { key: 'marketplace', title: 'Marchés', dataKey: 'counter', dataNodes: data.marketplaces.nodes },
    { key: 'activity', title: 'Producteurs', dataKey: 'activity', dataNodes: data.activities.nodes },
    { key: 'product', title: 'Produits', dataKey: 'product', dataNodes: data.products.nodes },
  ];

  const filteredFavorites = sectionsOrder.map(sectionKey => {
    const { key, dataKey } = filters.find(f => f.key === sectionKey);
    return createFilteredList(favorites[selectedList] || [], filter[key], dataKey);
  });

  const exportFavorites = (format: 'json' | 'xlsx' | 'pdf') => {
    const selectedListName = allLists.find(list => list.id === selectedList)?.name || 'favorites';
    const favoritesData = sectionsOrder.reduce((acc, sectionKey, index) => {
      const { key, dataKey, dataNodes } = filters.find(f => f.key === sectionKey);
      acc[key] = filteredFavorites[index].map(item => {
        const node = dataNodes.find((p: any) => p._id === item.targetId);
        const activity = key === 'activities' ? { activityId: node?._id, activityName: node?.name } : { 
          activityId: node?.producer?.activity?._id,
          activityName: node?.producer?.activity?.name 
        };
        return { 
          id: node?._id,
          name: node?.name,
          ...activity
        };
      });
      return acc;
    }, {} as Record<string, any[]>);
    
    const exportFunctions = { json: exportToJSON, xlsx: exportToXLSX, pdf: exportToPDF };
    exportFunctions[format](favoritesData, selectedListName);
  };

  const allLists = favoriteService.allLists();

  const drawerContent = (
    <Box sx={{ height: '100%', bgcolor: 'lightgray', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box p={2} width="100%">
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#000', textAlign: 'center' }}>Listes de Favoris</Typography>
        <List>
          {allLists.map(list => (
            <ListItem 
              button 
              key={list.id} 
              onClick={() => handleListSelect(list.id)}
              sx={{ borderRadius: '8px', mb: 1, bgcolor: selectedList === list.id ? '#FFD700' : 'transparent', color: selectedList === list.id ? '#fff' : '#000', transition: 'background-color 0.3s, color 0.3s' }}
            >
              <ListItemText primary={list.name} />
              {list.id !== 'default' && (
                <IconButton onClick={(e) => { e.stopPropagation(); handleRemoveFavoriteList(list.id); }}>
                  <DeleteForever />
                </IconButton>
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <Layout>
      <CssBaseline />
      <Grid container sx={{ height: '100vh' }}>
        <Hidden smDown>
          <Grid item xs={12} md={3} lg={2}>
            <Box sx={{ height: '100%', bgcolor: 'lightgray' }}>
              {drawerContent}
            </Box>
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            {drawerContent}
          </Drawer>
        </Hidden>
        <Grid item xs={12} md={9} lg={10} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box>
            <Box display="flex" alignItems="center" mb={2}>
              <Hidden smUp>
                <IconButton onClick={() => setDrawerOpen(true)}>
                  <Menu />
                </IconButton>
              </Hidden>
              <Typography align="center" variant="h3" my={4} sx={{ flexGrow: 1, fontWeight: 'bold', color: '#FFD700' }}>Mes Favoris</Typography>
            </Box>
            <Box display="flex" justifyContent="center" my={2}>
              <ButtonGroup variant="outlined">
                {filters.map(({ title, key }) => (
                  <Button key={title} onClick={() => handleFilterChange(key)}
                    sx={{ color: 'black', backgroundColor: filter[key] ? 'rgba(0, 0, 0, 0.1)' : 'transparent', fontWeight: 'bold' }}>
                    {title}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>
            <Box display="flex" justifyContent="center" my={2}>
              {['json', 'xlsx', 'pdf'].map(format => (
                <Tooltip key={format} title={`Exporter en ${format.toUpperCase()}`}>
                  <IconButton onClick={() => exportFavorites(format)} sx={{ backgroundColor: '#FFD700', color: 'black' }}>
                    {format === 'pdf' ? <PictureAsPdf /> : <GetApp />}
                    <Typography variant="button" sx={{ ml: 1, fontWeight: 'bold' }}>{format.toUpperCase()}</Typography>
                  </IconButton>
                </Tooltip>
              ))}
            </Box>
            <Box p={2} width="100%" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
              <Grid container spacing={2} justifyContent="center" alignItems="flex-start">
                {sectionsOrder.map((sectionKey, index) => {
                  const { title, dataKey, dataNodes } = filters.find(f => f.key === sectionKey);
                  return (
                    <FavoritesList key={title} title={title} favorites={filteredFavorites[index]} handleItemClick={handleItemClick}
                      handleRemoveFavorite={(id) => handleRemoveFavorite(id, dataKey, selectedList)}
                      dataKey={dataKey} dataNodes={dataNodes}
                      moveSection={moveSection} index={index} totalSections={sectionsOrder.length} />
                  );
                })}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default FavoritesPage;

export const query = graphql`
  query {
    marketplaces: allMongodbCounters(filter: { type: { eq: "marketplace" } }) {
      nodes {
        _id
        name
      }
    }
    products: allMongodbProducts { 
      nodes {
        _id
        name
        producer {	
          activity {	
            _id	
            name	
          }	
        }
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
