import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  FileCheck2, 
  AlertTriangle, 
  CheckCircle2, 
  Scan, 
  Sparkles, 
  RefreshCw, 
  Image as ImageIcon,
  ShieldAlert,
  ArrowRight,
  MapPin,
  Cpu
} from 'lucide-react';

interface AnalysisResult {
  fileName: string;
  assetType: string;
  defectFound: string;
  severity: number;
  riskLevel: 'Critical' | 'High Risk' | 'Moderate' | 'Stable';
  timeToFailure: string;
  confidence: string;
  actionRequired: string;
  coordinates: { x: number; y: number };
  previewUrl: string | null;
}

const PRESET_SAMPLES = [
  {
    name: 'Road_Pothole_Sample.jpeg',
    type: 'Road Infrastructure',
    defect: 'Deep Asphalt Subsidence & Pothole',
    severity: 9.2,
    riskLevel: 'Critical' as const,
    timeToFailure: '5 Days',
    confidence: '98.5%',
    actionRequired: 'Emergency asphalt patching & road closure dispatch',
    coordinates: { x: 38, y: 48 },
    previewUrl: null,
  },
  {
    name: 'Transformer_Tilt_Sample.png',
    type: 'Electrical Asset',
    defect: 'Transformer Substation Base Tilt (16°)',
    severity: 8.8,
    riskLevel: 'Critical' as const,
    timeToFailure: '9 Days',
    confidence: '99.1%',
    actionRequired: 'Electrical grid stabilization team dispatch',
    coordinates: { x: 62, y: 30 },
    previewUrl: null,
  },
  {
    name: 'Bridge_MicroCrack_Sample.jpg',
    type: 'Bridge & Overpass',
    defect: 'Structural Concrete Shear Crack',
    severity: 7.5,
    riskLevel: 'High Risk' as const,
    timeToFailure: '21 Days',
    confidence: '96.4%',
    actionRequired: 'Structural engineering ultrasound inspection',
    coordinates: { x: 48, y: 70 },
    previewUrl: null,
  },
];

