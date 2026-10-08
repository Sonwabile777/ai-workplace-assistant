# AI Workplace Assistant

An AI-powered assistant designed to automate key workplace tasks including:

- Email generation
- Meeting summarization
- Task planning
- Research assistance
- Chatbot interaction

## Project overview

This project demonstrates strong prompt engineering and practical AI use in a business context. It includes a responsive portfolio website and a demo interface for common productivity workflows.

## Features

- AI-powered email drafting
- Meeting recap and action item extraction
- Weekly planning and project task organization
- Research support for quick summaries and decision-making
- Chatbot-style business assistance
- Responsible AI guidance and human review principles

## Tech stack

- React + Vite
- OpenAI-compatible chat completion API via environment variables
- CSS for a modern portfolio UI

## Local setup

1. Install dependencies:
   npm install
2. Create a local environment file:
   cp .env.example .env
3. Add your API key:
   VITE_OPENAI_API_KEY=your_key_here
4. Start the app:
   npm run dev
5. Build for production:
   npm run build

## Deployment options

This application is ready for deployment to Vercel or Netlify.

### Vercel

1. Push the repo to GitHub.
2. Import it in Vercel.
3. Add environment variables:
   - VITE_OPENAI_API_KEY
   - VITE_OPENAI_MODEL
4. Deploy.

## Responsible AI notes

- Keep humans in the loop for final decisions.
- Review generated content before sending externally.
- Protect confidential business information.
- Avoid generating false or misleading statements.

## Presentation

A slide-ready presentation outline is included in the repository at `presentation/ai-workplace-assistant-deck.md`.
