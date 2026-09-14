# AI Meme Generator

A full-stack app that uses an AI model (via OpenRouter) to generate Hinglish memes across themed categories. The React frontend lets you pick a category, and the Express backend calls a free AI model to write captions fitted to classic meme templates — then renders them using [memegen.link](https://memegen.link).

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, TypeScript, Vite 8 |
| Backend | Node.js, Express 5 |
| AI | OpenRouter (free models) |
| Meme images | memegen.link API |

## Project Structure

```
ai-meme-generator/
├── server/                    # Express API (POST /api/memes) — unchanged
├── public/favicon.svg
├── src/
│   ├── main.tsx               # StrictMode entry
│   ├── App.tsx                # Composes the page + async states
│   ├── types.ts               # CategoryId, Category, Meme
│   ├── style.css              # Paper Brutalism design system
│   ├── data/categories.ts     # Single source of category data
│   ├── api/memes.ts           # The only fetch call
│   ├── hooks/useMemeGenerator.ts
│   └── components/            # Header, CategoryPicker, EmptyState, Spinner,
│                              # Button, MemeGallery, MemeCard, MemeModal
├── index.html
├── vite.config.ts             # Dev proxy: /api → localhost:8787
└── tsconfig.json
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and add your OpenRouter API key:

```
OPEN_ROUTER_API_KEY=your_key_here
```

Get a free key at [openrouter.ai](https://openrouter.ai).

### 3. Run in development

```bash
npm run dev
```

This starts both servers concurrently:
- Vite dev server at `http://localhost:5173`
- Express API server at `http://localhost:8787`

Vite proxies all `/api` requests to the Express server, so the frontend never exposes the API key.

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite + Express together (API restarts on change) |
| `npm run dev:web` | Start Vite only |
| `npm run dev:api` | Start Express only |
| `npm run build` | Type-check (`tsc`) and build the frontend |
| `npm run preview` | Preview the production build |

## API

### `POST /api/memes`

**Request body:**
```json
{ "category": "bollywood" }
```

**Response:**
```json
{
  "memes": [
    {
      "id": "bollywood-0-1234567890",
      "imageUrl": "https://api.memegen.link/images/drake/...",
      "caption": "top text · bottom text"
    }
  ]
}
```

**Available categories:** `bollywood`, `cartoon`, `viral-songs`, `sports`

## How It Works

1. The frontend sends the selected category to `POST /api/memes`
2. The server picks 5 random meme templates from the memegen.link catalog
3. It passes the templates + category theme to an OpenRouter AI model
4. The AI writes Hinglish captions fitted to each template's joke format
5. The server builds image URLs using memegen.link's path encoding
6. The frontend displays the memes in a grid; click one to preview it in a modal
