type FavoritesData = {
    activities: string[];
    products: string[];
    counters: string[];
    partnerships: string[];
  };
  
  type FavoriteItem = 'activities' | 'products' | 'counters' | 'partnerships';
  
  const getFavorites = (): FavoritesData => {
    const storedFavorites = localStorage.getItem('favorites.default');
    if (!storedFavorites) {
      return { activities: [], products: [], counters: [], partnerships: [] };
    }
    return JSON.parse(storedFavorites).data;
  };
  
  const setFavorites = (favorites: FavoritesData) => {
    localStorage.setItem('favorites.default', JSON.stringify({ data: favorites }));
  };
  
  const toggleFavorite = (itemType: FavoriteItem, itemId: string) => {
    const favorites = getFavorites();
    const updatedFavorites = favorites[itemType].includes(itemId)
      ? favorites[itemType].filter(id => id !== itemId)
      : [...favorites[itemType], itemId];
    favorites[itemType] = updatedFavorites;
    setFavorites(favorites);
  };
  
  const isFavorite = (itemType: FavoriteItem, itemId: string): boolean => {
    const favorites = getFavorites();
    return favorites[itemType].includes(itemId);
  };
  
  export { getFavorites, toggleFavorite, isFavorite };
  