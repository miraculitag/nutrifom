import { createTheme } from "@mui/material";
import { green, purple } from "@mui/material/colors";

const nutrifomTheme = {
  typography: {
    fontFamily: "Poppins",
  },

  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: purple[100],
    },
  },
};

export default createTheme(nutrifomTheme);
