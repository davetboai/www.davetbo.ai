export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr,280px] gap-16 items-start">
          {/* Left - Narrative */}
          <div>
            <p className="text-[#0ea5e9] font-semibold tracking-widest uppercase text-sm mb-4">About</p>
            <h2 className="font-[family-name:var(--font-merriweather)] text-3xl md:text-4xl font-bold mb-6 leading-tight">
              From Architecture to <span className="gradient-text">AI Innovation</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                I&apos;m a Senior Applied AI Architect at Amazon Web Services, where I help customers
                build whatever we can envision to deliver value for their businesses. My work
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

          {/* Right - Clean fact sheet */}
          <div className="border-l-2 border-[#0ea5e9]/20 pl-6 space-y-6 mt-2">
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Role</div>
              <div className="font-semibold text-[#0a1628] text-sm">Sr. Applied AI Architect at AWS</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Focus</div>
              <div className="font-semibold text-[#0a1628] text-sm">Gen AI, RAG & Graph RAG, Cloud Architecture</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Location</div>
              <div className="font-semibold text-[#0a1628] text-sm">Irvine, California</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Community</div>
              <div className="font-semibold text-[#0a1628] text-sm">3,100+ LinkedIn followers</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Writing</div>
              <div className="font-semibold text-[#0a1628] text-sm">Published on Medium & LinkedIn</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
