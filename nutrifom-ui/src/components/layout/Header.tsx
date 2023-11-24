import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  useTheme,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { getAppUser, registerAppUser } from "../../api";
import { useAuthHeader } from "react-auth-kit";

export const Header = (testParams: any) => {
  const navigate = useNavigate();
  const auth = useAuthHeader();
  const userProfilePicture = ""; //tbd

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
        <Avatar src={userProfilePicture} />
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
            onClick={() => navigate("/foodlog")}
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
