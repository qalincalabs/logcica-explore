import {
  Facebook as FacebookIcon,
  Link as LinkIcon,
} from "@mui/icons-material";
import { graphql, Link, type HeadFC } from "gatsby";
import L, { LatLng } from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/images/layers-2x.png";
import "leaflet/dist/images/layers.png";
import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import { useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { activityIcons } from "../assets/activity-icons";
import Layout from "../components/layout";

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
      },
    );

    const map = L.map("map", {
      center: [50.2686855, 4.4135125],
      zoom: 8,
      layers: [layer],
    });

    let DefaultIcon = L.divIcon({
      html: ReactDOMServer.renderToString(activityIcons["other"]),
      iconSize: [0, 0],
      iconAnchor: [12, 40],
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    var markers = L.markerClusterGroup();

    data.activities.nodes.forEach((activity: any) => {
      const coordinatesToSwap = activity.place?.center?.coordinates;
      const activityCategory = activity.categories?.[0]?.key;
      const activityKeySplit =
        ReactDOMServer.renderToString(activityCategory).split(".");
      const activityKeyLastElement =
        activityKeySplit[activityKeySplit.length - 1];
      const activityKeyLastElementCondition = activityIcons.hasOwnProperty(
        activityKeyLastElement,
      )
        ? activityIcons[activityKeyLastElement]
        : activityIcons["other"];
      if (coordinatesToSwap) {
        const marker = L.marker(
          new LatLng(coordinatesToSwap[1], coordinatesToSwap[0]),
          {
            icon: L.divIcon({
              html: ReactDOMServer.renderToString(
                activityKeyLastElementCondition,
              ),
              iconSize: [0, 0],
              iconAnchor: [12, 40],
            }),
          },
        );
        marker.bindPopup(
          ReactDOMServer.renderToString(
            <div>
              <Link to={"/activity/" + activity._id}>{activity.name}</Link>
              {activity.profiles &&
                activity.profiles.length > 0 &&
                getProfileLinkAndIcon(activity.profiles)}
            </div>,
          ),
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
        categories {
          key
        }
      }
    }
  }
`;

const getProfileLinkAndIcon = (profiles: any) => {
  const linkProfile = profiles.find((profile: any) => profile.link);
  if (!linkProfile || !linkProfile.link) {
    return null;
  }

  const link = linkProfile.link;
  const icon = link.includes("facebook.com") ? (
    <FacebookIcon style={{ width: "2rem", marginRight: 5 }} />
  ) : (
    <LinkIcon style={{ width: "2rem", marginRight: 5 }} />
  );

  return (
    <a
      href={link}
      target="_blank"
      style={{ textDecoration: "none", color: "#3b5998", cursor: "pointer" }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {icon}
        <span style={{ fontSize: 12 }}>{linkProfile.type}</span>
      </div>
    </a>
  );
};
