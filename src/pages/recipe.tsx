import React, { useState } from "react";
import { graphql, navigate, type PageProps, type HeadFC } from "gatsby";
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Layout from "../components/layout";
import { Store } from "@mui/icons-material";
import MainContent from "../components/main-content";

const PartnershipPage: React.FC<PageProps> = ({ data }: any) => {
  return (
    <Layout>
      <MainContent
        title="Recettes"
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
          <Stack>
            {p.area && (
              <Typography sx={{ fontWeight: "bold" }}>{p.area.name}</Typography>
            )}
            {p.profiles.find(
              (p: any) => p.description?.short && p.type == "website"
            )?.description?.short && (
              <Typography>
                {
                  p.profiles.find(
                    (p: any) => p.description?.short && p.type == "website"
                  )?.description?.short?.markdown
                }
              </Typography>
            )}
          </Stack>
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
