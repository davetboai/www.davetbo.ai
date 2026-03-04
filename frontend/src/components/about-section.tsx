export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <div>
            <p className="text-[#0ea5e9] font-semibold tracking-widest uppercase text-sm mb-4">About</p>
            <h2 className="font-[family-name:var(--font-merriweather)] text-3xl md:text-4xl font-bold mb-6 leading-tight">
              From Architecture to <span className="gradient-text">AI Innovation</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                I&apos;m a Senior Applied AI Architect at Amazon Web Services, where I help customers
                build whatever we can conceive of to deliver value for their businesses. My work
                spans the full spectrum from advising C-suite executives on AI strategy to writing
                production code alongside development teams.
              </p>
              <p>
                With deep experience in cloud architecture, software engineering, DevOps, and MLOps,
                I specialize in accelerating AI-powered products to market. I focus particularly on
                Generative AI, Retrieval-Augmented Generation (RAG), and conversational AI systems
                built on AWS.
              </p>
              <p>
                I&apos;m also a technical writer and open source contributor, sharing practical
                knowledge through detailed articles on topics like Graph RAG, intelligent document
                processing, and multi-tenant AI application architectures.
              </p>
            </div>
          </div>

          {/* Right - Info Cards */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0ea5e9]/10 to-[#6366f1]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#0ea5e9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#0a1628] mb-1">Current Role</h3>
                  <p className="text-gray-600 text-sm">Sr. Applied AI Architect at AWS, helping customers build with Generative AI and cloud-native architectures</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0ea5e9]/10 to-[#6366f1]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#6366f1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#0a1628] mb-1">Technical Focus</h3>
                  <p className="text-gray-600 text-sm">Generative AI, RAG & Graph RAG, Conversational AI, MLOps, DevOps, Full-Stack Cloud Architecture</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0ea5e9]/10 to-[#6366f1]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#0a1628] mb-1">Location</h3>
                  <p className="text-gray-600 text-sm">Irvine, California</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0ea5e9]/10 to-[#6366f1]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#0a1628] mb-1">Network</h3>
                  <p className="text-gray-600 text-sm">500+ connections, 2,900+ followers on LinkedIn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
