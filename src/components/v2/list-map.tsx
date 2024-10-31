import { Store } from "@mui/icons-material";
import { Link } from "gatsby";
import { DivIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { SuperClustering } from "react-leaflet-supercluster";
import "react-leaflet-supercluster/src/styles.css";
import { activityIconsWithLinks } from "../../assets/activity-icons";
import AddLocate from "../../components/AddLocate";
import { getIconKeyFromCategories } from "./icon-for-item";
import TitleWithLabel from "./title-with-label";

function ListMap({ data, options }: any) {
  const customMarkerIcon = (name: string) => {
    if (typeof window == "undefined") return undefined;

    return new DivIcon({
      html: ReactDOMServer.renderToString(
        activityIconsWithLinks[name]?.[0] ?? <Store></Store>,
      ),
      className: "icon",
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
      <SuperClustering maxZoom={14}>
        {data.map((e: any) => (
          <Marker
            key={e.properties._id}
            title={e.properties.name}
            position={[e.geometry.coordinates[1], e.geometry.coordinates[0]]}
            icon={customMarkerIcon(getIconKeyFromCategories(e.properties))}
          >
            <Popup>
              <Link to={"/activity/" + e.properties._id}>
                <TitleWithLabel data={e.properties} />
              </Link>
            </Popup>
          </Marker>
        ))}
      </SuperClustering>
      <AddLocate />
    </MapContainer>
  );
}

export default ListMap;
