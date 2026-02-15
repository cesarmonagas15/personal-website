import type { VercelRequest, VercelResponse } from "@vercel/node";
import clientPromise from "./_lib/mongodb.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const client = await clientPromise;
  const db = client.db("personal-website");
  const collection = db.collection("guestbook");

  if (req.method === "GET") {
    const entries = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return res.status(200).json(entries);
  }

  if (req.method === "POST") {
    const { name, message } = req.body as { name?: string; message?: string };

    if (!name || !message) {
      return res.status(400).json({ error: "name and message are required" });
    }

    if (name.length > 100 || message.length > 500) {
      return res.status(400).json({ error: "name max 100 chars, message max 500 chars" });
    }

    const entry = {
      name: name.trim(),
      message: message.trim(),
      createdAt: new Date(),
    };

    await collection.insertOne(entry);

    return res.status(201).json(entry);
  }

  return res.status(405).end("Method not allowed");
}
