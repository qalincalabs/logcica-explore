import { Store } from "@mui/icons-material";
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { graphql, HeadFC, navigate, PageProps } from "gatsby";
import Markdown from "markdown-to-jsx";
import React from "react";
import Layout from "../components/layout";
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
          <>
            <Typography
              variant="subtitle1"
              component="span"
              display="inline-block"
            >
              {m.availabilityStatement.short.markdown}
            </Typography>
            {m.description && (
              <Typography
                variant="subtitle2"
                component="span"
                display="inline-block"
              >
                <Markdown>{m.description.short.markdown}</Markdown>
              </Typography>
            )}
          </>
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
