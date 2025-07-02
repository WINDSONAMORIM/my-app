import { createTheme } from "@mui/material/styles";
import { blue, green, grey } from "@mui/material/colors";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: blue[700],
      dark: blue[900],
      light: blue[500],
      contrastText: "#fff",
    },
    background: {
      default: "#f2f2f5",
      paper: "#eeeeee",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: grey[900],
    },
    secondary: {
      main: green[500],
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
});
