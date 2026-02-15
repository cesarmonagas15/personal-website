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
