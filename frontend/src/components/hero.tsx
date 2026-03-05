import ProfilePhoto from "@/components/profile-photo";

export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden">
      {/* Deep navy gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#12203a] to-[#0f172a]" />

      {/* Mesh gradient accents */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(ellipse 70% 50% at 15% 35%, rgba(14,165,233,0.08), transparent),
          radial-gradient(ellipse 55% 40% at 85% 55%, rgba(99,102,241,0.07), transparent),
          radial-gradient(ellipse 45% 25% at 50% 85%, rgba(16,185,129,0.04), transparent)
        `
      }} />

      {/* Grid overlay */}
      <div className="hero-grid absolute inset-0 opacity-[0.15]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-white pt-28 pb-12">

        {/* Identity block: Name + Photo */}
        <div className="flex items-center justify-center gap-6 sm:gap-8 md:gap-10 mb-8">
          <h1 className="font-[family-name:var(--font-merriweather)] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.4] text-right tracking-[-0.01em]">
            <span className="block mb-[5px]">Dave</span>
            <span className="block">Thibault</span>
          </h1>
          <ProfilePhoto />
        </div>

        {/* Gradient divider */}
        {/* Role badges */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 my-8">
          <div className="inline-flex items-center gap-2 bg-[#f2a900]/90 backdrop-blur-sm rounded-full px-5 py-2 shadow-lg shadow-[#f2a900]/10">
            <span className="text-sm text-white font-semibold tracking-wide">Sr. Applied AI Architect @ AWS</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-[#da7756]/90 backdrop-blur-sm rounded-full px-5 py-2 shadow-lg shadow-[#da7756]/10">
            <span className="text-sm text-white font-semibold tracking-wide">AWS&apos;s first official Anthropic Claude Champion since 2023</span>
          </div>
        </div>

        {/* Tagline */}
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-merriweather)] text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] mb-4">
            Building anything<br />
            <span className="gradient-text">we can envision.</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-300/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            Senior technical leader with deep cloud architecture, software engineering, devops, and MLOps experience.
            Advising C-suite executives to hands-on developers to accelerate AI-powered products to market on AWS.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center text-center">
          <a
            href="https://linkedin.com/in/davetbo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-white/[0.07] text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-white/15 transition-all border border-white/[0.12] backdrop-blur-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a
            href="https://davetbo.medium.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-white/[0.07] text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-white/15 transition-all border border-white/[0.12] backdrop-blur-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>
            Medium Blog
          </a>
          <a
            href="#connect"
            className="inline-flex items-center justify-center bg-gradient-to-r from-[#0ea5e9] to-[#6366f1] text-white px-7 py-3.5 rounded-lg font-semibold hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-[#0ea5e9]/20"
          >
            Get in Touch
          </a>
        </div>
      </div>

    </section>
  );
}
