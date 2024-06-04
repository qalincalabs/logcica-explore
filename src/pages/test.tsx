import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { ProductCardList } from "../components/product-card-list";
import Layout from "../components/layout";
import StoreComponent from "../components/StoreComponent/StoreComponent";
import App from "../components/App/app";

const ShopPage: React.FC<PageProps> = () => {
  const store = {
    name: 'test',
    country: 'test',
    city: 'test',
    place: 'test',
    categories: ['test'],
    services: ['test'],
    objectID: 'test',
    _geoloc: { lat: 50.8465573, lng: 4.351697 },
  }

  return (
    
      <App/>

    
    
  );
};

export default ShopPage;

export const Head: HeadFC = () => <title>Magasins</title>;
