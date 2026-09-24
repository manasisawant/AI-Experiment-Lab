import { useEffect, useState } from "react";

function Settings() {
  const [defaultRuns, setDefaultRuns] = useState(3);
  const [theme, setTheme] = useState("dark")

  const [datasetSizes, setDatasetSizes] = useState([
    100,
    500,
    1000,
    5000,
  ]);

  const [responseStyle, setResponseStyle] = useState("Balanced");

  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("appTheme") || "dark";

setTheme(savedTheme);
document.body.classList.toggle(
  "light-mode",
  savedTheme === "light"
);
    const changeTheme = (newTheme) => {
  setTheme(newTheme);

  localStorage.setItem(
    "appTheme",
    newTheme
  );

  document.body.classList.toggle(
    "light-mode",
    newTheme === "light"
  );
};

    const savedSettings = JSON.parse(
      localStorage.getItem("experimentSettings") || "null"
    );

    if (savedSettings) {
      setDefaultRuns(savedSettings.defaultRuns ?? 3);
      setDatasetSizes(
        savedSettings.datasetSizes ?? [100, 500, 1000, 5000]
      );
      setResponseStyle(
        savedSettings.responseStyle ?? "Balanced"
      );
    }
  }, []);

  const toggleDatasetSize = (size) => {
    setDatasetSizes((previous) => {
      if (previous.includes(size)) {
        return previous.filter((item) => item !== size);
      }

      return [...previous, size].sort((a, b) => a - b);
    });
  };

  const saveSettings = () => {
    localStorage.setItem(
      "experimentSettings",
      JSON.stringify({
        defaultRuns,
        datasetSizes,
        responseStyle,
      })
    );

    setMessage("Settings saved successfully.");

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const clearHistory = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear all experiment history?"
    );

    if (!confirmed) return;

    localStorage.removeItem("experimentHistory");
    localStorage.removeItem("experimentResults");

    setMessage("Experiment history cleared.");

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const changeTheme = (newTheme) => {
  setTheme(newTheme);
  localStorage.setItem("appTheme", newTheme);

  if (newTheme === "light") {
    document.body.classList.add("light-mode");
  } else {
    document.body.classList.remove("light-mode");
  }
};

