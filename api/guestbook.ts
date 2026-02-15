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
