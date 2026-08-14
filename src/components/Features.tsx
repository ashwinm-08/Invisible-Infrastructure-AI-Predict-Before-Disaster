import React from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Gauge, 
  Hourglass, 
  Network, 
  FileText, 
  Map, 
  Zap 
} from 'lucide-react';

const FEATURES = [
  {
    icon: Eye,
    title: 'Automatic Defect Detection',
    description: 'Identifies potholes, cracks, tilted poles, broken sidewalks, leaking pipelines & damaged transformers directly from images/video.',
    accent: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
  },
  {
    icon: Gauge,
    title: 'Severity Scoring',
    description: 'Each defect is scored on risk and urgency — not all cracks are equal.',
    accent: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  },
  {
    icon: Hourglass,
    title: 'Failure Prediction',
    description: 'Estimates the probability an asset fails within the next few weeks or months.',
    accent: 'text-red-400 border-red-500/30 bg-red-500/10',
  },
  {
    icon: Network,
    title: 'Geo-Clustering',
    description: 'Groups nearby issues into a single actionable maintenance job, avoiding duplicate dispatches.',
    accent: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
  },
  {
    icon: FileText,
    title: 'Auto-Generated Reports',
    description: 'Ready-to-act maintenance reports routed to the right local authority.',
    accent: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  },
  {
    icon: Map,
    title: 'City Health Map',
    description: 'A live, color-coded Infrastructure Health Map for the whole city at a glance.',
    accent: 'text-teal-400 border-teal-500/30 bg-teal-500/10',
  },
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-[#0D1117] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            <Zap className="w-3.5 h-3.5" />
            <span>Platform Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Built for scale, precision, and <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
              municipal action.
            </span>
          </h2>
        </div>

        {/* 6-Card Grid (3x2 Desktop, 1-col Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel glass-panel-hover rounded-2xl p-8 flex flex-col justify-between relative group border border-slate-800"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${feature.accent}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                  <span>FEATURE 0{index + 1}</span>
                  <span className="text-cyan-400/80 group-hover:text-cyan-300 transition-colors">Active Module</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
