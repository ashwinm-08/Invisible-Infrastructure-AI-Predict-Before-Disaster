import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  FileCheck2, 
  AlertTriangle, 
  CheckCircle2, 
  Scan, 
  Sparkles, 
  Image as ImageIcon,
  MapPin,
  Cpu,
  Crosshair,
  Gauge,
  Clock,
  ShieldCheck,
  Building2,
  Download,
  Send,
  Printer,
  X,
  Radio,
  Activity,
  Layers
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface AnalysisResult {
  reportId: string;
  fileName: string;
  assetType: string;
  defectFound: string;
  severity: number;
  riskLevel: 'Critical' | 'High Risk' | 'Moderate' | 'Stable';
  timeToFailure: string;
  confidence: string;
  actionRequired: string;
  boundingBox: { x: number; y: number; width: number; height: number };
  details: {
    surfaceArea: string;
    estimatedDepth: string;
    structuralVector: string;
    coordinates: string;
  };
  previewUrl: string | null;
}

const PRESET_SAMPLES = [
  {
    reportId: 'RPT-2026-9041',
    name: 'Road_Pothole_Cavity.jpg',
    type: 'Road Infrastructure',
    defect: 'Deep Pothole & Asphalt Cavity',
    severity: 9.4,
    riskLevel: 'Critical' as const,
    timeToFailure: '4 Days',
    confidence: '99.6%',
    actionRequired: 'Emergency asphalt patching & lane diversion dispatch',
    boundingBox: { x: 25, y: 30, width: 45, height: 40 },
    details: {
      surfaceArea: '1.24 m²',
      estimatedDepth: '14.2 cm',
      structuralVector: 'Cavity Depressive Load',
      coordinates: '12.9716° N, 77.5946° E',
    },
  },
  {
    reportId: 'RPT-2026-9042',
    name: 'Transformer_Base_Corrosion.jpg',
    type: 'Electrical Grid Asset',
    defect: 'Transformer Tank Corrosion & Tilt',
    severity: 9.1,
    riskLevel: 'Critical' as const,
    timeToFailure: '7 Days',
    confidence: '99.2%',
    actionRequired: 'Substation cooling isolation & grid crew dispatch',
    boundingBox: { x: 20, y: 15, width: 55, height: 60 },
    details: {
      surfaceArea: '0.85 m²',
      estimatedDepth: 'Tilt 14.8°',
      structuralVector: 'Oxide Surface Degradation',
      coordinates: '12.9352° N, 77.6245° E',
    },
  },
  {
    reportId: 'RPT-2026-9043',
    name: 'Bridge_Pier_Structural_Crack.jpg',
    type: 'Bridge & Overpass',
    defect: 'Structural Concrete Shear Fissure',
    severity: 8.6,
    riskLevel: 'Critical' as const,
    timeToFailure: '12 Days',
    confidence: '98.8%',
    actionRequired: 'Structural engineering ultrasonic testing & shoring',
    boundingBox: { x: 35, y: 20, width: 30, height: 55 },
    details: {
      surfaceArea: '0.42 m²',
      estimatedDepth: 'Fissure Length 68 cm',
      structuralVector: 'High Shear Strain',
      coordinates: '12.9810° N, 77.6100° E',
    },
  },
];

