import { OpenInNew } from "@mui/icons-material";
import { Box, Link, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import SubtitleTemplate from "../subtitle-template";

export function ProfilesCard({ profiles }: any) {
  return (
    <Box sx={{ m: 1, flexGrow: 1 }}>
      <Paper elevation={7} square={false}>
        <SubtitleTemplate text={"Profiles"} />
        <Stack direction="column" spacing={1}>
          {profiles.map((profile: any) => (
            <Stack
              direction="row"
              gap={1}
              key={profile.key}
              sx={{
                display: "flex",
                alignItens: "center",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                {profile.type}
              </Typography>
              {profile.link ? (
                <Link
                  href={profile.link}
                  target="_blank"
                  sx={{
                    color: "primary.main",
                    textDecoration: "underline",
                    display: "inline-flex",
                    alignItems: "center",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {profile.localKey ?? profile.key}{" "}
                  <OpenInNew sx={{ ml: 0.5 }} />
                </Link>
              ) : (
                <Typography>{profile.localKey ?? profile.key}</Typography>
              )}
            </Stack>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}

export default ProfilesCard;
