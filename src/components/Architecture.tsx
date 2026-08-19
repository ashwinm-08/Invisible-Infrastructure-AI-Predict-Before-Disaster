import React from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Cpu, 
  BrainCircuit, 
  Globe2, 
  LayoutDashboard, 
  ArrowDown,
  Server
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const LAYERS = [
  {
    layerNumber: 1,
    title: 'Capture Layer',
    subtitle: 'Mobile App / Web Upload',
    description: 'Geo-tagged photo & video ingestion from field workers and citizens with EXIF metadata parsing & quality validation.',
    icon: Smartphone,
    color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/40 text-cyan-400',
    badge: 'INGESTION ENGINE',
    tools: ['React Native Mobile App', 'Web Multi-Part Upload API', 'Geo-Tag EXIF Parser'],
  },
  {
    layerNumber: 2,
    title: 'Detection Layer',
    subtitle: 'CNN / Object Detection Model',
    description: 'YOLO-based computer vision model fine-tuned on specialized infrastructure defect datasets for real-time bounding box localization.',
    icon: Cpu,
    color: 'from-teal-500/20 to-emerald-500/10 border-teal-500/40 text-teal-300',
    badge: 'COMPUTER VISION',
    tools: ['PyTorch / ONNX Runtime', 'YOLOv11 Fine-Tuned Weights', 'TensorRT Edge Acceleration'],
  },
  {
    layerNumber: 3,
    title: 'Scoring & Prediction Layer',
    subtitle: 'Severity & Failure Probability Engine',
    description: 'Severity scoring + time-series/regression model estimating exact failure-probability windows based on defect dimensions & weather degradation.',
    icon: BrainCircuit,
    color: 'from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-400',
    badge: 'PREDICTIVE ML',
    tools: ['XGBoost Regression', 'Temporal Structural Degradation Engine', 'Risk Matrix Calculator'],
  },
  {
    layerNumber: 4,
    title: 'Geospatial Layer',
    subtitle: 'Spatial Clustering Engine',
    description: 'DBSCAN-style spatial clustering to group nearby reported defects into unified, high-efficiency municipal maintenance jobs.',
    icon: Globe2,
    color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/40 text-purple-300',
    badge: 'SPATIAL GIS',
    tools: ['PostGIS / Spatial Indexing', 'DBSCAN Radius Clustering', 'Route Optimization Engine'],
  },
  {
    layerNumber: 5,
    title: 'Reporting & Dashboard Layer',
    subtitle: 'Authority Command Portal',
    description: 'Auto-generated PDF authority maintenance reports + interactive real-time Infrastructure Health Map for municipal ward engineers.',
    icon: LayoutDashboard,
    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-400',
    badge: 'COMMAND CENTER',
    tools: ['Interactive Mapbox/Leaflet UI', 'PDF Dispatch Generator', 'Municipal ERP API Bridge'],
  },
];

export const Architecture: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <section id="architecture" className={`py-24 relative border-t transition-colors ${
      theme === 'dark' ? 'bg-[#0A0E14] border-slate-800/80 text-slate-100' : 'bg-slate-100 border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest font-semibold">
            <Server className="w-3.5 h-3.5" />
            <span>{t('arch_tag')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {t('arch_title1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300">
              {t('arch_title2')}
            </span>
          </h2>

          <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} text-base sm:text-lg`}>
            {t('arch_desc')}
          </p>
        </div>

        {/* Stacked 5-Layer Diagram */}
        <div className="max-w-4xl mx-auto space-y-6">
          {LAYERS.map((layer, index) => {
            const IconComp = layer.icon;
            return (
              <React.Fragment key={layer.layerNumber}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`glass-panel rounded-2xl p-6 sm:p-8 border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all group ${
                    theme === 'dark' ? 'border-slate-800 bg-slate-900/70 hover:border-cyan-500/40' : 'border-slate-200 bg-white hover:border-cyan-500/40 shadow-lg'
                  }`}
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${layer.color} border flex items-center justify-center shrink-0 shadow-lg`}>
                      <IconComp className="w-7 h-7" />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30">
                          LAYER 0{layer.layerNumber}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                          {layer.badge}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                        {layer.title} <span className={`text-sm font-normal ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>({layer.subtitle})</span>
                      </h3>

                      <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} text-xs sm:text-sm max-w-2xl leading-relaxed`}>
                        {layer.description}
                      </p>

                      <div className="pt-2 flex flex-wrap items-center gap-2">
                        {layer.tools.map((tool) => (
                          <span key={tool} className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                            theme === 'dark' ? 'bg-slate-950 text-slate-400 border-slate-800' : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}>
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {index < LAYERS.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ArrowDown className="w-5 h-5 text-cyan-400/60 animate-bounce" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </section>
  );
};
