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
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

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
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <section id="features" className={`py-24 relative border-t transition-colors ${
      theme === 'dark' ? 'bg-[#0D1117] border-slate-800/80 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>{t('feat_tag')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {t('feat_title1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300">
              {t('feat_title2')}
            </span>
          </h2>

          <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} text-base sm:text-lg`}>
            {t('feat_desc')}
          </p>
        </div>

        {/* 6-Card Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`glass-panel glass-panel-hover rounded-2xl p-8 border flex flex-col justify-between transition-all group ${
                  theme === 'dark' ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white shadow-lg'
                }`}
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${feature.accent}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold tracking-tight">
                    {feature.title}
                  </h3>

                  <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} text-sm leading-relaxed`}>
                    {feature.description}
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
