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
  CardActions,
  Fab,
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

function addressText(address: any) {
  const list = [];
  if (address.street) list.push(address.street);
  if (address.locality) list.push(address.locality);
  if (address.postalCode) list.push(address.postalCode);
  if (address.country) list.push(address.country);

  return list.join(", ");
}

const nutrientOrder = [
  "energy",
  "fat",
  "saturatedFat",
  "carbohydrates",
  "sugars",
  "fibres",
  "protein",
  "salt",
];

export function NutrientListTable({ nutrientList }: any) {
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
          {nutrientOrder
            .map((n) => nutrientList.find((i: any) => i.nutrientKey.code == n))
            .filter((n) => n != null)
            .map((productNutrient: any) => (
              <TableRow key={1}>
                <TableCell>
                  {["saturatedFat", "sugars"].includes(
                    productNutrient.nutrientKey.code
                  ) && <span>&nbsp;&nbsp;</span>}
                  {productNutrient.nutrientKey.name}
                </TableCell>
                <TableCell align="right">
                  {productNutrient.quantity.value +
                    productNutrient.quantity.unit}
                </TableCell>
              </TableRow>
            ))}
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

function netContentsText(item: any) {
  const list = [];
  if (item.netWeight) list.push(item.netWeight.value + item.netWeight.unit);
  if (item.netVolume) list.push(item.netVolume.value + item.netVolume.unit);
  if (item.netContent)
    list.push(item.netContent.value + " " + item.netContent.unit?.name);
  return list.join(" | ");
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
            <CardHeader
              sx={{ paddingTop: 1, paddingBottom: 1, flexGrow: 1 }}
              title={
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 1,
                    flexGrow: 1,
                  }}
                >
                  <span>{item.name}</span>
                  <span>{netContentsText(item)}</span>
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

            {item.owner && (
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
                        avatar={
                          item.owner.organisation?.mainImage?.url ? (
                            <Avatar
                              src={item.owner.organisation?.mainImage?.url}
                            />
                          ) : (
                            <Avatar>
                              item.owner.organisation?.name?.charAt(0)
                            </Avatar>
                          )
                        }
                      />
                    </Stack>
                    {item.owner?.organisation?.place?.address && (
                      <CardContent
                        sx={{ display: isAddressVisible ? "block" : "none" }}
                      >
                        {addressText(item.owner.organisation.place.address)}
                      </CardContent>
                    )}
                  </Card>
                </CardContent>
              </Box>
            )}
          </Box>
        </Grid>
        {(item.references?.find((r: any) => r.platformKey == "be/openbatra") ||
          item.description?.short) && (
          <Box display="flex" width="100%">
            {item.description?.short && (
              <CardContent
                sx={{
                  paddingTop: 1,
                  paddingBottom: 1,
                  "&:last-child": { pb: 0 },
                  flexGrow: 1,
                }}
              >
                <Markdown>{item.description.short.markdown}</Markdown>
              </CardContent>
            )}
            <CardActions>
              <a
                href={
                  "https://www.batra.link/batra2.0/productFull.html?gtin=" +
                  encodeURIComponent(
                    item.references.find(
                      (r: any) => r.platformKey == "be/openbatra"
                    ).number
                  )
                }
              >
                <Avatar
                  alt="Batra"
                  src="https://www.batra.link/apple-touch-icon.png"
                  sx={{ width: 28, height: 28 }}
                />
              </a>
            </CardActions>
          </Box>
        )}
        {(item.ingredientStatement ||
          item.allergenList ||
          item.alcoholPercentage ||
          item.dimensions) && (
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
              {item.allergenList &&
                item.allergenList.map((productAllergen: any) => (
                  <Stack direction="row" gap={1} flexGrow={1}>
                    <CrisisAlert />
                    <Typography>
                      {productAllergen.containmentLevelKey.name +
                        " " +
                        productAllergen.allergenKey.name?.toLowerCase()}
                    </Typography>
                  </Stack>
                ))}
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
        )}
        {(item.consumerUsageInstructions?.short ||
          item.consumerStorageInstructions?.short ||
          item.nutrientList) && (
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
                  {item.nutrientList && (
                    <Tab
                      label="Nutriments"
                      value="3"
                      sx={{ fontSize: "0.8rem" }}
                    />
                  )}
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
              {item.nutrientList && (
                <TabPanel value="3">
                  <NutrientListTable nutrientList={item.nutrientList} />
                </TabPanel>
              )}
            </TabContext>
          </CardContent>
        )}
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
