export default function ExpertiseSection() {
  const areas = [
    {
      title: "Generative AI & LLMs",
      description: "Building production applications with large language models, including Amazon Bedrock, Claude, and multi-modal AI systems. Prompt engineering, fine-tuning, and model evaluation.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      gradient: "from-amber-400 to-orange-500",
    },
    {
      title: "RAG & Graph RAG",
      description: "Designing retrieval-augmented generation systems for enterprise use cases. Multi-tenant vector databases, knowledge graphs, entity extraction, and semantic search architectures.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      gradient: "from-[#0ea5e9] to-[#0284c7]",
    },
    {
      title: "Cloud Architecture",
      description: "End-to-end AWS solution design using CDK, serverless, containers, and managed services. Security-first, cost-optimized, and production-ready infrastructure as code.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      gradient: "from-[#6366f1] to-[#8b5cf6]",
    },
    {
      title: "Intelligent Document Processing",
      description: "OCR with LLMs, vision-aware RAG, document classification, table extraction, and multi-format processing pipelines for enterprise document workflows.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      gradient: "from-[#10b981] to-[#059669]",
    },
    {
      title: "Full-Stack Development",
      description: "React, Next.js, TypeScript frontends paired with Python, Node.js backends. API design, authentication, real-time streaming, and multi-tenant SaaS patterns.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      gradient: "from-rose-400 to-pink-500",
    },
    {
      title: "MLOps & DevOps",
      description: "CI/CD pipelines, infrastructure as code, containerization, model deployment, monitoring, and operational excellence for AI/ML workloads at scale.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      gradient: "from-cyan-400 to-teal-500",
    },
  ];

  return (
    <section id="expertise" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#0ea5e9] font-semibold tracking-widest uppercase text-sm mb-4">Expertise</p>
          <h2 className="font-[family-name:var(--font-merriweather)] text-3xl md:text-4xl font-bold mb-4">
            What I Build & Advise On
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Deep technical expertise across the AI and cloud stack, from ideation through production deployment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area) => (
            <div key={area.title} className="group relative bg-[#f8fafc] rounded-2xl p-7 border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300">
              {/* Hover gradient border effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${area.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm`} />
              <div className="absolute inset-[1px] rounded-2xl bg-[#f8fafc] group-hover:bg-white transition-colors duration-300" />

              <div className="relative">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${area.gradient} text-white flex items-center justify-center mb-5`}>
                  {area.icon}
                </div>
                <h3 className="font-semibold text-[#0a1628] text-lg mb-2">{area.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{area.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
