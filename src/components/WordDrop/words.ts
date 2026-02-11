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
