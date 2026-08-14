import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Problem', href: '#problem' },
  { label: 'Solution', href: '#solution' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Impact', href: '#impact' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Team', href: '#team' },
];

export const Footer: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#070A0F] text-slate-400 py-16 border-t border-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <span className="text-lg">🛰️</span>
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                Invisible Infrastructure <span className="text-cyan-400 font-mono">AI</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An AI platform that detects, scores, and predicts infrastructure failures — from a single photo — before they become accidents.
            </p>

            <div className="text-xs font-mono text-cyan-300 flex items-center gap-1.5 pt-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Created by Team Cortexa</span>
            </div>
          </div>

          {/* Nav Quick Links (7 cols) */}
          <div className="md:col-span-7 flex flex-wrap gap-x-8 gap-y-3 items-center justify-start md:justify-end text-xs font-medium">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-slate-400 hover:text-cyan-300 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

        </div>

        {/* Bottom Attribution Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} Team Cortexa (Mahitha Reddy G, Ashwin M, Ragavendra M, Kanimozhi A). All rights reserved.
          </div>

          <div className="flex items-center gap-2">
            <span>Built for <span className="text-cyan-400 font-semibold">International Hackathon 2026</span></span>
          </div>
        </div>

      </div>
    </footer>
  );
};
