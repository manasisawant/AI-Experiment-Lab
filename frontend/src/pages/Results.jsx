import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { API_URL } from "../config";

function Results() {
  const [experiment, setExperiment] = useState(null);
  const [showAssistant, setShowAssistant] = useState(true);
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [assistantWidth, setAssistantWidth] = useState(420);

  useEffect(() => {
    const savedResults = localStorage.getItem("experimentResults");

    if (savedResults) {
      setExperiment(JSON.parse(savedResults));
    }
  }, []);

  if (!experiment) {
    return (
      <div className="page">
        <div className="page-header">
          <div>
            <span className="eyebrow">EXPERIMENT LAB</span>
            <h1>Results</h1>
            <p>No experiment results available yet.</p>
          </div>
        </div>
      </div>
    );
  }

  const chartData = experiment.datasetSizes.map((size) => {
  const data = {
    dataset_size: size,
  };

  experiment.results
    .filter((item) => item.dataset_size === size)
    .forEach((item) => {
      data[item.algorithm] = Number(
        (item.average_time * 1000).toFixed(3)
      );
    });

  return data;
});

  const barChartData = experiment.results
    .filter(
      (item) =>
        item.dataset_size ===
        Math.max(...experiment.datasetSizes)
    )
    .map((item) => ({
      algorithm: item.algorithm,
      execution_time: Number(
        (item.average_time * 1000).toFixed(3)
      ),
    }));

  const handleAssistantResize = (event) => {
    const newWidth = window.innerWidth - event.clientX;

    const minWidth = 320;
    const maxWidth = Math.min(
      800,
      window.innerWidth - 100
    );

    setAssistantWidth(
      Math.min(
        Math.max(newWidth, minWidth),
        maxWidth
      )
    );
  };

  const analyzeResults = async () => {
    if (!experiment) {
      return;
    }

    setAiLoading(true);
    setAiAnalysis("");

    try {
      const response = await fetch(`${API_URL}/ai/analyze`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            experiment_data: {
  experiment: "sorting_performance",
  dataset_sizes: experiment.datasetSizes,
  runs: experiment.runs,
  results: experiment.results,
  verified_facts: experiment.verifiedFacts
}
          }),
        }
      );

      if (!response.ok) {
        throw new Error("AI analysis failed");
      }

      const data = await response.json();

const analysis = data.analysis;

setAiAnalysis(analysis);

// Save AI analysis into the current experiment
const updatedExperiment = {
  ...experiment,
  aiAnalysis: analysis,
};

setExperiment(updatedExperiment);

localStorage.setItem(
  "experimentResults",
  JSON.stringify(updatedExperiment)
);

// Update the same experiment in history
const history = JSON.parse(
  localStorage.getItem("experimentHistory") || "[]"
);

const updatedHistory = history.map((item) =>
  item.id === experiment.id
    ? {
        ...item,
        aiAnalysis: analysis,
      }
    : item
);

