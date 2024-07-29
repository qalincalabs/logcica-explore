import { Event } from "@mui/icons-material";
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { format, isAfter } from "date-fns";
import { fr } from "date-fns/locale";
import { graphql, HeadFC, navigate, PageProps } from "gatsby";
import Markdown from "markdown-to-jsx";
import React from "react";
import Layout from "../components/layout";
import MainContent from "../components/main-content";

const EventPage: React.FC<PageProps> = ({ data }: any) => {
  const now = new Date();

  const filteredAndSortedEvents = data.events.nodes
    .filter(
      (event: any) =>
        event.timeRange?.from && isAfter(new Date(event.timeRange.from), now),
    )
    .sort(
      (a: any, b: any) =>
        +new Date(a.timeRange.from) - +new Date(b.timeRange.from),
    );

  return (
    <Layout>
      <MainContent
        title="Événements"
        type="session"
        dataList={filteredAndSortedEvents}
        listItemContent={EventListItem}
      />
    </Layout>
  );
};

function EventListItem(event: any) {
  const formattedFrom = event.timeRange?.from
    ? format(new Date(event.timeRange.from), "PPP p", { locale: fr })
    : null;
  const formattedTo = event.timeRange?.to
    ? format(new Date(event.timeRange.to), "PPP p", { locale: fr })
    : null;

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
          <>
            <Typography
              variant="subtitle1"
              component="span"
              display="inline-block"
              sx={{ "white-space": "nowrap" }}
            >
              {formattedFrom} - {formattedTo}
            </Typography>
            {event.place?.address && (
              <>
                <br />
                <Typography
                  variant="subtitle1"
                  component="span"
                  display="inline-block"
                >
                  {event.place.address.street}, {event.place.address.locality}
                </Typography>
              </>
            )}
            {event.description?.short?.markdown && (
              <Typography
                variant="subtitle2"
                component="span"
                display="inline-block"
              >
                <Markdown>{event.description.short.markdown}</Markdown>
              </Typography>
            )}
          </>
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
      }
    }
  }
`;
