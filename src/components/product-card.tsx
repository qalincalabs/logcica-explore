import * as React from "react";
import * as moment from "moment";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  Typography,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Breadcrumbs,
  Link,
  Box,
  Avatar,
} from "@mui/material";
import {
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
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ flexGrow: 1, maxWidth: 500 }}>
              <CardHeader
                sx={{ paddingTop: 1, paddingBottom: 1 }}
                title={item.name}
                subheader={
                  <Stack>
                    <Breadcrumbs
                      maxItems={2}
                      separator="›"
                      aria-label="breadcrumb"
                    >
                      {item.categories?.map((c: any) => (
                        <Link underline="hover" color="inherit" href="#">
                          {c.name}
                        </Link>
                      ))}
                      <Link underline="hover" color="inherit" href="#">
                        Légume
                      </Link>
                      <Link underline="hover" color="inherit" href="#">
                        Racine
                      </Link>
                      <Link underline="hover" color="inherit" href="#">
                        Poivron
                      </Link>
                    </Breadcrumbs>
                    <Stack direction="row" flexWrap="wrap">
                      <CalendarMonth />
                      {moment.monthsShort().map((m) => (
                        <Typography
                          sx={{
                            fontSize: "0.85rem",
                            padding: "1px",
                            margin: "1px",
                            backgroundColor: m.includes("e")
                              ? "#AFE1AF"
                              : "default",
                          }}
                        >
                          {m.charAt(0)}
                        </Typography>
                      ))}
                    </Stack>
                  </Stack>
                }
              />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <CardContent sx={{ paddingTop: 1, paddingBottom: 1 }}>
                <Card>
                  <CardHeader
                    sx={{ paddingTop: 1, paddingBottom: 1 }}
                    title="Les dingues du Marais"
                    subheader="Maraîchage"
                    avatar={<Avatar alt="Apple">N</Avatar>}
                  />
                </Card>
              </CardContent>
            </Box>
          </Box>
          <CardContent
            sx={{ paddingTop: 1, paddingBottom: 1, "&:last-child": { pb: 0 } }}
          >
            <Typography>
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas. I need a
              much longer text I think. To see how far I can go
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12}>
          <CardContent sx={{ paddingTop: 1, paddingBottom: 1 }}>
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
          <CardContent sx={{ paddingTop: 1, paddingBottom: 1 }}>
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
