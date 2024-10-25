import { Event, Storefront, VolunteerActivism } from "@mui/icons-material";
import React from "react";

export const opportunitiesFirstMenu = [
  {
    title: "Shop", // "Se nourrir",
    icon: <Storefront fontSize="large" />,
    checked: true,
  },
  {
    title: "Meet", // "Rencontrer"
    icon: <Event fontSize="large" />,
  },
  {
    title: "Volunteer", // "Participer"
    icon: <VolunteerActivism fontSize="large" />,
  },
];
