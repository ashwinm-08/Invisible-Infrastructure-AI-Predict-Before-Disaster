import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Cpu, MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import { CountUp } from './CountUp';
import { useTheme } from '../context/ThemeContext';

export const Solution: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section id="solution" className={`py-24 relative overflow-hidden border-t transition-colors ${
      theme === 'dark' ? 'bg-[#0D1117] border-slate-800/80 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
    }`}>
      {/* Subtle Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest font-semibold">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>The Cortexa AI Solution</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Point your phone. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
              AI does the inspection.
            </span>
          </h2>
        </div>

        {/* 3-Step Visual Flow Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          
          {/* Connecting Arrow lines for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-[30%] -translate-y-1/2 z-0">
            <ArrowRight className="w-8 h-8 text-cyan-500/40 animate-pulse" />
          </div>
          <div className="hidden lg:block absolute top-1/2 left-[64%] -translate-y-1/2 z-0">
            <ArrowRight className="w-8 h-8 text-cyan-500/40 animate-pulse" />
          </div>

          {/* Step 1: Capture */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`glass-panel glass-panel-hover rounded-2xl p-8 flex flex-col justify-between relative border ${
              theme === 'dark' ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white shadow-lg'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 glow-cyan">
                  <Camera className="w-6 h-6" />
                </div>
                <span className={`text-xs font-mono px-3 py-1 rounded-full border ${theme === 'dark' ? 'bg-slate-900 text-slate-400 border-slate-800' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                  STEP 01
                </span>
              </div>

              <h3 className="text-2xl font-bold tracking-tight">
                Capture
              </h3>

              <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} text-sm leading-relaxed`}>
                Citizen or municipal worker snaps a photo of a road, pole, bridge, or transformer on any smartphone.
              </p>
            </div>

            <div className={`mt-8 pt-4 border-t text-xs font-mono text-cyan-400 flex items-center gap-2 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Zero special hardware needed</span>
            </div>
          </motion.div>

          {/* Step 2: Analyze & Predict */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`glass-panel glass-panel-hover rounded-2xl p-8 flex flex-col justify-between relative border ${
              theme === 'dark' ? 'border-cyan-500/40 bg-slate-900/90 glow-cyan' : 'border-cyan-500/40 bg-white shadow-xl'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
                  <Cpu className="w-6 h-6 animate-pulse" />
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-bold">
                  STEP 02
                </span>
              </div>

              <h3 className="text-2xl font-bold tracking-tight">
                Analyze & Predict
              </h3>

              <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} text-sm leading-relaxed`}>
                Computer vision detects defect type, scores severity 0–10, and calculates a predicted lead-time until total breakdown.
              </p>
            </div>

            <div className={`mt-8 pt-4 border-t text-xs font-mono text-teal-400 flex items-center gap-2 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span>Sub-second AI inference engine</span>
            </div>
          </motion.div>

          {/* Step 3: Prioritize & Fix */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`glass-panel glass-panel-hover rounded-2xl p-8 flex flex-col justify-between relative border ${
              theme === 'dark' ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white shadow-lg'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className={`text-xs font-mono px-3 py-1 rounded-full border ${theme === 'dark' ? 'bg-slate-900 text-slate-400 border-slate-800' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                  STEP 03
                </span>
              </div>

              <h3 className="text-2xl font-bold tracking-tight">
                Prioritize & Fix
              </h3>

              <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} text-sm leading-relaxed`}>
                Defect is pinned to the city Health Map. Municipal teams receive auto-generated dispatches BEFORE an accident happens.
              </p>
            </div>

            <div className={`mt-8 pt-4 border-t text-xs font-mono text-emerald-400 flex items-center gap-2 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Automated municipal dispatches</span>
            </div>
          </motion.div>

        </div>

        {/* Animated Impact Numbers Bar */}
        <div className={`mt-16 rounded-2xl p-8 border grid grid-cols-2 md:grid-cols-4 gap-6 text-center ${
          theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-md'
        }`}>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono tracking-tight">
              <CountUp end={85} suffix="%" />
            </div>
            <div className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">
              Accident Reduction
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-teal-400 font-mono tracking-tight">
              <CountUp end={60} suffix="%" />
            </div>
            <div className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">
              Repair Cost Savings
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono tracking-tight">
              <CountUp end={12} suffix=" Days" />
            </div>
            <div className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">
              Avg Failure Lead Time
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tracking-tight">
              <CountUp end={99} suffix="%" />
            </div>
            <div className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">
              Neural Precision Rate
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
