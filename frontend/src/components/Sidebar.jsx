import { useState } from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`}>

      {/* LOGO / HEADER */}
      <div className="sidebar-logo">

        <div className="sidebar-brand">
          <span className="sidebar-logo-icon">🔬</span>

          <div className="sidebar-brand-text">
            <strong>AI Experiment</strong>
            <small>LAB</small>
          </div>
        </div>

        <button
          className="sidebar-menu-button"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          ☰
        </button>

      </div>


      {/* NAVIGATION */}
      <nav className="sidebar-nav">

        <p className="nav-label">WORKSPACE</p>

        <NavLink to="/dashboard" end title="Home">
          <span>⌂</span>
          <span className="nav-text">Dashboard</span>
        </NavLink>

        <NavLink to="/experiments" title="Experiments">
          <span>🧪</span>
          <span className="nav-text">Experiments</span>
        </NavLink>

        <NavLink to="/results" title="Results">
          <span>📊</span>
          <span className="nav-text">Results</span>
        </NavLink>


        <p className="nav-label">AI TOOLS</p>

        <NavLink to="/ai-assistant" title="AI Assistant">
          <span>🤖</span>
          <span className="nav-text">AI Assistant</span>
        </NavLink>

        <NavLink to="/reports" title="Reports">
          <span>📄</span>
          <span className="nav-text">Reports</span>
        </NavLink>


        <p className="nav-label">SYSTEM</p>

        <NavLink to="/settings" title="Settings">
          <span>⚙️</span>
          <span className="nav-text">Settings</span>
        </NavLink>

      </nav>


      {/* STATUS */}
      <div className="sidebar-bottom">

        <div className="lab-status">

          <span className="status-dot"></span>

          <div className="status-text">
            <strong>Experiment Engine</strong>
            <small>Online</small>
          </div>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;