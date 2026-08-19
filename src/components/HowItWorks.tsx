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
import { useLanguage } from '../context/LanguageContext';

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
    shortDesc: 'Automated Municipal Work Order',
    fullDesc: 'System routes auto-generated PDF work orders to ward engineers with exact GPS, severity ranking, and recommended repairs.',
    techTag: 'Municipal ERP API',
    accent: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
  },
];

export const HowItWorks: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState<number>(1);

  const activeStepData = PIPELINE_STEPS.find((s) => s.step === activeStep) || PIPELINE_STEPS[0];
  const IconComponent = activeStepData.icon;

  return (
    <section id="how-it-works" className={`py-24 relative border-t transition-colors ${
      theme === 'dark' ? 'bg-[#0A0E14] border-slate-800/80 text-slate-100' : 'bg-slate-100 border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>6-STAGE AI PIPELINE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            How Invisible Infrastructure <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300">
              Predicts Structural Failures.
            </span>
          </h2>

          <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} text-base sm:text-lg`}>
            A end-to-end computer vision and predictive ML pipeline converting raw photos into preventive municipal repair orders.
          </p>
        </div>

        {/* Pipeline Stepper Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PIPELINE_STEPS.map((step) => {
            const StepIcon = step.icon;
            const isActive = activeStep === step.step;
            return (
              <button
                key={step.step}
                onClick={() => setActiveStep(step.step)}
                className={`p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[110px] ${
                  isActive
                    ? 'border-cyan-400 bg-cyan-500/15 shadow-lg shadow-cyan-950/40 scale-[1.02]'
                    : theme === 'dark'
                    ? 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-cyan-400' : 'text-slate-400'}`}>
                    0{step.step}
                  </span>
                  <StepIcon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                </div>

                <div>
                  <h4 className={`text-sm font-bold tracking-tight ${isActive ? 'text-white' : theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                    {step.title}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400 block truncate mt-0.5">
                    {step.shortDesc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Showcase Card */}
        <motion.div
          key={activeStepData.step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`glass-panel rounded-2xl p-8 border grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
            theme === 'dark' ? 'border-cyan-500/30 bg-slate-900/90 glow-cyan' : 'border-cyan-500/30 bg-white shadow-xl'
          }`}
        >
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-bold">
                STAGE 0{activeStepData.step} OF 06
              </span>
              <span className="text-xs font-mono text-cyan-400 font-semibold">{activeStepData.techTag}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {activeStepData.title}: {activeStepData.shortDesc}
            </h3>

            <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} text-base leading-relaxed`}>
              {activeStepData.fullDesc}
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className={`w-32 h-32 sm:w-40 sm:h-40 rounded-3xl border flex items-center justify-center ${activeStepData.accent} shadow-2xl`}>
              <IconComponent className="w-16 h-16 sm:w-20 sm:h-20 animate-pulse" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
