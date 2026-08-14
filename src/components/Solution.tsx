import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Cpu, MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import { CountUp } from './CountUp';

export const Solution: React.FC = () => {
  return (
    <section id="solution" className="py-24 bg-[#0D1117] relative overflow-hidden border-t border-slate-800/80">
      {/* Subtle Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>The Cortexa AI Solution</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
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
            className="glass-panel glass-panel-hover rounded-2xl p-8 flex flex-col justify-between relative border border-slate-800"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 glow-cyan">
                  <Camera className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                  STEP 01
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight">
                Capture
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed">
                Citizens and field teams simply capture a photo or short video of any public asset. The AI automatically detects potholes, cracks, tilted poles, broken sidewalks, leaking pipelines, and damaged transformers — no manual inspection checklist required.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 bg-slate-950/40 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-mono font-bold text-cyan-400">0.4s</span>
                <span className="text-xs text-slate-300">Instant edge image upload & geo-tagging</span>
              </div>
            </div>
          </motion.div>

          {/* Step 2: AI Detection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-panel glass-panel-hover rounded-2xl p-8 flex flex-col justify-between relative border border-cyan-500/40 bg-cyan-950/20 shadow-xl shadow-cyan-950/30"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 glow-cyan">
                  <Cpu className="w-6 h-6 animate-pulse" />
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  STEP 02
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight">
                AI Detection & Scoring
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed">
                Deep neural network models analyze structural physics, crack geometries, and tilt angles to calculate exact risk scores and predicted breakdown schedules.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-cyan-500/30 bg-cyan-950/50 p-4 rounded-xl">
              <div className="text-3xl font-extrabold font-mono text-cyan-300 flex items-baseline gap-1">
                <CountUp end={6} suffix="+" />
                <span className="text-sm font-sans font-medium text-slate-300">defect types</span>
              </div>
              <p className="text-xs text-cyan-200/80 mt-1">
                Detected simultaneously from a single photo
              </p>
            </div>
          </motion.div>

          {/* Step 3: Health Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-panel glass-panel-hover rounded-2xl p-8 flex flex-col justify-between relative border border-slate-800"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 glow-amber">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                  STEP 03
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight">
                Health Map & Action
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed">
                Issues are geo-clustered into automated work orders on a real-time command dashboard, letting municipal teams dispatch crews before disasters happen.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 bg-slate-950/40 p-4 rounded-xl">
              <div className="text-2xl font-extrabold font-mono text-amber-400">
                Weeks Ahead
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Predicted lead-time window before likely failure
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
