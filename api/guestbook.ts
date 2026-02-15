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
