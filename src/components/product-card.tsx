import * as React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  CardActions,
  IconButton,
  Typography,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButtonProps,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import {
  AccessAlarm,
  CalendarMonth,
  LocalDining,
  CrisisAlert,
  WineBar,
} from "@mui/icons-material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export function NutrimentsTable() {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">/100gr</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={1}>
            <TableCell>Glucides</TableCell>
            <TableCell align="right">20gr</TableCell>
          </TableRow>
          <TableRow key={2}>
            <TableCell>Protéines</TableCell>
            <TableCell align="right">20gr</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ProductCard({ item }: any) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Card>
      <Grid container>
        {item.img ? (
          <Grid item xs={12} sm={4} md={12} lg={3}>
            <CardMedia
              component="img"
              image={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              alt={item.title}
              sx={{
                objectFit: "contain",
                maxHeight: 200,
                ml: 0,
                mr: "auto",
              }}
            />
          </Grid>
        ) : null}
        <Grid
          item
          xs={12}
          sm={item.img ? 8 : 12}
          md={12}
          lg={item.img ? 9 : 12}
        >
          <CardHeader
            title={item.name}
            subheader={
              <Stack direction="row" alignItems="center" gap={1}>
                <CalendarMonth />
                <Typography>Mars à Avril</Typography>
              </Stack>
            }
          />
          <CardContent>
            <Typography>
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas. I need a
              much longer text I think. To see how far I can go
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12}>
          <CardContent>
            <Stack direction="row" alignItems="center" gap={1}>
              <LocalDining />
              <Typography>
                <b>Lait</b>, présure
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              <CrisisAlert />
              <Typography>Contient du lait</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              <WineBar />
              <Typography>ALC. 5,6% VOL.</Typography>
            </Stack>
          </CardContent>
          <CardContent>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1a-header"
              >
                <Typography>Utilisation</Typography>
              </AccordionSummary>
              <AccordionDetails>Il faut l'utiliser comme ceci</AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel1a-header"
              >
                <Typography>Conservation</Typography>
              </AccordionSummary>
              <AccordionDetails>
                Il faut le conserver comme ceci
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel1a-header"
              >
                <Typography>Nutriments</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <NutrimentsTable />
              </AccordionDetails>
            </Accordion>
          </CardContent>
          {/*
          <CardActions>
            <IconButton>
              <AccessAlarm />
              <CalendarMonth />
            </IconButton>
          </CardActions>
          */}
        </Grid>
      </Grid>
    </Card>
  );
}
