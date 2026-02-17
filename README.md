# WohnOra-Germany

> Built with **AI Factory v3.3** — 2026-02-17

## Quick Start

```bash
npm install
npm run dev
# → http://localhost:5173
```

## Docker

```bash
docker-run.bat      # Start
docker-stop.bat     # Stop
docker-logs.bat     # View logs
docker-rebuild.bat  # Rebuild
```

## Auto-commit (every 5 min)

```bash
git-auto-commit.bat   # Windows
bash git-auto-commit.sh  # Mac/Linux
```

## Deploy

```bash
npm run build
vercel --prod         # Vercel
netlify deploy --prod --dir=dist  # Netlify
```

## Logs (all inside this folder)

| File | Contents |
|------|----------|
| `APP-BUILD-LOG_*.log` | Build process |
| `GOOSE-AI-LOG.log` | AI coding decisions |
| `APPLICATION-REQUIREMENTS.md` | Original PRD |
| `CHAT-HISTORY.json` | Edit chat history |
