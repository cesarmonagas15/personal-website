# Word Drop Game — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a "Take a Break" section with a canvas-based typing game where Spanish, tech, and personal words fall and you type them to destroy them.

**Architecture:** Single new React component (`WordDrop.tsx`) using the Canvas API for rendering and `requestAnimationFrame` for the game loop. All game state managed via refs to avoid React re-render overhead. The component is inserted between `<Projects />` and `<Contact />` in `App.tsx`.

**Tech Stack:** React 19, TypeScript, Canvas API, localStorage (high score)

---

### Task 1: Create the word list data

**Files:**
- Create: `src/components/WordDrop/words.ts`

**Step 1: Create the word data file**

```ts
export interface WordEntry {
  text: string;
  category: "spanish" | "tech" | "personal";
}

const spanishWords: string[] = [
  "arepa", "pana", "chevere", "cachapa", "hallaca", "familia", "hermano",
  "corazon", "fuerte", "bonito", "pueblo", "playa", "salsa", "arroz",
  "cafe", "dulce", "amigo", "fiesta", "bailar", "camino", "cielo",
  "tierra", "sol", "luna", "rio", "mar", "chamo", "caracas", "zulia",
  "gocho", "carne", "pollo", "comida", "gracias", "vamos", "libre",
  "grande", "verde", "rojo", "blanco"
];

const techWords: string[] = [
  "typescript", "python", "react", "kubernetes", "claude", "vite",
  "tailwind", "salesforce", "docker", "postgres", "graphql", "linux",
  "terraform", "github", "nodejs", "redis", "swift", "rust", "java",
  "firebase", "lambda", "grafana", "api", "deploy", "merge"
];

const personalWords: string[] = [
  "austin", "longhorns", "anthropic", "builder", "hookem", "deloitte",
  "yahoo", "utah", "tennis", "volleyball", "venezuela", "texas",
  "maracaibo", "coding", "hustle"
];

export const WORDS: WordEntry[] = [
  ...spanishWords.map((text) => ({ text, category: "spanish" as const })),
  ...techWords.map((text) => ({ text, category: "tech" as const })),
  ...personalWords.map((text) => ({ text, category: "personal" as const })),
];

export const CATEGORY_COLORS: Record<WordEntry["category"], string> = {
  spanish: "#FACC15",  // yellow-400
  tech: "#2563EB",     // blue-600
  personal: "#FFFFFF", // white
};
```

**Step 2: Commit**

```bash
git add src/components/WordDrop/words.ts
git commit -m "feat: add word list data for Word Drop game"
```

---

### Task 2: Build the game engine (canvas rendering + game loop)

**Files:**
- Create: `src/components/WordDrop/WordDrop.tsx`

This is the core component. It handles:
- Canvas setup and sizing
- Game loop via `requestAnimationFrame`
- Word spawning, falling, and removal
- Collision detection (typed word matches falling word)
- Score, lives, speed escalation
- Game states: idle → playing → gameOver

**Step 1: Create the WordDrop component**

