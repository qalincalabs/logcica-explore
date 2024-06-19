import * as React from "react";
import { graphql, Link, type HeadFC } from "gatsby";
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
import { Link as LinkIcon, Facebook as FacebookIcon } from "@mui/icons-material";

const ActivityPage = ({ data }: any) => {
  const mapStyles = {
    width: "100%",
    height: "700px",
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

    data.activities.nodes.forEach((activity: any) => {
      const coordinatesToSwap = activity.place?.center?.coordinates;
      if (coordinatesToSwap) {
        const marker = L.marker(
          new LatLng(coordinatesToSwap[1], coordinatesToSwap[0])
        );
        marker.bindPopup(
          ReactDOMServer.renderToString(
            <div>
              <Link to={"/activity/" + activity._id}>{activity.name}</Link>
              {activity.profiles && activity.profiles.length > 0 && getProfileLinkAndIcon(activity.profiles)}
            </div>
          )
        );
        markers.addLayer(marker);
      }
    });

    map.addLayer(markers);
  }, [data]);

  return (
    <Layout>
      <div id="map" style={mapStyles} />
    </Layout>
  );
};

export default ActivityPage;

export const Head: HeadFC = () => <title>Groupements</title>;

export const query = graphql`
  query {
    activities: allMongodbActivities(sort: [{ name: ASC }]) {
      nodes {
        _id
        name
        place {
          center {
            coordinates
          }
        }
        profiles {
          type
          link
        }
      }
    }
  }
`;

const getProfileLinkAndIcon = (profiles: any) => {
  console.log('Profiles:', profiles); // Ajout de logs pour débogage
  const linkProfile = profiles.find((profile: any) => profile.link);
  if (!linkProfile || !linkProfile.link) {
    return null;
  }

  const link = linkProfile.link;
  console.log('Link:', link); // Ajout de logs pour débogage
  const icon = link.includes("facebook.com") ? 
               <FacebookIcon style={{ fontSize: 16, marginRight: 5 }} /> : 
               <LinkIcon style={{ fontSize: 16, marginRight: 5 }} />;
  
  return (
    <a href={link} target="_blank" style={{ textDecoration: "none", color: "#3b5998", cursor: "pointer" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {icon}
        <span style={{ fontSize: 12 }}>{linkProfile.type}</span>
      </div>
    </a>
  );
};
