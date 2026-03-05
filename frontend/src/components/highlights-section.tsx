export default function HighlightsSection() {
  const highlights = [
    {
      badge: "First of Its Kind",
      title: "AWS\u2019s First Anthropic Claude Champion",
      description:
        "Selected as the very first Anthropic Claude Champion at AWS at the end of 2023 \u2014 for learning faster, diving deeper, and enabling more builders than anyone else in AWS during the 2023 generative AI rush. Sent over 7,000 Slack messages that year, the vast majority answering AI questions for Amazonian builders across channels with thousands of members.",
      url: "",
      linkText: "",
      gradient: "from-[#da7756] to-[#c4613f]",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      badge: "Origin Story",
      title: "The Proof of Concept Behind SAP Joule",
      description:
        "In spring 2024, was the first to demonstrate that a RAG system could pass an SAP certification test, when SAP engaged AWS AI specialists to prove the concept that would become their Joule Copilot. Used ~900 pages of SAP training docs with Claude 2.1 to bring the score from 38% to 74% (60% passing). SAP later moved Joule\u2019s inference to Amazon Bedrock and Claude Sonnet.",
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7420267386966061056/",
      linkText: "Read the story",
      gradient: "from-[#0ea5e9] to-[#0284c7]",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      badge: "Predictive Analysis",
      title: "The Paths to Generative AI Profits",
      description:
        "Published a 2023 framework ranking the three paths to gen AI profits \u2014 enablement, lowering COGS, and model creation \u2014 ordered by speed to market and ROI. A year later, the predictions proved remarkably accurate: enablement companies profited first, while model companies remained in the red due to the cost and timelines of path three.",
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7100905291541614592/",
      linkText: "Read the original post",
      gradient: "from-[#10b981] to-[#059669]",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      badge: "Technical Writing",
      title: "Best Practices for Text-to-SQL with LLMs",
      description:
        "A comprehensive guide to getting better results from off-the-shelf LLMs by improving schema context, prompt design, and evaluation strategies.",
      url: "https://www.linkedin.com/pulse/best-practices-text-to-sql-use-cases-llms-dave-thibault-mr9ac",
      linkText: "Read on LinkedIn",
      gradient: "from-[#6366f1] to-[#8b5cf6]",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      ),
    },
  ];

  return (
    <section id="highlights" className="py-24 bg-[#0a1628] relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#0ea5e9] font-semibold tracking-widest uppercase text-sm mb-4">Highlights</p>
          <h2 className="font-[family-name:var(--font-merriweather)] text-3xl md:text-4xl font-bold mb-4 text-white">
            Career Milestones
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Key achievements and contributions across the AI and cloud landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {highlights.map((item) => {
            const Wrapper = item.url ? "a" : "div";
            const wrapperProps = item.url
              ? { href: item.url, target: "_blank" as const, rel: "noopener noreferrer" }
              : {};
            return (
              <Wrapper
                key={item.title}
                {...wrapperProps}
                className="group block bg-white/[0.04] backdrop-blur-sm rounded-2xl p-8 border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300"
              >
                {/* Badge */}
                <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full mb-5 bg-gradient-to-r ${item.gradient} text-white`}>
                  {item.badge}
                </span>

                {/* Icon + Title row */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} text-white flex items-center justify-center flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <h3 className="font-[family-name:var(--font-merriweather)] text-xl font-bold text-white leading-snug pt-1">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  {item.description}
                </p>

                {/* Link */}
                {item.linkText && (
                  <div className="flex items-center text-sm font-medium">
                    <span className={`bg-gradient-to-r ${item.gradient} bg-clip-text`} style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      {item.linkText}
                    </span>
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                )}
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
