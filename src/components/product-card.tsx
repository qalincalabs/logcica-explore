import * as React from "react";
import * as moment from "moment";
import Markdown from "markdown-to-jsx";
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
  Chip,
  Popper,
  Paper,
} from "@mui/material";
import {
  CalendarMonth,
  LocalDining,
  CrisisAlert,
  WineBar,
  Delete,
  VisibilityOff,
  Agriculture,
  Blender,
  Inventory,
  SquareFoot,
} from "@mui/icons-material";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const Strong = ({ children }: any) => <strong>{children}</strong>

export function NutrimentsTable() {
  return (
    <TableContainer>
      <Table size="small" sx={{ maxWidth: 400 }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">/100gr</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={1}>
            <TableCell>Énergie</TableCell>
            <TableCell align="right">100kJ / 30kcal</TableCell>
          </TableRow>
          <TableRow key={1}>
            <TableCell>Matières grasses</TableCell>
            <TableCell align="right">20gr</TableCell>
          </TableRow>
          <TableRow key={2}>
            <TableCell>&nbsp;&nbsp;dont acides gras saturés</TableCell>
            <TableCell align="right">20gr</TableCell>
          </TableRow>
          <TableRow key={2}>
            <TableCell>Glucides</TableCell>
            <TableCell align="right">20gr</TableCell>
          </TableRow>
          <TableRow key={2}>
            <TableCell>&nbsp;&nbsp;dont sucres</TableCell>
            <TableCell align="right">20gr</TableCell>
          </TableRow>
          <TableRow key={2}>
            <TableCell>Protéines</TableCell>
            <TableCell align="right">20gr</TableCell>
          </TableRow>
          <TableRow key={2}>
            <TableCell>Sel</TableCell>
            <TableCell align="right">20gr</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ProductDimensionsText(dimension: any) {
  const list = [];
  if (dimension.length)
    list.push(dimension.length.value + dimension.length.unit);
  list.push(dimension.width.value + dimension.width.unit);
  list.push(dimension.height.value + dimension.height.unit);
  return list.join(" x ");
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

  const [isAddressVisible, setIsAddressVisible] =
    React.useState<boolean>(false);

  const handleSetIsAddressVisible = () => (event: React.SyntheticEvent) => {
    setIsAddressVisible(!isAddressVisible);
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
              <CardContent
                onClick={handleSetIsAddressVisible()}
                sx={{ paddingTop: 1, paddingBottom: 1 }}
              >
                <Card>
                  <Stack direction="row">
                    <CardHeader
                      sx={{
                        paddingTop: 1,
                        paddingBottom: 1,
                        width: "100%",
                        "& .MuiCardHeader-subheader": {
                          width: "100%",
                        },
                      }}
                      title="Les dingues du Marais"
                      subheader={
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          gap={3}
                        >
                          <span>Maraîchage</span>
                          <Stack direction="row" gap={1}>
                            <Agriculture />
                            <Blender />
                            <Inventory />
                          </Stack>
                        </Box>
                      }
                      avatar={<Avatar alt="Apple">N</Avatar>}
                    />
                  </Stack>
                  <CardContent
                    sx={{ display: isAddressVisible ? "block" : "none" }}
                  >
                    7 rue des cueilleurs, 6060 Gilly, Belgique
                  </CardContent>
                </Card>
              </CardContent>
            </Box>
          </Box>
        </Grid>
        {item.description?.short && (
          <CardContent
            sx={{ paddingTop: 1, paddingBottom: 1, "&:last-child": { pb: 0 } }}
          >
            <Markdown>{item.description.short.markdown}</Markdown>
          </CardContent>
        )}
        <CardContent sx={{ paddingTop: 1, paddingBottom: 1, width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
            }}
            gap={1}
          >
            {item.ingredientStatement?.short && (
              <Stack direction="row" gap={1} flexGrow={1}>
                <LocalDining />
                <Markdown
                  options={{
                    overrides: {
                      em: {
                        component: Strong
                      },
                    },
                  }}
                >
                  {item.ingredientStatement.short.markdown}
                </Markdown>
              </Stack>
            )}
            <Stack direction="row" gap={1} flexGrow={1}>
              <CrisisAlert />
              <Typography>Contient du lait</Typography>
            </Stack>
            {item.alcoholPercentage != null && (
              <Stack direction="row" gap={1} flexGrow={1}>
                <WineBar />
                <Typography>ALC. {item.alcoholPercentage}% VOL.</Typography>
              </Stack>
            )}
            {item.dimensions && (
              <Stack direction="row" gap={1} flexGrow={1}>
                <SquareFoot />
                <Typography>
                  {ProductDimensionsText(item.dimensions)}
                </Typography>
              </Stack>
            )}
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
                {item.consumerUsageInstructions?.short && (
                  <Tab
                    label="Utilisation"
                    value="1"
                    sx={{ fontSize: "0.8rem" }}
                  />
                )}
                {item.consumerStorageInstructions?.short && (
                  <Tab
                    label="Conservation"
                    value="2"
                    sx={{ fontSize: "0.8rem" }}
                  />
                )}
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
            {item.consumerUsageInstructions?.short && (
              <TabPanel value="1">
                <Markdown>
                  {item.consumerUsageInstructions?.short.markdown}
                </Markdown>
              </TabPanel>
            )}
            {item.consumerStorageInstructions?.short && (
              <TabPanel value="2">
                <Typography>
                  <Markdown>
                    {item.consumerStorageInstructions?.short.markdown}
                  </Markdown>
                </Typography>
              </TabPanel>
            )}
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
