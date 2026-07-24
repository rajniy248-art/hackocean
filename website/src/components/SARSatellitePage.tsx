import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Globe, 
  Activity, 
  Clock, 
  Cpu, 
  Bell, 
  Shield, 
  Radar, 
  AlertTriangle, 
  Anchor, 
  TrendingUp, 
  MapPin, 
  Plus, 
  Minus, 
  SlidersHorizontal,
  ChevronDown,
  Navigation,
  Eye,
  Settings,
  ListFilter,
  CheckCircle,
  HelpCircle,
  ArrowUpRight
} from "lucide-react";

interface SatelliteAlert {
  id: string;
  type: "plastic" | "mining" | "ship";
  title: string;
  desc: string;
  time: string;
  location: string;
  confidence: number;
}

interface SatelliteData {
  id: string;
  name: string;
  orbit: string;
  sensor: string;
  coverage: string;
  revisit: string;
  status: "Operational" | "Maintenance" | "Standby";
}

export default function SARSatellitePage() {
  const [selectedAlertId, setSelectedAlertId] = useState<string>("alert-1");
  const [detectionFilter, setDetectionFilter] = useState<string>("All Detections");
  const [timeFilter, setTimeFilter] = useState<string>("Last 24 Hours");
  const [regionFilter, setRegionFilter] = useState<string>("All Regions");
  const [confidenceFilter, setConfidenceFilter] = useState<string>("High");
  const [mapZoom, setMapZoom] = useState<number>(1);
  const [isLiveScanning, setIsLiveScanning] = useState<boolean>(true);
  const [noiseOffset, setNoiseOffset] = useState<number>(0);
  const liveFeedRef = useRef<HTMLCanvasElement>(null);

  // Animate the SAR Live noise feed
  useEffect(() => {
    let animationId: number;
    const canvas = liveFeedRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Preload radar background image
    const img = new Image();
    img.src = "https://res.cloudinary.com/wzptbd4w/image/upload/v1784538727/radar_aacv0o.png";
    img.crossOrigin = "anonymous";

    interface RadarTarget {
      x: number;
      y: number;
      radius: number;
      angle: number;
      type: "plastic" | "mining" | "ship";
      intensity: number;
    }

    const targets: RadarTarget[] = [
      { x: centerX - 55, y: centerY - 45, radius: 0, angle: 0, type: "plastic", intensity: 0 },
      { x: centerX + 45, y: centerY + 40, radius: 0, angle: 0, type: "mining", intensity: 0 },
      { x: centerX + 60, y: centerY - 55, radius: 0, angle: 0, type: "ship", intensity: 0 },
      { x: centerX - 35, y: centerY + 55, radius: 0, angle: 0, type: "ship", intensity: 0 }
    ];

    // Compute polar coordinates for each target relative to center
    targets.forEach(t => {
      const dx = t.x - centerX;
      const dy = t.y - centerY;
      t.radius = Math.sqrt(dx * dx + dy * dy);
      let a = Math.atan2(dy, dx);
      if (a < 0) a += Math.PI * 2;
      t.angle = a;
    });

    const render = () => {
      // 1. Clear with base background
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, width, height);

      // 2. Draw the radar background image if loaded
      if (img.complete && img.naturalWidth !== 0) {
        ctx.drawImage(img, 0, 0, width, height);
      } else {
        // Fallback layout when image is still loading
        ctx.strokeStyle = "rgba(45, 212, 191, 0.15)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 125, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 3. CRT Scanline Overlay
      ctx.strokeStyle = "rgba(45, 212, 191, 0.04)";
      ctx.lineWidth = 1;
      for (let y = 0; y < height; y += 4) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 4. Update and draw the sweeping radar radar line (rotating sweep)
      const sweepAngle = (Date.now() / 2500) % (Math.PI * 2);

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(sweepAngle);

      // Multi-line trail fade
      const trailLength = 60; // arc degrees for a smoother, longer trail
      const sweepRadius = 132; // Perfectly matches the image's outer grid boundaries
      for (let i = 0; i < trailLength; i++) {
        const alpha = (1 - i / trailLength) * 0.22;
        ctx.strokeStyle = `rgba(45, 212, 191, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        const trailAngle = -(i * Math.PI / 180);
        ctx.lineTo(Math.cos(trailAngle) * sweepRadius, Math.sin(trailAngle) * sweepRadius);
        ctx.stroke();
      }

      // The main bright scan sweep line
      ctx.strokeStyle = "rgba(45, 212, 191, 0.9)";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(sweepRadius, 0);
      ctx.stroke();

      // High-tech center hub glow
      ctx.beginPath();
      ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(45, 212, 191, 0.95)";
      ctx.fill();

      ctx.restore();

      // 5. Update target intensities based on current sweep angle
      targets.forEach(t => {
        let diff = sweepAngle - t.angle;
        if (diff < 0) diff += Math.PI * 2;
        
        // When sweep passes over target, trigger phosphor glow
        if (diff < 0.15 && diff > 0) {
          t.intensity = 1.0;
        } else {
          // Phosphor decay over time
          t.intensity = Math.max(0, t.intensity - 0.005);
        }
      });

      // 6. Draw glowing targets with sonar ripple ripples
      targets.forEach(t => {
        if (t.intensity > 0) {
          let color = "rgba(16, 185, 129, "; // Plastic -> Emerald
          if (t.type === "mining") color = "rgba(244, 63, 94, "; // Mining -> Rose
          if (t.type === "ship") color = "rgba(6, 182, 212, "; // Ship -> Cyan

          // Central target point
          ctx.beginPath();
          ctx.arc(t.x, t.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `${color}${t.intensity})`;
          ctx.fill();

          // Concentric sonar wave ripple expanding outwards
          ctx.beginPath();
          const rippleRadius = 3 + (1 - t.intensity) * 16;
          ctx.arc(t.x, t.y, rippleRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `${color}${t.intensity * 0.35})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Delicate technical crosshair
          ctx.beginPath();
          ctx.moveTo(t.x - 4, t.y);
          ctx.lineTo(t.x + 4, t.y);
          ctx.moveTo(t.x, t.y - 4);
          ctx.lineTo(t.x, t.y + 4);
          ctx.strokeStyle = `${color}${t.intensity * 0.5})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      // 7. Subtle background static noise points (very light)
      ctx.fillStyle = "rgba(45, 212, 191, 0.05)";
      for (let i = 0; i < 6; i++) {
        const rx = Math.random() * width;
        const ry = Math.random() * height;
        ctx.fillRect(rx, ry, 1, 1);
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const alerts: SatelliteAlert[] = [
    {
      id: "alert-1",
      type: "plastic",
      title: "Plastic Cluster Detected",
      desc: "High concentration of floating plastic marine debris clusters observed in North Pacific ocean currents.",
      time: "2 min ago",
      location: "North Pacific Gyre",
      confidence: 96
    },
    {
      id: "alert-2",
      type: "mining",
      title: "Illegal Mining Activity",
      desc: "Suspicious dredging vessel signature detected inside restricted marine sanctuary buffer zone B7.",
      time: "5 min ago",
      location: "Sanctuary Zone B7",
      confidence: 94
    },
    {
      id: "alert-3",
      type: "ship",
      title: "Suspicious Ship Wake",
      desc: "Unusual localized speed wake signature matched to non-transmitting AIS vessel entering marine park.",
      time: "8 min ago",
      location: "Coral Coast Protected Outer Reef",
      confidence: 89
    }
  ];

  const selectedAlert = alerts.find(a => a.id === selectedAlertId) || alerts[0];

  // Map markers locations
  const mapHotspots = [
    { id: "hotspot-1", type: "plastic", x: 38, y: 35, label: "Plastic Cluster A1", confidence: 96, size: 28 },
    { id: "hotspot-2", type: "plastic", x: 22, y: 32, label: "Plastic Debris A2", confidence: 85, size: 20 },
    { id: "hotspot-3", type: "mining", x: 62, y: 64, label: "Dredging Ship MN1", confidence: 94, size: 16 },
    { id: "hotspot-4", type: "ship", x: 48, y: 72, label: "Suspicious Cargo S3", confidence: 89, size: 14 },
    { id: "hotspot-5", type: "plastic", x: 84, y: 42, label: "Gyre Accumulation", confidence: 91, size: 24 },
    { id: "hotspot-6", type: "mining", x: 71, y: 62, label: "Illegal Trawler", confidence: 92, size: 15 },
    { id: "hotspot-7", type: "ship", x: 18, y: 55, label: "Non-AIS Wake Tracker", confidence: 88, size: 13 }
  ];

  return (
    <div className="w-full max-w-[1450px] mx-auto px-4 md:px-6 py-4 flex flex-col gap-8 select-none relative z-10 text-white font-sans">
      
      {/* SECTION 1: HERO CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Copy and Title */}
        <div className="lg:col-span-12 flex flex-col justify-between gap-6 py-2">
          <div>
            <span className="text-teal-400 font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-bold mb-3 block">
              SAR Satellite Intelligence
            </span>
            <h1 className="text-3xl md:text-[44px] font-extrabold leading-[1.1] tracking-tight text-white">
              See Everything. <br />
              <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Protect Everywhere.
              </span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mt-4 max-w-xl">
              Our AI-powered SAR satellites scan the ocean surface day and night, through clouds and darkness, to detect plastic pollution clusters and illegal dumping or mining ship activity in real time.
            </p>
          </div>
          {/* Feature Row */}
        </div>

      </div>

      {/* SECTION 2: BENTO GRID FEATURES HERO ROW */}
      <div className="bg-slate-950/40 border border-white/[0.05] rounded-2xl p-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          
          <div className="p-4 bg-slate-900/15 hover:bg-slate-900/40 rounded-xl transition-all border border-transparent hover:border-white/[0.03] flex items-center space-x-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <div className="grid grid-cols-3 gap-0.5 p-0.5">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 4 || i === 0 || i === 6 || i === 8 ? "bg-emerald-400" : "bg-emerald-850/60"}`} />
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[11.5px] font-bold text-slate-100">Surface Plastic Mapping</h4>
              <p className="text-[10px] text-slate-300 mt-0.5 leading-normal">Detects and maps plastic clusters in real-time</p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/15 hover:bg-slate-900/40 rounded-xl transition-all border border-transparent hover:border-white/[0.03] flex items-center space-x-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
              <Anchor className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-[11.5px] font-bold text-slate-100">Illegal Mining Detection</h4>
              <p className="text-[10px] text-slate-300 mt-0.5 leading-normal">Identifies unauthorized mining and dredging activities</p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/15 hover:bg-slate-900/40 rounded-xl transition-all border border-transparent hover:border-white/[0.03] flex items-center space-x-4">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/5 border border-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
              <Activity className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-[11.5px] font-bold text-slate-100">Ship Wake Detection</h4>
              <p className="text-[10px] text-slate-300 mt-0.5 leading-normal">Tracks and analyzes suspicious ship movement patterns</p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/15 hover:bg-slate-900/40 rounded-xl transition-all border border-transparent hover:border-white/[0.03] flex items-center space-x-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
              <SlidersHorizontal className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h4 className="text-[11.5px] font-bold text-slate-100">AI Change Detection</h4>
              <p className="text-[10px] text-slate-300 mt-0.5 leading-normal">Monitors changes and detects anomalies automatically</p>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 3: MAIN DUAL COLUMN INTERACTIVE MONITORING PLATFORM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Live SAR Feed Monitor */}
        <div className="lg:col-span-3 bg-slate-950/50 border border-white/[0.05] rounded-2xl p-4 md:p-5 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
            <h2 className="text-sm font-bold text-slate-100 tracking-tight">Live SAR Feed</h2>
            <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[8.5px] font-bold text-emerald-400 flex items-center gap-1 uppercase tracking-wide">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          </div>

          {/* Interactive Radar Noise Canvas Display */}
          <div className="my-4 bg-slate-950 rounded-xl border border-white/10 overflow-hidden aspect-square relative flex items-center justify-center">
            <canvas 
              ref={liveFeedRef} 
              width={280} 
              height={280} 
              className="w-full h-full object-cover rounded-xl"
            />
            {/* Top right icon list */}
            <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 z-20">
              <button className="p-1 bg-slate-950/80 border border-white/10 hover:border-teal-500/30 text-slate-400 hover:text-white rounded transition-colors">
                <Settings className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* SAR Target color legends */}
          <div className="grid grid-cols-3 gap-1 border-t border-white/[0.04] pt-3.5">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded bg-emerald-500 shrink-0" />
              <span className="text-[9px] text-slate-400 truncate">Plastic Cluster</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded bg-rose-500 shrink-0" />
              <span className="text-[9px] text-slate-400 truncate">Mining Activity</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded bg-cyan-500 shrink-0" />
              <span className="text-[9px] text-slate-400 truncate">Ship Wake</span>
            </div>
          </div>
        </div>

        {/* Middle Global Ocean Monitoring Map */}
        <div className="lg:col-span-6 bg-slate-950/50 border border-white/[0.05] rounded-2xl p-5 md:p-6 flex flex-col gap-5 shadow-[0_12px_40px_rgba(0,0,0,0.4)] relative">
          
          <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
            <h2 className="text-base font-bold text-slate-100 tracking-tight flex items-center gap-2">
              Global Ocean Monitoring
            </h2>
            <div className="text-[9px] font-mono text-slate-500">
              COORDINATES: DEEP-SEA SAR CONSTELLATION IV
            </div>
          </div>

          {/* Custom Stylized Vector Global Ocean map with active hotspots */}
          <div className="flex-1 bg-slate-950 rounded-xl border border-white/[0.03] overflow-hidden relative min-h-[300px] flex items-center justify-center">
            
            {/* Radar Sweep backdrop mesh */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
            
            <svg 
              viewBox="0 0 1000 500" 
              className="w-full h-full object-cover transition-transform duration-500 z-10 ease-out"
              style={{ transform: `scale(${mapZoom})`, transformOrigin: "center center" }}
            >
              {/* World Map Background Image */}
              <image 
                href="https://res.cloudinary.com/wzptbd4w/image/upload/v1784527005/map_hhpjsd.png"
                x="0"
                y="0"
                width="1000"
                height="500"
                preserveAspectRatio="none"
                opacity="0.85"
              />

              {/* Pulsing colored target pins on SVG map */}
              <g>
                {mapHotspots.map((hotspot) => {
                  const isSelected = selectedAlert.type === hotspot.type;
                  let coreColor = "#10b981"; // plastic (green)
                  if (hotspot.type === "mining") {
                    coreColor = "#f43f5e"; // rose
                  } else if (hotspot.type === "ship") {
                    coreColor = "#06b6d4"; // cyan
                  }

                  const handleSelect = () => {
                    if (hotspot.type === "plastic") setSelectedAlertId("alert-1");
                    else if (hotspot.type === "mining") setSelectedAlertId("alert-2");
                    else if (hotspot.type === "ship") setSelectedAlertId("alert-3");
                  };

                  return (
                    <g 
                      key={hotspot.id} 
                      className="cursor-pointer group select-none"
                      onClick={handleSelect}
                    >
                      {/* 1. Large expanding radar pulse ring */}
                      <circle 
                        cx={hotspot.x * 10} 
                        cy={hotspot.y * 5} 
                        r={hotspot.size} 
                        fill="none" 
                        stroke={coreColor} 
                        className="animate-ring-pulse origin-center"
                        style={{ transformOrigin: `${hotspot.x * 10}px ${hotspot.y * 5}px` }}
                      />

                      {/* 2. Rapid dark blinking outer target circle for high visibility */}
                      <circle 
                        cx={hotspot.x * 10} 
                        cy={hotspot.y * 5} 
                        r="12" 
                        fill="rgba(2, 6, 23, 0.55)" 
                        stroke="#000000" 
                        strokeWidth="3"
                        className="animate-dark-blink origin-center"
                        style={{ transformOrigin: `${hotspot.x * 10}px ${hotspot.y * 5}px` }}
                      />

                      {/* 3. Solid black ring enclosing core dot for extreme contrast against blue background */}
                      <circle 
                        cx={hotspot.x * 10} 
                        cy={hotspot.y * 5} 
                        r="7" 
                        fill="#000000"
                        stroke={coreColor}
                        strokeWidth="1.5"
                      />

                      {/* 4. Highly visible inner pulsing node */}
                      <circle 
                        cx={hotspot.x * 10} 
                        cy={hotspot.y * 5} 
                        r="3.5" 
                        fill={coreColor}
                        className="animate-ping origin-center"
                        style={{ animationDuration: "1s", transformOrigin: `${hotspot.x * 10}px ${hotspot.y * 5}px` }}
                      />
                      <circle 
                        cx={hotspot.x * 10} 
                        cy={hotspot.y * 5} 
                        r="2.5" 
                        fill={coreColor}
                      />

                      {/* Label tooltip on hover */}
                      <text 
                        x={hotspot.x * 10} 
                        y={hotspot.y * 5 - 16} 
                        fill="#f8fafc" 
                        fontSize="9.5" 
                        fontWeight="bold"
                        fontFamily="Courier New" 
                        textAnchor="middle"
                        className="opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] bg-slate-950 pointer-events-none"
                      >
                        {hotspot.label}
                      </text>
                    </g>
                  );
                })}
              </g>

            </svg>

            {/* Float HUD card showing current target */}
            <div className="absolute bottom-4 left-4 bg-slate-950/90 border border-white/10 rounded-xl p-3.5 backdrop-blur-md z-30 max-w-[220px] flex flex-col gap-1.5 shadow-2xl">
              <span className={`text-[8.5px] font-bold tracking-wider uppercase inline-block px-1.5 py-0.5 rounded ${
                selectedAlert.type === "plastic" ? "bg-emerald-500/10 border border-emerald-500/25 text-emerald-400" :
                selectedAlert.type === "mining" ? "bg-rose-500/10 border border-rose-500/25 text-rose-400" :
                "bg-cyan-500/10 border border-cyan-500/25 text-cyan-400"
              }`}>
                {selectedAlert.type === "plastic" ? "Plastic Cluster" :
                 selectedAlert.type === "mining" ? "Illegal Mining" :
                 "Suspicious Ship"}
              </span>
              <span className="text-[11px] font-bold text-slate-200 truncate">{selectedAlert.title}</span>
              <span className="text-[9px] font-mono text-slate-500">{selectedAlert.location}</span>
              <div className="flex items-center justify-between border-t border-white/[0.04] pt-1.5 mt-0.5">
                <span className="text-[8.5px] text-slate-500">Confidence:</span>
                <span className="text-[9.5px] font-mono font-bold text-teal-400">{selectedAlert.confidence}%</span>
              </div>
            </div>

            {/* Zoom Controls Overlay */}
            <div className="absolute right-4 bottom-4 flex flex-col gap-1 bg-slate-950 p-1 rounded-lg border border-white/[0.05] z-20">
              <button 
                onClick={() => setMapZoom(prev => Math.min(2.5, prev + 0.25))}
                className="w-6 h-6 rounded bg-slate-900 border border-slate-800 hover:border-teal-500/30 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer hover:scale-105 transition-all"
                title="Zoom In"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setMapZoom(prev => Math.max(1, prev - 0.25))}
                className="w-6 h-6 rounded bg-slate-900 border border-slate-800 hover:border-teal-500/30 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer hover:scale-105 transition-all"
                title="Zoom Out"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Filtering Selectors Row & Stats */}
          <div className="flex flex-col gap-4">
            
            {/* Filter selectors matching the image row layout */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              
              {/* Selector 1 */}
              <div className="relative">
                <select 
                  value={detectionFilter} 
                  onChange={(e) => setDetectionFilter(e.target.value)}
                  className="w-full bg-slate-900/80 hover:bg-slate-900 text-[10px] font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-lg border border-slate-800 focus:outline-none appearance-none cursor-pointer pr-8 tracking-wide transition-all"
                >
                  <option value="All Detections">All Detections</option>
                  <option value="Plastic Only">Plastic Only</option>
                  <option value="Vessels Only">Vessels Only</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Selector 2 */}
              <div className="relative">
                <select 
                  value={timeFilter} 
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="w-full bg-slate-900/80 hover:bg-slate-900 text-[10px] font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-lg border border-slate-800 focus:outline-none appearance-none cursor-pointer pr-8 tracking-wide transition-all"
                >
                  <option value="Last 24 Hours">Last 24 Hours</option>
                  <option value="Last 7 Days">Last 7 Days</option>
                  <option value="Last 30 Days">Last 30 Days</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Selector 3 */}
              <div className="relative">
                <select 
                  value={regionFilter} 
                  onChange={(e) => setRegionFilter(e.target.value)}
                  className="w-full bg-slate-900/80 hover:bg-slate-900 text-[10px] font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-lg border border-slate-800 focus:outline-none appearance-none cursor-pointer pr-8 tracking-wide transition-all"
                >
                  <option value="All Regions">All Regions</option>
                  <option value="Pacific Ocean">Pacific Ocean</option>
                  <option value="Atlantic Ocean">Atlantic Ocean</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Selector 4 */}
              <div className="relative">
                <select 
                  value={confidenceFilter} 
                  onChange={(e) => setConfidenceFilter(e.target.value)}
                  className="w-full bg-slate-900/80 hover:bg-slate-900 text-[10px] font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-lg border border-slate-800 focus:outline-none appearance-none cursor-pointer pr-8 tracking-wide transition-all"
                >
                  <option value="High">Confidence: High</option>
                  <option value="Medium">Confidence: Med</option>
                  <option value="All">Confidence: All</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Filters Button */}
              <button className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-lg py-2 px-3 text-[10px] font-bold text-slate-300 hover:text-white flex items-center justify-center space-x-1.5 transition-all cursor-pointer">
                <SlidersHorizontal className="w-3 h-3 text-teal-400" />
                <span>Filters</span>
              </button>

            </div>

            {/* Triple Interactive Stats Grid under selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Plastic Clusters */}
              <div 
                onClick={() => setSelectedAlertId("alert-1")}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedAlert.type === "plastic" 
                    ? "bg-slate-900/50 border-emerald-500/30 shadow-lg shadow-emerald-500/[0.02]" 
                    : "bg-slate-950 border-white/[0.03] hover:border-white/10"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <div className="grid grid-cols-2 gap-0.5">
                      <span className="w-1 h-1 bg-emerald-400 rounded-full" />
                      <span className="w-1 h-1 bg-emerald-400 rounded-full" />
                      <span className="w-1 h-1 bg-emerald-400 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[8.5px] font-mono tracking-wider text-slate-300 uppercase">Plastic Clusters</div>
                    <div className="text-lg font-black text-slate-100 mt-0.5">126</div>
                  </div>
                </div>
                <span className="text-[9px] font-bold font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 shrink-0">
                  +23 New
                </span>
              </div>

              {/* Illegal Mining */}
              <div 
                onClick={() => setSelectedAlertId("alert-2")}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedAlert.type === "mining" 
                    ? "bg-slate-900/50 border-rose-500/30 shadow-lg shadow-rose-500/[0.02]" 
                    : "bg-slate-950 border-white/[0.03] hover:border-white/10"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                    <Anchor className="w-4 h-4 text-rose-400" />
                  </div>
                  <div>
                    <div className="text-[8.5px] font-mono tracking-wider text-slate-300 uppercase">Illegal Mining</div>
                    <div className="text-lg font-black text-slate-100 mt-0.5">17</div>
                  </div>
                </div>
                <span className="text-[9px] font-bold font-mono text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20 shrink-0">
                  +5 New
                </span>
              </div>

              {/* Suspicious Ships */}
              <div 
                onClick={() => setSelectedAlertId("alert-3")}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedAlert.type === "ship" 
                    ? "bg-slate-900/50 border-cyan-500/30 shadow-lg shadow-cyan-500/[0.02]" 
                    : "bg-slate-950 border-white/[0.03] hover:border-white/10"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Navigation className="w-4 h-4 text-cyan-400 rotate-45" />
                  </div>
                  <div>
                    <div className="text-[8.5px] font-mono tracking-wider text-slate-300 uppercase">Suspicious Ships</div>
                    <div className="text-lg font-black text-slate-100 mt-0.5">43</div>
                  </div>
                </div>
                <span className="text-[9px] font-bold font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20 shrink-0">
                  +8 New
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Right Stack Area - AI Detection Alerts */}
        <div className="lg:col-span-3 flex flex-col gap-5">
          
          {/* Alerts Card */}
          <div className="flex-1 bg-slate-950/50 border border-white/[0.05] rounded-2xl p-5 md:p-6 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
            
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <h2 className="text-base font-bold text-slate-100 tracking-tight">AI Detection Alerts</h2>
              </div>
            </div>

            {/* Alert List Stack */}
            <div className="flex flex-col gap-3.5 flex-1 justify-start my-4">
              
              {alerts.map((alert) => {
                const isSelected = alert.id === selectedAlertId;
                let colorClass = "border-emerald-500/15 hover:bg-emerald-950/5";
                let textClass = "text-emerald-400";
                let bgClass = "bg-emerald-500/10 border-emerald-500/20";
                let iconGrid = (
                  <div className="grid grid-cols-2 gap-0.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  </div>
                );

                if (alert.type === "mining") {
                  colorClass = "border-rose-500/15 hover:bg-rose-950/5";
                  textClass = "text-rose-400";
                  bgClass = "bg-rose-500/10 border-rose-500/20";
                  iconGrid = <Anchor className="w-4 h-4 text-rose-400" />;
                } else if (alert.type === "ship") {
                  colorClass = "border-cyan-500/15 hover:bg-cyan-950/5";
                  textClass = "text-cyan-400";
                  bgClass = "bg-cyan-500/10 border-cyan-500/20";
                  iconGrid = <Navigation className="w-4 h-4 text-cyan-400 rotate-45" />;
                }

                if (isSelected) {
                  if (alert.type === "plastic") colorClass = "border-emerald-500/50 bg-emerald-950/10 shadow-lg shadow-emerald-500/[0.03]";
                  else if (alert.type === "mining") colorClass = "border-rose-500/50 bg-rose-950/10 shadow-lg shadow-rose-500/[0.03]";
                  else colorClass = "border-cyan-500/50 bg-cyan-950/10 shadow-lg shadow-cyan-500/[0.03]";
                }

                return (
                  <div 
                    key={alert.id}
                    onClick={() => setSelectedAlertId(alert.id)}
                    className={`p-4 border rounded-xl flex items-start space-x-3.5 cursor-pointer transition-all ${colorClass}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${bgClass}`}>
                      {iconGrid}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className={`text-xs font-bold ${textClass}`}>{alert.title}</h3>
                        <span className="text-[8.5px] font-mono text-slate-500 shrink-0">{alert.time}</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-400 mt-1.5 truncate">
                        {alert.desc}
                      </p>
                    </div>
                  </div>
                );
              })}

            </div>



          </div>

        </div>

      </div>

      {/* SECTION 4: NETWORK SPECS SUMMARY ROW */}
      <div className="bg-slate-950/50 border border-white/[0.05] rounded-2xl p-5 md:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-white/[0.04] pb-4 mb-5">
          <h2 className="text-base font-bold text-slate-100 tracking-tight">SAR Satellite Network</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
              <Radar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-black text-slate-100 tracking-tight">4</div>
              <p className="text-[10px] text-slate-300 font-medium">Active Satellites</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-black text-slate-100 tracking-tight">98%</div>
              <p className="text-[10px] text-slate-300 font-medium">Global Coverage</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-black text-slate-100 tracking-tight">2.1 hrs</div>
              <p className="text-[10px] text-slate-300 font-medium">Revisit Time</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-black text-slate-100 tracking-tight">24/7</div>
              <p className="text-[10px] text-slate-300 font-medium">Monitoring</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0 font-bold text-xs font-mono">
              AI
            </div>
            <div>
              <div className="text-xl font-black text-slate-100 tracking-tight">AI</div>
              <p className="text-[10px] text-slate-300 font-medium">Automated Analysis</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-black text-slate-100 tracking-tight">99.2%</div>
              <p className="text-[10px] text-slate-300 font-medium">Detection Accuracy</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
