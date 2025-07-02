import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { AccountsPayable } from "./pages/accountsPayable";

interface AppProps {
  toggleMode: () => void;
  mode: boolean;
}

function App({toggleMode, mode}: AppProps) {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard toggleMode={toggleMode} mode={mode}/>} />
        <Route path="/aPagar" element={<AccountsPayable toggleMode={toggleMode} mode={mode}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
