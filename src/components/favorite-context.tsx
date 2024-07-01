import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type FavoriteItem = {
  targetId: string;
};

type FavoritesContextType = {
  favorites: FavoriteItem[];
  activityFavorites: string[];
  productFavorites: string[];
  partnershipFavorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  addActivityFavorite: (name: string) => void;
  removeActivityFavorite: (name: string) => void;
  addProductFavorite: (id: string) => void;
  removeProductFavorite: (id: string) => void;
  addPartnershipFavorite: (id: string) => void;
  removePartnershipFavorite: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [activityFavorites, setActivityFavorites] = useState<string[]>([]);
  const [productFavorites, setProductFavorites] = useState<string[]>([]);
  const [partnershipFavorites, setPartnershipFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const storedActivityFavorites = JSON.parse(localStorage.getItem('activityFavorites') || '[]');
    const storedProductFavorites = JSON.parse(localStorage.getItem('productFavorites') || '[]');
    const storedPartnershipFavorites = JSON.parse(localStorage.getItem('partnershipFavorites') || '[]');
    setFavorites(storedFavorites);
    setActivityFavorites(storedActivityFavorites);
    setProductFavorites(storedProductFavorites);
    setPartnershipFavorites(storedPartnershipFavorites);
  }, []);

  const addFavorite = (id: string) => {
    const updatedFavorites = [...favorites, { targetId: id }];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const removeFavorite = (id: string) => {
    const updatedFavorites = favorites.filter(fav => fav.targetId !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const addActivityFavorite = (name: string) => {
    const updatedActivityFavorites = [...activityFavorites, name];
    setActivityFavorites(updatedActivityFavorites);
    localStorage.setItem('activityFavorites', JSON.stringify(updatedActivityFavorites));
  };

  const removeActivityFavorite = (name: string) => {
    const updatedActivityFavorites = activityFavorites.filter(fav => fav !== name);
    setActivityFavorites(updatedActivityFavorites);
    localStorage.setItem('activityFavorites', JSON.stringify(updatedActivityFavorites));
  };

  const addProductFavorite = (id: string) => {
    const updatedProductFavorites = [...productFavorites, id];
    setProductFavorites(updatedProductFavorites);
    localStorage.setItem('productFavorites', JSON.stringify(updatedProductFavorites));
  };

  const removeProductFavorite = (id: string) => {
    const updatedProductFavorites = productFavorites.filter(fav => fav !== id);
    setProductFavorites(updatedProductFavorites);
    localStorage.setItem('productFavorites', JSON.stringify(updatedProductFavorites));
  };

  const addPartnershipFavorite = (id: string) => {
    const updatedPartnershipFavorites = [...partnershipFavorites, id];
    setPartnershipFavorites(updatedPartnershipFavorites);
    localStorage.setItem('partnershipFavorites', JSON.stringify(updatedPartnershipFavorites));
  };

  const removePartnershipFavorite = (id: string) => {
    const updatedPartnershipFavorites = partnershipFavorites.filter(fav => fav !== id);
    setPartnershipFavorites(updatedPartnershipFavorites);
    localStorage.setItem('partnershipFavorites', JSON.stringify(updatedPartnershipFavorites));
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        activityFavorites,
        productFavorites,
        partnershipFavorites,
        addFavorite,
        removeFavorite,
        addActivityFavorite,
        removeActivityFavorite,
        addProductFavorite,
        removeProductFavorite,
        addPartnershipFavorite,
        removePartnershipFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
