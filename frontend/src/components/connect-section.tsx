export default function ConnectSection() {
  const links = [
    {
      name: "LinkedIn",
      description: "Connect and follow for AI insights",
      url: "https://linkedin.com/in/davetbo",
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      color: "#0077B5",
    },
    {
      name: "Medium",
      description: "Read my technical articles",
      url: "https://davetbo.medium.com",
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
      ),
      color: "#000000",
    },
    {
      name: "GitHub",
      description: "Explore my open source work",
      url: "https://github.com/aws-samples/multi-tenant-full-stack-rag-application-demo",
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      color: "#333333",
    },
  ];

  return (
    <section id="connect" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#0ea5e9] font-semibold tracking-widest uppercase text-sm mb-4">Connect</p>
          <h2 className="font-[family-name:var(--font-merriweather)] text-3xl md:text-4xl font-bold mb-4">
            Let&apos;s Build Something Together
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Whether you&apos;re looking for AI strategy guidance, architecture advice, or want to discuss a technical challenge, I&apos;d love to connect.
          </p>
        </div>

        {/* Link cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#f8fafc] rounded-2xl p-7 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-4 group-hover:shadow-md transition-shadow" style={{ color: link.color }}>
                {link.icon}
              </div>
              <h3 className="font-semibold text-[#0a1628] mb-1">{link.name}</h3>
              <p className="text-gray-500 text-sm">{link.description}</p>
            </a>
          ))}
        </div>

        {/* Direct message CTA */}
        <div className="bg-gradient-to-br from-[#0a1628] via-[#162033] to-[#1e293b] rounded-2xl p-10 text-center relative overflow-hidden">
          {/* Subtle background effect */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `
              radial-gradient(ellipse 60% 40% at 30% 50%, rgba(14,165,233,0.3), transparent),
              radial-gradient(ellipse 50% 30% at 70% 50%, rgba(99,102,241,0.25), transparent)
            `
          }} />

          <div className="relative">
            <h3 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-white mb-3">
              Reach me on LinkedIn
            </h3>
            <p className="text-gray-400 max-w-lg mx-auto mb-6">
              The best way to get in touch is through LinkedIn. Send me a message and let&apos;s discuss how I can help with your AI and cloud initiatives.
            </p>
            <a
              href="https://linkedin.com/in/davetbo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-[#0ea5e9] to-[#6366f1] text-white px-8 py-3.5 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-[#0ea5e9]/20"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Message on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
