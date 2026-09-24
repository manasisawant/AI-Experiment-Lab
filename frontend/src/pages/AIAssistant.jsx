import { useState } from "react";

function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm your AI Research Assistant. Ask me about your experiments, results, research questions, or experiment design.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (customMessage = null) => {
    const message = customMessage || input.trim();

    if (!message || loading) return;

    const userMessage = {
      role: "user",
      content: message,
    };

    setMessages((previous) => [...previous, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Get the latest experiment so the assistant understands
      // what the user has been working on.
      const savedExperiment = localStorage.getItem(
        "experimentResults"
      );

      const experimentContext = savedExperiment
        ? JSON.parse(savedExperiment)
        : null;

      const response = await fetch(
        "http://127.0.0.1:8000/ai/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: message,
            experiment_context: experimentContext,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("AI request failed");
      }

      const data = await response.json();

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: data.response,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "I couldn't connect to the AI engine. Make sure the backend and Ollama are running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="page ai-chat-page">

      <div className="page-header">
        <div>
          <p className="page-kicker">AI RESEARCH ASSISTANT</p>
          <h1>Research Assistant</h1>
          <p>
            Ask questions about your experiments, results,
            hypotheses, and research ideas.
          </p>
        </div>

        <div className="ai-chat-status">
          <span className="status-dot"></span>
          Llama 3.2
        </div>
      </div>

      <div className="ai-chat-container">

        <div className="ai-chat-suggestions">
          <button
            onClick={() =>
              sendMessage("Explain my latest experiment results.")
            }
          >
            Explain my results
          </button>

          <button
            onClick={() =>
              sendMessage(
                "What should I test next based on my latest experiment?"
              )
            }
          >
            What should I test next?
          </button>

          <button
            onClick={() =>
              sendMessage(
                "Explain my latest experiment in simple words."
              )
            }
          >
            Explain simply
          </button>
        </div>

        <div className="ai-chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${message.role}`}
            >
              <div className="chat-avatar">
                {message.role === "assistant" ? "AI" : "YOU"}
              </div>

              <div className="chat-message-content">
                {message.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="chat-message assistant">
              <div className="chat-avatar">AI</div>

              <div className="chat-message-content chat-thinking">
                Analyzing...
              </div>
            </div>
          )}
        </div>

        <div className="ai-chat-input-area">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your research assistant..."
            rows="1"
          />

          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
          >
            Send →
          </button>
        </div>

      </div>
    </div>
  );
}

export default AIAssistant;