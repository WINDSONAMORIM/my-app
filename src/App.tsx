import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { ResponsiveAppBar } from "./components/appBar";

interface AppProps {
  toggleMode: () => void;
  mode: boolean;
}

function App({toggleMode, mode}: AppProps) {  
  return (
    <BrowserRouter>
      <ResponsiveAppBar toggleMode={toggleMode} mode={mode} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
