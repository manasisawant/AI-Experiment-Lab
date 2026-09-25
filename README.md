# 🔬 AI Experiment Lab

AI Experiment Lab is an AI-assisted computational experimentation platform that helps transform research questions into executable experiments, real measurements, visual results, and AI-assisted analysis.

The platform combines AI with a Python-based experiment engine so that AI helps with experiment planning and interpretation while the actual measurements are produced by code.

## 🚀 Live Demo

https://ai-experiment-lab.vercel.app/

## 💻 GitHub Repository

https://github.com/manasisawant/AI-Experiment-Lab

---

## 🎯 Project Idea

Many programming projects focus on building applications that perform predefined tasks.

AI Experiment Lab focuses on a different workflow:

**Research Question → Experiment Plan → Experiment Execution → Measurements → Results → Analysis**

The goal is to provide a simple environment where computational experiments can be designed, executed, visualized, and interpreted.

---

## ✨ Features

### 🤖 AI Experiment Planner

Users can enter a research question and generate an experiment plan containing:

- Hypothesis
- Independent variable
- Dependent variable
- Controlled variables
- Dataset sizes
- Number of runs
- Measurement method
- Expected observation

### 🧪 Experiment Engine

The platform currently includes a sorting algorithm performance experiment comparing:

- Bubble Sort
- Insertion Sort
- Merge Sort
- Quick Sort

Experiments are executed using Python and measure actual execution times.

### 📊 Results Visualization

Experiment results are displayed using interactive charts and tables.

The platform allows users to compare algorithm performance across different dataset sizes.

### 🔎 Verified Facts

The Python experiment engine calculates verified facts directly from the measured results.

These facts include:

- Fastest algorithm for each tested dataset size
- Slowest algorithm for each tested dataset size
- Performance trends
- Measured execution times

The AI analysis uses these verified facts rather than generating experimental measurements itself.

### 💬 AI Research Assistant

The platform includes an AI assistant that can help users understand:

- Experiment results
- Research questions
- Hypotheses
- Experiment design
- Computational concepts

### 📄 Experiment Reports

Users can download experiment results and analysis as PDF reports.

### 🎨 Modern Web Interface

The application includes:

- Landing page
- Experiment workspace
- Results dashboard
- AI Research Assistant
- Reports
- Settings
- Dark and light themes
- Responsive interface

---

## 🔬 Example Experiment

### Research Question

> How does dataset size affect the execution time of different sorting algorithms?

### Algorithms

- Bubble Sort
- Insertion Sort
- Merge Sort
- Quick Sort

### Dataset Sizes

- 100
- 500
- 1000
- 5000

### Measurement

Average execution time across multiple runs.

The experiment engine generates the datasets, executes each algorithm, measures execution time, and calculates the resulting statistics.

---

## 🧠 AI + Experiment Architecture

A key design principle of the project is separating AI reasoning from actual experiment measurements.

```text
                    Research Question
                           │
                           ▼
                  ┌─────────────────┐
                  │   AI Planner    │
                  │   Llama 3.2     │
                  └────────┬────────┘
                           │
                           ▼
                    Experiment Plan
                           │
                           ▼
                  ┌─────────────────┐
                  │ Python Engine   │
                  │ Actual Testing  │
                  └────────┬────────┘
                           │
                           ▼
                    Real Measurements
                           │
                           ▼
                  ┌─────────────────┐
                  │ Verified Facts  │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │   AI Analysis   │
                  │   Llama 3.2     │
                  └────────┬────────┘
                           │
                           ▼
                 Results + Explanation

.
🛠️ Tech Stack
Frontend
- React
- Vite
- JavaScript
- Recharts
- CSS
Backend
- Python
- FastAPI
- Pydantic
- Uvicorn
AI
- Ollama
- Llama 3.2
Development & Deployment
- Git
- GitHub
- Vercel
- Render
📁 Project Structure
AI-Experiment-Lab/
│
├── backend/
│   ├── experiments/
│   │   └── sorting.py
│   ├── services/
│   │   ├── ai_analysis.py
│   │   ├── ai_chat.py
│   │   └── ai_planner.py
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── pages/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md

⚙️ Running Locally
1. Clone the repository
git clone https://github.com/manasisawant/AI-Experiment-Lab.git

cd AI-Experiment-Lab

2. Backend Setup
Navigate to the backend:
cd backend

Create a virtual environment:
python -m venv venv

Activate it on Windows:
venv\Scripts\activate

Install dependencies:
pip install -r requirements.txt

Start the FastAPI server:
uvicorn main:app --reload

The backend will run at:
http://127.0.0.1:8000

3. AI Setup
Install Ollama and download Llama 3.2:
ollama pull llama3.2

Make sure Ollama is running locally.
The AI features use the locally hosted Llama 3.2 model.
4. Frontend Setup
Open another terminal and navigate to:
cd frontend

Install dependencies:
npm install

Start the development server:
npm run dev

The frontend will normally run at:
http://localhost:5173

📊 Current Experiment
The current implementation focuses on sorting algorithm performance.
The experiment compares four algorithms across multiple dataset sizes and runs.
The results can be visualized through charts and analyzed by the AI assistant.
🚀 Deployment
The application is deployed using:
- Frontend: Vercel
- Backend: Render
- AI: Local Ollama + Llama 3.2 for the development/local AI environment
The deployed experiment engine and frontend are publicly accessible through the live demo.
🔮 Future Improvements
Possible future extensions include:
- More experiment types
- Machine learning experiments
- Statistical analysis
- Additional visualization options
- Experiment comparison
- Persistent database storage
- More AI-assisted research workflows
- Additional computational algorithms
👩‍💻 Author
Manasi Sawant
BSc Computer Science
Built as a project to explore the combination of AI, software development, and computational experimentation.