```tsx
import { useRef, useEffect, useState, useCallback } from "react";
import { WORDS, CATEGORY_COLORS, type WordEntry } from "./words";

interface FallingWord {
  id: number;
  entry: WordEntry;
  x: number;
  y: number;
  speed: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

type GameState = "idle" | "playing" | "gameOver";

const BASE_SPEED = 1.2;
const SPEED_INCREMENT = 0.15;
const SPAWN_INTERVAL_MS = 1800;
const CANVAS_HEIGHT = 500;
const FONT_SIZE = 20;
const MAX_LIVES = 3;
const POINTS_PER_WORD = 10;
const WORDS_PER_SPEEDUP = 5;

export default function WordDrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wordsRef = useRef<FallingWord[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const scoreRef = useRef(0);
  const livesRef = useRef(MAX_LIVES);
  const wordsCleared = useRef(0);
  const currentSpeed = useRef(BASE_SPEED);
  const nextId = useRef(0);
  const lastSpawn = useRef(0);
  const animFrameRef = useRef(0);
  const gameStateRef = useRef<GameState>("idle");

  const [gameState, setGameState] = useState<GameState>("idle");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("wordDropHighScore") || "0", 10);
  });
  const [inputValue, setInputValue] = useState("");

  const canvasWidth = useRef(0);

  const spawnWord = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const entry = WORDS[Math.floor(Math.random() * WORDS.length)];
    const ctx = canvas.getContext("2d")!;
    ctx.font = `bold ${FONT_SIZE}px Inter, sans-serif`;
    const textWidth = ctx.measureText(entry.text).width;
    const x = Math.random() * (canvas.width - textWidth - 20) + 10;
    wordsRef.current.push({
      id: nextId.current++,
      entry,
      x,
      y: -FONT_SIZE,
      speed: currentSpeed.current,
    });
  }, []);

  const spawnParticles = useCallback((x: number, y: number, color: string) => {
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        color,
      });
    }
  }, []);

  const resetGame = useCallback(() => {
    wordsRef.current = [];
    particlesRef.current = [];
    scoreRef.current = 0;
    livesRef.current = MAX_LIVES;
    wordsCleared.current = 0;
    currentSpeed.current = BASE_SPEED;
    lastSpawn.current = 0;
    setScore(0);
    setLives(MAX_LIVES);
    setInputValue("");
  }, []);

  const startGame = useCallback(() => {
    resetGame();
    gameStateRef.current = "playing";
    setGameState("playing");
    inputRef.current?.focus();
  }, [resetGame]);

  const endGame = useCallback(() => {
    gameStateRef.current = "gameOver";
    setGameState("gameOver");
    cancelAnimationFrame(animFrameRef.current);
    const finalScore = scoreRef.current;
    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem("wordDropHighScore", String(finalScore));
    }
  }, [highScore]);

  const handleInput = useCallback(
    (value: string) => {
      setInputValue(value);
      const typed = value.trim().toLowerCase();
      if (!typed) return;
      const idx = wordsRef.current.findIndex(
        (w) => w.entry.text === typed
      );
      if (idx !== -1) {
        const word = wordsRef.current[idx];
        const color = CATEGORY_COLORS[word.entry.category];
        spawnParticles(word.x, word.y, color);
        wordsRef.current.splice(idx, 1);
        wordsCleared.current += 1;
        scoreRef.current += POINTS_PER_WORD;
        setScore(scoreRef.current);
        setInputValue("");
        if (wordsCleared.current % WORDS_PER_SPEEDUP === 0) {
          currentSpeed.current += SPEED_INCREMENT;
        }
      }
    },
    [spawnParticles]
  );

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      const parent = canvas.parentElement!;
      canvas.width = parent.clientWidth;
      canvasWidth.current = canvas.width;
      canvas.height = CANVAS_HEIGHT;
    };
    resize();
    window.addEventListener("resize", resize);

    let prevTime = 0;

    const loop = (time: number) => {
      animFrameRef.current = requestAnimationFrame(loop);
      if (gameStateRef.current !== "playing") return;

      const dt = prevTime ? (time - prevTime) / 16.67 : 1; // normalize to ~60fps
      prevTime = time;

      // Spawn
      if (time - lastSpawn.current > SPAWN_INTERVAL_MS) {
        spawnWord();
        lastSpawn.current = time;
      }

      // Clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw words
      ctx.font = `bold ${FONT_SIZE}px Inter, sans-serif`;
      ctx.textBaseline = "top";
      for (let i = wordsRef.current.length - 1; i >= 0; i--) {
        const w = wordsRef.current[i];
        w.y += w.speed * dt;
        if (w.y > CANVAS_HEIGHT) {
          wordsRef.current.splice(i, 1);
          livesRef.current -= 1;
          setLives(livesRef.current);
          if (livesRef.current <= 0) {
            endGame();
            return;
          }
          continue;
        }
        ctx.fillStyle = CATEGORY_COLORS[w.entry.category];
        ctx.fillText(w.entry.text, w.x, w.y);
      }

      // Draw particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= 0.025 * dt;
        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - 3, p.y - 3, 6, 6);
      }
      ctx.globalAlpha = 1;
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [spawnWord, endGame]);

  // Draw idle / game-over overlays on canvas when not playing
  useEffect(() => {
    if (gameState === "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Centered text helper
    const centerText = (text: string, y: number, size: number, color: string) => {
      ctx.font = `bold ${size}px Inter, sans-serif`;
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, canvas.width / 2, y);
    };

    if (gameState === "idle") {
      centerText("WORD DROP", CANVAS_HEIGHT / 2 - 40, 48, "#FFFFFF");
      centerText("Type the falling words before they reach the bottom", CANVAS_HEIGHT / 2 + 10, 16, "#9CA3AF");
    }

    if (gameState === "gameOver") {
      centerText("GAME OVER", CANVAS_HEIGHT / 2 - 50, 48, "#FFFFFF");
      centerText(`Score: ${scoreRef.current}`, CANVAS_HEIGHT / 2 + 10, 24, "#FACC15");
      if (scoreRef.current >= highScore) {
        centerText("NEW HIGH SCORE!", CANVAS_HEIGHT / 2 + 50, 18, "#22C55E");
      }
    }

    ctx.textAlign = "start"; // reset
  }, [gameState, highScore]);

  return (
    <section id="play" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-6xl md:text-7xl font-black text-white mb-8">
            TAKE A BREAK
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600"></div>
        </div>

        {/* HUD */}
        <div className="flex items-center justify-between mb-4 text-white font-bold text-lg">
          <div className="flex gap-6">
            <span>SCORE: {score}</span>
            <span>BEST: {highScore}</span>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: MAX_LIVES }).map((_, i) => (
              <span
                key={i}
                className={`w-4 h-4 rounded-full ${
                  i < lives ? "bg-red-500" : "bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="relative border-4 border-white">
          <canvas
            ref={canvasRef}
            className="w-full bg-black block"
            style={{ height: CANVAS_HEIGHT }}
          />

          {/* Start / Play Again button overlay */}
          {gameState !== "playing" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={startGame}
                className="px-8 py-4 bg-white text-black font-black text-xl uppercase tracking-wide hover:bg-yellow-400 transition-colors mt-24"
              >
                {gameState === "idle" ? "PRESS START" : "PLAY AGAIN"}
              </button>
            </div>
          )}
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => handleInput(e.target.value)}
          disabled={gameState !== "playing"}
          placeholder={gameState === "playing" ? "Type here..." : ""}
          className="w-full mt-4 px-6 py-4 bg-black border-4 border-white text-white font-bold text-xl
                     focus:outline-none focus:border-yellow-400 disabled:opacity-30
                     placeholder:text-gray-600 font-mono"
          autoComplete="off"
          spellCheck={false}
        />

        {/* Legend */}
        <div className="flex gap-6 mt-4 text-sm font-bold">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-400 inline-block"></span>
            <span className="text-gray-400">SPANISH</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-600 inline-block"></span>
            <span className="text-gray-400">TECH</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-white inline-block"></span>
            <span className="text-gray-400">PERSONAL</span>
          </span>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/WordDrop/WordDrop.tsx
