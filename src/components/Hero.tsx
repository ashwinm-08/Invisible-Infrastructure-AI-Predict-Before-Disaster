import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Activity, Scan, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const TEAM_MEMBERS = [
  { initials: 'MG', name: 'Mahitha Reddy G', role: 'Team Lead', color: 'from-cyan-500 to-blue-500' },
  { initials: 'AM', name: 'Ashwin M', role: 'Member', color: 'from-teal-400 to-emerald-500' },
  { initials: 'RM', name: 'Ragavendra M', role: 'Member', color: 'from-amber-400 to-orange-500' },
  { initials: 'KA', name: 'Kanimozhi A', role: 'Member', color: 'from-purple-400 to-pink-500' },
];

const SCAN_DEFECTS = [
  {
    id: 1,
    title: 'CRITICAL STRUCTURAL CRACK',
    confidence: '98.4%',
    risk: '8.9 / 10',
    type: 'Bridge Support Beam',
    timeToFailure: '18 Days',
    badgeColor: 'border-red-500 bg-red-500/10 text-red-400',
    boxStyle: 'top-[15%] left-[20%] w-[55%] h-[40%]',
  },
  {
    id: 2,
    title: 'SEVERE POTHOLE & SUBSIDENCE',
    confidence: '96.2%',
    risk: '7.8 / 10',
    type: 'Primary Arterial Road',
    timeToFailure: '24 Days',
    badgeColor: 'border-amber-500 bg-amber-500/10 text-amber-400',
    boxStyle: 'top-[45%] left-[45%] w-[45%] h-[35%]',
  },
  {
    id: 3,
    title: 'TRANSFORMER LEAK & TILT',
    confidence: '99.1%',
    risk: '9.4 / 10',
    type: 'Electrical Grid Asset',
    timeToFailure: '6 Days',
    badgeColor: 'border-red-500 bg-red-500/10 text-red-400',
    boxStyle: 'top-[25%] left-[50%] w-[40%] h-[50%]',
  },
];

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [activeDefectIndex, setActiveDefectIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDefectIndex((prev) => (prev + 1) % SCAN_DEFECTS.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const activeDefect = SCAN_DEFECTS[activeDefectIndex];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offsetTop = el.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <section id="top" className={`relative min-h-screen pt-32 pb-20 overflow-hidden flex flex-col justify-center transition-colors ${
      theme === 'dark' ? 'bg-[#0A0E14] bg-grid-pattern text-slate-100' : 'bg-slate-50 bg-grid-pattern text-slate-900'
    }`}>
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>{t('hero_eyebrow')}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08]">
              {t('hero_title1')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 drop-shadow-sm">
                {t('hero_title2')}
              </span>
            </h1>

            {/* Subheadline */}
            <p className={`text-lg sm:text-xl ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} max-w-2xl font-normal leading-relaxed`}>
              {t('hero_subheadline')}
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-cyan-500/25 flex items-center gap-2.5 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>{t('hero_cta_how')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToSection('health-map')}
                className={`px-6 py-3.5 rounded-xl font-semibold text-sm border transition-all duration-300 flex items-center gap-2.5 backdrop-blur-sm cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 hover:bg-slate-800 text-white border-slate-700 hover:border-cyan-500/40'
                    : 'bg-white hover:bg-slate-100 text-slate-900 border-slate-300 hover:border-cyan-500/40 shadow-sm'
                }`}
              >
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>{t('hero_cta_map')}</span>
              </button>
            </div>

            {/* Team Cortexa Badges */}
            <div className={`pt-6 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'} flex flex-wrap items-center gap-4`}>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Built by Team Cortexa</span>
              </div>
              <div className="flex items-center -space-x-2">
                {TEAM_MEMBERS.map((member) => (
                  <div
                    key={member.initials}
                    className="relative group cursor-pointer"
                  >
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${member.color} text-slate-950 font-bold text-xs flex items-center justify-center border-2 ${theme === 'dark' ? 'border-[#0A0E14]' : 'border-white'} shadow-md transition-transform group-hover:scale-110 group-hover:z-20`}
                    >
                      {member.initials}
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-30 whitespace-nowrap bg-slate-900 text-slate-100 text-xs py-1 px-2.5 rounded border border-slate-700 shadow-xl pointer-events-none">
                      <p className="font-semibold text-cyan-300">{member.name}</p>
                      <p className="text-[10px] text-slate-400">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: AI Scan Bounding Box Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className={`relative rounded-2xl border p-3 shadow-2xl overflow-hidden group ${
              theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className={`flex items-center justify-between px-3 py-2 border-b text-xs font-mono text-slate-400 mb-2 rounded-t-xl ${
                theme === 'dark' ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-100 border-slate-200'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-cyan-400 font-semibold">CORTEXA-VISION v3.8</span>
                </div>
                <span>FPS: 60 | INFERENCE: 12ms</span>
              </div>

              {/* Dynamic Inspection Canvas */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                <svg className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="hero-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(0,229,199,0.15)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#hero-grid)" />
                  <circle cx="50%" cy="50%" r="35%" fill="none" stroke="rgba(0,229,199,0.1)" strokeWidth="1" strokeDasharray="4 4" />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                  <div className="w-48 h-48 border border-cyan-500/20 rounded-full flex items-center justify-center">
                    <div className="w-32 h-32 border border-cyan-400/30 rounded-full" />
                  </div>
                </div>

                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00E5C7] animate-scanline" />

                {/* Animated Bounding Box Overlay */}
                <div
                  className={`absolute ${activeDefect.boxStyle} border-2 border-cyan-400 bg-cyan-500/10 rounded transition-all duration-700 shadow-[0_0_20px_rgba(0,229,199,0.4)] z-20`}
                >
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-300" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-300" />
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-300" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-300" />

                  <div className="absolute -top-7 left-0 bg-slate-900/90 border border-cyan-400 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                    <Scan className="w-3 h-3 animate-spin text-cyan-400" />
                    <span>{activeDefect.title}</span>
                    <span className="text-white font-bold bg-cyan-500/30 px-1 rounded">{activeDefect.confidence}</span>
                  </div>
                </div>

                {/* Telemetry Tooltip */}
                <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 border border-slate-800 p-2.5 rounded-lg text-xs font-mono backdrop-blur-md flex items-center justify-between text-slate-300">
                  <div>
                    <span className="text-[10px] text-slate-500 block">ASSET CLASS</span>
                    <span className="text-white font-semibold">{activeDefect.type}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">RISK SCORE</span>
                    <span className="text-red-400 font-bold">{activeDefect.risk}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">TIME TO FAILURE</span>
                    <span className="text-amber-400 font-bold">{activeDefect.timeToFailure}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
