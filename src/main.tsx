import { useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./theme.ts";


export const Root = () => {
  const [mode, setMode] = useState(false);
  const toggleMode = () => {
    setMode((prev) => !prev);
  };
  return (
    <ThemeProvider theme={mode ? darkTheme : lightTheme}>
      <CssBaseline />
      <App toggleMode={toggleMode} mode={mode} />
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
