import { Store } from "@mui/icons-material";
import { Link } from "gatsby";
import L, { divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import { activityIconsWithLinks } from "../../assets/activity-icons";
import AddLocate from "../../components/AddLocate";
import MarkerClusterGroup from "../../components/MarkerClusterGroup";
import { getIconKeyFromCategories } from "./icon-for-item";
import { TitleWithLabel } from "./title-with-label";

function ListMap({ data, options }: any) {
  const customMarkerIcon = (name: string) =>
    divIcon({
      html: ReactDOMServer.renderToString(
        activityIconsWithLinks[name]?.[0] ?? <Store></Store>,
      ),
      className: "icon",
    });

  const setIcon = ({ properties }: any, latlng: any) => {
    console.log(properties);
    return L.marker(latlng, {
      icon: customMarkerIcon(getIconKeyFromCategories(properties)),
    });
  };

  return (
    <MapContainer
      style={{ height: "100%" }}
      center={options.center}
      zoom={options.zoom}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        <GeoJSON
          data={data}
          pointToLayer={setIcon}
          onEachFeature={(feature, leafletLayer) => {
            const popupOptions = {
              minWidth: 100,
              maxWidth: 250,
              className: "popup-classname",
            };

            leafletLayer.bindPopup(
              ReactDOMServer.renderToString(
                <div>
                  <Link to={"/activity/" + feature.properties._id}>
                    <TitleWithLabel data={feature.properties} />
                  </Link>
                </div>,
              ),
              popupOptions,
            );
          }}
          style={(reference) => {
            return {
              color: "blue",
            };
          }}
        ></GeoJSON>
      </MarkerClusterGroup>
      <AddLocate />
    </MapContainer>
  );
}

export default ListMap;
