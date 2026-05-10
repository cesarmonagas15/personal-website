# Guestbook Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a guestbook feature to the portfolio site where visitors can leave messages, backed by MongoDB Atlas via Vercel serverless functions.

**Architecture:** Vercel serverless functions in `api/` directory handle GET/POST requests. MongoDB Atlas stores guestbook entries. A new React component fetches and displays entries, with a form to submit new ones. No auth required — public guestbook.

**Tech Stack:** Vercel Serverless Functions (Node.js), MongoDB Node.js driver, React, Tailwind CSS, MongoDB Atlas (free tier).

---

### Task 1: Install MongoDB Driver and Set Up Environment

**Files:**
- Modify: `package.json`
- Create: `.env.local` (NOT committed — add to `.gitignore`)
- Modify: `.gitignore`

**Step 1: Install the MongoDB driver**

Run: `npm install mongodb`

**Step 2: Create `.env.local` with your MongoDB Atlas connection string**

Create `.env.local` at the project root:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/personal-website?retryWrites=true&w=majority
```

Replace `<username>`, `<password>`, and `<cluster>` with your actual MongoDB Atlas credentials. You can find the connection string in the Atlas dashboard under "Connect" > "Connect your application" > "Node.js".

**Step 3: Add `.env.local` to `.gitignore`**

Check if `.gitignore` already covers `.env*`. If not, add:

```
.env.local
.env*.local
```

**Step 4: Add the same `MONGODB_URI` environment variable to Vercel**

Run: `npx vercel env add MONGODB_URI`

Or set it in the Vercel dashboard under Project Settings > Environment Variables. This is required for the serverless functions to connect to MongoDB in production.

**Step 5: Commit**

```bash
git add package.json package-lock.json .gitignore
git commit -m "feat: add mongodb driver dependency"
```

---

### Task 2: Create MongoDB Connection Utility

**Files:**
- Create: `api/_lib/mongodb.ts`

Vercel serverless functions live in the `api/` directory at the project root (NOT inside `src/`). The `_lib/` prefix tells Vercel this is a shared utility, not an endpoint.

**Step 1: Create the connection utility**

Create `api/_lib/mongodb.ts`:

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

This reuses the same client across invocations in the same serverless function instance (connection pooling). Vercel keeps functions warm for a few minutes, so this avoids reconnecting on every request.

**Step 2: Commit**

```bash
git add api/_lib/mongodb.ts
git commit -m "feat: add mongodb connection utility for serverless functions"
```

---

### Task 3: Create Guestbook API — GET Endpoint

**Files:**
- Create: `api/guestbook.ts`

Vercel serverless functions use the Web API `Request`/`Response` pattern. A single file can handle multiple HTTP methods by checking `request.method`.

**Step 1: Create the GET handler**

Create `api/guestbook.ts`:

```ts
import clientPromise from "./_lib/mongodb.js";

