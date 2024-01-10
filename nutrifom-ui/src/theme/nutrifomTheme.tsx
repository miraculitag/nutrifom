import { createTheme } from "@mui/material";
import { purple } from "@mui/material/colors";

let fontSize;
if (window.innerWidth <= 1700) {
  fontSize = 14;
} else if (window.innerWidth > 1700 && window.innerWidth <= 2000) {
  fontSize = 16;
} else if (window.innerWidth > 2000 && window.innerWidth <= 2300) {
  fontSize = 18;
} else {
  fontSize = 20;
}

const nutrifomTheme = {
  typography: {
    fontFamily: "Poppins",
    fontSize: fontSize,
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
