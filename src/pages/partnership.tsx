import { Store } from "@mui/icons-material";
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { graphql, navigate, type HeadFC, type PageProps } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import MainContent from "../components/main-content";

const PartnershipPage: React.FC<PageProps> = ({ data }: any) => {
  return (
    <Layout>
      <MainContent
        title="Groupements"
        type="partnership"
        dataList={data.partnerships.nodes}
        listItemContent={PartnershipListItem}
      />
    </Layout>
  );
};

function PartnershipListItem(p: any) {
  return (
    <ListItemButton onClick={() => navigate("/partnership/" + p._id)}>
      <ListItemAvatar>
        <Avatar>
          <Store />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={p.name}
        secondary={
          <>
            {p.area && (
              <Typography
                component={"span"}
                display="inline-block"
                sx={{ fontWeight: "bold" }}
              >
                {p.area.name}
              </Typography>
            )}
            {p.profiles.find(
              (p: any) => p.description?.short && p.type == "website",
            )?.description?.short && (
              <Typography component={"span"} display="inline-block">
                {
                  p.profiles.find(
                    (p: any) => p.description?.short && p.type == "website",
                  )?.description?.short?.markdown
                }
              </Typography>
            )}
          </>
        }
      />
    </ListItemButton>
  );
}

export default PartnershipPage;

export const Head: HeadFC = () => <title>Groupements</title>;

export const query = graphql`
  query {
    partnerships: allMongodbPartnerships(
      sort: [{ name: ASC }]
      filter: {
        categories: { elemMatch: { _id: { eq: "64d4ceeca4d6089295a8a753" } } }
      }
    ) {
      nodes {
        _id
        name
        area {
          name
        }
        profiles {
          type
          link
          description {
            short {
              markdown
            }
          }
        }
      }
    }
  }
`;
