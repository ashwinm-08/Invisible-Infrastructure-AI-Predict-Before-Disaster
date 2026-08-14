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
    badge: 'COMMAND CENTER UI',
    tools: ['Real-Time GIS Web Canvas', 'Automated PDF Report Generator', 'Municipal Work-Order Sync'],
  },
];

export const Architecture: React.FC = () => {
  return (
    <section id="architecture" className="py-24 bg-[#0A0E14] relative border-t border-slate-800/60 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            <Server className="w-3.5 h-3.5" />
            <span>System Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Under the hood.
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            A modular 5-layer tech stack designed for low latency, high accuracy, and enterprise-grade municipal scalability.
          </p>
        </div>

        {/* Stacked Layer Cards Diagram */}
        <div className="max-w-4xl mx-auto space-y-4 relative">
          {LAYERS.map((layer, index) => {
            const LayerIcon = layer.icon;
            return (
              <React.Fragment key={layer.layerNumber}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`glass-panel rounded-2xl p-6 sm:p-8 bg-gradient-to-r ${layer.color} border shadow-lg relative group transition-all duration-300 hover:scale-[1.01]`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    
                    {/* Left Icon + Layer Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center text-white shrink-0 shadow-md">
                        <LayerIcon className="w-6 h-6" />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-slate-400">
                            LAYER 0{layer.layerNumber}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                            {layer.badge}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white tracking-tight">
                          {layer.title} <span className="text-slate-400 text-sm font-normal">— {layer.subtitle}</span>
                        </h3>

                        <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
                          {layer.description}
                        </p>
                      </div>
                    </div>

                    {/* Right Tech Tags */}
                    <div className="flex md:flex-col flex-wrap gap-2 justify-end shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                      {layer.tools.map((tool) => (
                        <span
                          key={tool}
                          className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-950/80 text-slate-300 border border-slate-800"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                  </div>
                </motion.div>

                {/* Downward Connector Arrow between layers */}
                {index < LAYERS.length - 1 && (
                  <div className="flex justify-center my-1">
                    <div className="w-7 h-7 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shadow-md">
                      <ArrowDown className="w-4 h-4 animate-bounce" />
                    </div>
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
