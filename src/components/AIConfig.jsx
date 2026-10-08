import { useState, useMemo } from 'react'
import './AIConfig.css'

const aiProviders = [
  {
    name: 'OpenAI (ChatGPT)',
    models: ['gpt-4-turbo', 'gpt-4o', 'gpt-4o-mini', 'gpt-3.5-turbo'],
    endpoint: 'https://api.openai.com/v1/chat/completions',
    docs: 'https://platform.openai.com/docs/api-reference/chat/create',
    strength: 'Advanced reasoning, large context window, production-ready'
  },
  {
    name: 'Google Gemini',
    models: ['gemini-2.0-flash', 'gemini-1.5-pro', 'gemini-1.5-flash'],
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
    docs: 'https://ai.google.dev/docs',
    strength: 'Multimodal, strong analysis, real-time information'
  },
  {
    name: 'Anthropic Claude',
    models: ['claude-3-5-sonnet', 'claude-3-opus', 'claude-3-haiku'],
    endpoint: 'https://api.anthropic.com/v1/messages',
    docs: 'https://docs.anthropic.com',
    strength: 'Constitutional AI, safety-focused, nuanced reasoning'
  }
]

function AIConfig() {
  const [selectedProvider, setSelectedProvider] = useState(0)
  const [showHelp, setShowHelp] = useState(false)

  const provider = useMemo(() => aiProviders[selectedProvider], [selectedProvider])

  return (
    <div className="ai-config">
      <div className="config-header">
        <h3>AI Provider Setup</h3>
        <button
          className="help-btn"
          onClick={() => setShowHelp(!showHelp)}
          title="Show setup instructions"
        >
          ?
        </button>
      </div>

      <div className="provider-tabs">
        {aiProviders.map((p, idx) => (
          <button
            key={idx}
            className={idx === selectedProvider ? 'active' : ''}
            onClick={() => setSelectedProvider(idx)}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="provider-info card">
        <div className="info-section">
          <h4>Selected Provider: {provider.name}</h4>
          <p className="strength">{provider.strength}</p>
        </div>

        <div className="info-section">
          <label>Available Models:</label>
          <ul className="model-list">
            {provider.models.map((model, idx) => (
              <li key={idx}>{model}</li>
            ))}
          </ul>
        </div>

        <div className="info-section">
          <label>API Endpoint:</label>
          <code className="endpoint">{provider.endpoint}</code>
        </div>

        <div className="info-section">
          <a href={provider.docs} target="_blank" rel="noopener noreferrer" className="docs-link">
            View {provider.name} Documentation →
          </a>
        </div>
      </div>

      {showHelp && (
        <div className="setup-help card">
          <h4>Setup Instructions</h4>
          <ol>
            <li>Get an API key from {provider.name}'s developer console</li>
            <li>Add it to your <code>.env</code> file:
              <code className="env-example">
                VITE_AI_PROVIDER={provider.name.split(' ')[0].toUpperCase()}<br />
                VITE_API_KEY=your_api_key_here
              </code>
            </li>
            <li>Select your preferred model from the list above</li>
            <li>The app will use this provider for all AI requests</li>
          </ol>
          <p className="help-note">You can switch providers anytime by changing your environment variables and restarting the app.</p>
        </div>
      )}
    </div>
  )
}

export default AIConfig
