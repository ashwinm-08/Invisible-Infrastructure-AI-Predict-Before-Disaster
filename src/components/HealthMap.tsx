import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Filter, 
  Clock, 
  Layers, 
  ChevronRight,
  X,
  FileText,
  Building2,
  Navigation
} from 'lucide-react';
import { CountUp } from './CountUp';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

export interface DefectMarker {
  id: string;
  title: string;
  assetType: 'Road' | 'Bridge' | 'Transformer' | 'Pole' | 'Drainage';
  severity: number; // 0 - 10
  status: 'critical' | 'high' | 'stable';
  location: string;
  timeToFailure: string;
  reportedDate: string;
  confidence: string;
  coordinates: { x: number; y: number }; // percentage on SVG map
  ward: string;
}

const MOCK_DEFECTS: DefectMarker[] = [
  {
    id: 'DEF-8901',
    title: 'Major Asphalt Subsidence & Pothole',
    assetType: 'Road',
    severity: 9.4,
    status: 'critical',
    location: '4th Cross, Outer Ring Road, Ward 12',
    timeToFailure: '4 Days',
    reportedDate: '2 hours ago',
    confidence: '98.7%',
    coordinates: { x: 22, y: 35 },
    ward: 'Ward 12 - Central',
  },
  {
    id: 'DEF-8902',
    title: 'Transformer Foundation Tilt (14°)',
    assetType: 'Transformer',
    severity: 9.1,
    status: 'critical',
    location: 'Substation Road, Sector 4',
    timeToFailure: '6 Days',
    reportedDate: '5 hours ago',
    confidence: '99.2%',
    coordinates: { x: 68, y: 25 },
    ward: 'Ward 08 - Industrial',
  },
  {
    id: 'DEF-8903',
    title: 'Flyover Support Pier Micro-Crack',
    assetType: 'Bridge',
    severity: 8.7,
    status: 'critical',
    location: 'East Corridor Expressway km 14',
    timeToFailure: '12 Days',
    reportedDate: '1 day ago',
    confidence: '97.5%',
    coordinates: { x: 45, y: 65 },
    ward: 'Ward 03 - East',
  },
  {
    id: 'DEF-8904',
    title: 'Stormwater Drain Wall Displacement',
    assetType: 'Drainage',
    severity: 7.6,
    status: 'high',
    location: 'Market Street Drain Line B',
    timeToFailure: '22 Days',
    reportedDate: '1 day ago',
    confidence: '95.1%',
    coordinates: { x: 30, y: 72 },
    ward: 'Ward 15 - South',
  },
  {
    id: 'DEF-8905',
    title: 'Streetlight Pole Base Corrosion',
    assetType: 'Pole',
    severity: 7.2,
    status: 'high',
    location: 'Grand Trunk Avenue No. 89',
    timeToFailure: '28 Days',
    reportedDate: '2 days ago',
    confidence: '94.8%',
    coordinates: { x: 80, y: 55 },
    ward: 'Ward 07 - North',
  },
  {
    id: 'DEF-8906',
    title: 'Deep Longitudinal Road Crack',
    assetType: 'Road',
    severity: 6.8,
    status: 'high',
    location: 'Tech Park Link Road',
    timeToFailure: '35 Days',
    reportedDate: '3 days ago',
    confidence: '96.0%',
    coordinates: { x: 55, y: 40 },
    ward: 'Ward 11 - West',
  },
  {
    id: 'DEF-8907',
    title: 'Sidewalk Concrete Slab Displacement',
    assetType: 'Road',
    severity: 4.2,
    status: 'stable',
    location: 'Civic Center Boulevard',
    timeToFailure: '90+ Days',
    reportedDate: '4 days ago',
    confidence: '92.3%',
    coordinates: { x: 15, y: 80 },
    ward: 'Ward 02 - Central',
  },
  {
    id: 'DEF-8908',
    title: 'Underground Culvert Surface Wear',
    assetType: 'Drainage',
    severity: 3.8,
    status: 'stable',
    location: 'Lake View Road Junction',
    timeToFailure: '120+ Days',
    reportedDate: '5 days ago',
    confidence: '91.0%',
    coordinates: { x: 72, y: 82 },
    ward: 'Ward 05 - South',
  },
];

const CHART_DATA = [
  { category: 'Roads', critical: 6, high: 14, stable: 32 },
  { category: 'Bridges', critical: 3, high: 5, stable: 12 },
  { category: 'Transformers', critical: 4, high: 6, stable: 10 },
  { category: 'Poles', critical: 2, high: 8, stable: 18 },
  { category: 'Drainage', critical: 3, high: 9, stable: 16 },
];

