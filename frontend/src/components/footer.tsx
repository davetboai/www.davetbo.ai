"use client";

export default function Footer() {
  return (
    <footer className="bg-[#060d1a] text-white py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-xl font-bold gradient-text">DT</span>
              <span className="text-lg font-semibold text-white/90">Dave Thibault</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Sr. Applied AI Architect at AWS. Building what we can conceive.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex gap-12">
            <div>
              <h3 className="font-semibold mb-3 text-xs tracking-widest uppercase text-gray-500">Navigate</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="text-gray-400 hover:text-[#0ea5e9] transition-colors">About</a></li>
                <li><a href="#expertise" className="text-gray-400 hover:text-[#0ea5e9] transition-colors">Expertise</a></li>
                <li><a href="#writing" className="text-gray-400 hover:text-[#0ea5e9] transition-colors">Writing</a></li>
                <li><a href="#projects" className="text-gray-400 hover:text-[#0ea5e9] transition-colors">Projects</a></li>
                <li><a href="#connect" className="text-gray-400 hover:text-[#0ea5e9] transition-colors">Connect</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-xs tracking-widest uppercase text-gray-500">Elsewhere</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://linkedin.com/in/davetbo" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0ea5e9] transition-colors">LinkedIn</a></li>
                <li><a href="https://davetbo.medium.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0ea5e9] transition-colors">Medium</a></li>
                <li><a href="https://github.com/aws-samples/multi-tenant-full-stack-rag-application-demo" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0ea5e9] transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-3">
          <p>&copy; {new Date().getFullYear()} Dave Thibault. All rights reserved.</p>
          <p className="text-gray-600">Irvine, California</p>
        </div>
      </div>
    </footer>
  );
}
