import * as React from "react";
import moment from "moment";
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

const Strong = ({ children }: any) => <strong>{children}</strong>;

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
        {item.mainImage && (
          <Grid item xs={3} sm={2} md={3}>
            <CardMedia
              component="img"
              image={item.mainImage.url} // {`${item?.img}?w=164&h=164&fit=crop&auto=format`}
              alt={item.name}
              sx={{
                objectFit: "contain",
                maxHeight: "150px",
                maxWidth: "150px",
                ml: 0,
                mr: "auto",
              }}
            />
          </Grid>
        )}
        <Grid
          item
          xs={item.mainImage ? 9 : 12}
          sm={item.mainImage ? 10 : 12}
          md={item.mainImage ? 9 : 12}
        >
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
                    <span>{item.name}</span>
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
                    {item.categories?.[0] && (
                      <Breadcrumbs
                        maxItems={2}
                        separator="›"
                        aria-label="breadcrumb"
                      >
                        <Link underline="hover" color="inherit">
                          {item.categories[0].name}
                        </Link>
                      </Breadcrumbs>
                    )}
                    {item.availabilities?.[0]?.season?.year?.months && (
                      <Stack direction="row" flexWrap="wrap">
                        <CalendarMonth />
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (monthNumber) => (
                            <Typography
                              sx={{
                                fontSize: "0.85rem",
                                padding: "1px",
                                margin: "1px",
                                backgroundColor:
                                  item.availabilities?.[0]?.season?.year?.months.includes(
                                    monthNumber + 1
                                  )
                                    ? "#AFE1AF"
                                    : "default",
                              }}
                            >
                              {moment(monthNumber, "M").format("MMM").charAt(0)}
                            </Typography>
                          )
                        )}
                      </Stack>
                    )}
                  </Box>
                }
              />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              {item.owner && (
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
                        title={item.owner.organisation?.name}
                        subheader={
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            gap={3}
                          >
                            <span>{item.owner.activity?.name}</span>
                            {item.ownerRoles && (
                              <Stack direction="row" gap={1}>
                                {item.ownerRoles.includes("producer") && (
                                  <Agriculture />
                                )}
                                {item.ownerRoles.includes("transformer") && (
                                  <Blender />
                                )}
                                {item.ownerRoles.includes("packer") && (
                                  <Inventory />
                                )}
                              </Stack>
                            )}
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
              )}
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
                        component: Strong,
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