git commit -m "feat: implement Word Drop game canvas component"
```

---

### Task 3: Wire up the component in App.tsx

**Files:**
- Modify: `src/App.tsx`

**Step 1: Add WordDrop between Projects and Contact**

Add the import and component:

```tsx
import WordDrop from './components/WordDrop/WordDrop';
```

Insert `<WordDrop />` between `<Projects />` and `<Contact />`.

**Step 2: Verify dev server runs**

```bash
npm run dev
```

Open browser, scroll to the new section, click "Press Start", type words, verify:
- Words fall in correct colors
- Typing a matching word destroys it with particles
- Score increments, speed increases every 5 words
- Missing a word costs a life
- Game over shows score and persists high score
- "Play Again" resets properly

**Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add Word Drop section to main app"
```

---

### Task 4: Polish and tuning

**Files:**
- Modify: `src/components/WordDrop/WordDrop.tsx`
- Modify: `src/components/WordDrop/words.ts`

**Step 1: Playtest and tune constants**

After playing a few rounds, adjust these constants if needed:
- `BASE_SPEED` — starting fall speed (default 1.2)
- `SPEED_INCREMENT` — how much faster per tier (default 0.15)
- `SPAWN_INTERVAL_MS` — ms between word spawns (default 1800)
- Word list — add/remove words based on feel

**Step 2: Optionally add navbar link**

If desired, add a "PLAY" link to `src/components/Navbar.tsx` pointing to `#play`.

**Step 3: Run build to verify no TS errors**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: polish Word Drop game tuning and integration"
```