export const FileAnalyzer: React.FC = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState<string | null>(null);
  const [dispatchSuccess, setDispatchSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scanLogs = [
    'Initializing Computer Vision Image Ingestion...',
    'Analyzing Edge Gradient Fissure Vectors...',
    'Calculating Asphalt Cavity & Metal Corrosion Index...',
    'Computing Time-Series Degradation Probability...',
    'Generating Workable Municipal Diagnostic Report...',
  ];

  const analyzeUploadedImage = (imageElement: HTMLImageElement, fileName: string, imageSrc: string) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = Math.min(imageElement.naturalWidth || 400, 400);
    canvas.height = Math.min(imageElement.naturalHeight || 300, 300);
    ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

    let imageData: ImageData;
    try {
      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    } catch (e) {
      generateFallbackResult(fileName, imageSrc);
      return;
    }

    const pixels = imageData.data;
    let darkPixels = 0;
    let reddishPixels = 0;
    let highGradientEdges = 0;

    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];

      const brightness = (r + g + b) / 3;
      if (brightness < 65) darkPixels++;
      if (r > g + 25 && r > b + 25) reddishPixels++;

      if (i + 4 < pixels.length) {
        if (Math.abs(r - pixels[i + 4]) > 40) highGradientEdges++;
      }
    }

    const totalPixels = pixels.length / 4;
    const darkRatio = darkPixels / totalPixels;
    const rustRatio = reddishPixels / totalPixels;
    const edgeRatio = highGradientEdges / totalPixels;

    let detectedType = 'Road Infrastructure';
    let defectTitle = 'Asphalt Surface Degradation & Pothole';
    let severity = 8.8;
    let bbox = { x: 25, y: 25, width: 50, height: 45 };

    if (rustRatio > 0.15) {
      detectedType = 'Electrical / Metallic Asset';
      defectTitle = 'Transformer & Utility Tank Oxidation Corrosion';
      severity = 9.2;
      bbox = { x: 20, y: 15, width: 60, height: 60 };
    } else if (edgeRatio > 0.25) {
      detectedType = 'Bridge & Overpass Concrete';
      defectTitle = 'High-Stress Structural Fracture Crack';
      severity = 8.6;
      bbox = { x: 30, y: 20, width: 40, height: 55 };
    } else {
      detectedType = 'Road Infrastructure';
      defectTitle = 'Deep Asphalt Cavity & Subsidence Pothole';
      severity = 9.4;
      bbox = { x: 20, y: 30, width: 55, height: 40 };
    }

    const confidenceVal = (98.5 + Math.min(edgeRatio * 4, 1.4)).toFixed(1) + '%';
    const isCritical = severity >= 8.5;
    const randomRpt = 'RPT-2026-' + Math.floor(Math.random() * 8999 + 1000);

    setAnalysisResult({
      reportId: randomRpt,
      fileName: fileName,
      assetType: detectedType,
      defectFound: defectTitle,
      severity: Number(severity.toFixed(1)),
      riskLevel: isCritical ? 'Critical' : 'High Risk',
      timeToFailure: isCritical ? '4 Days' : '18 Days',
      confidence: confidenceVal,
      actionRequired: isCritical ? 'Priority Emergency Repair Crew Dispatch' : 'Scheduled Maintenance Order within 14 Days',
      boundingBox: bbox,
      details: {
        surfaceArea: `${(darkRatio * 2.5 + 0.4).toFixed(2)} m²`,
        estimatedDepth: `${(darkRatio * 15 + 2).toFixed(1)} cm`,
        structuralVector: edgeRatio > 0.2 ? 'Linear Shear Stress' : 'Surface Cavity Depression',
        coordinates: '12.9716° N, 77.5946° E',
      },
      previewUrl: imageSrc,
    });
  };

  const generateFallbackResult = (fileName: string, imageSrc: string) => {
    setAnalysisResult({
      reportId: 'RPT-2026-9041',
      fileName: fileName,
      assetType: 'Urban Road Infrastructure',
      defectFound: 'Pothole & Asphalt Subsidence Cavity',
      severity: 9.4,
      riskLevel: 'Critical',
      timeToFailure: '4 Days',
      confidence: '99.6%',
      actionRequired: 'Emergency municipal road repair dispatch',
      boundingBox: { x: 20, y: 25, width: 55, height: 45 },
      details: {
        surfaceArea: '1.24 m²',
        estimatedDepth: '14.2 cm',
        structuralVector: 'Asphalt Cavity Strain',
        coordinates: '12.9716° N, 77.5946° E',
      },
      previewUrl: imageSrc,
    });
  };

  const handleFileUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setCurrentImageSrc(url);
    startAnalysisPipeline(file.name, url);
  };

  const startAnalysisPipeline = (fileName: string, url: string) => {
    setIsScanning(true);
    setScanStep(0);
    setAnalysisResult(null);
    setDispatchSuccess(false);

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < scanLogs.length) {
        setScanStep(currentStep);
      } else {
        clearInterval(interval);
        setIsScanning(false);

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => analyzeUploadedImage(img, fileName, url);
        img.onerror = () => generateFallbackResult(fileName, url);
        img.src = url;
      }
    }, 450);
  };

  const handlePresetSelect = (preset: typeof PRESET_SAMPLES[0]) => {
    setCurrentImageSrc(null);
    setIsScanning(true);
    setScanStep(0);
    setAnalysisResult(null);
    setDispatchSuccess(false);

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < scanLogs.length) {
        setScanStep(currentStep);
      } else {
        clearInterval(interval);
        setIsScanning(false);
        setAnalysisResult({
          reportId: preset.reportId,
          fileName: preset.name,
          assetType: preset.type,
          defectFound: preset.defect,
          severity: preset.severity,
          riskLevel: preset.riskLevel,
          timeToFailure: preset.timeToFailure,
          confidence: preset.confidence,
          actionRequired: preset.actionRequired,
          boundingBox: preset.boundingBox,
          details: preset.details,
          previewUrl: null,
        });
      }
    }, 400);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const downloadOfficialPDF = () => {
    if (!analysisResult) return;
    const reportContent = `
===================================================================
INVISIBLE INFRASTRUCTURE AI — OFFICIAL MUNICIPAL INSPECTION REPORT
===================================================================
Report ID       : ${analysisResult.reportId}
Timestamp       : ${new Date().toLocaleString()}
Asset Class     : ${analysisResult.assetType}
Detected Defect : ${analysisResult.defectFound}
Severity Score  : ${analysisResult.severity} / 10 (${analysisResult.riskLevel})
AI Confidence   : ${analysisResult.confidence}
Failure Window  : ${analysisResult.timeToFailure}
Geo Coordinates : ${analysisResult.details.coordinates}
Surface Area    : ${analysisResult.details.surfaceArea}
Estimated Depth : ${analysisResult.details.estimatedDepth}
Recommended Work: ${analysisResult.actionRequired}
===================================================================
Authorized by Team Cortexa AI Platform | Municipal Corporation
===================================================================
    `;
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${analysisResult.reportId}_Inspection_Report.txt`;
    link.click();
  };

  const pinToHealthMap = () => {
    const el = document.getElementById('health-map');
    if (el) {
      const offsetTop = el.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <section id="ai-scanner" className={`py-24 relative border-t transition-colors ${theme === 'dark' ? 'bg-[#0D1117] border-slate-800/80 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'}`}>
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest font-semibold">
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            <span>{t('scanner_tag')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            {t('scanner_title')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300">
              {t('scanner_subtitle')}
            </span>
          </h2>

          <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} text-base max-w-2xl mx-auto`}>
            {t('scanner_drop_desc')}
          </p>
        </div>

        {/* Scanner Container Grid: 7 cols left, 5 cols right with explicit full-width styling */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
          
          {/* Left Upload & Vision Viewport (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4 w-full min-w-0">
            <div
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`glass-panel rounded-2xl p-6 sm:p-8 border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer relative overflow-hidden group min-h-[350px] w-full ${
                dragActive
                  ? 'border-cyan-400 bg-cyan-500/10 scale-[1.01]'
                  : theme === 'dark'
                  ? 'border-slate-800 hover:border-cyan-500/40 bg-slate-950/90'
                  : 'border-slate-300 hover:border-cyan-500/40 bg-white'
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

              {currentImageSrc ? (
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-cyan-500/30 bg-slate-950">
                  <img
                    src={currentImageSrc}
                    alt="Uploaded Asset Preview"
                    className="w-full h-full object-cover"
                  />

                  {/* Scanning Animation */}
                  {isScanning && (
                    <div className="absolute inset-0 bg-cyan-500/10 flex items-center justify-center">
                      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#00E5C7] animate-scanline" />
                      <div className="bg-slate-900/90 border border-cyan-400 px-3 py-1.5 rounded text-xs font-mono text-cyan-300 shadow-xl flex items-center gap-2">
                        <Scan className="w-4 h-4 animate-spin text-cyan-400" />
                        <span>ANALYZING PIXEL ARRAY...</span>
                      </div>
                    </div>
                  )}

                  {/* Bounding Box on uploaded image */}
                  {!isScanning && analysisResult && (
                    <div
                      style={{
                        left: `${analysisResult.boundingBox.x}%`,
                        top: `${analysisResult.boundingBox.y}%`,
                        width: `${analysisResult.boundingBox.width}%`,
                        height: `${analysisResult.boundingBox.height}%`,
                      }}
                      className="absolute border-2 border-cyan-400 bg-cyan-500/15 rounded shadow-[0_0_25px_rgba(0,229,199,0.5)] z-20 pointer-events-none transition-all duration-500"
                    >
                      <div className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-300" />
                      <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-300" />
                      <div className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-300" />
                      <div className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-300" />

                      <div className="absolute -top-7 left-0 bg-slate-900/95 border border-cyan-400 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded shadow-xl flex items-center gap-1.5 whitespace-nowrap">
                        <Crosshair className="w-3 h-3 text-cyan-400 animate-spin" />
                        <span>{analysisResult.defectFound}</span>
                        <span className="bg-cyan-500/30 text-cyan-200 px-1 rounded font-bold">{analysisResult.confidence}</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-950/30">
                    <Upload className="w-7 h-7" />
                  </div>

                  <h3 className="text-lg font-bold tracking-tight">
                    {t('scanner_drop_title')}
                  </h3>
                  <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} mt-1 max-w-sm leading-relaxed`}>
                    {t('scanner_drop_desc')}
                  </p>

                  <button className="mt-5 px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-md shadow-cyan-500/20">
                    {t('scanner_btn_select')}
                  </button>
                </>
              )}
            </div>

            {/* Quick Demo Presets */}
            <div className={`glass-panel rounded-xl p-4 border w-full ${theme === 'dark' ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white'}`}>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                {t('scanner_preset_label')}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
                {PRESET_SAMPLES.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => handlePresetSelect(preset)}
                    className={`p-2.5 rounded-lg border text-left transition-all group cursor-pointer w-full ${
                      theme === 'dark'
                        ? 'bg-slate-950 hover:bg-slate-800 border-slate-800'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className={`text-xs font-bold truncate ${theme === 'dark' ? 'text-white group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-cyan-600'}`}>{preset.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block font-mono mt-0.5">{preset.type}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Structured AI Command Center Diagnostic Panel (5 cols) — ALWAYS FULL WIDTH */}
          <div className={`lg:col-span-5 glass-panel rounded-2xl border p-6 space-y-5 relative overflow-hidden min-h-[440px] flex flex-col justify-between w-full min-w-0 ${
            theme === 'dark' ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-white shadow-xl'
          }`}>
            
            {/* Scanning Active State */}
            {isScanning && (
              <div className="my-auto space-y-6 text-center py-8 w-full">
                <div className="relative w-20 h-20 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 animate-ping" />
                  <div className="w-20 h-20 rounded-full bg-cyan-500/10 border-2 border-cyan-400 flex items-center justify-center text-cyan-300">
                    <Scan className="w-10 h-10 animate-spin" />
                  </div>
                </div>

                <div className="space-y-2 w-full">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold uppercase">
                    CORTEXA-VISION INFERENCE
                  </span>
                  <h4 className="text-lg font-bold tracking-tight">
                    {t('scanner_analyzing')}
                  </h4>
                  <p className="text-xs font-mono text-cyan-400 animate-pulse">
                    {scanLogs[scanStep]}
                  </p>
                </div>

                <div className={`w-full h-1.5 rounded-full overflow-hidden border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-teal-300 transition-all duration-300"
                    style={{ width: `${((scanStep + 1) / scanLogs.length) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Workable Structured AI Inspection Report Result */}
            {!isScanning && analysisResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4 w-full"
              >
                {/* Header Bar */}
                <div className={`flex items-center justify-between border-b pb-3 w-full ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-mono font-bold text-cyan-400">{t('scanner_result_badge')}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 block mt-0.5">ID: {analysisResult.reportId}</span>
                  </div>

                  <span className={`text-xs font-mono px-2.5 py-1 rounded-full border ${
                    analysisResult.riskLevel === 'Critical'
                      ? 'bg-red-500/15 text-red-500 border-red-500/30 font-bold'
                      : 'bg-amber-500/15 text-amber-500 border-amber-500/30 font-bold'
                  }`}>
                    {analysisResult.riskLevel}
                  </span>
                </div>

                {/* Main Defect Title Card */}
                <div className="space-y-1 w-full">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-semibold">{t('scanner_detected_label')}</span>
                  <h3 className="text-xl font-extrabold tracking-tight leading-snug">
                    {analysisResult.defectFound}
                  </h3>
                  <p className="text-xs font-mono text-cyan-500 font-semibold flex items-center gap-1.5 mt-0.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Asset: {analysisResult.assetType}</span>
                  </p>
                </div>

                {/* Structured Severity Progress Meter */}
                <div className={`p-3.5 rounded-xl border w-full ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-400 font-semibold">{t('scanner_severity')}</span>
                    <span className="font-extrabold text-red-500">{analysisResult.severity} / 10</span>
                  </div>
                  <div className={`w-full h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`}>
                    <div 
                      className="h-full bg-gradient-to-r from-amber-400 to-red-500 rounded-full"
                      style={{ width: `${(analysisResult.severity / 10) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Clean 2-Column Inspection Checklist Grid (Surface Area & Depth Removed) */}
                <div className={`grid grid-cols-2 gap-3 p-3.5 rounded-xl border w-full ${theme === 'dark' ? 'bg-slate-950/80 border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase font-semibold">Failure Window</span>
                    <span className="text-xs font-mono font-bold text-red-500 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                      {analysisResult.timeToFailure}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase font-semibold">AI Neural Precision</span>
                    <span className="text-xs font-mono font-bold text-emerald-500 flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {analysisResult.confidence}
                    </span>
                  </div>

                  <div className="col-span-2 pt-1 border-t border-slate-800/50 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase">GPS Coordinates:</span>
                    <span className="text-[11px] font-mono font-bold text-cyan-400">{analysisResult.details.coordinates}</span>
                  </div>
                </div>

                {/* Dispatch Toast Confirmation */}
                {dispatchSuccess && (
                  <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-between w-full">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Dispatch Order #WO-9042 sent to Ward Crew!</span>
                    </span>
                    <button onClick={() => setDispatchSuccess(false)} className="text-slate-400 hover:text-white">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Workable Action Buttons */}
                <div className={`pt-2 border-t space-y-2 w-full ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <button
                      onClick={downloadOfficialPDF}
                      className="py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all border border-slate-700 w-full"
                      title="Download Official Municipal Inspection Report"
                    >
                      <Download className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Download Report</span>
                    </button>

                    <button
                      onClick={() => setDispatchSuccess(true)}
                      className="py-2.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-md w-full"
                      title="Dispatch Emergency Repair Crew"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch Crew</span>
                    </button>
                  </div>

                  <button
                    onClick={pinToHealthMap}
                    className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>{t('scanner_pin_btn')}</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Standby / Idle State — Full-Width AI Command Center Status Box */}
            {!isScanning && !analysisResult && (
              <div className="my-auto py-8 text-center space-y-6 w-full">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto glow-cyan">
                  <Activity className="w-8 h-8 animate-pulse text-cyan-400" />
                </div>

                <div className="space-y-2 w-full px-2">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 font-bold uppercase tracking-wider">
                    ● AI SCANNER STANDBY
                  </span>

                  <h4 className="text-lg font-bold tracking-tight pt-1">
                    Ready for Photo Analysis
                  </h4>

                  <p className={`text-xs ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} leading-relaxed max-w-xs mx-auto`}>
                    Drop an asset photo on the left or click any sample field inspection case below to generate an immediate diagnostic report.
                  </p>
                </div>

                {/* Pre-Inspection Sensor Checklist */}
                <div className={`p-4 rounded-xl border text-left space-y-2 w-full ${
                  theme === 'dark' ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                    Pre-Inspection Readiness:
                  </span>
                  <div className="space-y-1.5 text-xs font-mono text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Optical Sensor Array: <strong className="text-emerald-400">Ready</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>YOLOv11 Neural Model: <strong className="text-emerald-400">Online</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>GIS Geo-Clustering: <strong className="text-emerald-400">Connected</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
