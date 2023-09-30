import { AppBar, Avatar, Button, IconButton, Toolbar } from "@mui/material";

import { useNavigate } from "react-router-dom";

export const Header = (testParams: any) => {
  const navigate = useNavigate();
  const userProfilePicture = ""; //tbd

  return (
    <>
      <Button onClick={() => navigate("/")}>
        <img src="../nutrifomlogo.png" alt="nutrifom logo" />
      </Button>
      <IconButton
        onClick={() => navigate("/user")}
        sx={{ float: "right", padding: "1%" }}
      >
        <Avatar src={userProfilePicture} />
      </IconButton>
      <AppBar sx={{ position: "static", marginBottom: "1%" }}>
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
