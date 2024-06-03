import * as React from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox } from "react-instantsearch";
import { MapContainer, TileLayer } from "react-leaflet";

import { Airports } from "../components/airports";

import type { HeadFC, PageProps } from "gatsby";
import Layout from "../components/layout";
import { useMemo } from "react";
import "./searchbox.css";

const MapPage: React.FC<PageProps> = () => {

  const searchClient = useMemo(
    () =>
        algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
        ),
    []
    )

    const mapStyles = {
        width: "100%",
        height: "600px",
      };

  return (
    <Layout>
      <InstantSearch
        searchClient={searchClient}
        indexName="Activities"
      >
        <SearchBox placeholder="Search for places..." className="searchbox" />
        <MapContainer
          style={mapStyles}
          className="map"
          center={[50.68, 5.7]}
          zoom={10}
          minZoom={4}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Airports/>
        </MapContainer>
      </InstantSearch>
    </Layout>
  );
};

export default MapPage;

export const Head: HeadFC = () => <title>Map page</title>;
