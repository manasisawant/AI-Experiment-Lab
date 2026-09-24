import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function Experiments() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [datasetSizes, setDatasetSizes] = useState([100]);
  const [runs, setRuns] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [aiPlan, setAiPlan] = useState(null);
  const [aiPlanning, setAiPlanning] = useState(false);

  const toggleDatasetSize = (size) => {
    setDatasetSizes((current) => {
      if (current.includes(size)) {
        if (current.length === 1) {
          return current;
        }

        return current.filter((item) => item !== size);
      }

      return [...current, size].sort((a, b) => a - b);
    });
  };

  const increaseRuns = () => {
    setRuns((current) => Math.min(current + 1, 10));
  };

  const decreaseRuns = () => {
    setRuns((current) => Math.max(current - 1, 1));
  };

  const createAIPlan = async () => {
  if (!question.trim()) {
    setError("Please enter a research question first.");
    return;
  }

  setAiPlanning(true);
  setAiPlan("");
  setError("");

  try {
    const response = await fetch(`${API_URL}/ai/plan`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("AI planning failed");
    }

    const data = await response.json();

    setAiPlan(data.plan);
  } catch (error) {
    console.error(error);

    setError(
      "Unable to generate the AI experiment plan. Make sure Ollama and the backend are running."
    );
  } finally {
    setAiPlanning(false);
  }
};

const useAIPlan = () => {
  if (!aiPlan) {
    return;
  }

  const allowedSizes = [100, 500, 1000, 5000];

  const validSizes = aiPlan.dataset_sizes.filter((size) =>
    allowedSizes.includes(size)
  );

  if (validSizes.length > 0) {
    setDatasetSizes(validSizes);
  }

  if (
    Number.isInteger(aiPlan.runs) &&
    aiPlan.runs >= 1 &&
    aiPlan.runs <= 10
  ) {
    setRuns(aiPlan.runs);
  }
};

  const runExperiment = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/experiments/sorting`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dataset_sizes: datasetSizes,
            runs: runs,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Experiment failed");
      }

      const data = await response.json();

// Save latest experiment for Results page
const experimentRecord = {
  id: Date.now(),
  question: question,
  experiment: "Sorting Performance",
  datasetSizes: datasetSizes,
  runs: runs,
  results: data.results,
  createdAt: new Date().toISOString(),
  verifiedFacts: data.verified_facts,
};

localStorage.setItem(
  "experimentResults",
  JSON.stringify(experimentRecord)
);

// Save experiment to history
const existingHistory = JSON.parse(
  localStorage.getItem("experimentHistory") || "[]"
);

existingHistory.unshift(experimentRecord);

localStorage.setItem(
  "experimentHistory",
  JSON.stringify(existingHistory)
);

navigate("/results");

    } catch (error) {
      console.error(error);
      setError(
        "Unable to run the experiment. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="page">
      <div className="page-header">
        <p className="eyebrow">EXPERIMENTS</p>

        <h1>New Experiment</h1>

        <p>
          Design and run a computational experiment using the Python
          experiment engine.
        </p>
      </div>

      <div className="experiment-card">
        <h2>Sorting Performance Experiment</h2>

        <p className="experiment-description">
          Compare the execution time of different sorting algorithms across
          different dataset sizes.
        </p>

        <div className="form-section">
          <label>Research Question</label>

          <textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Example: Which sorting algorithm performs best as dataset size increases?"
          />
        </div>

        <button
  className="ai-plan-button"
  onClick={createAIPlan}
  disabled={aiPlanning}
>
  {aiPlanning
    ? "🤖 AI is designing..."
    : "✨ Ask AI to Design Experiment"}
</button>

{aiPlan && (
  <div className="ai-plan-card">

    <div className="ai-plan-header">
      <div>
        <span className="eyebrow">
          AI RESEARCH PLANNER
        </span>

        <h3>Suggested Experiment Plan</h3>
      </div>
    </div>


    <div className="ai-plan-content">

      <h4>HYPOTHESIS</h4>
      <p>{aiPlan.hypothesis}</p>


      <h4>VARIABLES</h4>

      <p>
        <strong>Independent:</strong>{" "}
        {aiPlan.independent_variable}
      </p>

      <p>
        <strong>Dependent:</strong>{" "}
        {aiPlan.dependent_variable}
      </p>

      <p>
        <strong>Controlled:</strong>{" "}
        {aiPlan.controlled_variables}
      </p>


      <h4>EXPERIMENT PLAN</h4>

      <p>
        <strong>Dataset Sizes:</strong>{" "}
        {aiPlan.dataset_sizes.join(", ")}
      </p>

      <p>
        <strong>Runs:</strong>{" "}
        {aiPlan.runs}
      </p>

      <p>
        <strong>Measurement:</strong>{" "}
        {aiPlan.measurement}
      </p>


      <h4>EXPECTED OBSERVATION</h4>

      <p>
        {aiPlan.expected_observation}
      </p>

    </div>


    <button
      className="ai-use-plan-button"
      onClick={useAIPlan}
    >
      ✓ Use This Plan
    </button>

  </div>
)}

        <div className="form-section">
          <label>Dataset Sizes</label>

          <div className="size-options">
            {[100, 500, 1000, 5000].map((size) => (
              <button
                key={size}
                className={
                  datasetSizes.includes(size) ? "selected" : ""
                }
                onClick={() => toggleDatasetSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label>Number of Runs</label>

          <div className="run-control">
            <button onClick={decreaseRuns}>−</button>

            <span>{runs}</span>

            <button onClick={increaseRuns}>+</button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <button
          className="run-button"
          onClick={runExperiment}
          disabled={loading}
        >
          {loading ? "⏳ Running Experiment..." : "🔬 Run Experiment"}
        </button>
      </div>
    </div>
  );
}

export default Experiments;