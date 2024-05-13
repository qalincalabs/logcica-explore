import * as React from "react";
import { graphql, Link, type HeadFC, type PageProps, navigate } from "gatsby";
import {
  Typography,
} from "@mui/material";
import Layout from "../components/layout";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const PartnershipPage = ({ data }: any) => {
  return (
    <Layout>
      <Typography align="center" variant="h3">
        Producteurs
      </Typography>

      <MapContainer style={{ height: '600px' }} center={[50.2686855,4.4135125]} zoom={8} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.activities.nodes.map((activity: any) => {
      const coordinatesToSwap= activity.place?.center?.coordinates
      if(!coordinatesToSwap)
        return ""
      return (<Marker position={[coordinatesToSwap[1], coordinatesToSwap[0]]}>
        <Popup>
        <Link
          to={"/activity/" + activity._id }
        >
          {activity.name}
        </Link>
        </Popup>
      </Marker>
      )})}
    </MapContainer>
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
    activities: allMongodbActivities(
      sort: [{ name: ASC }],
    ) {
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
