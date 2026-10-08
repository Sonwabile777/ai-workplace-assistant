import { useState } from 'react'
import './PromptLibrary.css'

const promptTemplates = {
  email: [
    {
      name: 'Professional Follow-up',
      system: 'You are a professional business communication expert. Draft emails that are clear, concise, and maintain professional tone.',
      template: 'Draft a follow-up email regarding {topic} to {recipient}. The email should include: context, specific details about {detail}, and next steps. Tone: {tone}',
      variables: ['topic', 'recipient', 'detail', 'tone']
    },
    {
      name: 'Status Update',
      system: 'You are an expert at communicating project progress clearly and building confidence with stakeholders.',
      template: 'Write a status update email for project "{project}". Include progress on {areas}, blockers: {blockers}, and timeline: {timeline}. Audience: {audience}',
      variables: ['project', 'areas', 'blockers', 'timeline', 'audience']
    },
    {
      name: 'Request/Proposal',
      system: 'You are skilled at persuasive business writing that clearly articulates value and next steps.',
      template: 'Write a professional email requesting {request} from {recipient}. Justify with: {justification}. Propose timeline: {timeline}',
      variables: ['request', 'recipient', 'justification', 'timeline']
    }
  ],
  meeting: [
    {
      name: 'Executive Summary',
      system: 'You are an expert at distilling complex discussions into actionable executive summaries. Focus on decisions, owners, and deadlines.',
      template: 'Summarize this meeting transcript into: 1) Key Decisions, 2) Action Items with Owners and Deadlines, 3) Risks/Blockers, 4) Next Meeting Topics. Meeting: {transcript}',
      variables: ['transcript']
    },
    {
      name: 'Action Items Only',
      system: 'You are expert at extracting clear, specific action items with owners and due dates.',
      template: 'Extract ONLY action items from this meeting, with format: [Owner] - [Task] - [Due Date]. Meeting notes: {notes}',
      variables: ['notes']
    },
    {
      name: 'Decision Log',
      system: 'You specialize in documenting decisions clearly with rationale and implications.',
      template: 'Document decisions made in this meeting with: Decision, Rationale, Owner, Implementation Timeline. Meeting: {content}',
      variables: ['content']
    }
  ],
  planning: [
    {
      name: 'Weekly Sprint Plan',
      system: 'You are an expert project manager at breaking down work into realistic, prioritized weekly plans.',
      template: 'Create a weekly sprint plan for role: {role}, team size: {team}, priorities: {priorities}. Format: Daily breakdown with time allocations. Include buffer time.',
      variables: ['role', 'team', 'priorities']
    },
    {
      name: 'Project Roadmap',
      system: 'You are skilled at breaking down complex projects into phases, milestones, and dependencies.',
      template: 'Design a project roadmap for: {project}. Scope: {scope}. Timeline: {timeline}. Include: phases, milestones, dependencies, risk factors.',
      variables: ['project', 'scope', 'timeline']
    },
    {
      name: 'Priority Matrix',
      system: 'You excel at helping teams prioritize using impact/effort frameworks.',
      template: 'Create a priority matrix for these tasks: {tasks}. Categorize by: Impact (High/Low) and Effort (High/Low). Recommend execution order.',
      variables: ['tasks']
    }
  ],
  research: [
    {
      name: 'Market Research Brief',
      system: 'You are a research analyst who synthesizes information into clear, actionable briefs.',
      template: 'Provide a brief on: {topic}. Include: Market size, Key players, Trends, Opportunities, Threats. Format as executive summary.',
      variables: ['topic']
    },
    {
      name: 'Competitive Analysis',
      system: 'You are expert at analyzing competitor positioning and identifying strategic gaps.',
      template: 'Analyze competitors in: {market}. For each competitor: strengths, weaknesses, positioning. Identify: market gaps and opportunities.',
      variables: ['market']
    },
    {
      name: 'Technical Research Summary',
      system: 'You synthesize technical information for non-technical stakeholders and decision-makers.',
      template: 'Summarize technical aspects of: {technology}. Explain: What it is, How it works, Benefits, Risks, Best practices, ROI considerations.',
      variables: ['technology']
    }
  ],
  chatbot: [
    {
      name: 'Problem-Solving Assistant',
      system: 'You are a helpful workplace consultant who asks clarifying questions and provides structured solutions.',
      template: 'Help solve this workplace challenge: {challenge}. Provide: root causes, recommended approaches, implementation steps, success metrics.',
      variables: ['challenge']
    },
    {
      name: 'Knowledge Base Query',
      system: 'You are a knowledgeable workplace resource who provides clear, specific answers.',
      template: 'Answer this workplace question: {question}. Include: direct answer, context, practical tips, resources if applicable.',
      variables: ['question']
    },
    {
      name: 'Coaching/Feedback',
      system: 'You are an empathetic coach who provides constructive, actionable feedback.',
      template: 'Provide coaching on: {situation}. Include: observation, impact, specific suggestions, resources for growth.',
      variables: ['situation']
    }
  ]
}

function PromptLibrary({ onSelectTemplate, activeTab }) {
  const [expanded, setExpanded] = useState(null)

  const templates = promptTemplates[activeTab] || []

  return (
    <div className="prompt-library">
      <h4>Prompt Templates</h4>
      <div className="template-list">
        {templates.map((template, idx) => (
          <div key={idx} className="template-item">
            <button
              className="template-trigger"
              onClick={() => setExpanded(expanded === idx ? null : idx)}
            >
              <span>{template.name}</span>
              <span className="expand-icon">{expanded === idx ? '−' : '+'}</span>
            </button>
            {expanded === idx && (
              <div className="template-details">
                <p className="template-desc">System: {template.system}</p>
                <p className="template-preview">Template: {template.template}</p>
                <button
                  className="use-template-btn"
                  onClick={() => onSelectTemplate(template)}
                >
                  Use this template
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PromptLibrary
