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
import { Event } from "@mui/icons-material";
import Markdown from "markdown-to-jsx";
import MainContent from "../components/main-content";
import { format } from 'date-fns';

const EventPage: React.FC<PageProps> = ({ data }: any) => {
  return (
    <Layout>
      <MainContent
        title="Événements"
        type="event"
        dataList={data.events.nodes}
        listItemContent={EventListItem}
      />
    </Layout>
  );
};

function EventListItem(event: any) {
  const formattedFrom = event.timeRange && event.timeRange.from ? format(new Date(event.timeRange.from), 'PPPpp') : null;
  const formattedTo = event.timeRange && event.timeRange.to ? format(new Date(event.timeRange.to), 'PPPpp') : null;

  return (
    <ListItemButton onClick={() => navigate("/event/" + event._id)}>
      <ListItemAvatar>
        <Avatar>
          <Event />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={event.name}
        secondary={
          <Stack>
            {formattedFrom && formattedTo ? (
              <Typography>{formattedFrom} - {formattedTo}</Typography>
            ) : (
              <Typography>No time range available</Typography>
            )}
            {event.place && event.place.address && (
              <Typography>
                {event.place.address.street}, {event.place.address.locality}
              </Typography>
            )}
            {event.description && (
              <Markdown>{event.description.short.markdown}</Markdown>
            )}
          </Stack>
        }
      />
    </ListItemButton>
  );
}

export default EventPage;

export const Head: HeadFC = () => <title>Événements</title>;

export const query = graphql`
  query {
    events: allMongodbSessions {
      nodes {
        _id
        name
        description {
          short {
            markdown
          }
        }
        timeRange {
          from
          to
        }
        place {
          address {
            street
            locality
          }
        }
        categories {
          name
        }
        manager {
          organisation {
            name
          }
        }
        profiles
      }
    }
  }
`;
