from ollama import chat

from ollama import chat


def analyze_experiment(experiment_data):

   prompt = f"""
You are the analysis assistant for AI Experiment Lab.

You MUST treat VERIFIED FACTS as the ONLY source of truth.

EXPERIMENT DATA:
{experiment_data}

IMPORTANT:
The experiment was actually executed by Python.
The execution measurements are real.
Python calculated the VERIFIED FACTS from those measurements.

Your job is ONLY to explain the verified facts in simple research language.

NEVER invent a result.
NEVER infer a result from general knowledge.
NEVER use theoretical sorting complexity.
NEVER make a statement that contradicts VERIFIED FACTS.
NEVER create an overall ranking unless VERIFIED FACTS explicitly support it.

Return exactly these five sections:

OBSERVED RESULTS

State:
- the dataset sizes tested
- the number of runs
- that four sorting algorithms were measured

Do not add unsupported observations.

ALGORITHM COMPARISON

Use ONLY the fastest_by_dataset and slowest_by_dataset information.

For EACH dataset size, explicitly state:
- the fastest algorithm
- its measured average time
- the slowest algorithm
- its measured average time

Do not say an algorithm was fastest at a dataset size unless that exact dataset size appears in fastest_by_dataset.

Do not create a global winner.

PERFORMANCE PATTERN

For EACH algorithm, use its corresponding entry in algorithm_trends.

Report:
- overall_direction
- pattern
- first dataset size and time
- last dataset size and time

If pattern is "mixed", explicitly say:
"The measured pattern was mixed."

Do NOT describe a mixed pattern as consistent.

LIMITATIONS

Mention only limitations supported by the experiment:
- number of algorithms
- dataset sizes
- number of runs
- execution environment

CONCLUSION

Write 2–4 concise sentences.

Summarize the main observations from the VERIFIED FACTS.

Do NOT repeat every measurement.

Mention important differences between algorithms only when directly
supported by fastest_by_dataset or slowest_by_dataset.

Mention if execution time generally increased with dataset size,
but only according to the algorithm_trends fields.

If an algorithm has a mixed pattern, mention that its measured
pattern was mixed.

Do not claim that any algorithm is universally better.

Do not predict performance outside the tested dataset sizes.

Do not introduce any new numerical calculations.

IMPORTANT FINAL RULE:

TIME FORMATTING

When reporting execution times, round them to at most 6 decimal
places.

Do not report long floating-point values such as
0.03742659999503909.

Before writing every factual statement, check whether it is directly supported by VERIFIED FACTS.

If VERIFIED FACTS say X, report X.
Do not replace X with your own interpretation.

Do not use Markdown headings, bullets, bold text, or tables.
Keep the response concise.

VERIFIED FACTS:
{experiment_data.get("verified_facts")}
""" 
   response = chat(
        model="llama3.2",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

   return response.message.content