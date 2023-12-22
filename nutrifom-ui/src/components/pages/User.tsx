import React from "react";
import { Avatar, Box, Grid, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import ImageUploadButton from "../partials/ImageUploadButton";
import { Layout } from "../layout/Layout";

import { useUser } from "../../userContext";

export const User = () => {
  const [avatarBlob, setAvatarBlob] = React.useState<Blob>(new Blob());
  const { user } = useUser();

  React.useEffect(() => {
    if (user) {
      if (user.image && user.image.length > 0) {
        const processImage = () => {
          const byteCharacters = atob(user.image);
          const byteNumbers = new Array(byteCharacters.length);

          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: "image/jpeg" });

          setAvatarBlob(blob);
        };

        processImage();
      }
    }
  }, [user?.image]);

  const userData = [
    { label: "Username", data: user?.name },
    { label: "E-Mail", data: user?.email },
    { label: "Geburtstag", data: dayjs(user?.dob).format("DD.MM.YYYY") },
    { label: "Geschlecht", data: user?.gender },
    { label: "Größe", data: user?.height + " cm" },
  ];

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            margin: "auto",
            width: "20%",
          }}
        >
          <Avatar
            src={URL.createObjectURL(avatarBlob)}
            sx={{ margin: "auto", width: "200px", height: "200px" }}
          />
          <Box sx={{ float: "right" }}>
            <ImageUploadButton />
          </Box>
        </Box>
        <Box
          sx={{
            margin: "auto",
            width: "35%",
            paddingTop: "3%",
          }}
        >
          <Typography sx={{ fontSize: "150%", paddingBottom: "5%" }}>
            Profildetails
          </Typography>
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <Grid container spacing={2}>
              {userData.map((field, index) => (
                <Grid item xs={6} key={index}>
                  <TextField
                    label={field.label}
                    variant="standard"
                    value={field.data || ""}
                    inputProps={{ readOnly: true }}
                    InputLabelProps={{ shrink: true }}
                    sx={{ paddingBottom: "5%" }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};
