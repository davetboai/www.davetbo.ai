export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#162033] to-[#0f172a]" />

      {/* Animated mesh gradient overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `
          radial-gradient(ellipse 80% 50% at 20% 40%, rgba(14,165,233,0.3), transparent),
          radial-gradient(ellipse 60% 40% at 80% 60%, rgba(99,102,241,0.25), transparent),
          radial-gradient(ellipse 50% 30% at 50% 80%, rgba(16,185,129,0.15), transparent)
        `
      }} />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '48px 48px'
      }} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white pt-24 pb-16">
        {/* Tagline pill */}
        <div className="inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-full px-5 py-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
          <span className="text-sm text-gray-300 tracking-wide">Sr. Applied AI Architect @ AWS</span>
        </div>

        <h1 className="font-[family-name:var(--font-merriweather)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
          Building what we<br />
          <span className="gradient-text">can conceive.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Senior technical leader with deep cloud architecture, software engineering, devops, and MLOps experience.
          Advising C-suite executives to hands-on developers to accelerate AI-powered products to market on AWS.
        </p>

        {/* Quick stats */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">AWS</div>
            <div className="text-xs md:text-sm text-gray-400 mt-1">Cloud Platform</div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">Gen AI</div>
            <div className="text-xs md:text-sm text-gray-400 mt-1">Specialization</div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">RAG</div>
            <div className="text-xs md:text-sm text-gray-400 mt-1">& Graph RAG</div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">Full Stack</div>
            <div className="text-xs md:text-sm text-gray-400 mt-1">Architecture</div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://linkedin.com/in/davetbo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-white/10 text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a
            href="https://davetbo.medium.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-white/10 text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>
            Medium Blog
          </a>
          <a
            href="#connect"
            className="inline-block bg-gradient-to-r from-[#0ea5e9] to-[#6366f1] text-white px-7 py-3.5 rounded-lg font-semibold hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-[#0ea5e9]/20"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
