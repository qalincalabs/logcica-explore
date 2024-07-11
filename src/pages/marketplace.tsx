import React from "react";
import { graphql, HeadFC, navigate, PageProps } from "gatsby";
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
import Markdown from "markdown-to-jsx";
import MainContent from "../components/main-content";

const MarketplacePage: React.FC<PageProps> = ({ data }: any) => {
  return (
    <Layout>
      <MainContent
        title="Marchés"
        type="counter"
        dataList={data.marketplaces.nodes}
        listItemContent={MarketplaceListItem}
      />
    </Layout>
  );
};

function MarketplaceListItem(m: any) {
  return (
    <ListItemButton onClick={() => navigate("/marketplace/" + m._id)}>
      <ListItemAvatar>
        <Avatar>
          <Store />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={m.name}
        secondary={
          <Stack>
            <Typography>{m.availabilityStatement.short.markdown}</Typography>
            {m.description && (
              <Markdown>{m.description.short.markdown}</Markdown>
            )}
          </Stack>
        }
      />
    </ListItemButton>
  );
}

export default MarketplacePage;

export const Head: HeadFC = () => <title>Marchés</title>;

export const query = graphql`
  query {
    marketplaces: allMongodbCounters(filter: { type: { eq: "marketplace" } }) {
      nodes {
        _id
        name
        description {
          short {
            markdown
          }
        }
        place {
          address {
            street
            locality
          }
        }
        availabilityStatement {
          short {
            markdown
          }
        }
        profiles {
          localKey
          type
          link
        }
      }
    }
    products: allMongodbProducts {
      nodes {
        _id
        name
      }
    }
    partnerships: allMongodbPartnerships {
      nodes {
        _id
        name
      }
    }
    activities: allMongodbActivities {
      nodes {
        _id
        name
      }
    }
  }
`;
