# URL Shortener Phase 1 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a working URL shortener API with a simple frontend, deployed on Vercel with MongoDB Atlas.

**Architecture:** Hono backend in `api/index.ts` (zero-config Vercel deployment). MongoDB Atlas stores URL mappings. Static HTML/JS frontend in `public/` for the UI. Short URLs redirect via `GET /api/r/:code`. Vercel detects Hono and deploys as serverless functions with Fluid Compute.

**Tech Stack:** Hono, MongoDB driver, TypeScript, Vercel, nanoid (short code generation)

**Repo:** ~/Documents/coding-projects/url-shortener (separate from personal website)

---

### Task 1: Scaffold Project and Install Dependencies

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `.env.local`

**Step 1: Create project directory and initialize**

```bash
mkdir -p ~/Documents/coding-projects/url-shortener
cd ~/Documents/coding-projects/url-shortener
git init
```

**Step 2: Create package.json**

```json
{
  "name": "url-shortener",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vercel dev",
    "build": "tsc",
    "lint": "tsc --noEmit"
  }
}
```

**Step 3: Install dependencies**

```bash
npm install hono mongodb nanoid
npm install -D typescript @types/node
```

**Step 4: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022"],
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true,
    "esModuleInterop": true,
    "verbatimModuleSyntax": true
  },
  "include": ["api", "lib"]
}
```

**Step 5: Create .gitignore**

```
node_modules
.env.local
.env*.local
.vercel
dist
```

**Step 6: Create .env.local with placeholder**

```
MONGODB_URI=PLACEHOLDER_REPLACE_WITH_REAL_CONNECTION_STRING
```

Replace with the same MongoDB Atlas connection string used for the personal website (same cluster, different database).

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: scaffold url shortener project"
```

---

### Task 2: Create MongoDB Connection Utility

**Files:**
- Create: `lib/mongodb.ts`

**Step 1: Create the connection utility**

Create `lib/mongodb.ts`:

```ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI environment variable is not set");
}

const client = new MongoClient(uri);
const clientPromise = client.connect();

export default clientPromise;
```

Same pattern as the personal website — reuses connections across warm serverless invocations.

**Step 2: Commit**

```bash
git add lib/mongodb.ts
git commit -m "feat: add mongodb connection utility"
```

---

### Task 3: Create Hono App with POST /shorten Endpoint

**Files:**
- Create: `api/index.ts`

This is the core of the shortener. `POST /shorten` takes a long URL and returns a short code.

**Step 1: Create the Hono app with the shorten endpoint**

Create `api/index.ts`:

