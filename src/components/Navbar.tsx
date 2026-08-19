import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, Menu, X, Activity, Sun, Moon, Globe, ChevronDown } from 'lucide-react';
import { useLanguage, SUPPORTED_LANGUAGES, Language } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const NAV_ITEMS = [
    { label: t('nav_problem'), href: '#problem' },
    { label: t('nav_solution'), href: '#solution' },
    { label: t('nav_scanner'), href: '#ai-scanner' },
    { label: t('nav_how_it_works'), href: '#how-it-works' },
    { label: t('nav_features'), href: '#features' },
    { label: t('nav_architecture'), href: '#architecture' },
    { label: t('nav_impact'), href: '#impact' },
    { label: t('nav_roadmap'), href: '#roadmap' },
    { label: t('nav_team'), href: '#team' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['problem', 'solution', 'ai-scanner', 'how-it-works', 'features', 'architecture', 'impact', 'roadmap', 'team', 'health-map'];
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

    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
          ? theme === 'dark'
            ? 'bg-[#0A0E14]/90 backdrop-blur-md border-b border-cyan-500/20 py-3 shadow-xl shadow-cyan-950/20'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 shadow-md'
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
            <span className={`font-bold text-lg tracking-tight transition-colors flex items-center gap-1.5 ${theme === 'dark' ? 'text-white group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-cyan-600'}`}>
              Invisible Infrastructure <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-mono">AI</span>
            </span>
            <span className="text-[10px] text-slate-400 block tracking-widest font-mono uppercase">
              By Team Cortexa
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
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
                    ? 'text-cyan-400 bg-cyan-500/15 border border-cyan-500/30 shadow-[0_0_12px_rgba(0,229,199,0.2)] font-semibold'
                    : theme === 'dark'
                    ? 'text-slate-300 hover:text-white hover:bg-white/5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Controls: 15+ Language Selector + Sun/Moon Theme Toggle + CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* 15+ Language Dropdown */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-900/90 border-slate-800 text-slate-200 hover:border-cyan-500/40'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-cyan-500/40 shadow-sm'
              }`}
              title="Select Language (15+ Supported)"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language.flag}</span>
              <span className="font-sans font-medium hidden sm:inline">{language.name}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Language Selection Menu (15 Languages Grid) */}
            {langDropdownOpen && (
              <div
                className={`absolute right-0 mt-2 w-64 rounded-xl border p-2 shadow-2xl z-50 max-h-80 overflow-y-auto grid grid-cols-1 gap-1 font-sans ${
                  theme === 'dark'
                    ? 'bg-[#0D1117]/95 border-slate-800 text-slate-100 backdrop-blur-xl'
                    : 'bg-white/95 border-slate-200 text-slate-900 backdrop-blur-xl shadow-xl'
                }`}
              >
                <div className="text-[10px] font-mono text-slate-400 px-2 py-1 uppercase tracking-wider border-b border-slate-800/50 mb-1">
                  Select Language (15 Languages)
                </div>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang);
                      setLangDropdownOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                      language.code === lang.code
                        ? 'bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30'
                        : theme === 'dark'
                        ? 'hover:bg-slate-800 text-slate-300'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">{lang.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              theme === 'dark'
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm'
            }`}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme Mode"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-cyan-600" />}
          </button>

          {/* CTA Button */}
          <a
            href="#health-map"
            onClick={(e) => scrollToSection(e, '#health-map')}
            className="hidden sm:flex px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-semibold text-xs tracking-wide hover:from-cyan-400 hover:to-teal-300 transition-all duration-300 shadow-md shadow-cyan-500/20 items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>{t('nav_demo_btn')}</span>
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`xl:hidden p-2 rounded-lg border text-slate-300 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 text-slate-700'}`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`xl:hidden px-4 pt-3 pb-6 space-y-2 mt-2 border-b backdrop-blur-xl ${
          theme === 'dark' ? 'bg-[#0D1117]/95 border-cyan-500/20' : 'bg-white/95 border-slate-200 shadow-xl'
        }`}>
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
                      ? 'text-cyan-400 bg-cyan-500/15 border border-cyan-500/30'
                      : theme === 'dark'
                      ? 'text-slate-300 hover:text-white bg-slate-900/50'
                      : 'text-slate-700 hover:text-slate-900 bg-slate-100'
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
              className="w-full py-2.5 rounded-lg bg-cyan-500 text-slate-950 font-semibold text-xs tracking-wide flex items-center justify-center gap-2 text-center shadow-md shadow-cyan-500/20"
            >
              <Activity className="w-4 h-4" />
              <span>{t('nav_demo_btn')}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
