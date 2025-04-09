import { Store } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";
import { activityIconsWithLinks } from "../../assets/activity-icons";

export function getIconKeyFromCategories(item: any) {
  const key = item?.categories?.[0]?.key?.replace(
    "logcica.consolidation.activity.",
    "",
  );
  return key;
}

export default function IconForItem({ item }: any) {
  return (
    <>
      {item.categories?.[0]?.key ? (
        activityIconsWithLinks[getIconKeyFromCategories(item)]?.[0]
      ) : (
        <Avatar>
          <Store></Store>
        </Avatar>
      )}
    </>
  );
}
