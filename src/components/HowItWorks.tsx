import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Scan, 
  Calculator, 
  Clock, 
  Layers, 
  FileCheck2, 
  Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

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
    title: 'Report',
    icon: FileCheck2,
    shortDesc: 'Automated Dispatch Order',
    fullDesc: 'A structured work-order PDF is routed directly to the ward engineer and repair crew dashboard with 1-click dispatch.',
    techTag: 'Municipal ERP API Bridge',
    accent: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
  },
];

export const HowItWorks: React.FC = () => {
  const { theme } = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className={`py-24 relative border-t transition-colors ${
      theme === 'dark' ? 'bg-[#0A0E14] border-slate-800/80 text-slate-100' : 'bg-slate-100 border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>End-to-End Intelligence Pipeline</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            How Invisible Infrastructure <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300">
              Predicts Disasters.
            </span>
          </h2>

          <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} text-base sm:text-lg`}>
            A 6-stage automated intelligence flow from raw smartphone photo capture to municipal work-order dispatch.
          </p>
        </div>

        {/* Interactive 6-Step Pipeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Step Selector List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {PIPELINE_STEPS.map((item, index) => {
              const IconComp = item.icon;
              const isSelected = activeStep === index;

              return (
                <button
                  key={item.step}
                  onClick={() => setActiveStep(index)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-950/20 scale-[1.02]'
                      : theme === 'dark'
                      ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 text-slate-300'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-9 h-9 rounded-lg border flex items-center justify-center font-mono font-bold text-xs ${item.accent}`}>
                      0{item.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-base tracking-tight">
                        {item.title}
                      </h4>
                      <p className="text-xs font-mono text-slate-400">
                        {item.shortDesc}
                      </p>
                    </div>
                  </div>

                  <IconComp className={`w-5 h-5 ${isSelected ? 'text-cyan-400 animate-pulse' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Active Step Deep Dive Card (7 cols) */}
          <div className="lg:col-span-7">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className={`glass-panel rounded-2xl p-8 border space-y-6 relative overflow-hidden min-h-[380px] flex flex-col justify-between ${
                theme === 'dark' ? 'border-cyan-500/40 bg-slate-900/90 shadow-2xl' : 'border-cyan-500/30 bg-white shadow-xl'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-bold uppercase">
                    STAGE 0{PIPELINE_STEPS[activeStep].step} OF 06
                  </span>
                  <span className="text-xs font-mono text-slate-400 border border-slate-700/60 px-2.5 py-0.5 rounded">
                    {PIPELINE_STEPS[activeStep].techTag}
                  </span>
                </div>

                <h3 className="text-3xl font-extrabold tracking-tight">
                  {PIPELINE_STEPS[activeStep].title}: {PIPELINE_STEPS[activeStep].shortDesc}
                </h3>

                <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} text-base leading-relaxed`}>
                  {PIPELINE_STEPS[activeStep].fullDesc}
                </p>
              </div>

              {/* Technical Indicator Footer */}
              <div className={`pt-6 border-t flex flex-wrap items-center justify-between gap-4 text-xs font-mono ${
                theme === 'dark' ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>Pipeline Latency: &lt; 250ms</span>
                </div>
                <div className="text-cyan-400 font-semibold">
                  CORTEXA PIPELINE ENGINE v3.8
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
