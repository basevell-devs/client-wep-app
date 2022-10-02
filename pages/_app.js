import "../styles/globals.css";

import { AuthProvider } from "../firebase/context";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../themes/theme";
import Loader from "../components/Loader";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        {/* <Loader /> */}
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
