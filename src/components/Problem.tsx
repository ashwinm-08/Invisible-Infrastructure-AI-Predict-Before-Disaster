import React from 'react';
import { motion } from 'framer-motion';
import { AlertOctagon, TrendingUp, EyeOff, XCircle } from 'lucide-react';

const PROBLEMS = [
  {
    icon: AlertOctagon,
    title: 'Reactive, not predictive',
    description: 'Defects are logged only after someone reports them or an accident occurs.',
    accentColor: 'text-red-400 border-red-500/30 bg-red-500/10',
    stat: '92%',
    statLabel: 'of city repairs start from citizen complaints',
  },
  {
    icon: TrendingUp,
    title: 'Costly emergency fixes',
    description: 'Emergency repairs cost far more than scheduled preventive maintenance.',
    accentColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    stat: '4.5x',
    statLabel: 'higher cost for emergency vs scheduled fixes',
  },
  {
    icon: EyeOff,
    title: 'No early warning',
    description: 'Small cracks and tilts silently worsen for months before anyone notices.',
    accentColor: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
    stat: '6+ Mo',
    statLabel: 'unnoticed degradation before catastrophic failure',
  },
];

export const Problem: React.FC = () => {
  return (
    <section id="problem" className="py-24 bg-[#0A0E14] relative border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono uppercase tracking-widest">
            <XCircle className="w-3.5 h-3.5" />
            <span>The Status Quo Crisis</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Cities repair infrastructure <br className="hidden sm:inline" />
            <span className="text-red-400">only after it fails.</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Roads, bridges, poles, drains, and sidewalks are inspected reactively — after a complaint, a breakdown, or an accident. By then, the cost is already human and financial.
          </p>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROBLEMS.map((problem, index) => {
            const IconComponent = problem.icon;
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="glass-panel glass-panel-hover rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden group border border-slate-800/80"
              >
                {/* Glowing subtle gradient background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-colors pointer-events-none" />

                <div className="space-y-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${problem.accentColor}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {problem.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {problem.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80">
                  <div className="text-2xl font-extrabold font-mono text-white group-hover:text-red-400 transition-colors">
                    {problem.stat}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 font-sans">
                    {problem.statLabel}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
