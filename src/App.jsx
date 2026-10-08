import { useMemo, useState } from 'react'

const starterPrompts = {
  email: {
    title: 'Email Generation',
    placeholder: 'Example: Draft a follow-up email to a client about project progress and next steps.',
    result: 'Subject: Project Update and Next Steps\n\nHi [Client Name],\n\nThank you for your continued partnership. I wanted to share a brief update on the current project status. We have completed the discovery phase and are moving into implementation with the next milestone scheduled for Friday.\n\nPlease let us know if you would like a walkthrough of the current deliverables or any additional stakeholders included in the next review. We are happy to coordinate a brief meeting to align on the plan.\n\nBest regards,\n[Your Name]'
  },
  meeting: {
    title: 'Meeting Summarization',
    placeholder: 'Example: Summarize a 30-minute team stand-up including decisions, blockers, and owners.',
    result: 'Summary\n- The team aligned on the launch timeline and agreed to finalize the checklist by end of day Wednesday.\n- Key blockers were identified in the reporting workflow and assigned to the operations lead for resolution.\n- Marketing will provide updated launch assets for review by Friday.\n- Decision: proceed with the revised onboarding plan and monitor risks in the next sync.'
  },
  planning: {
    title: 'Task Planning',
    placeholder: 'Example: Create a weekly work plan for a product manager balancing stakeholder communication and roadmap reviews.',
    result: 'Weekly Plan\n1. Monday: Prioritize backlog and align cross-functional dependencies.\n2. Tuesday: Prepare stakeholder updates and launch status dashboard.\n3. Wednesday: Review roadmap risks and confirm milestones with engineering.\n4. Thursday: Finalize sprint readiness and identify decisions required from leadership.\n5. Friday: Close the week with outcome review and next-step planning.'
  },
  research: {
    title: 'Research Assistance',
    placeholder: 'Example: Gather key points on remote work productivity trends, risks, and recommendations for a manager summary.',
    result: 'Research Brief\n- Hybrid and remote work models continue to improve employee flexibility, but productivity depends strongly on communication clarity and manager support.\n- Common challenges include collaboration bottlenecks, onboarding difficulty, and digital fatigue.\n- Best-practice recommendations: set measurable goals, maintain asynchronous documentation, and hold short structured check-ins.'
  },
  chatbot: {
    title: 'Chatbot Interaction',
    placeholder: 'Example: Ask: “How can I improve stakeholder communication for a delayed project?”',
    result: 'Response: Start by acknowledging the delay, stating the impact clearly, and outlining the recovery plan with specific milestones. Transparency, ownership, and a proactive communication cadence usually rebuild trust the fastest.'
  }
}

const tabs = [
  'email',
  'meeting',
  'planning',
  'research',
  'chatbot'
]

const features = [
  'Email generation with tone and audience control',
  'Meeting summaries with action items and decisions',
  'Task planning for weekly and project delivery workflows',
  'Research support using structured prompts and synthesis',
  'Chatbot assistance for work queries and stakeholder communication'
]

const ethicalPoints = [
  'Human oversight remains essential for final decisions and communication output.',
  'Do not use AI to fabricate facts, mislead stakeholders, or hide uncertainty.',
  'Protect private or sensitive information with clear input controls and security review.',
  'Review generated content for fairness, inclusivity, and tone appropriateness.'
]

async function callOpenAI(prompt, type) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY
  const model = import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini'

  if (!apiKey) {
    return starterPrompts[type].result
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        temperature: 0.7,
        messages: [
          {
            role: 'system',
            content:
              'You are a professional workplace assistant. Provide practical, concise, and professional output for business communication and productivity tasks.'
          },
          { role: 'user', content: prompt }
        ]
      })
    })

    if (!response.ok) {
      throw new Error('AI request failed')
    }

    const data = await response.json()
    return data.choices?.[0]?.message?.content?.trim() || starterPrompts[type].result
  } catch (error) {
    console.error(error)
    return starterPrompts[type].result
  }
}

