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
  Button,
  Tab,
  IconButton,
} from "@mui/material";
import {
  CalendarMonth,
  LocalDining,
  CrisisAlert,
  WineBar,
  Delete,
  VisibilityOff,
} from "@mui/icons-material";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

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

  const [tab, setTab] = React.useState("0");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const handleChange2 = (panel: string) => (event: React.SyntheticEvent) => {
    setTab(panel);
  };

  return (
    <Card>
      <Grid container>
        {item?.img ? (
          <Grid item xs={3} sm={4}>
            <CardMedia
              component="img"
              image={`${item?.img}?w=164&h=164&fit=crop&auto=format`}
              alt={item?.name}
              sx={{
                objectFit: "contain",
                maxHeight: 200,
                ml: 0,
                mr: "auto",
              }}
            />
          </Grid>
        ) : null}
        <Grid item xs={item?.img ? 9 : 12} sm={item?.img ? 8 : 12}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <CardHeader
                sx={{ paddingTop: 1, paddingBottom: 1 }}
                title={
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>{item?.name}</span>
                    <span>100gr</span>
                  </Box>
                }
                subheader={
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      gap: 1,
                    }}
                  >
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
                  </Box>
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
        </Grid>
        <CardContent
          sx={{ paddingTop: 1, paddingBottom: 1, "&:last-child": { pb: 0 } }}
        >
          <Typography>
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas. I need a
            much longer text I think. To see how far I can go
          </Typography>
        </CardContent>
        <CardContent sx={{ paddingTop: 1, paddingBottom: 1, width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
            }}
            gap={1}
          >
            <Stack direction="row" gap={1} flexGrow={1}>
              <LocalDining />
              <Typography>
                <b>Lait</b>, présure
              </Typography>
            </Stack>
            <Stack direction="row" gap={1} flexGrow={1}>
              <CrisisAlert />
              <Typography>Contient du lait</Typography>
            </Stack>
            <Stack direction="row" gap={1} flexGrow={1}>
              <WineBar />
              <Typography>ALC. 5,6% VOL.</Typography>
            </Stack>
          </Box>
        </CardContent>
        <CardContent sx={{ paddingTop: 1, paddingBottom: 1, width: "100%" }}>
          <TabContext value={tab}>
            <Box>
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
                TabIndicatorProps={{ sx: { display: "none" } }}
                sx={{
                  width: "100%",
                  "& .MuiTabs-flexContainer": {
                    flexWrap: "wrap",
                    justifyContent: "center",
                    width: "100%",
                  },
                }}
              >
                <Tab label="Hidden" value="0" sx={{ display: "none" }} />
                <Tab
                  label="Utilisation"
                  value="1"
                  sx={{ fontSize: "0.8rem" }}
                />
                <Tab
                  label="Conservation"
                  value="2"
                  sx={{ fontSize: "0.8rem" }}
                />
                <Tab label="Nutriments" value="3" sx={{ fontSize: "0.8rem" }} />
                <IconButton
                  onClick={handleChange2("0")}
                  sx={{ display: tab == "0" ? "none" : "block" }}
                >
                  <VisibilityOff fontSize="small" />
                </IconButton>
              </TabList>
            </Box>
            <TabPanel value="0" sx={{ display: "none" }}></TabPanel>
            <TabPanel value="1">Il faut l'utiliser comme ceci</TabPanel>
            <TabPanel value="2">Il faut le conserver comme ceci</TabPanel>
            <TabPanel value="3">
              <NutrimentsTable />
            </TabPanel>
          </TabContext>
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
    </Card>
  );
}