```ts
import { Hono } from "hono";
import { cors } from "hono/cors";
import { nanoid } from "nanoid";
import clientPromise from "../lib/mongodb.js";

const app = new Hono().basePath("/api");

app.use("*", cors());

async function getCollection() {
  const client = await clientPromise;
  return client.db("url-shortener").collection("urls");
}

// POST /api/shorten — create a short URL
app.post("/shorten", async (c) => {
  const body = await c.req.json();
  const { url } = body as { url?: string };

  if (!url || typeof url !== "string") {
    return c.json({ error: "url is required and must be a string" }, 400);
  }

  // Basic URL validation
  try {
    new URL(url);
  } catch {
    return c.json({ error: "Invalid URL format" }, 400);
  }

  const collection = await getCollection();

  // Check if URL already shortened
  const existing = await collection.findOne({ originalUrl: url });
  if (existing) {
    return c.json({
      shortCode: existing.shortCode,
      originalUrl: existing.originalUrl,
      shortUrl: `${new URL(c.req.url).origin}/api/r/${existing.shortCode}`,
      clicks: existing.clicks,
    });
  }

  const shortCode = nanoid(8);

  const entry = {
    shortCode,
    originalUrl: url,
    createdAt: new Date(),
    clicks: 0,
  };

  await collection.insertOne(entry);

  return c.json(
    {
      shortCode,
      originalUrl: url,
      shortUrl: `${new URL(c.req.url).origin}/api/r/${shortCode}`,
      clicks: 0,
    },
    201
  );
});

export default app;
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

Expected: No errors.

**Step 3: Commit**

```bash
git add api/index.ts
git commit -m "feat: add POST /shorten endpoint with nanoid codes"
```

---

### Task 4: Add GET /r/:code Redirect Endpoint

**Files:**
- Modify: `api/index.ts`

**Step 1: Add the redirect handler**

Add before `export default app`:

```ts
// GET /api/r/:code — redirect to original URL
app.get("/r/:code", async (c) => {
  const code = c.req.param("code");
  const collection = await getCollection();

  const entry = await collection.findOneAndUpdate(
    { shortCode: code },
    { $inc: { clicks: 1 } }
  );

  if (!entry) {
    return c.json({ error: "Short URL not found" }, 404);
  }

  return c.redirect(entry.originalUrl, 302);
});
```

This atomically increments the click count and returns the URL to redirect to.

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

**Step 3: Commit**

```bash
git add api/index.ts
git commit -m "feat: add GET /r/:code redirect with click tracking"
```

---

### Task 5: Add GET /urls Endpoint

**Files:**
- Modify: `api/index.ts`

**Step 1: Add the list endpoint**

Add before the redirect handler:

```ts
// GET /api/urls — list recent shortened URLs
app.get("/urls", async (c) => {
  const collection = await getCollection();

  const urls = await collection
    .find({}, { projection: { _id: 0 } })
    .sort({ createdAt: -1 })
    .limit(50)
    .toArray();

  // Add full short URL to each entry
  const origin = new URL(c.req.url).origin;
  const withShortUrls = urls.map((u) => ({
    ...u,
    shortUrl: `${origin}/api/r/${u.shortCode}`,
  }));

  return c.json(withShortUrls);
});
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

**Step 3: Commit**

```bash
git add api/index.ts
git commit -m "feat: add GET /urls endpoint to list shortened URLs"
```

---

### Task 6: Add MongoDB Index for Short Codes

**Files:**
- Modify: `api/index.ts`

Short code lookups need to be fast. Add a unique index on `shortCode`.

**Step 1: Add index creation to getCollection**

Replace the `getCollection` function:

```ts
let indexCreated = false;

async function getCollection() {
  const client = await clientPromise;
  const collection = client.db("url-shortener").collection("urls");

  if (!indexCreated) {
    await collection.createIndex({ shortCode: 1 }, { unique: true });
    indexCreated = true;
  }

  return collection;
}
```

The `indexCreated` flag ensures we only try to create the index once per serverless instance.

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

**Step 3: Commit**

```bash
git add api/index.ts
git commit -m "feat: add unique index on shortCode for fast lookups"
```

---

### Task 7: Create Static Frontend

**Files:**
- Create: `public/index.html`

A simple HTML page with vanilla JS. No build step needed — Vercel serves files from `public/` as static assets.

**Step 1: Create the frontend**