function App() {
  const [activeTab, setActiveTab] = useState('email')
  const [prompt, setPrompt] = useState(starterPrompts.email.placeholder)
  const [output, setOutput] = useState(starterPrompts.email.result)
  const [loading, setLoading] = useState(false)

  const currentTab = useMemo(() => starterPrompts[activeTab], [activeTab])

  const updateTab = (tab) => {
    setActiveTab(tab)
    setPrompt(starterPrompts[tab].placeholder)
    setOutput(starterPrompts[tab].result)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    const userRequest = prompt.trim() || currentTab.placeholder
    const result = await callOpenAI(userRequest, activeTab)
    setOutput(result)
    setLoading(false)
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">AI</div>
          <div>
            <p className="eyebrow">Portfolio project</p>
            <h1>AI Workplace Assistant</h1>
          </div>
        </div>
        <nav className="nav-pills" aria-label="Main navigation">
          <a href="#solutions">Solutions</a>
          <a href="#workflow">Workflow</a>
          <a href="#ethics">Ethics</a>
          <a href="#demo">Live Demo</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow accent">Boost productivity with AI</p>
            <h2>Automate key workplace tasks using intelligent prompts and workflow support.</h2>
            <p>
              This AI-powered assistant helps teams generate emails, summarize meetings,
              plan tasks, support research, and interact with a business chatbot using
              robust prompt engineering and responsible AI principles.
            </p>
            <div className="hero-actions">
              <a href="#demo" className="primary-btn">Try the demo</a>
              <a href="#solutions" className="secondary-btn">See capabilities</a>
            </div>
            <ul className="mini-stat-grid">
              <li><strong>5</strong><span>workflows</span></li>
              <li><strong>AI</strong><span>prompt design</span></li>
              <li><strong>Ethical</strong><span>governance</span></li>
            </ul>
          </div>

          <div className="hero-panel card">
            <p className="panel-label">Project snapshot</p>
            <ul>
              <li>Generates professional workplace content</li>
              <li>Supports structured project workflows</li>
              <li>Uses human-in-the-loop validation</li>
              <li>Designed for real business productivity use</li>
            </ul>
          </div>
        </section>

        <section id="solutions" className="section-block">
          <div className="section-heading">
            <p className="eyebrow accent">Key capabilities</p>
            <h3>AI tools that fit the modern workplace</h3>
          </div>
          <div className="feature-grid">
            {features.map((item) => (
              <div key={item} className="feature-card card">
                <span className="feature-dot"></span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="workflow" className="section-block workflow-block">
          <div className="section-heading">
            <p className="eyebrow accent">Workflow design</p>
            <h3>Prompt engineering for business value</h3>
          </div>

          <div className="workflow-steps">
            <div className="card step">
              <span>01</span>
              <h4>Define the task</h4>
              <p>State the objective, audience, tone, and output format clearly.</p>
            </div>
            <div className="card step">
              <span>02</span>
              <h4>Structure the prompt</h4>
              <p>Use context, constraints, and examples to guide higher-quality output.</p>
            </div>
            <div className="card step">
              <span>03</span>
              <h4>Validate and refine</h4>
              <p>Review before sending to ensure factual accuracy and business alignment.</p>
            </div>
          </div>
        </section>

        <section id="ethics" className="section-block">
          <div className="section-heading">
            <p className="eyebrow accent">Responsible AI</p>
            <h3>Ethical use is part of the solution</h3>
          </div>
          <div className="ethics-grid">
            {ethicalPoints.map((point) => (
              <div key={point} className="card ethics-card">
                <p>{point}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="demo" className="section-block demo-block">
          <div className="section-heading">
            <p className="eyebrow accent">Live demo</p>
            <h3>Try the AI workplace assistant</h3>
          </div>

          <div className="demo-layout card">
            <div className="tool-tabs" role="tablist" aria-label="Assistant tools">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={tab === activeTab ? 'active' : ''}
                  onClick={() => updateTab(tab)}
                >
                  {starterPrompts[tab].title}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="prompt-panel">
              <label htmlFor="assistant-input">Describe your task</label>
              <textarea
                id="assistant-input"
                rows="6"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={currentTab.placeholder}
              />
              <button type="submit" className="primary-btn" disabled={loading}>
                {loading ? 'Generating...' : 'Generate output'}
              </button>
            </form>

            <div className="output-panel">
              <h4>{currentTab.title} output</h4>
              <pre>{output}</pre>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
