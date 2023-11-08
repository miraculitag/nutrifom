import { createTheme, rgbToHex } from "@mui/material";
import { green, purple } from "@mui/material/colors";

const nutrifomTheme = {
  typography: {
    fontFamily: "Poppins",
  },

  palette: {
    primary: {
      main: "#33cc33",
      light: "#A9D18E",
    },
    secondary: {
      main: purple[100],
    },
  },
};

export default createTheme(nutrifomTheme);
