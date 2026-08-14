import React, { useState, useEffect } from 'react';
import { ShieldAlert, Menu, X, Activity, Scan } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Problem', href: '#problem' },
  { label: 'Solution', href: '#solution' },
  { label: 'AI Scanner', href: '#ai-scanner' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Impact', href: '#impact' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Team', href: '#team' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scrollspy active section detector
      const sections = NAV_ITEMS.map(item => item.href.replace('#', ''));
      sections.push('health-map');
      
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0E14]/85 backdrop-blur-md border-b border-cyan-500/15 py-3 shadow-xl shadow-cyan-950/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => scrollToSection(e, '#top')}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 group-hover:border-cyan-400 transition-all duration-300 glow-cyan">
            <span className="text-xl">🛰️</span>
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
              Invisible Infrastructure <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">AI</span>
            </span>
            <span className="text-[10px] text-slate-400 block tracking-widest font-mono uppercase">
              By Team Cortexa
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 shadow-[0_0_12px_rgba(0,229,199,0.2)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#health-map"
            onClick={(e) => scrollToSection(e, '#health-map')}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-semibold text-xs tracking-wide hover:from-cyan-400 hover:to-teal-300 transition-all duration-300 shadow-lg shadow-cyan-500/25 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Activity className="w-4 h-4 animate-pulse" />
            <span>View Live Demo</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D1117]/95 backdrop-blur-xl border-b border-cyan-500/20 px-4 pt-3 pb-6 space-y-2 mt-2">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`px-3 py-2.5 rounded-lg text-xs font-medium block transition-all ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white bg-slate-900/50'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
          <div className="pt-3 border-t border-slate-800">
            <a
              href="#health-map"
              onClick={(e) => scrollToSection(e, '#health-map')}
              className="w-full py-2.5 rounded-lg bg-cyan-500 text-slate-950 font-semibold text-xs tracking-wide flex items-center justify-center gap-2 text-center shadow-lg shadow-cyan-500/20"
            >
              <Activity className="w-4 h-4" />
              <span>View Live Demo</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
