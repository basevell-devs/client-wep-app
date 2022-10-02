import "../styles/globals.css";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../themes/theme";

import { AuthProvider } from "../firebase/context";
import { AppProvider } from "../context/AppProvider";

import Loader from "../components/Loader";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AppProvider>
          <CssBaseline />
          <Loader />
          <Component {...pageProps} />
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
