import {
  ArrowDownward,
  ArrowUpward,
  Delete,
  DeleteForever,
  Edit,
  GetApp,
  Menu,
  PictureAsPdf,
  Share,
  Store,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  CssBaseline,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { graphql, navigate, PageProps } from "gatsby";
import LZString from "lz-string";
import React, { useEffect, useState } from "react";
import * as ActivityIcons from "../assets/activity-icons";
import ConfirmationDialog from "../components/ConfirmationDialog";
import Layout from "../components/layout";
import RenameDialog from "../components/RenameDialog";
import { exportToJSON, exportToPDF, exportToXLSX } from "../utils/exportUtils";
import * as favoriteService from "../utils/favoritesService";

const LOCAL_STORAGE_KEY = "favoritesPageSectionsOrder";

const typeNames = [
  "partnership",
  "marketplace",
  "activity",
  "product",
  "event",
  "recipe",
];

const getFilter = (data: any) => {
  return [
    {
      key: "partnership",
      otherKey: "partnerships",
      title: "Groupements",
      dataKey: "partnership",
      dataNodes: data.partnerships.nodes,
    },
    {
      key: "marketplace",
      otherKey: "counters",
      title: "Marchés",
      dataKey: "counter",
      dataNodes: data.marketplaces.nodes,
    },
    {
      key: "activity",
      otherKey: "activities",
      title: "Producteurs",
      dataKey: "activity",
      dataNodes: data.activities.nodes,
    },
    {
      key: "product",
      otherKey: "products",
      title: "Produits",
      dataKey: "product",
      dataNodes: data.products.nodes,
    },
    {
      key: "event",
      otherKey: "sessions",
      title: "Événements",
      dataKey: "session",
      dataNodes: data.events.nodes,
    },
    {
      key: "recipe",
      otherKey: "recipes",
      title: "Recettes",
      dataKey: "recipe",
      dataNodes: data.recipes.nodes,
    },
  ];
};

const generateShareText = (favorites: any, data: any) => {
  const sections = getFilter(data);

  return sections.reduce((text, { otherKey, title, nodes }: any) => {
    if (favorites[otherKey]?.length) {
      text += `${title}:\n${favorites[otherKey].map((id: string) => `•⁠  ⁠${nodes.find((p: any) => p._id === id)?.name}\n`).join("")}\n`;
    }
    return text;
  }, "Mes Favoris:\n\n");
};

const createFilteredList = (favorites: any, filterKey: any, dataKey: any) =>
  filterKey ? favorites.filter((f: any) => f.targetType === dataKey) : [];

const FavoritesList = ({
  title,
  favorites,
  handleItemClick,
  handleRemoveFavorite,
  dataKey,
  dataNodes,
  moveSection,
  index,
  totalSections,
}: any) =>
  !favorites.length ? null : (
    <Grid item xs={12}>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" sx={{ color: "#333", mb: 2 }}>
          {title}
        </Typography>
        <Box>
          <IconButton
            onClick={() => moveSection(index, -1)}
            disabled={index === 0}
          >
            <ArrowUpward />
          </IconButton>
          <IconButton
            onClick={() => moveSection(index, 1)}
            disabled={index === totalSections - 1}
          >
            <ArrowDownward />
          </IconButton>
        </Box>
      </Box>
      <List>
        {favorites.map((item: any) => {
          const dataNode = dataNodes.find((p: any) => p._id === item.targetId);
          return (
            <ListItem
              key={item.targetId}
              onClick={() =>
                handleItemClick(
                  dataKey,
                  item.targetId,
                  dataNode?.producer?.activity?._id,
                )
              }
              sx={{
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                },
                borderRadius: "8px",
                mb: 2,
                bgcolor: "#fff",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#FFD700", color: "#fff" }}>
                    {dataNode?.categories?.[0].key ==
                    "logcica.consolidation.activity.boulangerie" ? (
                      <ActivityIcons.BakeryIcon style={{ width: "1.3rem" }} />
                    ) : (
                      <Store />
                    )}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={dataNode?.name || `${title} inconnu`}
                  sx={{ color: "#555" }}
                />
                <ListItemIcon>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFavorite(item.targetId, dataKey);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Grid>
  );

const FavoritesPage: React.FC<PageProps> = ({ data, location }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const refreshFavorites = () =>
    favoriteService.allLists().reduce(
      (acc, list) => {
        acc[list.id] = favoriteService.findItems({ listIds: [list.id] });
        return acc;
      },
      {} as { [key: string]: any[] },
    );

  const [favorites, setFavorites] = useState<{ [key: string]: any[] }>(
    refreshFavorites(),
  );
  const [shareText, setShareText] = useState(
    generateShareText(favorites, data),
  );
  const [filter, setFilter] = useState(
    typeNames.map((n) => ({ collectionName: n, visible: true })),
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  const allLists = favoriteService.allLists();
  const [selectedList, setSelectedList] = useState("");
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [listToRename, setListToRename] = useState<string>();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [listToRemove, setListToRemove] = useState<string | null>(null);
  const [itemToRemove, setItemToRemove] = useState({ id: "", type: "" });

  const [sectionsOrder, setSectionsOrder] = useState(() => {
    if (typeof window == "undefined") return typeNames;
    const savedOrder = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedOrder ? JSON.parse(savedOrder) : typeNames;
  });

  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sectionsOrder));
  }, [sectionsOrder]);

  useEffect(() => {
    const updatedFavorites = refreshFavorites();
    setFavorites(updatedFavorites);
    setShareText(generateShareText(updatedFavorites, data));
  }, [data]);

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      setSelectedList(hash);
    } else {
      setSelectedList("default");
    }
  }, [location]);

  const handleRemoveFavorite = (id: string, type: string) => {
    setItemToRemove({ id, type });
    setConfirmDialogOpen(true);
  };

  const confirmRemoveFavorite = () => {
    const { id, type } = itemToRemove;
    favoriteService.removeItemFromList({
      targetType: type,
      targetId: id,
      listId: selectedList,
    });
    refresh();
    setConfirmDialogOpen(false);
  };

  const handleRemoveFavoriteList = (listId: string) => {
    setListToRemove(listId);
    setConfirmDialogOpen(true);
  };

  const confirmRemoveFavoriteList = () => {
    if (listToRemove) {
      favoriteService.removeList({ id: listToRemove });
      refresh();
      setListToRemove(null);
      setConfirmDialogOpen(false);
    }
  };

  const handleItemClick = (type: string, id: string, activityId?: string) => {
    navigate(getLink(type, id, activityId));
  };

  const getLink = (type: string, id: string, activityId?: string) => {
    switch (type) {
      case "product":
        return `/activity/${activityId}#${id}`;
      case "counter":
        return `/marketplace/${id}`;
      case "session":
        return `/event/${id}`;
      default:
        return `/${type}/${id}`;
    }
  };

  const handleFilterChange = (name: string) => {
    setFilter(
      filter.map((i) =>
        i.collectionName === name ? { ...i, visible: !i.visible } : i,
      ),
    );
  };

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

  const filters = getFilter(data);

  const filteredFavorites = sectionsOrder.map((sectionKey: string) => {
    const filterItem = filters.find((f) => f.key === sectionKey);
    if (!filterItem || !selectedList) {
      return [];
    }
    const { key, dataKey } = filterItem;
    return createFilteredList(
      favorites[selectedList] || [],
      filter.find((i) => i.collectionName == key)?.visible,
      dataKey,
    );
  });

  const exportFavorites = (format: "json" | "xlsx" | "pdf") => {
    const selectedListName =
      allLists.find((list) => list.id === selectedList)?.name || "favorites";

    const favoritesData = sectionsOrder.reduce(
      (acc: any, sectionKey: any, index: any) => {
        const { key, dataKey, dataNodes }: any = filters.find(
          (f) => f.key === sectionKey,
        );
        acc[key] = filteredFavorites[index].map((item: any) => {
          const node = dataNodes.find((p: any) => p._id === item.targetId);
          return {
            id: node._id,
            name: node?.name,
          };
        });
        return acc;
      },
      {} as Record<string, any[]>,
    );

    const exportFunctions = {
      json: exportToJSON,
      xlsx: exportToXLSX,
      pdf: exportToPDF,
    };
    exportFunctions[format](favoritesData, selectedListName);
  };

  const refresh = () => {
    const updatedFavorites = refreshFavorites();
    setFavorites(updatedFavorites);
    setShareText(generateShareText(updatedFavorites, data));
  };

  const generateShareURL = () => {
    const list = favoriteService.findListById(selectedList);
    const items = favoriteService.findItems({ listIds: [selectedList] });

    const exportedList = {
      ...list,
      data: items.reduce(
        (acc, curr) => {
          let { targetId, targetType } = curr;
          return {
            ...acc,
            [targetType]: [...(acc[targetType] || []), targetId],
          };
        },
        {} as Record<string, string[]>,
      ),
    };

    const compressedData = LZString.compressToEncodedURIComponent(
      JSON.stringify(exportedList),
    );
    return `${window.location.origin}/share/list/${compressedData}`;
  };

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        bgcolor: "lightgray",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box p={2} width="100%">
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 2, color: "#000", textAlign: "center" }}
        >
          Listes de Favoris
        </Typography>
        <List>
          {allLists.map((list) => (
            <ListItem
              button
              key={list.id}
              onClick={() => handleListSelect(list.id)}
              sx={{
                borderRadius: "8px",
                mb: 1,
                bgcolor: selectedList === list.id ? "#FFD700" : "transparent",
                color: selectedList === list.id ? "#fff" : "#000",
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              <ListItemText primary={list.name} />
              {list.id !== "default" && (
                <>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFavoriteList(list.id);
                    }}
                  >
                    <DeleteForever />
                  </IconButton>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setListToRename(list.id);
                      setRenameDialogOpen(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                </>
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
      <Grid container sx={{ height: "100vh" }}>
        <Hidden smDown>
          <Grid item xs={12} md={3} lg={2}>
            <Box sx={{ height: "100%", bgcolor: "lightgray" }}>
              {drawerContent}
            </Box>
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            {drawerContent}
          </Drawer>
        </Hidden>
        <Grid
          item
          xs={12}
          md={9}
          lg={10}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Box display="flex" alignItems="center" mb={2}>
              <Hidden smUp>
                <IconButton onClick={() => setDrawerOpen(true)}>
                  <Menu />
                </IconButton>
              </Hidden>
              <Typography
                align="center"
                variant="h3"
                my={4}
                sx={{ flexGrow: 1, fontWeight: "bold", color: "#FFD700" }}
              >
                Mes Favoris
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center" my={2}>
              <ButtonGroup
                variant="outlined"
                sx={{ flexWrap: "wrap", justifyContent: "center" }}
              >
                {filters.map(({ title, key }) => (
                  <Button
                    key={title}
                    onClick={() => handleFilterChange(key)}
                    sx={{
                      color: "black",
                      backgroundColor: filter.find(
                        (i) => i.collectionName == key,
                      )?.visible
                        ? "rgba(0, 0, 0, 0.1)"
                        : "transparent",
                      fontWeight: "bold",
                    }}
                  >
                    {title}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>
            <Box display="flex" justifyContent="center" my={2}>
              <ButtonGroup variant="outlined">
                {["json", "xlsx", "pdf"].map((format) => (
                  <Tooltip
                    key={format}
                    title={`Exporter en ${format.toUpperCase()}`}
                  >
                    <IconButton
                      onClick={() =>
                        exportFavorites(format as "json" | "xlsx" | "pdf")
                      }
                      sx={{ backgroundColor: "#FFD700", color: "black" }}
                    >
                      {format === "pdf" ? <PictureAsPdf /> : <GetApp />}
                      <Typography
                        variant="button"
                        sx={{ ml: 1, fontWeight: "bold" }}
                      >
                        {format.toUpperCase()}
                      </Typography>
                    </IconButton>
                  </Tooltip>
                ))}
                <Tooltip title="Partager">
                  <IconButton
                    onClick={() => {
                      const url = generateShareURL();
                      navigator.clipboard.writeText(url);
                      alert(`URL de partage copiée: ${url}`);
                    }}
                  >
                    <Share />
                  </IconButton>
                </Tooltip>
              </ButtonGroup>
            </Box>
            <Box
              p={2}
              width="100%"
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
            >
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="flex-start"
              >
                {selectedList &&
                  sectionsOrder.map((sectionKey: any, index: any) => {
                    const filterItem = filters.find(
                      (f) => f.key === sectionKey,
                    );
                    if (!filterItem) {
                      return null;
                    }
                    const { title, dataKey, dataNodes } = filterItem;

                    return (
                      <FavoritesList
                        key={title}
                        title={title}
                        favorites={filteredFavorites[index]}
                        handleItemClick={handleItemClick}
                        handleRemoveFavorite={(id: string) =>
                          handleRemoveFavorite(id, dataKey)
                        }
                        dataKey={dataKey}
                        dataNodes={dataNodes}
                        moveSection={moveSection}
                        index={index}
                        totalSections={sectionsOrder.length}
                      />
                    );
                  })}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <ConfirmationDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={
          listToRemove ? confirmRemoveFavoriteList : confirmRemoveFavorite
        }
        title="Confirmation de suppression"
        content={`Êtes-vous sûr de vouloir supprimer ${listToRemove ? "cette liste de favoris" : "cet élément de vos favoris"} ?`}
      />

      <RenameDialog
        listToRename={listToRename}
        open={renameDialogOpen}
        onClose={() => {
          setRenameDialogOpen(false);
          refresh();
        }}
      />
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
        categories {
          key
        }
      }
    }
    events: allMongodbSessions {
      nodes {
        _id
        name
      }
    }
    recipes: allMongodbRecipes {
      nodes {
        _id
        name
      }
    }
  }
`;
