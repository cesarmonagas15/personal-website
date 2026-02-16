import type { VercelRequest, VercelResponse } from "@vercel/node";
import clientPromise from "./_lib/mongodb.js";

const PROFANITY_LIST = [
  "fuck", "shit", "ass", "bitch", "damn", "dick", "piss", "cock", "cunt",
  "bastard", "slut", "whore", "nigger", "faggot", "retard",
];

function containsProfanity(text: string): boolean {
  const lower = text.toLowerCase();
  return PROFANITY_LIST.some((word) =>
    new RegExp(`\\b${word}\\b`, "i").test(lower)
  );
}

function stripHtml(text: string): string {
  return text.replace(/<[^>]*>/g, "").replace(/[<>]/g, "");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const client = await clientPromise;
  const db = client.db("personal-website");
  const collection = db.collection("guestbook");

  if (req.method === "GET") {
    const entries = await collection
      .find({}, { projection: { ip: 0 } })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return res.status(200).json(entries);
  }

  if (req.method === "POST") {
    const body = req.body;

    // NoSQL injection protection: ensure inputs are strings, not objects
    if (typeof body.name !== "string" || typeof body.message !== "string") {
      return res.status(400).json({ error: "name and message must be strings" });
    }

    const name = stripHtml(body.name.trim());
    const message = stripHtml(body.message.trim());

    if (!name || !message) {
      return res.status(400).json({ error: "name and message are required" });
    }

    if (name.length > 100 || message.length > 500) {
      return res.status(400).json({ error: "name max 100 chars, message max 500 chars" });
    }

    if (containsProfanity(name) || containsProfanity(message)) {
      return res.status(400).json({ error: "Please keep your message respectful" });
    }

    // Rate limiting: max 1 message per minute per IP
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";
    const clientIp = Array.isArray(ip) ? ip[0] : ip.split(",")[0].trim();

    const recentEntry = await collection.findOne({
      ip: clientIp,
      createdAt: { $gt: new Date(Date.now() - 60_000) },
    });

    if (recentEntry) {
      return res.status(429).json({ error: "Please wait a minute before posting again" });
    }

    const entry = {
      name,
      message,
      ip: clientIp,
      createdAt: new Date(),
    };

    await collection.insertOne(entry);

    // Don't return the IP to the client
    const { ip: _ip, ...publicEntry } = entry;

    return res.status(201).json(publicEntry);
  }

  return res.status(405).end("Method not allowed");
}
