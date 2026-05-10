# Distributed Systems Learning Project — Design

**Date:** 2026-02-15
**Goal:** Learn backend fundamentals and distributed systems concepts while building a portfolio piece.

## Two-Part Project

### Part 1: Personal Site Guestbook

Add a serverless backend to the existing Vite + React portfolio site.

**Feature:** A guestbook where visitors can leave messages.

**Architecture:**
```
Browser → Vercel Serverless Function (api/guestbook.ts) → MongoDB Atlas
```

**Data model:**
```ts
{
  name: string
  message: string
  createdAt: Date
}
```

**Tech:**
- Vercel serverless functions (`api/` directory at project root)
- MongoDB Atlas (existing cluster)
- New React component on the site

**Scope:** Small. Done in an afternoon. Gets MongoDB Atlas wired up end-to-end.

---

### Part 2: Distributed URL Shortener (Separate Repo)

A URL shortener built in 4 phases, each introducing new distributed systems concepts.

**Tech stack:**
- Runtime: Node.js + TypeScript
- Framework: Hono (lightweight, serverless-compatible)
- Primary DB: MongoDB Atlas
- Cache: Upstash Redis (serverless, free tier)
- Frontend: React + Vite
- Deployment: Vercel

#### Phase 1: Working Shortener (Backend Fundamentals)

A basic shortener that works end-to-end.

- `POST /shorten` — takes a long URL, returns a short code
- `GET /:code` — redirects to the original URL
- MongoDB stores `{ shortCode, originalUrl, createdAt, clickCount }`
- Short code generation: Base62 encoding or nanoid
- Simple React UI for shortening and viewing history

**Concepts:** REST API design, CRUD, document databases, serverless functions.

#### Phase 2: Caching & Performance

- Add Redis as a read-through cache (cache-aside pattern)
- Popular URLs served from cache, reducing DB reads
- Click analytics via batch writes (don't write to DB on every redirect)
- TTL strategies for cache entries

**Concepts:** Cache-aside pattern, TTL and cache invalidation, eventual consistency (analytics lag), write batching.

#### Phase 3: Scaling Concerns

- Distributed rate limiting (token bucket algorithm backed by Redis)
- Sharding strategy design — how to partition URLs across DB nodes
- Explore MongoDB Atlas native sharding
- Configure read replicas for read/write splitting

**Concepts:** Sharding, consistent hashing, distributed rate limiting, read/write splitting, CAP theorem tradeoffs.

#### Phase 4: Observability & Resilience

- Health check endpoints
- Circuit breakers (fall through to DB when Redis is down)
- Structured logging
- Basic metrics (request latency, cache hit rate)
- Graceful degradation

**Concepts:** Fault tolerance, circuit breaker pattern, observability, graceful degradation.

---

## Interview Talking Points

After completing this project:

- **System design:** "I built a URL shortener and incrementally added caching, sharding, and fault tolerance"
- **Database choices:** "I used MongoDB for flexible document storage and Redis for caching — here's the tradeoffs"
- **CAP theorem:** "My shortener prioritizes availability — a stale cache is better than a timeout"
- **Scaling:** "I implemented distributed rate limiting with token buckets in Redis"
- **Resilience:** "Circuit breakers degrade gracefully when Redis goes down"

## Repo Structure

| Project | Repo | Deploy |
|---------|------|--------|
| Portfolio site + guestbook | `personal-website` (existing) | Vercel (existing) |
| URL shortener | New separate repo | Vercel (new project) |
