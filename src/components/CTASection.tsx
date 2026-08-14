import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Mail, Sparkles, Activity } from 'lucide-react';

export const CTASection: React.FC = () => {
  return (
    <section className="py-24 bg-[#0A0E14] relative overflow-hidden border-t border-slate-800/80">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-10 sm:p-16 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950/90 shadow-2xl relative overflow-hidden space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>JOIN THE URBAN SAFETY REVOLUTION</span>
          </div>

          <h2 className="text-3xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Let's make infrastructure <br className="hidden sm:inline" />
            failure <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300">predictable.</span>
          </h2>

          <p className="text-slate-300 text-lg max-w-2xl mx-auto font-medium">
            Invisible Infrastructure AI — <span className="text-white">Predict Before Disaster</span>
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:mahithareddy9495@gmail.com"
              className="px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2.5 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Get in Touch</span>
            </a>

            <a
              href="https://github.com/MahithaReddy28"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700 hover:border-cyan-500/40 transition-all flex items-center gap-2.5 backdrop-blur-sm cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>View on GitHub</span>
            </a>
          </div>

          <p className="text-xs text-slate-500 font-mono pt-4">
            Ready for municipal deployment · Open API integration
          </p>
        </motion.div>

      </div>
    </section>
  );
};
