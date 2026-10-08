import { useState } from 'react'
import './EthicsPanel.css'

const ethicsGuidelines = [
  {
    title: 'Accuracy & Truthfulness',
    points: [
      'Verify AI-generated facts before sending to external parties',
      'Never use AI to fabricate data, sources, or credentials',
      'Flag uncertainty when present—don\'t make up details',
      'Cross-check research and claims with reliable sources'
    ]
  },
  {
    title: 'Data Privacy & Security',
    points: [
      'Never input confidential company information, client data, or personal identifiers',
      'Be aware that some AI services log or may retain your inputs',
      'Use private/secure instances when handling sensitive work',
      'Consider your organization\'s data governance policies'
    ]
  },
  {
    title: 'Fairness & Bias',
    points: [
      'Review AI outputs for potential bias before use',
      'Ensure generated content doesn\'t discriminate or stereotype',
      'Be mindful of inclusive language and representation',
      'Validate that assumptions reflect your actual audience'
    ]
  },
  {
    title: 'Transparency & Accountability',
    points: [
      'Disclose when content is AI-assisted, especially in sensitive contexts',
      'Take personal responsibility for decisions based on AI input',
      'Maintain human oversight—AI should support, not replace, judgment',
      'Document your use of AI for internal records and compliance'
    ]
  },
  {
    title: 'Proper Attribution',
    points: [
      'Credit sources when AI outputs include external references',
      'Acknowledge AI assistance in presentations and reports',
      'Avoid presenting AI work as purely your own effort without context',
      'Cite your AI models (ChatGPT, Claude, Gemini, etc.) when relevant'
    ]
  },
  {
    title: 'Scope & Limitations',
    points: [
      'Use AI for support, not critical business decisions alone',
      'Recognize that AI can be outdated, incomplete, or wrong',
      'Don\'t rely on AI for legal, medical, or financial advice without expert review',
      'Always validate high-stakes outputs with qualified professionals'
    ]
  }
]

function EthicsPanel() {
  const [expanded, setExpanded] = useState(0)

  return (
    <div className="ethics-panel">
      <div className="ethics-header">
        <h3>Responsible AI Guidelines</h3>
        <p>Best practices for ethical and effective use of AI in the workplace</p>
      </div>

      <div className="ethics-accordion">
        {ethicsGuidelines.map((section, idx) => (
          <div key={idx} className="ethics-section">
            <button
              className="ethics-trigger"
              onClick={() => setExpanded(expanded === idx ? -1 : idx)}
            >
              <span>{section.title}</span>
              <span className="ethics-icon">{expanded === idx ? '▼' : '▶'}</span>
            </button>
            {expanded === idx && (
              <div className="ethics-content">
                <ul>
                  {section.points.map((point, pidx) => (
                    <li key={pidx}>{point}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="ethics-footer">
        <p><strong>Key Principle:</strong> AI should enhance human capability and judgment, not replace accountability or ethical responsibility.</p>
      </div>
    </div>
  )
}

export default EthicsPanel
