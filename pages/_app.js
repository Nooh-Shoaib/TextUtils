import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { useState, useEffect, useMemo } from "react";
import "@/styles/globals.css";
import Layout from "../components/Layout";
import LoadingBar from "@/components/LoadingBar";

const createAppTheme = (mode) =>
  responsiveFontSizes(
    createTheme({
      palette: {
        mode,
        primary: {
          main: "#0ea5e9",
        },
        background: {
          default: mode === "light" ? "#ffffff" : "#121212",
          paper: mode === "light" ? "#ffffff" : "#1e1e1e",
        },
        text: {
          primary: mode === "light" ? "#171717" : "#ffffff",
          secondary: mode === "light" ? "#666666" : "#a0a0a0",
        },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              scrollBehavior: "smooth",
              backgroundColor: mode === "light" ? "#ffffff" : "#121212",
              color: mode === "light" ? "#171717" : "#ffffff",
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: "none",
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: "none",
            },
          },
        },
      },
    })
  );

// Separate component to handle theme updates
function ThemeUpdater({ children }) {
  const { theme } = useTheme();
  const muiTheme = useMemo(
    () => createAppTheme(theme === "dark" ? "dark" : "light"),
    [theme]
  );

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

function App({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeUpdater>
        <LoadingBar />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeUpdater>
    </NextThemeProvider>
  );
}

export default App;
