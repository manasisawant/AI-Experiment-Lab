import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Experiments from "./pages/Experiments";
import Results from "./pages/Results";
import AIAssistant from "./pages/AIAssistant";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import "./App.css";


function AppLayout() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <>
      {isHomePage ? (
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      ) : (
        <div className="app-layout">
          <Sidebar />

          <main className="content">
            <Routes>
              <Route
                path="/dashboard"
                element={<Dashboard />}
              />

              <Route
                path="/experiments"
                element={<Experiments />}
              />

              <Route
                path="/results"
                element={<Results />}
              />

              <Route
                path="/ai-assistant"
                element={<AIAssistant />}
              />

              <Route
                path="/reports"
                element={<Reports />}
              />

              <Route
                path="/settings"
                element={<Settings />}
              />
            </Routes>
          </main>
        </div>
      )}
    </>
  );
}


function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;