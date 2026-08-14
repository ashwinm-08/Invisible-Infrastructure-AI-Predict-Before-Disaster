import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Activity, Eye, Zap, AlertTriangle, Scan, CheckCircle2 } from 'lucide-react';

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
    <section id="top" className="relative min-h-screen pt-32 pb-20 overflow-hidden flex flex-col justify-center bg-[#0A0E14] bg-grid-pattern">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>PREDICTIVE URBAN INFRASTRUCTURE MONITORING</span>
            </div>

            {/* Massive Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
              Predict Before <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 drop-shadow-sm">
                Disaster.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              An AI platform that detects, scores, and predicts infrastructure failures — <span className="text-white font-medium">from a single photo</span> — before they become catastrophic accidents.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-cyan-500/25 flex items-center gap-2.5 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>See How It Works</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToSection('health-map')}
                className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700/80 hover:border-cyan-500/40 transition-all duration-300 flex items-center gap-2.5 backdrop-blur-sm cursor-pointer"
              >
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>Explore the Health Map</span>
              </button>
            </div>

            {/* Team Cortexa Badges */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-4">
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
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${member.color} text-slate-950 font-bold text-xs flex items-center justify-center border-2 border-[#0A0E14] shadow-md transition-transform group-hover:scale-110 group-hover:z-20`}
                    >
                      {member.initials}
                    </div>
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-30 whitespace-nowrap bg-slate-900 text-slate-100 text-xs py-1 px-2.5 rounded border border-slate-700 shadow-xl pointer-events-none">
                      <p className="font-semibold text-cyan-300">{member.name}</p>
                      <p className="text-[10px] text-slate-400">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Dynamic AI Defect Bounding Box Scanning Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 p-3 shadow-2xl shadow-cyan-950/40 overflow-hidden group">
              {/* Outer HUD Header bar */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 text-xs font-mono text-slate-400 mb-2 bg-slate-950/60 rounded-t-xl">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-cyan-400 font-semibold">CORTEXA-VISION v3.8</span>
                </div>
                <div className="flex items-center gap-3 text-[11px]">
                  <span>FPS: 60.0</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-cyan-300">LIVE SCANNING</span>
                </div>
              </div>

              {/* Main Simulated AI Viewport */}
              <div className="relative aspect-[4/3] rounded-xl bg-slate-950 overflow-hidden border border-slate-800/80">
                {/* Cyber Grid Background inside canvas */}
                <div className="absolute inset-0 bg-dots-pattern opacity-40" />

                {/* Simulated Urban Asset Graphic (CSS Illustration of Bridge / Road / Transformer) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <svg className="w-full h-full text-slate-700" viewBox="0 0 400 300" fill="none">
                    <path d="M20 280 L380 280 M40 280 L120 100 L280 100 L360 280" stroke="currentColor" strokeWidth="3" strokeDasharray="6 6" />
                    <path d="M120 100 L120 280 M280 100 L280 280" stroke="currentColor" strokeWidth="4" />
                    <circle cx="200" cy="190" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                    <path d="M80 220 L320 220" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>

                {/* Animated Laser Scanning Line */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00E5C7] animate-scanline z-10" />

                {/* Animated Bounding Boxes Loop */}
                {SCAN_DEFECTS.map((defect, index) => {
                  const isActive = index === activeDefectIndex;
                  return (
                    <motion.div
                      key={defect.id}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: isActive ? 1 : 0.2,
                        scale: isActive ? 1 : 0.98,
                      }}
                      transition={{ duration: 0.5 }}
                      className={`absolute ${defect.boxStyle} border-2 border-cyan-400 bg-cyan-500/10 transition-all duration-500 z-20 pointer-events-none rounded`}
                    >
                      {/* Corner Bracket Hooks */}
                      <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-300" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-300" />
                      <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-300" />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-300" />

                      {/* AI Bounding Label Tag */}
                      {isActive && (
                        <div className="absolute -top-8 left-0 bg-slate-900/95 border border-cyan-400 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                          <Scan className="w-3 h-3 animate-spin text-cyan-400" />
                          <span>{defect.title}</span>
                          <span className="bg-cyan-500/30 text-cyan-200 px-1 rounded">{defect.confidence}</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}

                {/* Live Inspection Stats Banner overlay */}
                <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-3 rounded-lg z-30">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`w-4 h-4 ${activeDefect.risk.startsWith('9') ? 'text-red-400 animate-bounce' : 'text-amber-400'}`} />
                      <span className="text-xs font-bold text-white font-mono">{activeDefect.title}</span>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${activeDefect.badgeColor}`}>
                      SEVERITY: {activeDefect.risk}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-slate-300 pt-1 border-t border-slate-800">
                    <div>
                      <span className="text-slate-500 block text-[9px]">ASSET TYPE</span>
                      <span className="text-white truncate block">{activeDefect.type}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px]">CONFIDENCE</span>
                      <span className="text-cyan-300 block">{activeDefect.confidence}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px]">FAILURE WINDOW</span>
                      <span className="text-red-400 font-bold block">{activeDefect.timeToFailure}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selector Tabs beneath scanning frame */}
              <div className="grid grid-cols-3 gap-2 mt-3">
                {SCAN_DEFECTS.map((defect, idx) => (
                  <button
                    key={defect.id}
                    onClick={() => setActiveDefectIndex(idx)}
                    className={`py-1.5 px-2 rounded text-[11px] font-mono text-center transition-all cursor-pointer ${
                      activeDefectIndex === idx
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    Sample #{idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
