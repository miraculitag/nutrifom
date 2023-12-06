import React from "react";
import { Avatar, Box, Grid, TextField, Typography } from "@mui/material";
import FileUploadButton from "../common/FileUploadButton";
import { Layout } from "../layout/Layout";
import { AppUser } from "../../types";
import { getAppUser } from "../../api";
import { useAuthHeader } from "react-auth-kit";

export const User = (testParams: any) => {
  const [user, setUser] = React.useState<AppUser>();

  const auth = useAuthHeader();

  React.useEffect(() => {
    getAppUser(auth()).then((response) => {
      setUser(response.data);
    });
  }, []);

  const userData = [
    { label: "Username", data: user?.name },
    { label: "E-Mail", data: user?.email },
    { label: "Geburtstag", data: user?.dob },
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
            src={""}
            sx={{ margin: "auto", width: "200px", height: "200px" }}
          />
          <Box sx={{ float: "right" }}>
            <FileUploadButton />
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
