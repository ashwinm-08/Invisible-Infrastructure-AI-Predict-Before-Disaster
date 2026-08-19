import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  ShieldCheck, 
  Coins, 
  Users,
  CheckCircle 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const IMPACTS = [
  {
    icon: Building2,
    title: 'Municipal Corporations',
    description: 'A single prioritized queue instead of scattered complaints — budget goes to the riskiest assets first.',
    accent: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    highlight: '100% Data-Driven Prioritization',
  },
  {
    icon: ShieldCheck,
    title: 'Public Safety',
    description: 'Tilted poles, leaking pipelines & broken sidewalks caught weeks before they cause accidents.',
    accent: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    highlight: 'Zero Preventable Accidents',
  },
  {
    icon: Coins,
    title: 'Lower Repair Costs',
    description: 'Preventive fixes cost a fraction of emergency repairs and disaster-response cleanup.',
    accent: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    highlight: 'Up to 65% Cost Savings',
  },
  {
    icon: Users,
    title: 'Citizen-Powered',
    description: 'Anyone with a phone becomes a sensor — no dedicated inspection fleet required to get started.',
    accent: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    highlight: 'Crowdsourced Civic Safety',
  },
];

export const Impact: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section id="impact" className={`py-24 relative border-t transition-colors ${
      theme === 'dark' ? 'bg-[#0D1117] border-slate-800/80 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest font-semibold">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Why This Matters</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Transforming urban safety <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
              at every level.
            </span>
          </h2>
        </div>

        {/* 4-Card Impact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {IMPACTS.map((item, index) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className={`glass-panel glass-panel-hover rounded-2xl p-8 border flex flex-col justify-between transition-all group ${
                  theme === 'dark' ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white shadow-lg'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${item.accent}`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 font-semibold">
                      {item.highlight}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight">
                    {item.title}
                  </h3>

                  <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} text-base leading-relaxed`}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
