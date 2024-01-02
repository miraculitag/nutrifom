import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CopyrightIcon from "@mui/icons-material/Copyright";

export const Footer = () => {
  return (
    <AppBar sx={{ position: "static", marginTop: "2%" }}>
      <Toolbar
        sx={{
          backgroundColor: "gray",
          color: "white",
        }}
      >
        <Typography>nutrifom GmbH</Typography>
        <CopyrightIcon
          sx={{ margin: "10px", fontSize: "medium" }}
        ></CopyrightIcon>
        <Typography sx={{ flexGrow: 1 }}>2024</Typography>
        <Button
          color="inherit"
          onClick={() => {
            window.open(
              "mailto:jennifer.witte@fom-net.de;mira.falk@fom-net.de;maid.sabanovic@fom-net.de;nele.hoffmann@fom-net.de"
            );
          }}
        >
          Kontakt
        </Button>
      </Toolbar>
    </AppBar>
  );
};
