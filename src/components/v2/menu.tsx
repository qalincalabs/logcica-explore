import { Event, Storefront, VolunteerActivism } from "@mui/icons-material";
import React from "react";
import { Trans } from "react-i18next";

export const opportunitiesFirstMenu = [
  {
    title: <Trans>actions.feed</Trans>,
    icon: <Storefront fontSize="large" />,
  },
  {
    title: <Trans>actions.meet</Trans>, // "Rencontrer"
    icon: <Event fontSize="large" />,
    checked: true,
  },
  {
    title: <Trans>actions.contribute</Trans>, // "Participer"
    icon: <VolunteerActivism fontSize="large" />,
  },
];
