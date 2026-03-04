export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#0ea5e9] font-semibold tracking-widest uppercase text-sm mb-4">Projects</p>
          <h2 className="font-[family-name:var(--font-merriweather)] text-3xl md:text-4xl font-bold mb-4">
            Open Source & Featured Work
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Building real-world applications that demonstrate production-grade AI patterns.
          </p>
        </div>

        {/* Featured Project */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 mb-8">
          <div className="md:flex">
            {/* Left side - visual */}
            <div className="md:w-2/5 bg-gradient-to-br from-[#0a1628] via-[#162033] to-[#1e293b] p-10 flex flex-col justify-center">
              <div className="space-y-3">
                {/* Architecture diagram representation */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0ea5e9]/20 border border-[#0ea5e9]/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#0ea5e9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#0ea5e9]/30 to-transparent" />
                  <div className="w-10 h-10 rounded-lg bg-[#6366f1]/20 border border-[#6366f1]/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#6366f1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-6">
                  <div className="w-10 h-10 rounded-lg bg-[#10b981]/20 border border-[#10b981]/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#10b981]/30 to-transparent" />
                  <div className="w-10 h-10 rounded-lg bg-amber-400/20 border border-amber-400/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-rose-400/20 border border-rose-400/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-rose-400/30 to-transparent" />
                  <div className="w-10 h-10 rounded-lg bg-cyan-400/20 border border-cyan-400/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-6 text-center">Multi-tenant architecture</p>
            </div>

            {/* Right side - details */}
            <div className="md:w-3/5 p-8 md:p-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs bg-[#0ea5e9]/10 text-[#0ea5e9] px-2.5 py-0.5 rounded-full font-medium">AWS Samples</span>
                <span className="text-xs bg-[#10b981]/10 text-[#10b981] px-2.5 py-0.5 rounded-full font-medium">Open Source</span>
              </div>

              <h3 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#0a1628] mb-4">
                Multi-Tenant Full-Stack RAG Application
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6">
                A comprehensive, production-ready demo application published on AWS Samples.
                Features multi-tenant document collections, prompt management, LLM-based OCR,
                entity extraction, graph queries, and automatic orchestration of incoming
                prompts across available document collections for conversation context.
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {["Amazon Bedrock", "React", "Python", "CDK", "DynamoDB", "OpenSearch", "Cognito", "Graph DB", "S3"].map((tech) => (
                  <span key={tech} className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Features list */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {[
                  "Multi-tenant isolation",
                  "Graph RAG integration",
                  "LLM-based OCR",
                  "Prompt template CRUD",
                  "Auto query orchestration",
                  "Model parameter controls",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-[#10b981] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>

              <a
                href="https://github.com/aws-samples/multi-tenant-full-stack-rag-application-demo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#0a1628] text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#162033] transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                View on GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Secondary project - PAWM */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
          <div className="md:flex items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs bg-[#6366f1]/10 text-[#6366f1] px-2.5 py-0.5 rounded-full font-medium">Side Project</span>
                <span className="text-xs bg-[#10b981]/10 text-[#10b981] px-2.5 py-0.5 rounded-full font-medium">MIT Licensed</span>
              </div>
              <h3 className="font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#0a1628] mb-3">
                Personal Agentic Workforce Manager (PAWM)
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                An open-source platform for deploying, managing, and scaling autonomous AI agent teams
                that collaborate like real employees. Built with AWS CDK, ECS, and the Claude Agent SDK.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Claude Agents", "AWS CDK", "ECS", "React", "DynamoDB"].map((tech) => (
                  <span key={tech} className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <a
                href="https://www.pawm.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#0ea5e9] hover:text-[#0284c7] font-medium text-sm transition-colors"
              >
                Visit pawm.ai
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