export default async function handler(request: Request): Promise<Response> {
  const client = await clientPromise;
  const db = client.db("personal-website");
  const collection = db.collection("guestbook");

  if (request.method === "GET") {
    const entries = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return new Response(JSON.stringify(entries), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response("Method not allowed", { status: 405 });
}
```

**Step 2: Test locally with Vercel CLI**

Run: `npx vercel dev`

Then in another terminal: `curl http://localhost:3000/api/guestbook`

Expected: `[]` (empty array, since there are no entries yet).

Note: `vercel dev` reads `.env.local` automatically. If you haven't used it before, it may ask you to link the project.

**Step 3: Commit**

```bash
git add api/guestbook.ts
git commit -m "feat: add guestbook GET endpoint"
```

---

### Task 4: Add POST Handler to Guestbook API

**Files:**
- Modify: `api/guestbook.ts`

**Step 1: Add POST handling with input validation**

Add the POST branch before the 405 response in `api/guestbook.ts`:

```ts
import clientPromise from "./_lib/mongodb.js";

export default async function handler(request: Request): Promise<Response> {
  const client = await clientPromise;
  const db = client.db("personal-website");
  const collection = db.collection("guestbook");

  if (request.method === "GET") {
    const entries = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return new Response(JSON.stringify(entries), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (request.method === "POST") {
    const body = await request.json();
    const { name, message } = body as { name?: string; message?: string };

    if (!name || !message) {
      return new Response(
        JSON.stringify({ error: "name and message are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (name.length > 100 || message.length > 500) {
      return new Response(
        JSON.stringify({ error: "name max 100 chars, message max 500 chars" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const entry = {
      name: name.trim(),
      message: message.trim(),
      createdAt: new Date(),
    };

    await collection.insertOne(entry);

    return new Response(JSON.stringify(entry), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response("Method not allowed", { status: 405 });
}
```

**Step 2: Test locally**

Run (with `vercel dev` still running):

```bash
curl -X POST http://localhost:3000/api/guestbook \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","message":"Hello from the terminal!"}'
```

Expected: `201` response with the created entry.

Then verify with GET: `curl http://localhost:3000/api/guestbook`

Expected: Array with the entry you just created.

**Step 3: Commit**

```bash
git add api/guestbook.ts
git commit -m "feat: add guestbook POST endpoint with validation"
```

---

### Task 5: Create Guestbook React Component

**Files:**
- Create: `src/components/Guestbook.tsx`

This component follows the existing site's design language: bold black borders, uppercase headings, Venezuelan flag gradient accent, Inter font.

**Step 1: Create the component**

Create `src/components/Guestbook.tsx`:

```tsx
import { useState, useEffect } from "react";

interface GuestbookEntry {
  _id: string;
  name: string;
  message: string;
  createdAt: string;
}

const Guestbook = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/guestbook")
      .then((res) => res.json())
      .then((data) => setEntries(data))
      .catch(() => setError("Failed to load guestbook entries"));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit");
      }

      const newEntry = await res.json();
      setEntries([newEntry, ...entries]);
      setName("");
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="guestbook" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-6xl md:text-7xl font-black text-black mb-8">
            GUESTBOOK
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <div className="border-4 border-black p-12">
            <h3 className="text-3xl font-black text-black mb-8">
              LEAVE A MESSAGE
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="guestbook-name"
                  className="block text-lg font-bold text-black mb-2"
                >
                  NAME
                </label>
                <input
                  id="guestbook-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  required
                  className="w-full border-2 border-black p-3 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label
                  htmlFor="guestbook-message"
                  className="block text-lg font-bold text-black mb-2"
                >
                  MESSAGE
                </label>
                <textarea
                  id="guestbook-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={500}
                  required
                  rows={4}
                  className="w-full border-2 border-black p-3 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                />
              </div>
              {error && (
                <p className="text-red-600 font-bold">{error}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white font-black text-lg px-8 py-4 hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "SENDING..." : "SIGN GUESTBOOK"}
              </button>
            </form>
          </div>

          {/* Entries */}
          <div className="space-y-6">
            {entries.length === 0 && !error && (
              <p className="text-xl text-gray-500 font-medium">
                No messages yet. Be the first to sign!
              </p>
            )}
            {entries.map((entry) => (
              <div key={entry._id} className="border-l-4 border-black pl-8">
                <h4 className="text-xl font-black text-black">
                  {entry.name}
                </h4>
                <p className="text-lg text-black mt-2">{entry.message}</p>
                <p className="text-sm text-gray-500 mt-2 font-medium">
                  {new Date(entry.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guestbook;
```

**Step 2: Commit**

```bash
git add src/components/Guestbook.tsx
git commit -m "feat: add Guestbook component with form and entry list"
```

---

### Task 6: Wire Guestbook into App

**Files:**
- Modify: `src/App.tsx`

**Step 1: Add the Guestbook component**

Add the import and place it between `WordDrop` and `Contact`:

```tsx
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import WordDrop from './components/WordDrop/WordDrop';
import Guestbook from './components/Guestbook';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <div className="min-h-screen">
      <Analytics/>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <WordDrop />
      <Guestbook />
      <Contact />
    </div>
  );
}

export default App;
```

**Step 2: Add "GUESTBOOK" to the Navbar**

Check `src/components/Navbar.tsx` for the nav links array. Add a `GUESTBOOK` link pointing to `#guestbook` in the same style as existing links.

**Step 3: Test end-to-end locally**

Run: `npx vercel dev`

- Navigate to `http://localhost:3000`
- Scroll to the Guestbook section
- Submit a test entry
- Verify it appears in the list
- Refresh the page — verify the entry persists (came from MongoDB)

**Step 4: Commit**

```bash
git add src/App.tsx src/components/Navbar.tsx
git commit -m "feat: wire guestbook into app and navbar"
```

---

### Task 7: Add TypeScript Config for API Directory

**Files:**
- Create: `tsconfig.api.json`
- Modify: `tsconfig.json`

The `api/` directory uses Node.js (not browser) APIs and needs its own TypeScript config. Vercel handles the actual compilation, but this gives you proper type-checking in your editor.

**Step 1: Create `tsconfig.api.json`**

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.api.tsbuildinfo",
    "target": "ES2022",
    "lib": ["ES2022"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "skipLibCheck": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "verbatimModuleSyntax": true,
    "erasableSyntaxOnly": true
  },
  "include": ["api"]
}
```

**Step 2: Add reference to `tsconfig.json`**

Add the API reference:

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" },
    { "path": "./tsconfig.api.json" }
  ],
  "compilerOptions": {
    "jsx": "react-jsx"
  }
}
```

**Step 3: Commit**

```bash
git add tsconfig.api.json tsconfig.json
git commit -m "feat: add typescript config for api directory"
```

---

### Task 8: Deploy and Verify

**Step 1: Deploy to Vercel**

Run: `npx vercel` (preview deployment) or push to your branch and let Vercel auto-deploy.

**Step 2: Verify the environment variable is set**

Run: `npx vercel env ls`

Confirm `MONGODB_URI` is listed.

**Step 3: Test the deployed API**

```bash
curl https://your-preview-url.vercel.app/api/guestbook
```

Expected: `[]` or any entries you created locally (if using the same Atlas cluster).

**Step 4: Test the deployed UI**

Visit the preview URL, scroll to Guestbook, submit an entry, verify it persists on refresh.

**Step 5: If everything works, deploy to production**

Run: `npx vercel --prod`

Or merge to main.

---

## What You've Learned After This Plan

- **Vercel serverless functions:** How they work with a Vite project, the `api/` directory convention
- **MongoDB Atlas connection:** Connection string, driver setup, connection reuse in serverless
- **CRUD operations:** Insert and query documents with the MongoDB Node.js driver
- **Environment variables:** Local `.env.local` vs Vercel environment variables
- **Full-stack deployment:** Frontend + API deployed together on Vercel

## Next: URL Shortener

After this is deployed, create a new repo for the distributed URL shortener (Phase 1). That plan will be written separately in the new project.
