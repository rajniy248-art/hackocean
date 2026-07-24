import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, 
  Cpu, 
  Globe2, 
  LineChart, 
  ShieldAlert, 
  Waves, 
  Sparkles, 
  Database, 
  Eye, 
  Compass, 
  CheckCircle, 
  RefreshCw,
  Gauge,
  Zap,
  Activity,
  Award,
  ChevronRight,
  Info
} from "lucide-react";

interface YearData {
  year: number;
  aiAccuracy: number;
  traditionalAccuracy: number;
  anomaliesDetected: number;
  dataProcessed: string;
  computeEfficiency: string;
  keyAchievement: string;
  focusArea: string;
}

export default function AnalysisPage() {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  // Year metrics data
  const yearlyMetrics: Record<number, YearData> = {
    2021: {
      year: 2021,
      aiAccuracy: 65,
      traditionalAccuracy: 58,
      anomaliesDetected: 1420,
      dataProcessed: "1.2 Petabytes",
      computeEfficiency: "72%",
      keyAchievement: "Initial Deployment of AI Models & SAR Integration",
      focusArea: "Surface temperature calibration & drift model validation"
    },
    2022: {
      year: 2022,
      aiAccuracy: 74,
      traditionalAccuracy: 61,
      anomaliesDetected: 2850,
      dataProcessed: "2.4 Petabytes",
      computeEfficiency: "79%",
      keyAchievement: "Deep Neural Networks Trained on Acoustic Buoy Arrays",
      focusArea: "Sub-surface current tracking & dynamic ocean front mapping"
    },
    2023: {
      year: 2023,
      aiAccuracy: 82,
      traditionalAccuracy: 64,
      anomaliesDetected: 4910,
      dataProcessed: "5.8 Petabytes",
      computeEfficiency: "85%",
      keyAchievement: "SAR Satellite Multi-Spectral Synthesis Pipeline Activated",
      focusArea: "Micro-plastic density estimating & oil spill flow prediction"
    },
    2024: {
      year: 2024,
      aiAccuracy: 89,
      traditionalAccuracy: 67,
      anomaliesDetected: 8320,
      dataProcessed: "12.5 Petabytes",
      computeEfficiency: "91%",
      keyAchievement: "Autonomous Drone Swarm Cooperative Routing Live Test",
      focusArea: "Marine protected area enforcement & illegal vessel correlation"
    },
    2025: {
      year: 2025,
      aiAccuracy: 95,
      traditionalAccuracy: 69,
      anomaliesDetected: 12400,
      dataProcessed: "24.0 Petabytes",
      computeEfficiency: "96%",
      keyAchievement: "Real-time Bio-Luminescent Thermal Anomaly Core Live",
      focusArea: "Overfishing warning system & coral reef bleach prevention"
    },
    2026: {
      year: 2026,
      aiAccuracy: 98,
      traditionalAccuracy: 71,
      anomaliesDetected: 18750,
      dataProcessed: "48.5 Petabytes",
      computeEfficiency: "99%",
      keyAchievement: "DeepSea Guardian AI Platform Reaches 98% Predictive Confidence",
      focusArea: "Autonomous planetary ocean scale restoration modeling"
    }
  };

  const years = [2021, 2022, 2023, 2024, 2025, 2026];

  // Map year index to chart coordinate systems
  // SVG size is 1000 x 350
  // Left margin = 60, Right margin = 40, Width = 900
  // Top margin = 45, Bottom margin = 300, Height = 255
  const getCoordinates = (year: number, accuracy: number) => {
    const index = years.indexOf(year);
    const x = 60 + index * 180; // 5 intervals across 900px
    const y = 300 - (accuracy / 100) * 255;
    return { x, y };
  };

  const activeYearData = yearlyMetrics[selectedYear];

  // SVG drawing helper for AI Platform Line
  const aiPoints = years.map(y => getCoordinates(y, yearlyMetrics[y].aiAccuracy));
  const aiPath = aiPoints.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, "");

  // SVG drawing helper for Traditional Line
  const tradPoints = years.map(y => getCoordinates(y, yearlyMetrics[y].traditionalAccuracy));
  const tradPath = tradPoints.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, "");

  return (
    <div className="w-full space-y-8 animate-fade-in">
      
      {/* SECTION 1: HEADER HERO & GLOBE HOLOGRAM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-950/20 rounded-3xl border border-white/[0.02] p-6 md:p-8 backdrop-blur-xl relative overflow-hidden">
        
        {/* Glow behind section */}
        <div className="absolute top-1/2 -translate-y-1/2 right-10 w-96 h-96 rounded-full bg-teal-500/[0.03] blur-[100px] pointer-events-none" />

        {/* Left Side: Copy and Title */}
        <div className="lg:col-span-7 flex flex-col justify-center gap-4 py-2 relative z-10">
          <div>
            <span className="text-teal-400 font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-bold mb-3 block">
              Ocean Intelligence
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Ocean Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Analysis</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-400 max-w-xl leading-relaxed">
              AI-powered insights from our integrated ocean intelligence network help predict risks earlier, protect ecosystems better, and enable smarter decisions.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-2">
            <div className="flex items-center space-x-2 bg-slate-900/50 border border-white/[0.04] px-3.5 py-2 rounded-xl text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span>SAR Constellation Connected</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-900/50 border border-white/[0.04] px-3.5 py-2 rounded-xl text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Real-time Predictive Matrix Active</span>
            </div>
          </div>
        </div>

        {/* Right Side: Futuristic Orbiting Satellite & Glowing Wireframe Earth Hologram */}
        <div className="lg:col-span-5 flex justify-center items-center relative h-[320px] bg-slate-950/40 rounded-3xl border border-white/[0.05] shadow-2xl overflow-hidden group">
          
          {/* Subtle stars */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,118,110,0.1)_0%,rgba(2,6,23,0.95)_100%)]" />
          <div className="absolute top-10 left-12 w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse" />
          <div className="absolute top-28 right-16 w-1 h-1 bg-white/20 rounded-full" />
          <div className="absolute bottom-16 left-32 w-0.5 h-0.5 bg-white/30 rounded-full animate-pulse" />
          <div className="absolute top-12 right-36 w-0.5 h-0.5 bg-white/50 rounded-full" />

          {/* Interactive Network Diagram with Holographic Earth */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            
            {/* Spinning background orbital rings */}
            <div className="absolute w-[180px] h-[180px] rounded-full border border-teal-500/10 border-dashed animate-spin" style={{ animationDuration: "25s" }} />
            <div className="absolute w-[220px] h-[220px] rounded-full border border-cyan-500/5 animate-spin" style={{ animationDuration: "40s", animationDirection: "reverse" }} />
            
            {/* Central Earth Globe Sphere using stylized SVG vector overlay */}
            <div className="absolute w-36 h-36 rounded-full bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 border border-teal-500/20 shadow-[0_0_50px_rgba(45,212,191,0.15)] overflow-hidden flex items-center justify-center">
              {/* Spinning grid layer */}
              <svg className="w-full h-full opacity-35 text-teal-400/70 animate-pulse" viewBox="0 0 100 100" style={{ animationDuration: "8s" }}>
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,2" />
                <path d="M 50,5 Q 50,50 50,95 M 5,50 Q 50,50 95,50 M 15,50 Q 50,20 85,50 M 15,50 Q 50,80 85,50 M 28,15 Q 50,50 72,85" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <path d="M 50,5 Q 25,50 50,95 M 50,5 Q 75,50 50,95" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </svg>
              {/* Inner ambient light core */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-teal-500/10 to-transparent blur-sm" />
            </div>

            {/* Connecting lines between orbiting icons */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 256 256">
              <path d="M 40,80 Q 128,20 210,80 Q 230,160 180,210 Q 128,230 60,180 Z" fill="none" stroke="rgba(20,184,166,0.15)" strokeWidth="1" strokeDasharray="4,4" />
            </svg>

            {/* Orbiting Satellite Node */}
            <div className="absolute top-4 left-6 animate-bounce" style={{ animationDuration: "5s" }}>
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-teal-500/40 flex items-center justify-center text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.3)]">
                <Globe2 className="w-5 h-5 animate-pulse" />
              </div>
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-950/80 text-[7px] font-mono border border-teal-500/20 px-1 py-0.5 rounded text-teal-300 uppercase tracking-wider">SAR-Sat</span>
            </div>

            {/* Orbiting Drone Node */}
            <div className="absolute bottom-6 left-8 animate-bounce" style={{ animationDuration: "6s", animationDelay: "1s" }}>
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-950/80 text-[7px] font-mono border border-emerald-500/20 px-1 py-0.5 rounded text-emerald-300 uppercase tracking-wider">Drone</span>
            </div>

            {/* Orbiting IoT Sensor Node */}
            <div className="absolute top-16 right-4 animate-bounce" style={{ animationDuration: "7s", animationDelay: "2s" }}>
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <Waves className="w-5 h-5" />
              </div>
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-950/80 text-[7px] font-mono border border-cyan-500/20 px-1 py-0.5 rounded text-cyan-300 uppercase tracking-wider">Buoy</span>
            </div>

            {/* Orbiting Prediction Center Node */}
            <div className="absolute bottom-10 right-8 animate-bounce" style={{ animationDuration: "5.5s", animationDelay: "3s" }}>
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                <Database className="w-5 h-5" />
              </div>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-950/80 text-[7px] font-mono border border-amber-500/20 px-1 py-0.5 rounded text-amber-300 uppercase tracking-wider">Hub</span>
            </div>

          </div>

        </div>

      </div>

      {/* SECTION 2: GRAPH ACCURACY PREDICTION OVER TIME */}
      <div className="bg-slate-950/40 border border-white/[0.05] rounded-3xl p-6 md:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
        
        {/* Subtle grid backdrop for card */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] pointer-events-none" />

        {/* Chart Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative z-10">
          <div>
            <h2 className="text-lg font-bold text-slate-100 tracking-tight flex items-center gap-2">
              <LineChart className="w-5 h-5 text-teal-400" />
              <span>Ocean Health Prediction Accuracy Over Time</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Analyzing deep-sea system confidence rates against standard predictive modules.
            </p>
          </div>

          {/* Chart Legends */}
          <div className="flex flex-wrap items-center gap-5 bg-slate-950/40 border border-white/[0.04] p-3 rounded-xl text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-4 h-0.5 bg-teal-400 inline-block relative">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
              </span>
              <span className="font-medium text-slate-300 text-[11px]">DeepSea Guardian AI Platform</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-4 h-0.5 border-t-2 border-dashed border-amber-500 inline-block relative">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
              </span>
              <span className="font-medium text-slate-400 text-[11px]">Traditional Monitoring</span>
            </div>
          </div>
        </div>

        {/* LINE CHART CONTAINER */}
        <div className="relative w-full overflow-x-auto select-none no-scrollbar pb-2">
          <div className="min-w-[760px] relative h-[360px] md:px-2">
            
            {/* SVG Plotting Frame */}
            <svg 
              className="w-full h-full overflow-visible" 
              viewBox="0 0 1000 350"
            >
              <defs>
                {/* Glow Filter for AI line */}
                <filter id="ai-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="chart-bg-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Y-Axis Horizontal Grid Lines & Percent Labels */}
              {[100, 80, 60, 40, 20, 0].map((percentage) => {
                const y = 300 - (percentage / 100) * 255;
                return (
                  <g key={percentage} className="opacity-70">
                    <text 
                      x="35" 
                      y={y + 4} 
                      className="text-[10px] font-mono fill-slate-500 text-right"
                      textAnchor="end"
                    >
                      {percentage}
                    </text>
                    <line 
                      x1="60" 
                      y1={y} 
                      x2="960" 
                      y2={y} 
                      stroke="rgba(255,255,255,0.04)" 
                      strokeWidth="1"
                      strokeDasharray={percentage === 0 ? "none" : "3,3"}
                    />
                  </g>
                );
              })}

              {/* Prediction Accuracy (%) vertical text label */}
              <text 
                x="-175" 
                y="15" 
                transform="rotate(-90)" 
                className="text-[9px] font-mono fill-slate-500 uppercase tracking-widest font-semibold"
                textAnchor="middle"
              >
                Prediction Accuracy (%)
              </text>

              {/* Year vertical guidelines */}
              {years.map((yVal) => {
                const coord = getCoordinates(yVal, 100);
                const isSelected = selectedYear === yVal;
                return (
                  <line 
                    key={yVal}
                    x1={coord.x} 
                    y1="45" 
                    x2={coord.x} 
                    y2="300" 
                    stroke={isSelected ? "rgba(45,212,191,0.2)" : "rgba(255,255,255,0.02)"} 
                    strokeWidth={isSelected ? "1.5" : "1"}
                  />
                );
              })}

              {/* AI Platform Area Fill */}
              <path 
                d={`${aiPath} L 960 300 L 60 300 Z`}
                fill="url(#chart-bg-gradient)"
              />

              {/* AI Platform Line Plot */}
              <path 
                d={aiPath}
                fill="none"
                stroke="#2dd4bf"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#ai-glow)"
              />

              {/* Traditional Monitoring Line Plot */}
              <path 
                d={tradPath}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="4,4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Selected/Hovered vertical highlight scanner */}
              {years.map((yVal) => {
                const coord = getCoordinates(yVal, yearlyMetrics[yVal].aiAccuracy);
                const isSelected = selectedYear === yVal;
                if (!isSelected) return null;

                return (
                  <g key={`scan-${yVal}`}>
                    {/* Vertical laser line */}
                    <line 
                      x1={coord.x} 
                      y1="45" 
                      x2={coord.x} 
                      y2="300" 
                      stroke="#2dd4bf" 
                      strokeWidth="2" 
                      className="opacity-40 animate-pulse"
                    />
                    <circle 
                      cx={coord.x} 
                      cy={coord.y} 
                      r="16" 
                      fill="#2dd4bf" 
                      fillOpacity="0.08" 
                      className="animate-ping"
                    />
                  </g>
                );
              })}

              {/* Traditional Monitoring Nodes/Dots */}
              {years.map((yVal) => {
                const metric = yearlyMetrics[yVal];
                const coord = getCoordinates(yVal, metric.traditionalAccuracy);
                const isSelected = selectedYear === yVal;
                
                return (
                  <g 
                    key={`trad-dot-${yVal}`}
                    className="cursor-pointer group/dot"
                    onClick={() => setSelectedYear(yVal)}
                    onMouseEnter={() => setHoveredYear(yVal)}
                    onMouseLeave={() => setHoveredYear(null)}
                  >
                    <circle 
                      cx={coord.x} 
                      cy={coord.y} 
                      r={isSelected ? "7" : "5"} 
                      fill="#0f172a" 
                      stroke="#f59e0b" 
                      strokeWidth={isSelected ? "3" : "2"}
                      className="transition-all duration-300 group-hover/dot:scale-125"
                    />
                    {/* Value Badge below dot */}
                    <text 
                      x={coord.x} 
                      y={coord.y + 20} 
                      className={`text-[11px] font-bold font-mono text-center transition-all ${
                        isSelected ? "fill-amber-400 font-extrabold" : "fill-slate-500"
                      }`}
                      textAnchor="middle"
                    >
                      {metric.traditionalAccuracy}%
                    </text>
                  </g>
                );
              })}

              {/* AI Platform Nodes/Dots */}
              {years.map((yVal) => {
                const metric = yearlyMetrics[yVal];
                const coord = getCoordinates(yVal, metric.aiAccuracy);
                const isSelected = selectedYear === yVal;
                
                return (
                  <g 
                    key={`ai-dot-${yVal}`}
                    className="cursor-pointer group/dot"
                    onClick={() => setSelectedYear(yVal)}
                    onMouseEnter={() => setHoveredYear(yVal)}
                    onMouseLeave={() => setHoveredYear(null)}
                  >
                    <circle 
                      cx={coord.x} 
                      cy={coord.y} 
                      r={isSelected ? "8" : "6"} 
                      fill="#020617" 
                      stroke="#2dd4bf" 
                      strokeWidth={isSelected ? "4" : "3"}
                      className="transition-all duration-300 group-hover/dot:scale-125 shadow-[0_0_15px_rgba(45,212,191,0.8)]"
                    />
                    {/* Value Badge on top of dot */}
                    <text 
                      x={coord.x} 
                      y={coord.y - 15} 
                      className={`text-[12px] font-bold font-mono text-center transition-all ${
                        isSelected ? "fill-teal-300 font-extrabold drop-shadow-[0_0_4px_rgba(45,212,191,0.5)]" : "fill-teal-400/80"
                      }`}
                      textAnchor="middle"
                    >
                      {metric.aiAccuracy}%
                    </text>
                  </g>
                );
              })}

              {/* X-Axis Year Labels */}
              {years.map((yVal) => {
                const coord = getCoordinates(yVal, 0);
                const isSelected = selectedYear === yVal;
                return (
                  <g 
                    key={`label-${yVal}`}
                    className="cursor-pointer"
                    onClick={() => setSelectedYear(yVal)}
                  >
                    <rect 
                      x={coord.x - 30} 
                      y="312" 
                      width="60" 
                      height="22" 
                      rx="6" 
                      fill={isSelected ? "rgba(45,212,191,0.12)" : "transparent"}
                      stroke={isSelected ? "rgba(45,212,191,0.2)" : "transparent"}
                      strokeWidth="1"
                    />
                    <text 
                      x={coord.x} 
                      y="327" 
                      className={`text-[11px] font-bold font-mono text-center transition-colors ${
                        isSelected ? "fill-teal-300 font-bold" : "fill-slate-500 hover:fill-slate-300"
                      }`}
                      textAnchor="middle"
                    >
                      {yVal}
                    </text>
                  </g>
                );
              })}

            </svg>

          </div>
        </div>

        {/* Interactive Year Selector Tabs as a secondary control */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/[0.04] justify-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 self-center mr-2">Jump to year:</span>
          {years.map((yr) => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedYear === yr
                  ? "bg-teal-500/10 border border-teal-500/30 text-teal-300"
                  : "bg-slate-900/35 border border-white/[0.03] text-slate-400 hover:text-white hover:border-white/10"
              }`}
            >
              {yr}
            </button>
          ))}
        </div>

      </div>

      {/* SECTION 3: YEAR SPECIFIC DETAIL PANELS */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedYear}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10"
        >
          
          {/* Card 1: Year Summary Stats */}
          <div className="p-5 rounded-2xl bg-slate-950/40 border border-white/[0.05] shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Yearly Matrix Overview</span>
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-extrabold bg-teal-500/10 border border-teal-500/20 text-teal-400">
                {selectedYear} active
              </span>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Yearly Detection Events</div>
                <div className="text-2xl font-black text-slate-100 font-mono mt-0.5 tracking-tight flex items-baseline gap-1.5">
                  <span>{activeYearData.anomaliesDetected.toLocaleString()}</span>
                  <span className="text-xs font-medium text-emerald-400 font-sans">Anomalies Detected</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-2.5 bg-slate-900/40 border border-white/[0.03] rounded-xl">
                  <div className="text-[9px] font-mono text-slate-500 uppercase">Data Aggregated</div>
                  <div className="text-xs font-bold text-slate-300 mt-0.5">{activeYearData.dataProcessed}</div>
                </div>
                <div className="p-2.5 bg-slate-900/40 border border-white/[0.03] rounded-xl">
                  <div className="text-[9px] font-mono text-slate-500 uppercase">Efficiency Core</div>
                  <div className="text-xs font-bold text-teal-400 mt-0.5">{activeYearData.computeEfficiency}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Strategic Focus Area */}
          <div className="p-5 rounded-2xl bg-slate-950/40 border border-white/[0.05] shadow-lg">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 rounded bg-teal-500/10 flex items-center justify-center text-teal-400">
                <Compass className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Target Focus Areas</span>
            </div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Scientific Parameters</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-900/30 p-3 rounded-xl border border-white/[0.02] min-h-[72px]">
              "{activeYearData.focusArea}"
            </p>
          </div>

          {/* Card 3: Key Deployment Milestones */}
          <div className="p-5 rounded-2xl bg-slate-950/40 border border-white/[0.05] shadow-lg">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 rounded bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <Award className="w-3.5 h-3.5 animate-pulse" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">System Milestone</span>
            </div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Key Accomplishment</h3>
            <p className="text-[11px] text-teal-300/95 leading-relaxed bg-teal-950/10 p-3 rounded-xl border border-teal-500/10 min-h-[72px]">
              {activeYearData.keyAchievement}
            </p>
          </div>

        </motion.div>
      </AnimatePresence>

      {/* SECTION 4: HIGH-IMPACT QUALITY ACCENT ACTION FOOTER BANNER */}
      <div className="bg-gradient-to-r from-slate-950/60 via-slate-900/40 to-slate-950/60 border border-white/[0.05] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center md:justify-between gap-6 relative overflow-hidden shadow-2xl">
        
        {/* Glow left side */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-teal-500/[0.01] blur-md pointer-events-none" />

        {/* Left side: Trending Icon & Main Text Headers */}
        <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10 w-full md:w-auto">
          
          {/* Circular Glowing Trend Icon Container */}
          <div className="w-14 h-14 rounded-full bg-slate-950 border border-teal-500/25 flex items-center justify-center text-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.15)] shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>

          {/* Vertical Separator */}
          <div className="hidden sm:block h-10 w-px bg-white/10 shrink-0" />

          {/* Headline pairing */}
          <div className="text-center sm:text-left">
            <div className="text-sm font-black text-teal-400 tracking-wide">Better Predictions.</div>
            <div className="text-sm font-bold text-slate-200 tracking-wide mt-0.5">Better Protection.</div>
          </div>
        </div>

        {/* Middle Description Paragraph */}
        <p className="text-xs text-slate-400 max-w-lg leading-relaxed text-center md:text-left relative z-10">
          DeepSea Guardian's AI models consistently deliver higher accuracy year by year, enabling earlier action and a healthier ocean for the future.
        </p>

        {/* Right side stats banner: 27% growth */}
        <div className="flex items-center space-x-3.5 bg-slate-950/80 border border-white/[0.06] px-5 py-3.5 rounded-2xl shadow-inner shrink-0 relative z-10">
          <div className="text-3xl font-black text-teal-400 tracking-tight flex items-center drop-shadow-[0_0_8px_rgba(45,212,191,0.4)]">
            <span>&uarr;</span>
            <span className="ml-1">27%</span>
          </div>
          <div className="text-[10px] text-slate-400 leading-snug max-w-[125px] font-medium uppercase tracking-wider">
            Improvement in prediction accuracy from 2021 to 2026
          </div>
        </div>

      </div>

    </div>
  );
}