export const FileAnalyzer: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scanLogs = [
    'Parsing EXIF geospatial tags & image dimensions...',
    'Running YOLOv11 convolutional neural defect extractor...',
    'Evaluating physics-based crack depth & tilt vectors...',
    'Computing time-series temporal degradation risk...',
    'Generating municipal dispatch work order...',
  ];

  const handleFileUpload = (file: File) => {
    startAnalysis(file.name, URL.createObjectURL(file));
  };

  const startAnalysis = (fileName: string, previewUrl: string | null) => {
    setIsScanning(true);
    setScanStep(0);
    setAnalysisResult(null);

    // Simulate real-time scanner pipeline steps
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < scanLogs.length) {
        setScanStep(currentStep);
      } else {
        clearInterval(interval);
        setIsScanning(false);
        
        // Randomize realistic analysis if custom file or pick random preset
        const randomSeverity = Number((Math.random() * 4 + 6).toFixed(1));
        const isCrit = randomSeverity >= 8.5;

        setAnalysisResult({
          fileName: fileName,
          assetType: fileName.toLowerCase().includes('pole') ? 'Utility Pole' : fileName.toLowerCase().includes('bridge') ? 'Bridge Pier' : 'Road Infrastructure',
          defectFound: isCrit ? 'Structural Crack & Material Degradation' : 'High-Risk Surface Displacement',
          severity: randomSeverity,
          riskLevel: isCrit ? 'Critical' : 'High Risk',
          timeToFailure: isCrit ? `${Math.floor(Math.random() * 7 + 3)} Days` : `${Math.floor(Math.random() * 20 + 10)} Days`,
          confidence: `${(Math.random() * 3 + 96).toFixed(1)}%`,
          actionRequired: isCrit ? 'Priority Emergency Repair Dispatch' : 'Scheduled Maintenance Order within 14 Days',
          coordinates: { x: Math.floor(Math.random() * 60 + 20), y: Math.floor(Math.random() * 60 + 20) },
          previewUrl: previewUrl,
        });
      }
    }, 600);
  };

  const handlePresetSelect = (preset: typeof PRESET_SAMPLES[0]) => {
    setIsScanning(true);
    setScanStep(0);
    setAnalysisResult(null);

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < scanLogs.length) {
        setScanStep(currentStep);
      } else {
        clearInterval(interval);
        setIsScanning(false);
        setAnalysisResult({
          fileName: preset.name,
          assetType: preset.type,
          defectFound: preset.defect,
          severity: preset.severity,
          riskLevel: preset.riskLevel,
          timeToFailure: preset.timeToFailure,
          confidence: preset.confidence,
          actionRequired: preset.actionRequired,
          coordinates: preset.coordinates,
          previewUrl: null,
        });
      }
    }, 500);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <section id="ai-scanner" className="py-24 bg-[#0D1117] relative border-t border-slate-800/80">
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>Interactive AI File Inspection</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Upload an asset photo. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300">
              AI determines what it does.
            </span>
          </h2>

          <p className="text-slate-300 text-base">
            Upload any image or video of a road, bridge, pole, or transformer to run real-time defect extraction, risk severity scoring, and failure lead-time prediction.
          </p>
        </div>

        {/* Scanner Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left File Upload & Scan Drag-and-Drop Area (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`glass-panel rounded-2xl p-8 sm:p-12 border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer relative overflow-hidden group ${
                dragActive
                  ? 'border-cyan-400 bg-cyan-500/10 scale-[1.01]'
                  : 'border-slate-800 hover:border-cyan-500/40 bg-slate-950/80'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />

              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-950/30">
                <Upload className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight">
                Drop your infrastructure asset photo here
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                Supports JPG, PNG, MP4. AI will extract defect boundaries, severity ratings, and predicted failure windows.
              </p>

              <button className="mt-6 px-5 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-semibold transition-all">
                Browse Files
              </button>
            </div>

            {/* Quick Demo Presets */}
            <div className="glass-panel rounded-xl p-4 border border-slate-800 bg-slate-900/60">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                Or test with sample field inspection files:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {PRESET_SAMPLES.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => handlePresetSelect(preset)}
                    className="p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="text-xs font-bold text-white truncate group-hover:text-cyan-300">{preset.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block font-mono mt-0.5">{preset.type}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Real-Time AI Scanning / Inspection Results Panel (5 cols) */}
          <div className="lg:col-span-5 glass-panel rounded-2xl border border-slate-800 p-6 space-y-6 bg-slate-900/90 relative overflow-hidden min-h-[380px] flex flex-col justify-between">
            
            {/* Active Scanning Animation State */}
            {isScanning && (
              <div className="my-auto space-y-6 text-center py-8">
                <div className="relative w-20 h-20 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 animate-ping" />
                  <div className="w-20 h-20 rounded-full bg-cyan-500/10 border-2 border-cyan-400 flex items-center justify-center text-cyan-300">
                    <Scan className="w-10 h-10 animate-spin" />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold uppercase">
                    CORTEXA-VISION INFERENCE
                  </span>
                  <h4 className="text-lg font-bold text-white tracking-tight">
                    Analyzing Asset Structural Integrity...
                  </h4>
                  <p className="text-xs font-mono text-cyan-400 animate-pulse">
                    {scanLogs[scanStep]}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-teal-300 transition-all duration-300"
                    style={{ width: `${((scanStep + 1) / scanLogs.length) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Analysis Results Display State */}
            {!isScanning && analysisResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-5"
              >
                {/* Result HUD Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-mono text-cyan-400 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      AI DIAGNOSTIC COMPLETE
                    </span>
                    <span className="text-slate-400 text-xs font-mono block mt-0.5">{analysisResult.fileName}</span>
                  </div>

                  <span className={`text-xs font-mono px-2.5 py-1 rounded-full border ${
                    analysisResult.riskLevel === 'Critical'
                      ? 'bg-red-500/20 text-red-400 border-red-500/40 font-bold'
                      : 'bg-amber-500/20 text-amber-400 border-amber-500/40 font-bold'
                  }`}>
                    {analysisResult.riskLevel}
                  </span>
                </div>

                {/* Defect Details */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">DETECTED DEFECT</span>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {analysisResult.defectFound}
                  </h3>
                  <p className="text-xs font-mono text-cyan-300">
                    Asset Class: {analysisResult.assetType}
                  </p>
                </div>

                {/* Stat Grid */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-500 block">SEVERITY SCORE</span>
                    <span className="text-2xl font-mono font-extrabold text-white">{analysisResult.severity} / 10</span>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-500 block">PREDICTED BREAKDOWN</span>
                    <span className="text-2xl font-mono font-extrabold text-red-400">{analysisResult.timeToFailure}</span>
                  </div>
                </div>

                {/* AI Action Determination */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-amber-400 font-semibold block flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    RECOMMENDED MUNICIPAL ACTION
                  </span>
                  <p className="text-xs text-slate-200 font-medium leading-relaxed">
                    {analysisResult.actionRequired}
                  </p>
                </div>

                {/* Interactive Action CTA */}
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <button
                    onClick={() => {
                      alert(`Defect logged! Added ${analysisResult.defectFound} to Infrastructure Health Map with Severity ${analysisResult.severity}.`);
                    }}
                    className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Pin to Infrastructure Health Map</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Idle State before any upload */}
            {!isScanning && !analysisResult && (
              <div className="my-auto text-center py-12 text-slate-500 space-y-3">
                <FileCheck2 className="w-12 h-12 mx-auto text-slate-600" />
                <p className="text-xs font-mono">
                  Upload an image or pick a sample file to trigger instant AI structural diagnosis.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
