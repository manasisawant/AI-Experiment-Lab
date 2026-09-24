import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const landingRef = useRef(null);

const sectionRefs = useRef([]);

const [activeSlide, setActiveSlide] = useState(0);

const slides = [
  "Home",
  "About",
  "Workflow",
  "Capabilities",
  "Start",
];

useEffect(() => {
  const container = landingRef.current;

  if (!container) return;

  const handleScroll = () => {
    const sections = sectionRefs.current.filter(Boolean);

    let closestIndex = 0;
    let closestDistance = Infinity;

    sections.forEach((section, index) => {
      const distance = Math.abs(
        section.offsetTop - container.scrollTop
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveSlide(closestIndex);
  };

  container.addEventListener("scroll", handleScroll);

  return () => {
    container.removeEventListener("scroll", handleScroll);
  };
}, []);

useEffect(() => {
  const timer = setTimeout(() => {
    const nextSlide =
      activeSlide === slides.length - 1
        ? 0
        : activeSlide + 1;

    goToSlide(nextSlide);
  }, 5000);

  return () => clearTimeout(timer);
}, [activeSlide]);

const goToSlide = (index) => {
  const section = sectionRefs.current[index];

  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

  return (
    <div className="landing-page"
    ref={landingRef}
    >

      {/* HERO */}

      <section className="landing-hero"
      ref={(el) => (sectionRefs.current[0] = el)}>

        <div className="landing-hero-content">

          <div className="landing-badge">
            <span className="landing-pulse"></span>
            AI-ASSISTED EXPERIMENTATION
          </div>

          <h1>
            Turn Research Questions
            <span> Into Real Experiments.</span>
          </h1>

          <p>
            Design experiments with AI, run real computational
            measurements with Python, and understand your results
            with evidence.
          </p>

          <div className="landing-actions">

            <button
              className="landing-primary-button"
              onClick={() => navigate("/experiments")}
            >
              Start Experiment →
            </button>

            <button
              className="landing-secondary-button"
              onClick={() => navigate("/ai-assistant")}
            >
              Talk to AI
            </button>

          </div>

          <div className="landing-trust">
            <span>✓ Real measurements</span>
            <span>✓ Local AI</span>
            <span>✓ Evidence-based analysis</span>
          </div>

        </div>

        {/* ANIMATED EXPERIMENT VISUAL */}

        <div className="experiment-visual">

          <div className="visual-glow"></div>

          <div className="experiment-node node-question">
            <span>?</span>
            <div>
              <small>QUESTION</small>
              <strong>Research Question</strong>
            </div>
          </div>

          <div className="visual-line line-one"></div>

          <div className="experiment-node node-ai">
            <span>✦</span>
            <div>
              <small>AI PLANNER</small>
              <strong>Experiment Plan</strong>
            </div>
          </div>

          <div className="visual-line line-two"></div>

          <div className="experiment-node node-python">
            <span>⌘</span>
            <div>
              <small>PYTHON ENGINE</small>
              <strong>Real Experiment</strong>
            </div>
          </div>

          <div className="visual-line line-three"></div>

          <div className="experiment-node node-results">
            <span>↗</span>
            <div>
              <small>RESULTS</small>
              <strong>Verified Evidence</strong>
            </div>
          </div>

          <div className="floating-dot dot-one"></div>
          <div className="floating-dot dot-two"></div>
          <div className="floating-dot dot-three"></div>

        </div>

      </section>

      {/* INTRO */}

      <section 
      className="landing-section landing-intro"
      ref={(el) => (sectionRefs.current[1] = el)}>

        <div className="section-heading">
          <span>WHAT IS AI EXPERIMENT LAB?</span>

          <h2>
            From an idea to
            <span> measurable evidence.</span>
          </h2>

          <p>
            AI Experiment Lab combines AI-assisted research planning
            with real computational experiments. AI helps you plan
            and understand the experiment, while Python performs the
            actual measurements.
          </p>
        </div>

        <div className="feature-grid">

          <div className="landing-feature">
            <div className="feature-number">01</div>
            <div className="feature-icon">🤖</div>
            <h3>Plan with AI</h3>
            <p>
              Generate hypotheses, variables, dataset sizes,
              and experiment plans from a research question.
            </p>
          </div>

          <div className="landing-feature">
            <div className="feature-number">02</div>
            <div className="feature-icon">🧪</div>
            <h3>Run Real Experiments</h3>
            <p>
              Python executes the experiment and collects
              actual performance measurements.
            </p>
          </div>

          <div className="landing-feature">
            <div className="feature-number">03</div>
            <div className="feature-icon">📊</div>
            <h3>Understand Results</h3>
            <p>
              View measurements, verified facts, charts,
              AI analysis, and downloadable reports.
            </p>
          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}

      <section 
      className="landing-section workflow-section"
      ref={(el) => (sectionRefs.current[2] = el)}
      >

        <div className="section-heading">
          <span>HOW IT WORKS</span>

          <h2>
            A research workflow
            <span> built around evidence.</span>
          </h2>
        </div>

        <div className="workflow">

          <div className="workflow-step">
            <div className="workflow-circle">01</div>
            <h3>Ask</h3>
            <p>
              Start with a research question.
            </p>
          </div>

          <div className="workflow-connector"></div>

          <div className="workflow-step">
            <div className="workflow-circle">02</div>
            <h3>Plan</h3>
            <p>
              AI creates a structured experiment plan.
            </p>
          </div>

          <div className="workflow-connector"></div>

          <div className="workflow-step">
            <div className="workflow-circle">03</div>
            <h3>Run</h3>
            <p>
              Python performs the actual experiment.
            </p>
          </div>

          <div className="workflow-connector"></div>

          <div className="workflow-step">
            <div className="workflow-circle">04</div>
            <h3>Understand</h3>
            <p>
              Analyze verified measurements and generate reports.
            </p>
          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section 
      className="landing-section capability-section"
      ref={(el) => (sectionRefs.current[3] =el)}
      >

        <div className="section-heading">
          <span>THE LAB</span>

          <h2>
            Everything you need to
            <span> experiment.</span>
          </h2>
        </div>

        <div className="capability-grid">

          <div className="capability-card">
            <span>✦</span>
            <h3>AI Research Planner</h3>
            <p>
              Turn a question into a testable computational
              experiment.
            </p>
          </div>

          <div className="capability-card">
            <span>⌘</span>
            <h3>Python Experiment Engine</h3>
            <p>
              Execute experiments and collect real measurements.
            </p>
          </div>

          <div className="capability-card">
            <span>◈</span>
            <h3>Verified Facts</h3>
            <p>
              Separate measured evidence from AI interpretation.
            </p>
          </div>

          <div className="capability-card">
            <span>◉</span>
            <h3>AI Research Assistant</h3>
            <p>
              Ask questions about experiments and understand
              your results.
            </p>
          </div>

          <div className="capability-card">
            <span>↗</span>
            <h3>Visual Results</h3>
            <p>
              Explore performance measurements through charts
              and comparisons.
            </p>
          </div>

          <div className="capability-card">
            <span>↓</span>
            <h3>Research Reports</h3>
            <p>
              Download your experiments as structured PDF reports.
            </p>
          </div>

        </div>

      </section>

      {/* FINAL CTA */}

      <section
       className="landing-cta"
       ref={(el) => (sectionRefs.current[4] = el)}
       >

        <div className="cta-glow"></div>

        <span>READY TO EXPERIMENT?</span>

        <h2>
          Your next research question
          <br />
          could become an experiment.
        </h2>

        <button
          className="landing-primary-button"
          onClick={() => navigate("/experiments")}
        >
          Enter the Lab →
        </button>

      </section>

      <div className="landing-slide-indicator">

  {slides.map((slide, index) => (
    <button
  key={slide}
  className={
    activeSlide === index
      ? "slide-dot active"
      : "slide-dot"
  }
  onClick={() => goToSlide(index)}
  aria-label={`Go to ${slide}`}
>
  <span className="slide-dot-track">
    <span
      className={
        activeSlide === index
          ? "slide-dot-progress"
          : ""
      }
    ></span>
  </span>

  <small>{slide}</small>
</button>
  ))}

</div>

      {/* FOOTER */}

      <footer className="landing-footer">

        <div>
          <strong>AI EXPERIMENT LAB</strong>
          <span>
            AI-assisted computational experimentation
          </span>
        </div>

        <div className="landing-footer-links">
          <button onClick={() => navigate("/experiments")}>
            Experiments
          </button>

          <button onClick={() => navigate("/ai-assistant")}>
            AI Assistant
          </button>

          <button onClick={() => navigate("/reports")}>
            Reports
          </button>
        </div>

      </footer>

    </div>
  );
}

export default Home;