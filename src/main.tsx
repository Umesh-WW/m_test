import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CssBaseline, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import store from "./Store/store.ts";
import {
  deepOrange,
  deepPurple,
  orange,
  purple,
  red,
} from "@mui/material/colors";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme({
  palette: {
    primary: { main: deepOrange[300], dark: orange[300] },
    secondary: { main: deepPurple[300], dark: purple[300] },
    error: {
      main: red[800],
    },
  },
  typography: {
    fontFamily: [
      "roboto",
      "monospace",
      "AdiminBoard",
      "Helvetica Neue Light",
    ].join(","),
    fontSize: 20,
    h1: { fontWeight: "bold", fontSize: 25 },
    htmlFontSize: 20,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
    },
  },
  shape: { borderRadius: 0 },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
