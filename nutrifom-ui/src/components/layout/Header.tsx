import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
} from "@mui/material";
import React from "react";

import { useNavigate } from "react-router-dom";
import { AppUser } from "../../types";
import { getAppUser } from "../../api";
import { useAuthHeader } from "react-auth-kit";

export const Header = (testParams: any) => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<AppUser>();
  const [avatarBlob, setAvatarBlob] = React.useState<Blob>(new Blob());

  React.useEffect(() => {
    getAppUser(auth()).then((response) => {
      setUser(response.data);
    });
  }, [user]);

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
  const auth = useAuthHeader();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img
          src="./assets/img/nutrifomlogo.png"
          alt="nutrifom logo"
          onClick={() => navigate("/")}
        />
      </Box>
      <IconButton
        onClick={() => navigate("/user")}
        sx={{
          float: "right",
          padding: "1%",
          marginTop: "-6.5%",
          marginRight: "1%",
        }}
      >
        <Avatar src={URL.createObjectURL(avatarBlob)} />
      </IconButton>
      <AppBar sx={{ position: "static", marginBottom: "2%" }}>
        <Toolbar
          sx={{
            backgroundColor: "lightgrey",
            color: "black",
            justifyContent: "space-evenly",
            fontSize: "120%",
          }}
        >
          <Button
            onClick={() => navigate("/nutrilog")}
            sx={{ color: "inherit", fontSize: "inherit" }}
          >
            Nutriprotokoll
          </Button>
          <Button
            onClick={() => navigate("/weight")}
            sx={{ color: "inherit", fontSize: "inherit" }}
          >
            Gewicht
          </Button>
          <Button
            onClick={() => navigate("/calc")}
            sx={{ color: "inherit", fontSize: "inherit" }}
          >
            Bedarfsrechner
          </Button>
          <Button
            onClick={() => navigate("/recipes")}
            sx={{ color: "inherit", fontSize: "inherit" }}
          >
            Rezepte
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};
