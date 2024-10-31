import { Store } from "@mui/icons-material";
import * as turf from "@turf/turf";
import { Link } from "gatsby";
import { DivIcon, latLngBounds } from "leaflet";
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

function ListMap({ data, options, area }: any) {
  const customMarkerIcon = (name: string) => {
    if (typeof window == "undefined") return undefined;

    return new DivIcon({
      html: ReactDOMServer.renderToString(
        activityIconsWithLinks[name]?.[0] ?? <Store></Store>,
      ),
      className: "icon",
    });
  };

  const hasGeoShape = area?.geoShape != null;

  const featureCollection = turf.featureCollection(
    data.map((e: any) => turf.point(e.geometry.coordinates)),
  );

  console.log(featureCollection);

  const bbox = hasGeoShape
    ? turf.bbox(area.geoShape)
    : turf.bbox(featureCollection);
  const bounds = latLngBounds([
    [bbox[1], bbox[0]],
    [bbox[3], bbox[2]],
  ]);

  return (
    <MapContainer style={{ height: "100%" }} bounds={bounds}>
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