export const HealthMap: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'critical' | 'high' | 'stable'>('all');
  const [selectedPin, setSelectedPin] = useState<DefectMarker | null>(MOCK_DEFECTS[0]);

  const filteredDefects = MOCK_DEFECTS.filter((defect) => {
    if (filter === 'all') return true;
    return defect.status === filter;
  });

  const getPinColor = (status: DefectMarker['status']) => {
    switch (status) {
      case 'critical':
        return {
          bg: 'bg-red-500',
          ring: 'ring-red-500/50',
          glow: 'glow-red',
          border: 'border-red-400',
          text: 'text-red-400',
          label: 'Critical',
        };
      case 'high':
        return {
          bg: 'bg-amber-500',
          ring: 'ring-amber-500/50',
          glow: 'glow-amber',
          border: 'border-amber-400',
          text: 'text-amber-400',
          label: 'High Risk',
        };
      case 'stable':
        return {
          bg: 'bg-teal-400',
          ring: 'ring-teal-400/50',
          glow: 'glow-cyan',
          border: 'border-teal-300',
          text: 'text-teal-300',
          label: 'Stable',
        };
    }
  };

  return (
    <section id="health-map" className="py-24 bg-[#0A0E14] relative border-t border-slate-800/80">
      {/* Glow Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest">
              <Activity className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span>Interactive Command Center</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Infrastructure Health Map
            </h2>

            <p className="text-slate-300 text-base">
              A live, color-coded view of every reported asset — sorted by urgency, not by complaint order.
            </p>
          </div>

          {/* Filter Toggles */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
            {(['all', 'critical', 'high', 'stable'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFilter(mode)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono capitalize transition-all cursor-pointer ${
                  filter === mode
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {mode === 'all' ? 'All Assets' : mode}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Stat Counters Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-3xl font-extrabold font-mono text-cyan-300">
                <CountUp end={124} />
              </div>
              <p className="text-xs text-slate-400 font-sans mt-1">Active defects tracked in city</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Layers className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-red-500/30 bg-red-950/10 flex items-center justify-between">
            <div>
              <div className="text-3xl font-extrabold font-mono text-red-400">
                <CountUp end={18} />
              </div>
              <p className="text-xs text-slate-400 font-sans mt-1">Predicted critical failure in &lt; 30 days</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-amber-500/30 bg-amber-950/10 flex items-center justify-between">
            <div>
              <div className="text-3xl font-extrabold font-mono text-amber-400">
                <CountUp end={31} />
              </div>
              <p className="text-xs text-slate-400 font-sans mt-1">Auto-generated municipal work orders</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <FileText className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Dashboard Grid (Main GIS Map + Detail Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Map Viewport Area (8 cols) */}
          <div className="lg:col-span-8 glass-panel rounded-2xl border border-slate-800 p-4 relative overflow-hidden bg-slate-950">
            {/* Map HUD bar */}
            <div className="flex items-center justify-between px-3 py-2 bg-slate-900/90 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 mb-4 z-20 relative">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-cyan-400" />
                <span>GIS METROPOLITAN GRID — ZONE 04</span>
              </div>

              {/* Pin Legend */}
              <div className="flex items-center gap-4 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  <span className="text-red-400 font-semibold">Critical</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-amber-400">High</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                  <span className="text-teal-300">Stable</span>
                </div>
              </div>
            </div>

            {/* Abstract Interactive Canvas Map */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xl bg-[#080B10] overflow-hidden border border-slate-800/80">
              {/* City Grid Road SVG Illustration */}
              <svg className="absolute inset-0 w-full h-full text-slate-800/70" viewBox="0 0 1000 600" fill="none">
                {/* Major Arterial Avenues */}
                <path d="M 0 150 L 1000 150" stroke="currentColor" strokeWidth="6" />
                <path d="M 0 380 L 1000 380" stroke="currentColor" strokeWidth="8" />
                <path d="M 300 0 L 300 600" stroke="currentColor" strokeWidth="6" />
                <path d="M 700 0 L 700 600" stroke="currentColor" strokeWidth="7" />

                {/* Diagonal Highways */}
                <path d="M 0 500 L 1000 200" stroke="currentColor" strokeWidth="4" strokeDasharray="12 6" />

                {/* Secondary Streets Grid */}
                <path d="M 0 80 L 1000 80" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 0 260 L 1000 260" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 0 480 L 1000 480" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 150 0 L 150 600" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 500 0 L 500 600" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 850 0 L 850 600" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />

                {/* Sector Labels */}
                <text x="50" y="50" fill="#334155" fontSize="16" fontFamily="monospace">SECTOR A - CENTRAL</text>
                <text x="750" y="50" fill="#334155" fontSize="16" fontFamily="monospace">SECTOR B - NORTH</text>
                <text x="50" y="550" fill="#334155" fontSize="16" fontFamily="monospace">SECTOR C - WEST</text>
                <text x="750" y="550" fill="#334155" fontSize="16" fontFamily="monospace">SECTOR D - EAST</text>
              </svg>

              {/* Glowing Interactive Pin Markers */}
              {filteredDefects.map((defect) => {
                const isSelected = selectedPin?.id === defect.id;
                const pinColors = getPinColor(defect.status);

                return (
                  <div
                    key={defect.id}
                    onClick={() => setSelectedPin(defect)}
                    style={{ left: `${defect.coordinates.x}%`, top: `${defect.coordinates.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group"
                  >
                    {/* Pulsing Outer Aura */}
                    <div
                      className={`w-10 h-10 rounded-full ${pinColors.bg}/20 absolute -top-2.5 -left-2.5 animate-ping opacity-75`}
                    />

                    {/* Main Pin Icon Button */}
                    <div
                      className={`w-6 h-6 rounded-full ${pinColors.bg} flex items-center justify-center text-slate-950 font-bold shadow-lg border-2 border-slate-900 transition-transform group-hover:scale-125 ${
                        isSelected ? 'scale-125 ring-4 ' + pinColors.ring : ''
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5 fill-current" />
                    </div>

                    {/* Quick Hover Tooltip Card */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block z-40 bg-slate-900/95 text-slate-100 p-2.5 rounded-lg border border-slate-700 shadow-2xl min-w-[200px] pointer-events-none">
                      <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1 mb-1">
                        <span className="text-[10px] font-mono text-cyan-300 font-bold">{defect.id}</span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${pinColors.border} ${pinColors.text}`}>
                          {pinColors.label}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-white truncate">{defect.title}</p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 font-mono">
                        <span>Severity: {defect.severity}</span>
                        <span className="text-red-400 font-semibold">{defect.timeToFailure}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Asset Inspection Inspector Panel (4 cols) */}
          <div className="lg:col-span-4 glass-panel rounded-2xl border border-slate-800 p-6 space-y-6 bg-slate-900/90">
            {selectedPin ? (
              <div className="space-y-5">
                {/* Header info */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-mono text-cyan-400 font-bold">{selectedPin.id}</span>
                    <span className="text-slate-500 text-xs font-mono block">Geo-Tagged Defect Asset</span>
                  </div>
                  <span className={`text-xs font-mono px-2.5 py-1 rounded-full border ${getPinColor(selectedPin.status).border} ${getPinColor(selectedPin.status).text} font-bold uppercase`}>
                    {selectedPin.status}
                  </span>
                </div>

                {/* Defect Title */}
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {selectedPin.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>{selectedPin.location}</span>
                  </p>
                </div>

                {/* Stat Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-500 block">SEVERITY SCORE</span>
                    <span className="text-xl font-mono font-extrabold text-white">{selectedPin.severity} / 10</span>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-500 block">FAILURE WINDOW</span>
                    <span className="text-xl font-mono font-extrabold text-red-400">{selectedPin.timeToFailure}</span>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-500 block">AI CONFIDENCE</span>
                    <span className="text-sm font-mono font-bold text-cyan-300">{selectedPin.confidence}</span>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-500 block">REPORTED</span>
                    <span className="text-sm font-mono font-bold text-slate-300">{selectedPin.reportedDate}</span>
                  </div>
                </div>

                {/* Action button */}
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <button
                    onClick={() => {
                      alert(`Work Order generated & dispatched to ${selectedPin.ward} for defect ${selectedPin.id}!`);
                    }}
                    className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Dispatch Auto Work-Order</span>
                  </button>
                  <p className="text-[10px] text-center text-slate-500 font-mono">
                    Ward Authority: {selectedPin.ward}
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 text-sm">
                Select a marker on the health map to view complete failure prediction metrics.
              </div>
            )}
          </div>

        </div>

        {/* Recharts Analytics Bar Chart for Asset Defect Breakdown */}
        <div className="glass-panel rounded-2xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Defect Severity Breakdown by Asset Category
              </h3>
              <p className="text-xs text-slate-400 font-sans">
                Predictive risk distribution across city infrastructure assets
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded border border-cyan-500/30">
              Live City Analytics
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="category" stroke="#64748B" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0D1117', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                />
                <Bar dataKey="critical" fill="#EF4444" radius={[4, 4, 0, 0]} name="Critical Risk" />
                <Bar dataKey="high" fill="#F59E0B" radius={[4, 4, 0, 0]} name="High Risk" />
                <Bar dataKey="stable" fill="#00E5C7" radius={[4, 4, 0, 0]} name="Stable" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </section>
  );
};
