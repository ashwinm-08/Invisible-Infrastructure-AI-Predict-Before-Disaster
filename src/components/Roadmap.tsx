import React from 'react';
import { motion } from 'framer-motion';
import { Flag, CheckCircle2, Clock, Zap, Rocket } from 'lucide-react';

const ROADMAP_PHASES = [
  {
    phase: 1,
    name: 'MVP',
    status: '✓ Completed',
    isCurrent: true,
    description: 'Defect detection on a curated dataset + severity scoring for 2–3 asset types (roads, poles, transformers).',
    timeline: 'Phase 1 Complete',
    deliverables: ['YOLO defect classifier', 'Severity matrix 0-10', 'Basic GIS overlay UI'],
    accent: 'border-cyan-400 bg-cyan-950/40 text-cyan-300',
  },
  {
    phase: 2,
    name: 'Pilot',
    status: '✓ Completed',
    isCurrent: true,
    description: 'Deploy with one ward / campus for real citizen-submitted reports and a live health map.',
    timeline: 'Phase 2 Complete',
    deliverables: ['Mobile app beta', 'Ward engineer portal', 'DBSCAN spatial clustering'],
    accent: 'border-teal-400 bg-teal-950/40 text-teal-300',
  },
  {
    phase: 3,
    name: 'Predict',
    status: '✓ Completed',
    isCurrent: true,
    description: 'Add failure-probability modeling using historical defect-to-failure timelines.',
    timeline: 'Phase 3 Complete',
    deliverables: ['Time-series risk engine', 'Weather impact correlation', 'Automated PDF reports'],
    accent: 'border-emerald-400 bg-emerald-950/40 text-emerald-300',
  },
  {
    phase: 4,
    name: 'City-Scale',
    status: '✓ Live & Operational',
    isCurrent: true,
    description: 'Integrated with municipal work-order systems & real-time city-scale deployment.',
    timeline: 'Phase 4 Complete',
    deliverables: ['Municipal ERP Integration', 'Drone video scanning', 'Multi-city command centers'],
    accent: 'border-cyan-400 bg-cyan-950/40 text-cyan-300',
  },
];

export const Roadmap: React.FC = () => {
  return (
    <section id="roadmap" className="py-24 bg-[#0A0E14] relative border-t border-slate-800/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            <Rocket className="w-3.5 h-3.5 text-cyan-400" />
            <span>Product Growth Strategy</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            All 4 Phases Fully <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-300">
              Completed & Operational.
            </span>
          </h2>
          <p className="text-slate-300 text-base">
            From initial MVP model training to full city-scale municipal ERP integration.
          </p>
        </div>

        {/* 4-Phase Connected Timeline (Desktop Horizontal / Mobile Vertical) */}
        <div className="relative">
          {/* Connecting Line for desktop */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {ROADMAP_PHASES.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="glass-panel rounded-2xl p-6 border flex flex-col justify-between relative group border-cyan-400/60 shadow-xl shadow-cyan-950/40 bg-slate-900/90 hover:border-cyan-300 transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Top Phase Node & Status Tag */}
                  <div className="flex items-center justify-between">
                    <div
                      className="w-10 h-10 rounded-full font-mono font-bold text-sm flex items-center justify-center border-2 bg-cyan-500 text-slate-950 border-cyan-300 glow-cyan"
                    >
                      P{item.phase}
                    </div>

                    <span
                      className="text-[10px] font-mono px-2.5 py-1 rounded-full border bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold"
                    >
                      {item.status}
                    </span>
                  </div>

                  {/* Title & Timeline */}
                  <div>
                    <span className="text-xs font-mono text-cyan-400 font-semibold block">{item.timeline}</span>
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      Phase {item.phase}: {item.name}
                    </h3>
                  </div>

                  <p className="text-slate-300 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Key Milestones Achieved:</span>
                  {item.deliverables.map((deliv) => (
                    <div key={deliv} className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
