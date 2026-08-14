import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Scan, 
  Calculator, 
  Clock, 
  Layers, 
  FileCheck2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

const PIPELINE_STEPS = [
  {
    step: 1,
    title: 'Capture',
    icon: Camera,
    shortDesc: 'Photo / Video Ingestion',
    fullDesc: 'Photo or video of a road, pole, drain, or pipeline submitted via citizen mobile app or municipal field inspection team.',
    techTag: 'Mobile Ingestion & Geo-Exif',
    accent: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10',
  },
  {
    step: 2,
    title: 'Detect',
    icon: Scan,
    shortDesc: 'CV Object Detection',
    fullDesc: 'Custom computer vision model flags potholes, structural cracks, pole tilt angles, pipeline leaks & damaged transformer units.',
    techTag: 'YOLOv11 Fine-Tuned Model',
    accent: 'text-teal-400 border-teal-500/40 bg-teal-500/10',
  },
  {
    step: 3,
    title: 'Score',
    icon: Calculator,
    shortDesc: 'Severity Matrix Calculation',
    fullDesc: 'Severity score (0.0 – 10.0) computed per defect from bounding volume size, asset criticality, and spatial density.',
    techTag: 'Physics Risk Engine',
    accent: 'text-amber-400 border-amber-500/40 bg-amber-500/10',
  },
  {
    step: 4,
    title: 'Predict',
    icon: Clock,
    shortDesc: 'Failure Window Estimation',
    fullDesc: 'Time-series regression model estimates a precise weeks-to-months risk window before asset suffers catastrophic breakdown.',
    techTag: 'Temporal Degradation Model',
    accent: 'text-orange-400 border-orange-500/40 bg-orange-500/10',
  },
  {
    step: 5,
    title: 'Cluster',
    icon: Layers,
    shortDesc: 'DBSCAN Spatial Grouping',
    fullDesc: 'Nearby issues are automatically clustered into a single optimized maintenance job to eliminate duplicate dispatches.',
    techTag: 'DBSCAN Spatial Clustering',
    accent: 'text-purple-400 border-purple-500/40 bg-purple-500/10',
  },
  {
    step: 6,
    title: 'Report & Map',
    icon: FileCheck2,
    shortDesc: 'Work Order & GIS Sync',
    fullDesc: 'Auto-generated PDF/API maintenance reports dispatched directly to local ward engineers & live Infrastructure Health Map.',
    techTag: 'Automated Dispatch API',
    accent: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
  },
];

export const HowItWorks: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState(0);

  return (
    <section id="how-it-works" className="py-24 bg-[#0A0E14] relative border-t border-slate-800/60 overflow-hidden">
      {/* Circuit background glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>End-to-End Intelligence Pipeline</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            From a photo to a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300">
              city-wide action plan.
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            Six automated stages process raw smartphone imagery into actionable, prioritized municipal repair dispatches.
          </p>
        </div>

        {/* 6-Node Flow Pipeline (Desktop Horizontal / Mobile Vertical Stack) */}
        <div className="relative mb-12">
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-[52px] left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-cyan-500/20 via-cyan-400/60 to-emerald-500/20 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 relative z-10">
            {PIPELINE_STEPS.map((stepItem, index) => {
              const IconComp = stepItem.icon;
              const isSelected = selectedStep === index;

              return (
                <motion.div
                  key={stepItem.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedStep(index)}
                  className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-400 shadow-xl shadow-cyan-950/50 scale-[1.03]'
                      : 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${stepItem.accent}`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-500">
                        0{stepItem.step}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {stepItem.title}
                    </h3>

                    <p className="text-xs text-slate-400 font-mono leading-snug">
                      {stepItem.shortDesc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-cyan-400">
                    <span>Explore Stage</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1' : ''}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Selected Step Detailed Inspection Panel */}
        <motion.div
          key={selectedStep}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/30 bg-slate-900/80 shadow-2xl relative overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
                  PIPELINE STAGE 0{PIPELINE_STEPS[selectedStep].step}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Engine Architecture Spec
                </span>
              </div>

              <h4 className="text-2xl font-bold text-white tracking-tight">
                {PIPELINE_STEPS[selectedStep].title}: {PIPELINE_STEPS[selectedStep].shortDesc}
              </h4>

              <p className="text-slate-300 text-sm leading-relaxed">
                {PIPELINE_STEPS[selectedStep].fullDesc}
              </p>
            </div>

            <div className="md:col-span-4 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                CORE MODULE TECH
              </div>
              <div className="text-cyan-300 font-mono text-sm font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                {PIPELINE_STEPS[selectedStep].techTag}
              </div>
              <p className="text-xs text-slate-400 pt-1">
                Optimized for low-latency batch processing & mobile field edge devices.
              </p>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
