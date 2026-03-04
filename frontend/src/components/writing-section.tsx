export default function WritingSection() {
  const articles = [
    {
      title: "Graph RAG Part 1: What Is It, When You Need It, & How to Do It",
      description: "A deep dive into graph databases, knowledge graphs, and how they complement vector-based semantic search in RAG applications. Covers node/edge concepts, JSON graph formats, and when graph RAG is the right pattern.",
      tags: ["Graph RAG", "Knowledge Graphs", "LLMs"],
      url: "https://davetbo.medium.com/graph-rag-part-1-what-is-it-when-you-need-it-how-to-do-it-ea99bc7cfcc9",
      date: "Dec 2024",
      engagement: "13 claps",
    },
    {
      title: "Graph RAG Part 2: Multi-Tenancy, Semantic Search, and Multi-Context Retrieval",
      description: "Integrating graph databases with multi-tenant vector database systems. Using LLMs to create graph queries from user prompts and available schema information for powerful contextual retrieval.",
      tags: ["Graph RAG", "Multi-Tenancy", "Vector DB"],
      url: "https://davetbo.medium.com/graph-rag-part-2-adding-multi-tenancy-semantic-search-and-multi-context-retrieval-5570c0a2a47e",
      date: "Dec 2024",
      engagement: "28 claps",
    },
    {
      title: "OCR and Intelligent Document Processing with LLMs",
      description: "One of the most popular GenAI use cases in 2024. Covers vision-text compression, layout-aware reasoning, tiered fidelity approaches, and practical architecture for processing documents at scale.",
      tags: ["OCR", "Document AI", "Vision LLMs"],
      url: "https://davetbo.medium.com/ocr-and-intelligent-document-processing-with-llms-bf7b0cc4c7c8",
      date: "Dec 2024",
      engagement: "10 claps",
    },
  ];

  return (
    <section id="writing" className="py-24 bg-[#0a1628]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#0ea5e9] font-semibold tracking-widest uppercase text-sm mb-4">Writing</p>
          <h2 className="font-[family-name:var(--font-merriweather)] text-3xl md:text-4xl font-bold mb-4 text-white">
            Technical Articles on Medium
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Practical, hands-on articles covering real-world AI architectures and implementation patterns.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <a
              key={article.title}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white/[0.04] backdrop-blur-sm rounded-2xl p-7 border border-white/10 hover:border-[#0ea5e9]/40 hover:bg-white/[0.08] transition-all duration-300"
            >
              {/* Date & engagement */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-500">{article.date}</span>
                <span className="text-xs text-gray-500">{article.engagement}</span>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-white text-lg mb-3 group-hover:text-[#0ea5e9] transition-colors leading-snug">
                {article.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                {article.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-white/[0.06] text-gray-300 px-2.5 py-1 rounded-full border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read arrow */}
              <div className="mt-5 flex items-center text-[#0ea5e9] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Read on Medium
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Medium CTA */}
        <div className="text-center mt-12">
          <a
            href="https://davetbo.medium.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-gray-400 hover:text-[#0ea5e9] transition-colors text-sm font-medium"
          >
            View all articles on Medium
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