Create `public/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>URL Shortener</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; max-width: 720px; margin: 0 auto; padding: 2rem; background: #fafafa; }
    h1 { font-size: 2rem; margin-bottom: 0.5rem; }
    p.subtitle { color: #666; margin-bottom: 2rem; }
    form { display: flex; gap: 0.5rem; margin-bottom: 2rem; }
    input { flex: 1; padding: 0.75rem; font-size: 1rem; border: 2px solid #222; }
    button { padding: 0.75rem 1.5rem; font-size: 1rem; font-weight: 700; background: #222; color: #fff; border: none; cursor: pointer; }
    button:hover { background: #444; }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
    .result { padding: 1rem; background: #e8f5e9; border: 2px solid #4caf50; margin-bottom: 2rem; }
    .result a { color: #1b5e20; font-weight: 700; word-break: break-all; }
    .error { padding: 1rem; background: #ffebee; border: 2px solid #f44336; color: #b71c1c; margin-bottom: 2rem; }
    h2 { font-size: 1.25rem; margin-bottom: 1rem; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 0.75rem; border-bottom: 1px solid #ddd; }
    th { font-weight: 700; background: #222; color: #fff; }
    td a { color: #1565c0; }
    .url-cell { max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .clicks { text-align: center; font-weight: 700; }
  </style>
</head>
<body>
  <h1>URL Shortener</h1>
  <p class="subtitle">A distributed systems learning project — Phase 1</p>

  <form id="shorten-form">
    <input type="url" id="url-input" placeholder="https://example.com/very-long-url" required>
    <button type="submit" id="submit-btn">Shorten</button>
  </form>

  <div id="result" hidden></div>
  <div id="error" hidden></div>

  <h2>Recent URLs</h2>
  <table>
    <thead>
      <tr>
        <th>Short URL</th>
        <th>Original URL</th>
        <th class="clicks">Clicks</th>
      </tr>
    </thead>
    <tbody id="urls-body">
      <tr><td colspan="3">Loading...</td></tr>
    </tbody>
  </table>

  <script>
    const form = document.getElementById('shorten-form');
    const input = document.getElementById('url-input');
    const submitBtn = document.getElementById('submit-btn');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const urlsBody = document.getElementById('urls-body');

    async function loadUrls() {
      try {
        const res = await fetch('/api/urls');
        const urls = await res.json();
        if (urls.length === 0) {
          urlsBody.innerHTML = '<tr><td colspan="3">No URLs yet. Shorten one above!</td></tr>';
          return;
        }
        urlsBody.innerHTML = urls.map(u => `
          <tr>
            <td><a href="${u.shortUrl}" target="_blank">${u.shortCode}</a></td>
            <td class="url-cell"><a href="${u.originalUrl}" target="_blank">${u.originalUrl}</a></td>
            <td class="clicks">${u.clicks}</td>
          </tr>
        `).join('');
      } catch {
        urlsBody.innerHTML = '<tr><td colspan="3">Failed to load URLs</td></tr>';
      }
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      resultDiv.hidden = true;
      errorDiv.hidden = true;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Shortening...';

      try {
        const res = await fetch('/api/shorten', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: input.value }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to shorten URL');
        }

        resultDiv.innerHTML = `Short URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>`;
        resultDiv.className = 'result';
        resultDiv.hidden = false;
        input.value = '';
        loadUrls();
      } catch (err) {
        errorDiv.textContent = err.message;
        errorDiv.className = 'error';
        errorDiv.hidden = false;
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Shorten';
      }
    });

    loadUrls();
  </script>
</body>
</html>
```

**Step 2: Commit**

```bash
git add public/index.html
git commit -m "feat: add static frontend for URL shortener"
```

---

### Task 8: Create GitHub Repo and Deploy to Vercel

**Step 1: Create GitHub repo**

```bash
gh repo create url-shortener --public --source=. --remote=origin
git push -u origin main
```

**Step 2: Set up Vercel project**

```bash
npx vercel link
```

Follow prompts to create a new Vercel project.

**Step 3: Add MONGODB_URI environment variable to Vercel**

```bash
echo 'YOUR_CONNECTION_STRING' | npx vercel env add MONGODB_URI production
echo 'YOUR_CONNECTION_STRING' | npx vercel env add MONGODB_URI preview
```

Use the same MongoDB Atlas connection string (same cluster — it uses a different database name `url-shortener` automatically).

**Step 4: Deploy to preview and test**

```bash
npx vercel
```

Test:
- Visit the preview URL — should see the frontend
- Shorten a URL — should get a short code back
- Click the short URL — should redirect to the original
- Check the "Recent URLs" table — should show the entry with 1 click

**Step 5: Deploy to production**

```bash
npx vercel --prod
```

**Step 6: Commit any generated config**

```bash
git add -A
git commit -m "chore: add vercel project config"
git push
```

---

## What You've Learned After Phase 1

- **Hono framework** — Lightweight API framework with Web Standards API
- **URL shortening design** — Code generation, uniqueness via indexes, redirect semantics (302 vs 301)
- **Atomic operations** — `findOneAndUpdate` for incrementing clicks without race conditions
- **Database indexing** — Why short code lookups need a unique index
- **Zero-config deployment** — Hono + Vercel Fluid Compute

## Next: Phase 2 (Redis Caching)

Phase 2 adds Upstash Redis as a caching layer, introducing:
- Cache-aside pattern for hot URLs
- TTL strategies
- Click analytics batching
- Eventual consistency
