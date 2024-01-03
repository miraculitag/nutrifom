import { createTheme } from "@mui/material";
import { purple } from "@mui/material/colors";

const nutrifomTheme = {
  typography: {
    fontFamily: "Poppins",
  },

  palette: {
    primary: {
      main: "#33cc33",
      light: "#eff8ef",
    },
    secondary: {
      main: purple[100],
    },
    warning: {
      main: "#ff0000",
      light: "#fff0f0",
    },
  },
};

export default createTheme(nutrifomTheme);
