import {
  Avatar,
  Box,
  Grid,
  IconButton,
  InputLabel,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import FileUploadButton from "../common/FileUploadButton";
import { Layout } from "../layout/Layout";
import { AppUser } from "../../types";
import React from "react";
import { getAppUser } from "../../api";

export const User = (testParams: any) => {
  const [user, setUser] = React.useState<AppUser>();

  /*const getUser = () => {
    getAppUser(userId, userToken).then((response) => {
      setUser(response.data);
    });
  };
  getUser();*/

  //const testUser: AppUser | undefined = user;
  const testUser = {
    id: 1,
    name: "Username",
    dob: "01.01.2000",
    height: 170,
    gender: "weiblich",
    image: "",
    email: "x@testmail.de",
  };

  const userData = [
    { label: "Username", data: testUser.name },
    { label: "E-Mail", data: testUser.email },
    { label: "Geburtstag", data: testUser.dob },
    { label: "Geschlecht", data: testUser.gender },
    { label: "Größe", data: testUser.height + " cm" },
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
                    value={field.data}
                    inputProps={{ readOnly: true }}
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
