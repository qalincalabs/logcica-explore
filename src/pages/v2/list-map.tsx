import L, { divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import { activityIconsWithLinks } from "../../assets/activity-icons";
import AddLocate from "../../components/AddLocate";
import MarkerClusterGroup from "../../components/MarkerClusterGroup";
import { TitleWithLabel } from "./title-with-label";

function ListMap({ data }: any) {
  const customMarkerIcon = (name: string) =>
    divIcon({
      html: ReactDOMServer.renderToString(activityIconsWithLinks[name]?.[0]),
      className: "icon",
    });

  const setIcon = ({ properties }: any, latlng: any) => {
    return L.marker(latlng, { icon: customMarkerIcon(properties.icon) });
  };

  return (
    <MapContainer style={{ height: "100%" }} center={[53.2, -8.2]} zoom={7}>
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
                <TitleWithLabel data={feature.properties} />,
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
