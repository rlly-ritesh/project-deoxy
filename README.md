# Project Deoxys — Dyslexia‑Friendly Chatbot

A Next.js App Router project focused on accessibility for dyslexic readers:
- OpenDyslexic font across the app
- Simple language responses, short sentences
- Adjustable full-page background, theme, brightness, and contrast
- Large text and Enter-to-send support
- Microphone input (Web Speech API) and text-to-speech with adjustable volume
- Chat powered by Hugging Face Inference (free tier with token) and optional OpenAI fallback
- Image generation via Pollinations API (free, no key required). Prompts return a direct image URL.

## Requirements
- Node.js 18+ (LTS recommended)
- npm or pnpm
- Chrome or Edge recommended for microphone (Web Speech API)
- HTTPS or localhost for mic permissions
- hugging face api 
## Environment Variables (.env.local)
Create a `.env.local` file in the project root for local development:

\`\`\`
# Chat with Hugging Face Inference (preferred)
HF_ACCESS_TOKEN=your_hf_token_here
# Optional: set an HF model (defaults to mistralai/Mistral-7B-Instruct-v0.2)
HF_CHAT_MODEL=mistralai/Mistral-7B-Instruct-v0.2

# Optional OpenAI fallback (only used if HF not configured/available)
OPENAI_API_KEY=sk-xxxx
\`\`\`
ok
Notes:
- Image generation uses Pollinations and does not need any API key.
- If you do not set HF or OpenAI keys, the chat route may return a friendly demo/diagnostic response and the UI can appear to “think” indefinitely if the provider times out. See Troubleshooting.

## Install & Run Locally
1) Install dependencies
- Using pnpm:
  - pnpm install
  - pnpm dev
- Or using npm:
  - npm install
  - npm run dev

2) Open your browser at:
- http://localhost:3000

3) Optional: Build & start
- pnpm build && pnpm start
- or npm run build && npm start

## Providers (How chat is selected)
The chat API tries providers in this order:
1) Hugging Face Inference if HF_ACCESS_TOKEN is present
   - Model: HF_CHAT_MODEL if set; otherwise defaults to mistralai/Mistral-7B-Instruct-v0.2
2) OpenAI if OPENAI_API_KEY is present
3) Otherwise: returns a clear error indicating no provider is configured

Image generation:
- Uses Pollinations (free, no key required). Prompts return a direct image URL.

## Project Structure (key files)
- app/api/chat/route.ts — Chat backend (HF first, OpenAI fallback)
- app/api/image/route.ts — Image generation backend (Pollinations)
- components/chat/chat-window.tsx — Chat UI and TTS playback
- components/chat/input-bar.tsx — Message input, microphone handling, Enter-to-send
- components/accessibility-panel.tsx — Theme, background, brightness/contrast, large text, TTS volume
- utils/voice.ts — Helper to select a clearer female voice (when available), with expressive pitch and volume
- app/login/page.tsx, app/signup/page.tsx — Demo auth pages (optional)
- app/globals.css — Tailwind v4 and OpenDyslexic mapping

## Accessibility & UI
- Exactly 3–5 colors are used with high contrast. Default palette favors teal brand accents with neutral backgrounds.
- OpenDyslexic is applied globally via Tailwind’s font-sans mapping.
- Use the Accessibility panel to adjust:
  - Theme (light/cream/dark)
  - Full-page background color
  - Brightness and contrast
  - Large text toggle
  - Speech volume for text-to-speech

## Microphone (Speech-to-Text)
- Uses the Web Speech API (Chrome/Edge). Requirements:
  - Use HTTPS or localhost
  - Allow microphone permissions in the browser
  - Disable VPN/ad blockers if you see “Voice input error: network”
- If you consistently see “network” errors, it’s a known Chrome speech service issue. Try:
  - Reloading the page and re-allowing mic
  - Temporarily disabling VPN/ad-blockers
  - Trying a different network or Chrome profile
  - Using a different Chromium-based browser
- Enter-to-send is enabled: press Enter to send; Shift+Enter for a newline.

## Text-to-Speech
- The app auto-picks a clear female voice when possible, with slightly higher pitch and volume for clarity.
- Adjust Speech volume in the Accessibility panel.
- Browser/system voice availability varies; try a different browser or set a different default voice in your OS if speech is too quiet.

## Troubleshooting
- Chat stuck on “Thinking…”:
  - Ensure HF_ACCESS_TOKEN is set and valid.
  - Check HF_CHAT_MODEL (recommended default: mistralai/Mistral-7B-Instruct-v0.2).
  - If using OpenAI fallback, confirm OPENAI_API_KEY is valid and not rate-limited.
  - Open the browser console for [Project Deoxys] logs; errors will indicate provider and status codes (404 model not found, 503 model loading, etc.).
  - Try a short prompt like: “Say ‘ok’.” If that works, longer prompts may be hitting request limits.

- Voice input error: “network”:
  - Use HTTPS or localhost only; allow mic permission
  - Disable VPN/ad blockers, try a different network
  - Close other apps using the mic, then reload

- Images not appearing:
  - Pollinations can rate-limit on rapid requests; try again in a moment
  - Ensure the image URL is not blocked by an extension

## Deployment
- Push to GitHub (or deploy on Vercel)
- In your project settings, set Environment Variables:
  - HF_ACCESS_TOKEN
  - HF_CHAT_MODEL (optional, defaults to mistralai/Mistral-7B-Instruct-v0.2)
  - OPENAI_API_KEY (optional fallback)
- Redeploy. Test /api/chat and /api/image endpoints in the deployed URL.

## License
MIT (adjust as needed)
