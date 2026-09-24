import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [experiment, setExperiment] = useState(null);

  useEffect(() => {
    const savedResults = localStorage.getItem("experimentResults");

    if (savedResults) {
      setExperiment(JSON.parse(savedResults));
    }
  }, []);

  const experimentCount = experiment ? 1 : 0;

  const algorithmCount = experiment
    ? new Set(experiment.results.map((result) => result.algorithm)).size
    : 0;

  const largestDataset = experiment
    ? Math.max(...experiment.datasetSizes)
    : 0;

  return (
    <div className="page dashboard-page">
      <div className="page-header dashboard-header">
        <div>
          <p className="eyebrow">AI EXPERIMENT LAB</p>

          <h1>Research & Experimentation Workspace</h1>

          <p>
            Design experiments, generate measurable evidence, and explore
            computational results.
          </p>
        </div>
      </div>

      {/* Stats */}

      <div className="dashboard-stats">
        <div className="dashboard-stat">
          <span>EXPERIMENTS</span>
          <strong>{experimentCount}</strong>
          <small>Completed experiments</small>
        </div>

        <div className="dashboard-stat">
          <span>ALGORITHMS TESTED</span>
          <strong>{algorithmCount || "—"}</strong>
          <small>Algorithms in latest experiment</small>
        </div>

        <div className="dashboard-stat">
          <span>LARGEST DATASET</span>
          <strong>{largestDataset || "—"}</strong>
          <small>Items tested</small>
        </div>
      </div>

      {/* Quick Actions */}

      <div className="dashboard-section">
        <div className="section-title">
          <p className="eyebrow">QUICK ACTIONS</p>
          <h2>Start exploring</h2>
        </div>

        <div className="quick-actions">
          <Link to="/experiments" className="action-card">
            <div className="action-icon">🧪</div>

            <div>
              <h3>New Experiment</h3>
              <p>
                Configure parameters and run a computational experiment.
              </p>
            </div>

            <span className="action-arrow">→</span>
          </Link>

          <Link to="/ai-assistant" className="action-card ai-action">
            <div className="action-icon">🤖</div>

            <div>
              <h3>AI Research Assistant</h3>
              <p>
                Turn a research question into a structured experiment plan.
              </p>
            </div>

            <span className="action-arrow">→</span>
          </Link>
        </div>
      </div>

      {/* Recent Experiment */}

      <div className="dashboard-section">
        <div className="section-title">
          <p className="eyebrow">LATEST</p>
          <h2>Recent Experiment</h2>
        </div>

        {experiment ? (
          <div className="recent-experiment">
            <div>
              <span className="recent-label">EXPERIMENT</span>

              <h3>Sorting Performance</h3>

              <p>
                Compared sorting algorithm execution time across{" "}
                {experiment.datasetSizes.length} dataset size
                {experiment.datasetSizes.length !== 1 ? "s" : ""}.
              </p>
            </div>

            <Link to="/results" className="view-results">
              View Results →
            </Link>
          </div>
        ) : (
          <div className="recent-experiment empty-dashboard">
            <div>
              <h3>No experiments yet</h3>

              <p>
                Run your first experiment to start building measurable
                results.
              </p>
            </div>

            <Link to="/experiments" className="view-results">
              Start Experiment →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;