import React from "react";
import { graphql, HeadFC, navigate, PageProps } from "gatsby";
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import Layout from "../components/layout";
import { Event } from "@mui/icons-material";
import Markdown from "markdown-to-jsx";
import MainContent from "../components/main-content";
import { format, isAfter } from 'date-fns';
import { fr } from 'date-fns/locale';

const EventPage: React.FC<PageProps> = ({ data }: any) => {
  const now = new Date();

  // Filtrer les événements passés et trier les événements futurs
  const filteredAndSortedEvents = data.events.nodes
    .filter((event: any) => event.timeRange?.from && isAfter(new Date(event.timeRange.from), now))
    .sort((a: any, b: any) => +new Date(a.timeRange.from) - +new Date(b.timeRange.from));

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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const formattedFrom = event.timeRange?.from ? format(new Date(event.timeRange.from), 'PPP p', { locale: fr }) : null;
  const formattedTo = event.timeRange?.to ? format(new Date(event.timeRange.to), 'PPP p', { locale: fr }) : null;

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
            <Typography>{formattedFrom} - {formattedTo}</Typography>
            {event.place?.address && (
              <Typography>
                {event.place.address.street}, {event.place.address.locality}
              </Typography>
            )}
            {!isSmallScreen && event.description?.short?.markdown && (
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
      }
    }
  }
`;
