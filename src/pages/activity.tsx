import * as React from "react";
import { graphql, Link, type HeadFC, type PageProps, navigate } from "gatsby";
import Layout from "../components/layout";
import L, { LatLng } from "leaflet";
import "leaflet.markercluster";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/layers.png";
import "leaflet/dist/images/layers-2x.png";
import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import ReactDOMServer from "react-dom/server";
import { useEffect } from "react";

// center={[50.2686855,4.4135125]}
// zoom={8}
// scrollWheelZoom={false}

const PartnershipPage = ({ data }: any) => {
  const mapStyles = {
    width: "100%",
    height: "600px",
  };

  useEffect(() => {
    const layer = L.tileLayer(
      `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );

    const map = L.map("map", {
      center: [50.2686855, 4.4135125],
      zoom: 8,
      layers: [layer],
    });

    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    var markers = L.markerClusterGroup();

    data.activities.nodes.map((activity: any) => {
      const coordinatesToSwap = activity.place?.center?.coordinates;
      if (coordinatesToSwap) {
        const marker = L.marker(
          new LatLng(coordinatesToSwap[1], coordinatesToSwap[0])
        );
        marker.bindPopup(
          ReactDOMServer.renderToString(
            <Link to={"/activity/" + activity._id}>{activity.name}</Link>
          )
        );
        markers.addLayer(marker);
      }
    });

    map.addLayer(markers);
  }, []);

  return (
    <Layout>
      <div id="map" style={mapStyles} />
    </Layout>
  );
};

export default PartnershipPage;

export const Head: HeadFC = () => <title>Groupements</title>;

/*
filter: {
  categories: { elemMatch: { _id: { eq: "64d4ceeca4d6089295a8a753" } } }
}
*/

export const query = graphql`
  query {
    activities: allMongodbActivities(sort: [{ name: ASC }]) {
      nodes {
        _id
        name
        description {
          short {
            markdown
          }
        }
        place {
          center {
            coordinates
          }
        }
      }
    }
  }
`;