useEffect(() => {
  const savedTheme =
    localStorage.getItem("appTheme") || "dark";

  setTheme(savedTheme);

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  } else {
    document.body.classList.remove("light-mode");
  }
}, []);



  return (
    <div className="page settings-page">

      <div className="page-header">
        <div>
          <p className="page-kicker">SYSTEM CONFIGURATION</p>
          <h1>Settings</h1>
          <p>
            Configure experiment defaults, AI preferences,
            and local application data.
          </p>
        </div>

        {message && (
          <div className="settings-save-message">
            ✓ {message}
          </div>
        )}
      </div>

      <div className="settings-grid">

        <section className="settings-card">
  <div className="settings-card-header">
    <div className="settings-icon">🎨</div>

    <div>
      <h2>Appearance</h2>
      <p>
        Choose how AI Experiment Lab looks.
      </p>
    </div>
  </div>

  <div className="settings-field">
    <label>Application Theme</label>

    <div className="theme-options">

      <button
        className={
          theme === "dark"
            ? "theme-option active"
            : "theme-option"
        }
        onClick={() => changeTheme("dark")}
      >
        <span className="theme-option-icon">🌙</span>

        <div>
          <strong>Dark Mode</strong>
          <small>Dark research workspace</small>
        </div>
      </button>

      <button
        className={
          theme === "light"
            ? "theme-option active"
            : "theme-option"
        }
        onClick={() => changeTheme("light")}
      >
        <span className="theme-option-icon">☀️</span>

        <div>
          <strong>Light Mode</strong>
          <small>Bright research workspace</small>
        </div>
      </button>

    </div>
  </div>
</section>

        {/* AI SETTINGS */}

        <section className="settings-card">
          <div className="settings-card-header">
            <div className="settings-icon">🤖</div>

            <div>
              <h2>AI Assistant</h2>
              <p>
                Configure how the local AI assistant responds.
              </p>
            </div>
          </div>

          <div className="settings-field">
            <label>AI Model</label>

            <div className="settings-info">
              <strong>Llama 3.2</strong>
              <span>Running locally through Ollama</span>
            </div>
          </div>

          <div className="settings-field">
            <label>Response Style</label>

            <div className="settings-options">
              {["Concise", "Balanced", "Detailed"].map(
                (style) => (
                  <button
                    key={style}
                    className={
                      responseStyle === style
                        ? "settings-option active"
                        : "settings-option"
                    }
                    onClick={() =>
                      setResponseStyle(style)
                    }
                  >
                    {style}
                  </button>
                )
              )}
            </div>
          </div>
        </section>

        {/* EXPERIMENT SETTINGS */}

        <section className="settings-card">
          <div className="settings-card-header">
            <div className="settings-icon">🧪</div>

            <div>
              <h2>Experiment Defaults</h2>
              <p>
                Choose the default configuration for new experiments.
              </p>
            </div>
          </div>

          <div className="settings-field">
            <label>Default Number of Runs</label>

            <select
              value={defaultRuns}
              onChange={(event) =>
                setDefaultRuns(Number(event.target.value))
              }
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                (number) => (
                  <option key={number} value={number}>
                    {number} {number === 1 ? "run" : "runs"}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="settings-field">
            <label>Default Dataset Sizes</label>

            <div className="dataset-options">
              {[100, 500, 1000, 5000].map((size) => (
                <button
                  key={size}
                  className={
                    datasetSizes.includes(size)
                      ? "dataset-option active"
                      : "dataset-option"
                  }
                  onClick={() => toggleDatasetSize(size)}
                >
                  {datasetSizes.includes(size) ? "✓ " : ""}
                  {size}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* DATA SETTINGS */}

        <section className="settings-card">
          <div className="settings-card-header">
            <div className="settings-icon">💾</div>

            <div>
              <h2>Local Data</h2>
              <p>
                Manage experiment data stored in your browser.
              </p>
            </div>
          </div>

          <div className="settings-data-row">
            <div>
              <strong>Experiment History</strong>
              <span>
                Saved locally using browser storage.
              </span>
            </div>

            <button
              className="danger-button"
              onClick={clearHistory}
            >
              Clear History
            </button>
          </div>
        </section>

        {/* SYSTEM STATUS */}

        <section className="settings-card">
          <div className="settings-card-header">
            <div className="settings-icon">⚡</div>

            <div>
              <h2>System Status</h2>
              <p>
                Current AI Experiment Lab services.
              </p>
            </div>
          </div>

          <div className="system-status-list">

            <div className="system-status-item">
              <div>
                <strong>Experiment Engine</strong>
                <span>Python + FastAPI</span>
              </div>

              <span className="online-status">
                <i></i>
                Online
              </span>
            </div>

            <div className="system-status-item">
              <div>
                <strong>AI Engine</strong>
                <span>Ollama + Llama 3.2</span>
              </div>

              <span className="online-status">
                <i></i>
                Local
              </span>
            </div>

            <div className="system-status-item">
              <div>
                <strong>Storage</strong>
                <span>Browser localStorage</span>
              </div>

              <span className="online-status">
                <i></i>
                Active
              </span>
            </div>

          </div>
        </section>

      </div>

      <div className="settings-actions">
        <button
          className="save-settings-button"
          onClick={saveSettings}
        >
          Save Settings
        </button>
      </div>

      <div className="settings-about">
        <span>AI EXPERIMENT LAB</span>
        <p>
          AI-assisted computational experimentation platform
        </p>
        <small>Version 1.0.0</small>
      </div>

    </div>
  );
}

export default Settings;