import { Email, Phone } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";

export function Contact({ contact }: any) {
  return (
    <>
      {contact.name && (
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Typography>{contact.name}</Typography>
        </Box>
      )}
      {contact.mainEmail && (
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Email sx={{ mr: 1 }} />
          <Typography>{contact.mainEmail}</Typography>
        </Box>
      )}
      {contact.mainPhoneNumber && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Phone sx={{ mr: 1 }} />
          <Typography>
            {contact.mainPhoneNumberFormatted ?? contact.mainPhoneNumber}
          </Typography>
        </Box>
      )}
    </>
  );
}

export default Contact;
