import json
from ollama import chat


def create_experiment_plan(question):
    prompt = f"""
You are an AI research planning assistant for AI Experiment Lab.

The user's research question is:

{question}

Design a simple computational experiment for this question.

The experiment is specifically a sorting performance experiment using
these available algorithms:

- Bubble Sort
- Insertion Sort
- Merge Sort
- Quick Sort

The available dataset sizes are ONLY:
100, 500, 1000, 5000

Choose dataset sizes only from those four values.

Choose a number of runs between 1 and 10.

Return ONLY valid JSON.

Use exactly this structure:

{{
  "hypothesis": "one clear testable hypothesis",
  "independent_variable": "the variable being changed",
  "dependent_variable": "the variable being measured",
  "controlled_variables": "what should remain consistent",
  "dataset_sizes": [100, 500, 1000],
  "runs": 3,
  "measurement": "what will be measured",
  "expected_observation": "what pattern the experiment should look for"
}}

IMPORTANT:
- dataset_sizes must contain only 100, 500, 1000, or 5000.
- runs must be an integer from 1 to 10.
- Do not include Markdown.
- Do not include explanations outside the JSON.
- Do not invent experimental results.
- This is a proposed experiment, not an actual result.
"""

    response = chat(
        model="llama3.2",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        format="json"
    )

    return json.loads(response.message.content)