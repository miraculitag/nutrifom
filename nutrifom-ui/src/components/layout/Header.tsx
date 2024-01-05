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
import { useSignOut } from "react-auth-kit";
import { useUser } from "../../userContext";

export const Header = () => {
  const [avatarBlob, setAvatarBlob] = React.useState<Blob>(new Blob());
  const signOut = useSignOut();
  const navigate = useNavigate();
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
  }, [user?.image, user]);

  const handleSignOutButtonClick = () => {
    signOut();
    navigate("/signin");
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img
          src="./assets/img/nutrifomlogo.png"
          alt="nutrifom logo"
          onClick={() => navigate("/")}
        />
      </Box>
      <Box
        sx={{
          float: "right",
          padding: "1%",
          marginTop: "-6.5%",
          marginRight: "1%",
        }}
      >
        <Button onClick={handleSignOutButtonClick}>Ausloggen</Button>
        <IconButton onClick={() => navigate("/user")}>
          <Avatar src={URL.createObjectURL(avatarBlob)} />
        </IconButton>
      </Box>
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
