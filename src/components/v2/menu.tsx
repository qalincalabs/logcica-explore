import { Event, Storefront, VolunteerActivism } from "@mui/icons-material";
import React from "react";
import { Trans } from "react-i18next";

export const opportunitiesFirstMenu = [
  {
    title: <Trans>shop</Trans>, // "Se nourrir",
    icon: <Storefront fontSize="large" />,
  },
  {
    title: "Meet", // "Rencontrer"
    icon: <Event fontSize="large" />,
    checked: true,
  },
  {
    title: "Volunteer", // "Participer"
    icon: <VolunteerActivism fontSize="large" />,
  },
];