localStorage.setItem(
  "experimentHistory",
  JSON.stringify(updatedHistory)
);

    } catch (error) {
      console.error(error);

      setAiAnalysis(
        "Unable to generate AI analysis. Make sure Ollama and the backend are running."
      );
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="page">

      {/* ================= HEADER ================= */}

      <div className="page-header">
        <div>
          <span className="eyebrow">
            EXPERIMENT RESULTS
          </span>

          <h1>Experiment Results</h1>

          <p>
            Analyze the measurements collected from your
            experiment.
          </p>
        </div>
      </div>


      {/* ================= SUMMARY ================= */}

      <div className="stats-grid">

        <div className="stat-card">
          <span>DATASET SIZES</span>

          <strong>
            {experiment.datasetSizes.join(", ")}
          </strong>
        </div>

        <div className="stat-card">
          <span>RUNS PER TEST</span>

          <strong>
            {experiment.runs}
          </strong>
        </div>

        <div className="stat-card">
          <span>ALGORITHMS</span>

          <strong>
            4
          </strong>
        </div>

        <div className="stat-card">
          <span>MEASUREMENTS</span>

          <strong>
            {experiment.results.length}
          </strong>
        </div>

      </div>


      {/* ================= RESEARCH QUESTION ================= */}

      {experiment.question && (
        <div className="experiment-card">
          <div className="card-header">
            <div>
              <span className="eyebrow">
                RESEARCH QUESTION
              </span>

              <h2>Your Question</h2>
            </div>
          </div>

          <p className="research-question">
            {experiment.question}
          </p>
        </div>
      )}


      {/* ================= LINE CHART ================= */}

      <div className="experiment-card results-card">

        <div className="card-header">
          <div>
            <span className="eyebrow">
              PERFORMANCE
            </span>

            <h2>Execution Time vs Dataset Size</h2>
          </div>
        </div>

        <div className="chart-container">

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <LineChart data={chartData}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#26384d"
              />

              <XAxis
                dataKey="dataset_size"
                stroke="#8da3b8"
                label={{
                  value: "Dataset Size",
                  position: "insideBottom",
                  offset: -5,
                  fill: "#8da3b8",
                }}
              />

              <YAxis
                stroke="#8da3b8"
                label={{
                  value: "Time (ms)",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#8da3b8",
                }}
              />

              <Tooltip />

              <Legend />

              <Line
  type="monotone"
  dataKey="Bubble Sort"
  stroke="#36d9ff"
  strokeWidth={3}
  dot={{ r: 4 }}
/>

<Line
  type="monotone"
  dataKey="Insertion Sort"
  stroke="#8b5cf6"
  strokeWidth={3}
  dot={{ r: 4 }}
/>

<Line
  type="monotone"
  dataKey="Merge Sort"
  stroke="#22c55e"
  strokeWidth={3}
  dot={{ r: 4 }}
/>

<Line
  type="monotone"
  dataKey="Quick Sort"
  stroke="#f97316"
  strokeWidth={3}
  dot={{ r: 4 }}
/>

            </LineChart>
          </ResponsiveContainer>

        </div>

      </div>


      {/* ================= BAR CHART ================= */}

      <div className="experiment-card results-card">

        <div className="card-header">

          <div>
            <span className="eyebrow">
              ALGORITHM COMPARISON
            </span>

            <h2>
              Performance at Largest Dataset
            </h2>
          </div>

        </div>

        <div className="chart-container">

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <BarChart data={barChartData}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#26384d"
              />

              <XAxis
                dataKey="algorithm"
                stroke="#8da3b8"
              />

              <YAxis
                stroke="#8da3b8"
                label={{
                  value: "Time (ms)",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#8da3b8",
                }}
              />

              <Tooltip />

              <Bar
                dataKey="execution_time"
                name="Execution Time"
                fill="#8b5cf6"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* ================= RESULTS TABLE ================= */}

      <div className="experiment-card results-card">

        <div className="card-header">

          <div>
            <span className="eyebrow">
              RAW MEASUREMENTS
            </span>

            <h2>Detailed Results</h2>
          </div>

        </div>

        <div className="results-table-wrapper">

          <table className="results-table">

            <thead>
              <tr>
                <th>Algorithm</th>
                <th>Dataset Size</th>
                <th>Average Time (ms)</th>
              </tr>
            </thead>

            <tbody>

              {experiment.results.map(
                (item, index) => (

                  <tr key={index}>

                    <td>
                      {item.algorithm}
                    </td>

                    <td>
                      {item.dataset_size}
                    </td>

                    <td>
                      {(
                        item.average_time * 1000
                      ).toFixed(3)}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ================= AI ASSISTANT ================= */}

      {showAssistant && (

        <div className="assistant-overlay">

          <div
            className="assistant-panel"
            style={{
              width: `${assistantWidth}px`,
            }}
          >

            {/* RESIZE HANDLE */}

            <div
              className="assistant-resize-handle"
              onMouseDown={() => {

                document.body.style.cursor =
                  "ew-resize";

                const handleMouseMove = (
                  event
                ) => {
                  handleAssistantResize(event);
                };

                const handleMouseUp = () => {

                  document.body.style.cursor =
                    "";

                  document.removeEventListener(
                    "mousemove",
                    handleMouseMove
                  );

                  document.removeEventListener(
                    "mouseup",
                    handleMouseUp
                  );
                };

                document.addEventListener(
                  "mousemove",
                  handleMouseMove
                );

                document.addEventListener(
                  "mouseup",
                  handleMouseUp
                );

              }}
            />


            {/* ASSISTANT HEADER */}

            <div className="assistant-header">

              <div>

                <span className="assistant-eyebrow">
                  AI RESEARCH ASSISTANT
                </span>

                <h2>
                  Experiment Guide
                </h2>

              </div>

             <button
  className="assistant-close"
  onClick={() => setShowAssistant(false)}
  title="Hide AI Assistant"
>
  →
</button> 

            </div>


            {/* STATUS */}

            <div className="assistant-status">

              <span className="status-dot"></span>

              Experiment completed

            </div>


            {/* INTRO MESSAGE */}

            <div className="assistant-message">

              <div className="assistant-avatar">
                🤖
              </div>

              <div>

                <p className="assistant-label">
                  AI ASSISTANT
                </p>

                <p>
                  Your experiment has completed
                  successfully. I'm ready to help
                  you understand the results,
                  compare the algorithms, and
                  identify important performance
                  patterns.
                </p>

              </div>

            </div>


            {/* DATASET INFO */}

            <div className="assistant-section">

              <span>
                DATASET SIZES
              </span>

              <strong>
                {experiment?.datasetSizes?.join(
                  ", "
                )}
              </strong>

            </div>


            <div className="assistant-section">

              <span>
                RUNS
              </span>

              <strong>
                {experiment?.runs}
              </strong>

            </div>


            {/* AI ANALYSIS */}

            <div className="assistant-analysis">

              <p className="assistant-label">
                AI ANALYSIS
              </p>


              {aiLoading ? (

                <p>
                  🤖 Llama is analyzing your
                  experiment results...
                </p>

              ) : aiAnalysis ? (

                <div className="ai-analysis-text">

                  {aiAnalysis
                    .split("\n")
                    .map(
                      (line, index) => {

                        const sectionNames = [
                          "OBSERVED RESULTS",
                          "ALGORITHM COMPARISON",
                          "PERFORMANCE PATTERN",
                          "LIMITATIONS",
                          "CONCLUSION",
                        ];

                        if (
                          sectionNames.includes(
                            line.trim()
                          )
                        ) {

                          return (
                            <h3
                              key={index}
                              className="ai-section-title"
                            >
                              {line.trim()}
                            </h3>
                          );

                        }

                        if (!line.trim()) {

                          return (
                            <div
                              key={index}
                              className="ai-section-space"
                            />
                          );

                        }

                        return (
                          <p key={index}>
                            {line}
                          </p>
                        );

                      }
                    )}

                </div>

              ) : (

                <p>
                  I'm ready to guide you through
                  the experiment results. Click{" "}
                  <strong>
                    Analyze Results
                  </strong>{" "}
                  when you're ready.
                </p>

              )}

            </div>


            {/* ANALYZE BUTTON */}

            <button
              className="full-analysis-button"
              onClick={analyzeResults}
              disabled={aiLoading}
            >

              {aiLoading
                ? "🤖 AI is analyzing..."
                : "🤖 Analyze Results"}

            </button>

          </div>

        </div>

            )}

      {!showAssistant && (
        <button
          className="assistant-open-button"
          onClick={() => setShowAssistant(true)}
          title="Open AI Assistant"
        >
          ←
        </button>
      )}

    </div>
  );

}

export default Results;