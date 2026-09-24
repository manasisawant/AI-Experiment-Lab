import os
from services.ai_chat import chat_with_ai
from services.ai_analysis import analyze_experiment
from services.ai_planner import create_experiment_plan
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from experiments.sorting import (
    run_sorting_experiment,
    calculate_verified_facts
)

app = FastAPI(
    title="AI Experiment Lab",
    description="AI-assisted computational experiment platform",
    version="1.0.0"
)

frontend_url = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "AI Experiment Lab API is running"
    }

class SortingExperimentRequest(BaseModel):
    dataset_sizes: List[int]
    runs: int = 3

@app.post("/experiments/sorting")
def run_sorting(request: SortingExperimentRequest):

    results = run_sorting_experiment(
        dataset_sizes=request.dataset_sizes,
        runs=request.runs
    )

    verified_facts = calculate_verified_facts(results)

    return {
        "experiment": "sorting_performance",
        "dataset_sizes": request.dataset_sizes,
        "runs": request.runs,
        "results": results,
        "verified_facts": verified_facts
    }

class AIAnalysisRequest(BaseModel):
    experiment_data: dict


@app.post("/ai/analyze")
def analyze_results(request: AIAnalysisRequest):
    analysis = analyze_experiment(request.experiment_data)

    return {
        "status": "success",
        "analysis": analysis
    }

class AIPlannerRequest(BaseModel):
    question: str


@app.post("/ai/plan")
def create_plan(request: AIPlannerRequest):
    plan = create_experiment_plan(request.question)

    return {
        "status": "success",
        "plan": plan
    }

class AIChatRequest(BaseModel):
    message: str
    experiment_context: dict | None = None


@app.post("/ai/chat")
def ai_chat(request: AIChatRequest):

    response = chat_with_ai(
        request.message,
        request.experiment_context
    )

    return {
        "status": "success",
        "response": response
    }