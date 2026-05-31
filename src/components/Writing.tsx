const articles = [
  {
    title: "The Dollar That Finally Got Through",
    description: "How stablecoins became Venezuela's financial lifeline — and what it reveals about the future of cross-border payments for the world's unbanked.",
    date: "May 2026",
    tags: ["Fintech", "Venezuela", "Payments"],
    tagColors: ["bg-blue-600", "bg-yellow-500 text-black", "bg-red-600"],
    url: "https://medium.com/@cesarmonagasromero/the-dollar-that-finally-got-through-8c0e3eb78a76",
  },
  {
    title: "Language Without Identity: Can an LLM Carry a Cultural Soul?",
    description: "What gets lost when you train a model on language but strip away its culture. A PM's take on what multilingual AI is really missing.",
    date: "May 2025",
    tags: ["AI", "Multilingual", "Linguistics"],
    tagColors: ["bg-red-600", "bg-purple-600", "bg-blue-600"],
    url: "https://medium.com/@cesarmonagasromero/language-without-identity-can-an-llm-carry-a-cultural-soul-158335350440",
  },
  {
    title: "De Rien à Tout",
    description: "A personal essay on moving across languages, countries, and identities — written in French.",
    date: "July 2025",
    tags: ["Immigration", "Multilingualism", "Identity"],
    tagColors: ["bg-blue-600", "bg-purple-600", "bg-yellow-500 text-black"],
    url: "https://medium.com/@cesarmonagasromero/de-rien-%C3%A0-tout-b25674774b67",
  },
  {
    title: "The Foundation of AI: How NoSQL Databases Shape the Future of AI-Powered Products",
    description: "Why the infrastructure decisions you make today determine what AI products you can build tomorrow — and why most PMs aren't thinking about this soon enough.",
    date: "March 2025",
    tags: ["AI", "Infrastructure", "Product"],
    tagColors: ["bg-red-600", "bg-blue-600", "bg-green-600"],
    url: "https://medium.com/@cesarmonagasromero/the-foundation-of-ai-how-nosql-databases-shape-the-future-of-ai-powered-products-344394c5c75c",
  },
  {
    title: "Why Product Management Can't Survive Without Diversity",
    description: "The case that homogeneous teams don't just fail ethically — they fail at the product level, building for a world that looks nothing like their users.",
    date: "January 2025",
    tags: ["Product", "Diversity", "Leadership"],
    tagColors: ["bg-green-600", "bg-purple-600", "bg-black"],
    url: "https://medium.com/@cesarmonagasromero/why-product-management-cant-survive-without-diversity-33f9f402b6ad",
  },
  {
    title: "The Power of Language: Reflections on Multilingualism While Studying Abroad",
    description: "What studying languages abroad taught me about connection, identity, and the limits of translation — and why it changed how I think about building global products.",
    date: "December 2024",
    tags: ["Language", "Study Abroad", "Multilingualism"],
    tagColors: ["bg-purple-600", "bg-yellow-500 text-black", "bg-blue-600"],
    url: "https://medium.com/@cesarmonagasromero/the-power-of-language-reflections-on-multilingualism-while-studying-abroad-ef3f9bfb7514",
  },
];

const Writing = () => {
  return (
    <section id="writing" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-6xl md:text-7xl font-black text-black mb-8">
            WRITING
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600 mb-6"></div>
          <p className="text-xl text-gray-600 font-medium">
            On AI, language, global payments, and building for the world —{" "}
            <a
              href="https://medium.com/@cesarmonagasromero"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-bold"
            >
              on Medium
            </a>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border-4 border-black p-6 md:p-8 group hover:bg-black transition-all duration-300 block"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 text-white text-xs font-bold uppercase tracking-wide ${article.tagColors[i]} group-hover:opacity-90`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-black text-black group-hover:text-white transition-colors duration-300 mb-3 leading-tight">
                {article.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed mb-6 font-medium">
                {article.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-400 group-hover:text-gray-500 uppercase tracking-wide">
                  {article.date}
                </span>
                <span className="text-sm font-black text-black group-hover:text-white transition-colors duration-300 uppercase tracking-wide flex items-center gap-2">
                  READ ON MEDIUM
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://medium.com/@cesarmonagasromero"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border-4 border-black text-black font-black text-sm uppercase tracking-wide hover:bg-black hover:text-white transition-all duration-300"
          >
            VIEW ALL WRITING ON MEDIUM
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Writing;
