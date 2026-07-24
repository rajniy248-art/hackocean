import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Radio, 
  Battery, 
  Zap, 
  Cpu, 
  Bell, 
  Thermometer, 
  Droplets, 
  Beaker, 
  Activity, 
  Layers, 
  ChevronDown, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Gauge, 
  Eye, 
  TrendingUp, 
  ArrowRight,
  Maximize2,
  Plus,
  Minus,
  RefreshCw,
  Info
} from "lucide-react";

interface SensorData {
  id: string;
  name: string;
  zone: string;
  location: string;
  temperature: number;
  salinity: number;
  pH: number;
  oxygen: number;
  turbidity: number;
  status: "Normal" | "Warning" | "Critical";
  riskType: string;
  probability?: number;
  area?: string;
  timeToImpact?: string;
  x: number; // map coordinates percent
  y: number;
  activeAlertMsg?: string;
}

export default function IoTSensorsPage() {
  const [selectedSensorId, setSelectedSensorId] = useState<string>("sensor-a7");
  const [sensorFilter, setSensorFilter] = useState<string>("All Sensors");
  const [paramFilter, setParamFilter] = useState<string>("All Parameters");
  const [mapZoom, setMapZoom] = useState<number>(1);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncSec, setLastSyncSec] = useState<number>(0);
  const [bubbleList, setBubbleList] = useState<{ id: number; left: number; delay: number; size: number }[]>([]);

  // Generate some persistent ambient bubbles for the buoy background
  useEffect(() => {
    const bubbles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 6,
      size: Math.random() * 4 + 2,
    }));
    setBubbleList(bubbles);

    // Sync timer increment
    const interval = setInterval(() => {
      setLastSyncSec(prev => (prev >= 59 ? 0 : prev + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const triggerManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncSec(0);
    }, 800);
  };

  const sensors: SensorData[] = [
    {
      id: "sensor-a7",
      name: "Coral Guardian Pod A7",
      zone: "Zone A7",
      location: "Northern Pacific Reef",
      temperature: 27.8,
      salinity: 35.1,
      pH: 8.02,
      oxygen: 5.9,
      turbidity: 1.8,
      status: "Critical",
      riskType: "Coral Bleaching Risk",
      probability: 82,
      area: "12.6 km²",
      timeToImpact: "48-72 hrs",
      x: 72,
      y: 58,
      activeAlertMsg: "High probability of bleaching detected in Zone A7. Immediate thermal mitigation recommended."
    },
    {
      id: "sensor-b3",
      name: "Garbage Patch Monitor B3",
      zone: "Zone B3",
      location: "Great Pacific Gyre",
      temperature: 23.1,
      salinity: 34.6,
      pH: 8.14,
      oxygen: 7.1,
      turbidity: 4.2,
      status: "Warning",
      riskType: "Microplastic Accumulation",
      probability: 94,
      area: "42.1 km²",
      timeToImpact: "Immediate Status",
      x: 35,
      y: 42,
      activeAlertMsg: "High concentration of microplastics detected in Zone B3 gyre current accumulation."
    },
    {
      id: "sensor-c1",
      name: "Deep Ocean Node C1",
      zone: "Zone C1",
      location: "Tasman Abyssal Plain",
      temperature: 21.4,
      salinity: 33.9,
      pH: 7.82,
      oxygen: 6.4,
      turbidity: 2.1,
      status: "Warning",
      riskType: "Water Quality Change",
      probability: 65,
      area: "8.4 km²",
      timeToImpact: "10-12 hrs",
      x: 52,
      y: 75,
      activeAlertMsg: "Sudden pH drop detected in Zone C1 abyss. Dynamic ecosystem threat monitored."
    },
    {
      id: "sensor-d2",
      name: "Galapagos Sanctuary Pod D2",
      zone: "Zone D2",
      location: "Galapagos Undercurrents",
      temperature: 24.6,
      salinity: 34.7,
      pH: 8.12,
      oxygen: 6.8,
      turbidity: 2.3,
      status: "Normal",
      riskType: "Ecosystem Stability",
      probability: 8,
      area: "N/A",
      timeToImpact: "Stable",
      x: 22,
      y: 52,
      activeAlertMsg: "Healthy bio-readouts. Dissolved oxygen levels optimal for pelagic species."
    }
  ];

  const selectedSensor = sensors.find(s => s.id === selectedSensorId) || sensors[0];

  const filteredSensors = sensors.filter(sensor => {
    if (sensorFilter === "High Risk" || sensorFilter === "Active Alerts") {
      return sensor.status !== "Normal";
    }
    return true;
  });

  return (
    <div className="w-full max-w-[1450px] mx-auto px-4 md:px-6 py-4 flex flex-col gap-8 select-none relative z-10 text-white font-sans">
      
      {/* SECTION 1: HERO CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Copy and Title */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-6 py-2">
          <div>
            <span className="text-teal-400 font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-bold mb-3 block">
              IoT Sensors Network
            </span>
            <h1 className="text-3xl md:text-[44px] font-extrabold leading-[1.1] tracking-tight text-white font-sans">
              Intelligent Monitoring. <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Predict. Protect. Preserve.
              </span>
            </h1>
            <p className="text-slate-200 text-sm md:text-base leading-relaxed mt-4 max-w-xl">
              Our IoT sensor network delivers real-time ocean intelligence with AI-powered analytics to detect risks early, prevent damage, and protect marine ecosystems.
            </p>
          </div>

          {/* Feature Row */}
          <div className="pt-2">
            
            <div className="flex items-start space-x-3.5 group max-w-md">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0 group-hover:scale-105 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-200 tracking-wide">AI-Powered Predictions</h3>
                <p className="text-[11px] text-slate-300 mt-1 leading-normal">Predictive risk heatmaps & anomaly detection</p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Futuristic Cylinder Buoy & Stacked Status Boxes */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
          
          {/* Animated 3D-Like Deep Sea Cylinder Buoy Pod replaced with Sentinel image and custom animations */}
          <div className="sm:col-span-7 h-[280px] bg-slate-950/60 rounded-2xl border border-white/[0.08] flex items-center justify-center relative overflow-hidden group shadow-2xl">
            
            {/* Ambient Seawater Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 via-transparent to-slate-950/90 z-10 pointer-events-none" />

            {/* Float / Bobbing container simulating ocean movement */}
            <motion.div
              animate={{ 
                y: [0, -6, 0],
                rotate: [0, 0.5, -0.5, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src="https://res.cloudinary.com/wzptbd4w/image/upload/v1784538087/2cd0877c-4fa1-4251-87d8-496bb683ad69_dt349o.png" 
                alt="Futuristic Sentinel Buoy" 
                className="w-full h-full object-cover scale-[1.02] filter brightness-[0.85] contrast-[1.05]"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Glowing Scan Telemetry Laser Line passing over the Sentinel */}
            <motion.div 
              animate={{ y: ["-10%", "300px"] }} 
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-teal-400/70 to-transparent shadow-[0_0_12px_rgba(45,212,191,0.8)] z-20 pointer-events-none" 
            />

            {/* Dynamic Active Signal Beacon target circle */}
            <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center">
              <span className="w-2.5 h-2.5 bg-teal-400 rounded-full shadow-[0_0_10px_#2dd4bf]" />
              <div className="absolute w-8 h-8 border border-teal-400/40 rounded-full animate-ping" style={{ animationDuration: "2s" }} />
              <div className="absolute w-14 h-14 border border-teal-400/20 rounded-full animate-ping" style={{ animationDuration: "3.5s" }} />
            </div>

            {/* HUD Bracket UI Elements for high-tech telemetry feeling */}
            <div className="absolute inset-4 border border-teal-500/10 pointer-events-none z-20 rounded-lg">
              {/* Corner accent lines */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-teal-400/50" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-teal-400/50" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-teal-400/50" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-teal-400/50" />
              
              {/* Telemetry info stamp */}
              <div className="absolute bottom-2 left-2 text-[8px] font-mono text-teal-400/60 bg-slate-950/80 px-1.5 py-0.5 rounded border border-teal-500/10">
                SENTINEL_ACTV // Z-A7
              </div>
            </div>

          </div>

          {/* Stacked Status Boxes */}
          <div className="sm:col-span-5 flex flex-col gap-3 h-full justify-center">
            
            {/* Live Status */}
            <div className="p-3.5 bg-slate-900/40 border border-white/[0.05] rounded-xl hover:border-teal-500/20 transition-all group shadow-sm flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[8px] font-mono tracking-wider text-slate-500 uppercase">Live Status</div>
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online</span>
                </div>
                <p className="text-[9px] text-slate-500 truncate mt-0.5">All Systems Operational</p>
              </div>
            </div>

            {/* Battery */}
            <div className="p-3.5 bg-slate-900/40 border border-white/[0.05] rounded-xl hover:border-teal-500/20 transition-all group shadow-sm flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <Battery className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[8px] font-mono tracking-wider text-slate-500 uppercase">Battery</div>
                <div className="text-xs font-bold text-slate-200 mt-0.5">78%</div>
                <p className="text-[9px] text-slate-500 truncate mt-0.5">Estimated: 42 Hours</p>
              </div>
            </div>

            {/* Data Stream */}
            <div className="p-3.5 bg-slate-900/40 border border-white/[0.05] rounded-xl hover:border-teal-500/20 transition-all group shadow-sm flex items-center space-x-3 relative overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                <Activity className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0 flex-1 z-10">
                <div className="text-[8px] font-mono tracking-wider text-slate-500 uppercase">Data Stream</div>
                <div className="text-xs font-bold text-teal-400 mt-0.5 flex items-center gap-1">
                  <span>Active</span>
                </div>
                <p className="text-[9px] text-slate-500 truncate mt-0.5">Last Sync: {lastSyncSec} sec ago</p>
              </div>
              
              {/* Micro sync reload button */}
              <button 
                onClick={triggerManualSync}
                className="absolute right-3 top-3.5 text-slate-500 hover:text-teal-400 transition-colors p-1"
                title="Sync telemetry"
              >
                <RefreshCw className={`w-3 h-3 ${isSyncing ? "animate-spin text-teal-400" : ""}`} />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* SECTION 2: BENTO GRID CAPABILITIES HERO ROW */}
      <div className="bg-slate-950/40 border border-white/[0.05] rounded-2xl p-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          
          <div className="p-4 bg-slate-900/15 hover:bg-slate-900/40 rounded-xl transition-all border border-transparent hover:border-white/[0.03] flex items-center space-x-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <div className="grid grid-cols-3 gap-0.5 p-0.5">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={`w-1 h-1 rounded-full ${i === 4 || i === 7 ? "bg-emerald-400" : "bg-emerald-700/60"}`} />
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[11.5px] font-bold text-slate-100">Predictive Risk Heatmaps</h4>
              <p className="text-[10px] text-slate-300 mt-0.5 leading-normal">AI generates real-time heatmaps to identify high-risk zones</p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/15 hover:bg-slate-900/40 rounded-xl transition-all border border-transparent hover:border-white/[0.03] flex items-center space-x-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
              <div className="flex flex-wrap w-5 h-5 items-center justify-center gap-0.5">
                <span className="w-1 h-1 rounded-full bg-amber-400 animate-ping" />
                <span className="w-1 h-1 rounded-full bg-amber-400" />
                <span className="w-1 h-1 rounded-full bg-amber-500" />
                <span className="w-1 h-1 rounded-full bg-amber-400" />
              </div>
            </div>
            <div>
              <h4 className="text-[11.5px] font-bold text-slate-100">Microplastic Alerts</h4>
              <p className="text-[10px] text-slate-300 mt-0.5 leading-normal">Detects microplastic accumulation and warns before it's critical</p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/15 hover:bg-slate-900/40 rounded-xl transition-all border border-transparent hover:border-white/[0.03] flex items-center space-x-4">
            <div className="w-10 h-10 rounded-lg bg-rose-500/5 border border-rose-500/10 flex items-center justify-center text-rose-400 shrink-0">
              <Activity className="w-5 h-5 animate-pulse text-rose-400" />
            </div>
            <div>
              <h4 className="text-[11.5px] font-bold text-slate-100">Coral Bleaching Alerts</h4>
              <p className="text-[10px] text-slate-300 mt-0.5 leading-normal">Monitors coral health and predicts bleaching events</p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/15 hover:bg-slate-900/40 rounded-xl transition-all border border-transparent hover:border-white/[0.03] flex items-center space-x-4">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/5 border border-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
              <Gauge className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-[11.5px] font-bold text-slate-100">Environmental Insights</h4>
              <p className="text-[10px] text-slate-300 mt-0.5 leading-normal">Track temperature, salinity, pH, oxygen, and more in real-time</p>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 3: MAIN DUAL COLUMN INTERACTIVE MONITORING PLATFORM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Interactive Terminal Grid - Real-time Ocean Intelligence */}
        <div className="lg:col-span-8 bg-slate-950/50 border border-white/[0.05] rounded-2xl p-5 md:p-6 flex flex-col gap-5 shadow-[0_12px_40px_rgba(0,0,0,0.4)] relative">
          
          {/* Section Header with Selectors */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.04] pb-4">
            <div className="flex items-center space-x-3">
              <h2 className="text-base md:text-lg font-bold text-slate-100 tracking-tight">
                Real-time Ocean Intelligence
              </h2>
              <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[9px] font-bold text-emerald-400 flex items-center gap-1 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Overview
              </span>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex items-center gap-2">
              
              {/* Dropdown 1 */}
              <div className="relative">
                <select 
                  value={sensorFilter} 
                  onChange={(e) => setSensorFilter(e.target.value)}
                  className="bg-slate-900/80 hover:bg-slate-900 text-[10.5px] font-medium text-slate-300 hover:text-white px-3.5 py-1.5 rounded-lg border border-slate-800 focus:outline-none appearance-none cursor-pointer pr-8 tracking-wide transition-all"
                >
                  <option value="All Sensors">All Sensors</option>
                  <option value="High Risk">High Risk</option>
                  <option value="Active Alerts">Active Alerts</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Dropdown 2 */}
              <div className="relative">
                <select 
                  value={paramFilter} 
                  onChange={(e) => setParamFilter(e.target.value)}
                  className="bg-slate-900/80 hover:bg-slate-900 text-[10.5px] font-medium text-slate-300 hover:text-white px-3.5 py-1.5 rounded-lg border border-slate-800 focus:outline-none appearance-none cursor-pointer pr-8 tracking-wide transition-all"
                >
                  <option value="All Parameters">All Parameters</option>
                  <option value="Temperature">Temperature</option>
                  <option value="Salinity">Salinity</option>
                  <option value="pH Level">pH Level</option>
                  <option value="Dissolved Oxygen">Dissolved Oxygen</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

            </div>
          </div>

          {/* Interactive Parameters sidebar + Map viewport */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch flex-1">
            
            {/* Left Metrics Column */}
            <div className="md:col-span-4 flex flex-col justify-between gap-3.5">
              
              <div className="flex flex-col gap-3.5">
                
                {/* Temperature */}
                <div 
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    paramFilter === "All Parameters" || paramFilter === "Temperature"
                      ? "bg-slate-900/40 border-slate-800 hover:border-teal-500/20"
                      : "opacity-40 bg-slate-950/20 border-transparent pointer-events-none"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Thermometer className="w-3.5 h-3.5 text-rose-400" />
                      Temperature
                    </span>
                    <span className="text-[9px] font-mono font-bold text-slate-500 bg-slate-950 px-1.5 py-0.5 rounded border border-white/[0.02]">
                      LIVE
                    </span>
                  </div>
                  <div className="text-xl font-black text-slate-100 tracking-tight mt-1">
                    {selectedSensor.temperature} <span className="text-slate-400 text-xs font-light">°C</span>
                  </div>
                </div>

                {/* Salinity */}
                <div 
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    paramFilter === "All Parameters" || paramFilter === "Salinity"
                      ? "bg-slate-900/40 border-slate-800 hover:border-teal-500/20"
                      : "opacity-40 bg-slate-950/20 border-transparent pointer-events-none"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                      Salinity
                    </span>
                    <span className="text-[9px] font-mono font-bold text-slate-500 bg-slate-950 px-1.5 py-0.5 rounded border border-white/[0.02]">
                      IN-SITU
                    </span>
                  </div>
                  <div className="text-xl font-black text-slate-100 tracking-tight mt-1">
                    {selectedSensor.salinity} <span className="text-slate-400 text-xs font-light">PSU</span>
                  </div>
                </div>

                {/* pH Level */}
                <div 
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    paramFilter === "All Parameters" || paramFilter === "pH Level"
                      ? "bg-slate-900/40 border-slate-800 hover:border-teal-500/20"
                      : "opacity-40 bg-slate-950/20 border-transparent pointer-events-none"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Beaker className="w-3.5 h-3.5 text-emerald-400" />
                      pH Level
                    </span>
                    <span className="text-[9px] font-mono font-bold text-emerald-500/70 bg-emerald-950/10 px-1.5 py-0.5 rounded border border-emerald-500/10">
                      CALIBRATED
                    </span>
                  </div>
                  <div className="text-xl font-black text-slate-100 tracking-tight mt-1">
                    {selectedSensor.pH}
                  </div>
                </div>

                {/* Dissolved Oxygen */}
                <div 
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    paramFilter === "All Parameters"
                      ? "bg-slate-900/40 border-slate-800 hover:border-teal-500/20"
                      : "opacity-40 bg-slate-950/20 border-transparent pointer-events-none"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-indigo-400" />
                      Dissolved Oxygen
                    </span>
                    <span className="text-[9px] font-mono font-bold text-slate-500 bg-slate-950 px-1.5 py-0.5 rounded border border-white/[0.02]">
                      TELEM
                    </span>
                  </div>
                  <div className="text-xl font-black text-slate-100 tracking-tight mt-1">
                    {selectedSensor.oxygen} <span className="text-slate-400 text-xs font-light">mg/L</span>
                  </div>
                </div>

                {/* Turbidity */}
                <div 
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    paramFilter === "All Parameters"
                      ? "bg-slate-900/40 border-slate-800 hover:border-teal-500/20"
                      : "opacity-40 bg-slate-950/20 border-transparent pointer-events-none"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-amber-400" />
                      Turbidity
                    </span>
                    <span className="text-[9px] font-mono font-bold text-slate-500 bg-slate-950 px-1.5 py-0.5 rounded border border-white/[0.02]">
                      NEPH
                    </span>
                  </div>
                  <div className="text-xl font-black text-slate-100 tracking-tight mt-1">
                    {selectedSensor.turbidity} <span className="text-slate-400 text-xs font-light">NTU</span>
                  </div>
                </div>

              </div>

              {/* View All CTA */}
              <button className="w-full py-2.5 bg-slate-950 border border-slate-800 hover:border-teal-500/30 text-slate-300 hover:text-white rounded-xl text-[10px] font-bold tracking-widest uppercase flex items-center justify-center space-x-2 cursor-pointer hover:shadow-lg hover:shadow-teal-500/[0.02] transition-all">
                <span>View All Parameters</span>
                <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
              </button>

            </div>

            {/* Interactive Custom SVG Heatmap Map (Center-Right column) */}
            <div className="md:col-span-8 bg-slate-950 rounded-xl border border-white/[0.03] overflow-hidden relative min-h-[360px] md:min-h-auto flex flex-col justify-between shadow-2xl">
              
              {/* Grid backdrop */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
              
              {/* Map Layer Container */}
              <div className="flex-1 relative overflow-hidden flex items-center justify-center">
                
                {/* SVG Map Base with Custom Heatmap Layers & Animating Hotspots */}
                <svg 
                  viewBox="0 0 1000 500" 
                  className="w-full h-full object-cover transition-transform duration-500 z-10 ease-out"
                  style={{ transform: `scale(${mapZoom})`, transformOrigin: "center center" }}
                >
                  {/* Ocean Background Image */}
                  <image 
                    href="https://res.cloudinary.com/wzptbd4w/image/upload/v1784536365/ocean_cfssqb.png"
                    x="0"
                    y="0"
                    width="1000"
                    height="500"
                    preserveAspectRatio="none"
                    opacity="0.8"
                  />

                  {/* Stylized Vector World Continents Contour Outline */}
                  <path 
                    d="M150,150 Q180,140 220,160 T300,120 T380,180 T400,280 Q320,380 250,420 Q200,380 180,300 T150,150 Z 
                       M500,100 Q580,80 650,120 T720,100 T800,180 T880,120 T950,220 Q920,380 820,440 Q750,400 680,420 T520,350 T500,100 Z
                       M380,360 Q420,380 440,420 T400,450 Z"
                    fill="none" 
                    stroke="rgba(45,212,191,0.06)" 
                    strokeWidth="2.5" 
                    strokeDasharray="6 4"
                  />
                  <path 
                    d="M150,150 Q180,140 220,160 T300,120 T380,180 T400,280 Q320,380 250,420 Q200,380 180,300 T150,150 Z 
                       M500,100 Q580,80 650,120 T720,100 T800,180 T880,120 T950,220 Q920,380 820,440 Q750,400 680,420 T520,350 T500,100 Z
                       M380,360 Q420,380 440,420 T400,450 Z"
                    fill="rgba(15,23,42,0.4)" 
                  />

                  {/* Heatmap Area 1 (Coral Bleaching Reef High Risk) */}
                  <g className="opacity-75">
                    <circle cx="720" cy="290" r="110" fill="url(#heatGradientRed)" />
                    <circle cx="700" cy="300" r="70" fill="url(#heatGradientOrange)" />
                    <circle cx="720" cy="290" r="35" fill="url(#heatGradientYellow)" />
                  </g>

                  {/* Heatmap Area 2 (Microplastics Warn Area) */}
                  <g className="opacity-65">
                    <circle cx="350" cy="210" r="130" fill="url(#heatGradientOrange)" />
                    <circle cx="340" cy="205" r="75" fill="url(#heatGradientYellow)" />
                    <circle cx="350" cy="210" r="40" fill="url(#heatGradientGreen)" />
                  </g>

                  {/* Heatmap Area 3 (Tasman Abyss Warn Area) */}
                  <g className="opacity-70">
                    <circle cx="520" cy="375" r="90" fill="url(#heatGradientOrange)" />
                    <circle cx="530" cy="365" r="50" fill="url(#heatGradientYellow)" />
                  </g>

                  {/* Definitions for gorgeous radial heat gradients */}
                  <defs>
                    <radialGradient id="heatGradientRed" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(239, 68, 68, 0.45)" />
                      <stop offset="60%" stopColor="rgba(239, 68, 68, 0.15)" />
                      <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
                    </radialGradient>
                    <radialGradient id="heatGradientOrange" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(245, 158, 11, 0.45)" />
                      <stop offset="60%" stopColor="rgba(245, 158, 11, 0.12)" />
                      <stop offset="100%" stopColor="rgba(245, 158, 11, 0)" />
                    </radialGradient>
                    <radialGradient id="heatGradientYellow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(253, 224, 71, 0.35)" />
                      <stop offset="60%" stopColor="rgba(253, 224, 71, 0.08)" />
                      <stop offset="100%" stopColor="rgba(253, 224, 71, 0)" />
                    </radialGradient>
                    <radialGradient id="heatGradientGreen" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" />
                      <stop offset="60%" stopColor="rgba(16, 185, 129, 0.05)" />
                      <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
                    </radialGradient>
                  </defs>
                </svg>

                {/* DOM Absolute Placed Overlay Hotspot Interactive Pins over the map */}
                {filteredSensors.map((sensor) => {
                  const isSelected = sensor.id === selectedSensorId;
                  
                  return (
                    <button
                      key={sensor.id}
                      onClick={() => setSelectedSensorId(sensor.id)}
                      className="absolute z-20 group cursor-pointer"
                      style={{ 
                        left: `${sensor.x}%`, 
                        top: `${sensor.y}%`,
                        transform: `scale(${mapZoom === 1 ? 1 : 1 / (mapZoom * 0.7)}) translate(-50%, -50%)`,
                        transformOrigin: "center center"
                      }}
                    >
                      <div className="relative flex items-center justify-center">
                        {/* Ripple pulses */}
                        <div className={`absolute w-8 h-8 rounded-full animate-ping ${
                          sensor.status === "Critical" ? "bg-rose-500/25" :
                          sensor.status === "Warning" ? "bg-amber-500/25" :
                          "bg-teal-500/20"
                        }`} style={{ animationDuration: "3s" }} />
                        <div className={`absolute w-5 h-5 rounded-full animate-ping ${
                          sensor.status === "Critical" ? "bg-rose-500/35" :
                          sensor.status === "Warning" ? "bg-amber-500/35" :
                          "bg-teal-500/30"
                        }`} style={{ animationDuration: "1.8s" }} />

                        {/* Center Pin node */}
                        <div className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow-xl flex items-center justify-center relative z-10 transition-transform duration-300 ${
                          isSelected ? "scale-125" : "group-hover:scale-110"
                        } ${
                          sensor.status === "Critical" ? "bg-rose-500 shadow-rose-500/50" :
                          sensor.status === "Warning" ? "bg-amber-500 shadow-amber-500/50" :
                          "bg-emerald-500 shadow-emerald-500/50"
                        }`}>
                          <div className="w-1 h-1 bg-white rounded-full" />
                        </div>

                        {/* Little label beacon with zone tag */}
                        <div className={`absolute top-5 bg-slate-950/95 border px-1.5 py-0.5 rounded text-[7.5px] font-mono tracking-wider transition-colors whitespace-nowrap ${
                          isSelected ? "text-teal-400 border-teal-500/40" : "text-slate-400 border-white/[0.04]"
                        }`}>
                          {sensor.zone}
                        </div>
                      </div>
                    </button>
                  );
                })}

                {/* Rich overlay dialog showing information on current selection */}
                <AnimatePresence mode="wait">
                  {selectedSensor && (
                    <motion.div 
                      key={selectedSensor.id}
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-[270px] bg-slate-950/95 border border-white/10 rounded-xl p-4 shadow-[0_15px_30px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.04)] backdrop-blur-md z-30 flex flex-col gap-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 rounded-md text-[8.5px] font-bold tracking-wider uppercase ${
                          selectedSensor.status === "Critical" ? "bg-rose-500/10 border border-rose-500/25 text-rose-400" :
                          selectedSensor.status === "Warning" ? "bg-amber-500/10 border border-amber-500/25 text-amber-400" :
                          "bg-emerald-500/10 border border-emerald-500/25 text-emerald-400"
                        }`}>
                          {selectedSensor.riskType}
                        </span>
                        
                        {/* Status Icon */}
                        {selectedSensor.status !== "Normal" ? (
                          <AlertTriangle className={`w-3.5 h-3.5 ${selectedSensor.status === "Critical" ? "text-rose-400" : "text-amber-400 animate-pulse"}`} />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400">{selectedSensor.name}</span>
                        <span className="text-[8.5px] font-mono text-slate-500 uppercase tracking-widest mt-0.5">{selectedSensor.location}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 border-t border-white/[0.04] pt-2.5 text-[10px]">
                        <div>
                          <span className="text-slate-500 block">Probability:</span>
                          <span className={`font-mono font-bold ${
                            selectedSensor.status === "Critical" ? "text-rose-400" :
                            selectedSensor.status === "Warning" ? "text-amber-400" :
                            "text-emerald-400"
                          }`}>{selectedSensor.probability}%</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Area:</span>
                          <span className="font-semibold text-slate-300">{selectedSensor.area}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-slate-500 block">Time to Impact:</span>
                          <span className="font-mono font-medium text-teal-300">{selectedSensor.timeToImpact}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* Map footer with Risk Level and map Zoom tools */}
              <div className="p-3.5 bg-slate-900/40 border-t border-white/[0.03] z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 select-none relative">
                
                {/* Risk Slider Legend */}
                <div className="flex flex-col gap-1.5">
                  <div className="text-[8.5px] font-mono tracking-wider text-slate-300 uppercase">Risk Level</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[8.5px] font-mono text-slate-300">Low</span>
                    <div className="w-36 h-1.5 rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500 border border-white/[0.05]" />
                    <span className="text-[8.5px] font-mono text-slate-300">Severe</span>
                  </div>
                </div>

                {/* Dynamic Map Coordinates helper */}
                <div className="hidden md:flex items-center space-x-2 text-[9px] font-mono text-slate-300">
                  <Maximize2 className="w-3 h-3 text-slate-400" />
                  <span>PROJECTION: MERCATOR (MGA94)</span>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center space-x-1.5 self-end sm:self-auto bg-slate-950 p-1.5 rounded-lg border border-white/[0.05]">
                  <button 
                    onClick={() => setMapZoom(prev => Math.min(2.5, prev + 0.25))}
                    className="w-6 h-6 rounded bg-slate-900 border border-slate-800 hover:border-teal-500/30 text-slate-300 hover:text-white flex items-center justify-center hover:scale-105 transition-all cursor-pointer"
                    title="Zoom In"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                  <span className="px-2 font-mono text-[9px] font-bold text-slate-400">{Math.round(mapZoom * 100)}%</span>
                  <button 
                    onClick={() => setMapZoom(prev => Math.max(1, prev - 0.25))}
                    className="w-6 h-6 rounded bg-slate-900 border border-slate-800 hover:border-teal-500/30 text-slate-300 hover:text-white flex items-center justify-center hover:scale-105 transition-all cursor-pointer"
                    title="Zoom Out"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Right Stack Area - AI-Powered Alerts */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          
          {/* Alerts Card */}
          <div className="flex-1 bg-slate-950/50 border border-white/[0.05] rounded-2xl p-5 md:p-6 flex flex-col gap-5 shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
            
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <h2 className="text-base font-bold text-slate-100 tracking-tight">AI-Powered Alerts</h2>
              </div>
            </div>

            {/* Alert List Stack */}
            <div className="flex flex-col gap-3.5 flex-1 justify-start">
              
              {/* Alert 1: Coral Bleaching Risk */}
              <div 
                onClick={() => setSelectedSensorId("sensor-a7")}
                className={`p-4 bg-rose-950/[0.04] border rounded-xl flex items-start space-x-3.5 hover:bg-rose-950/10 cursor-pointer transition-all ${
                  selectedSensorId === "sensor-a7" 
                    ? "border-rose-500/50 shadow-lg shadow-rose-500/[0.03]" 
                    : "border-rose-500/15"
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs font-bold text-rose-400">Coral Bleaching Risk</h3>
                    <span className="text-[8.5px] font-mono text-slate-500 shrink-0">2 min ago</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-400 mt-1.5">
                    High probability of bleaching detected in <span className="font-semibold text-rose-300">Zone A7</span>. Immediate monitoring recommended.
                  </p>
                </div>
              </div>

              {/* Alert 2: Microplastics Accumulation */}
              <div 
                onClick={() => setSelectedSensorId("sensor-b3")}
                className={`p-4 bg-amber-950/[0.03] border rounded-xl flex items-start space-x-3.5 hover:bg-amber-950/10 cursor-pointer transition-all ${
                  selectedSensorId === "sensor-b3" 
                    ? "border-amber-500/50 shadow-lg shadow-amber-500/[0.03]" 
                    : "border-amber-500/15"
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs font-bold text-amber-400">Microplastic Accumulation</h3>
                    <span className="text-[8.5px] font-mono text-slate-500 shrink-0">5 min ago</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-400 mt-1.5">
                    High concentration of microplastics detected in <span className="font-semibold text-amber-300">Zone B3</span>. Accumulation rate increasing.
                  </p>
                </div>
              </div>

              {/* Alert 3: Water Quality Change */}
              <div 
                onClick={() => setSelectedSensorId("sensor-c1")}
                className={`p-4 bg-teal-950/[0.03] border rounded-xl flex items-start space-x-3.5 hover:bg-teal-950/10 cursor-pointer transition-all ${
                  selectedSensorId === "sensor-c1" 
                    ? "border-teal-500/50 shadow-lg shadow-teal-500/[0.03]" 
                    : "border-teal-500/15"
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                  <Beaker className="w-4 h-4 text-teal-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs font-bold text-teal-400">Water Quality Change</h3>
                    <span className="text-[8.5px] font-mono text-slate-500 shrink-0">10 min ago</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-400 mt-1.5">
                    Sudden pH shift detected in <span className="font-semibold text-teal-300">Zone C1</span>. Levels currently sitting outside standard range.
                  </p>
                </div>
              </div>

            </div>

            {/* Quick action details info panel on alert */}
            <div className="p-3.5 bg-slate-900/30 border border-white/[0.04] rounded-xl flex items-center space-x-3 text-slate-200 text-[10.5px]">
              <Info className="w-4 h-4 text-teal-400 shrink-0 animate-pulse" />
              <p className="leading-snug">
                Clicking an alert matches the map projection focus coordinate and shifts telemetry parameters.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* SECTION 4: NETWORK STATISTICS SUMMARY ROW */}
      <div className="bg-slate-950/50 border border-white/[0.05] rounded-2xl p-5 md:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-white/[0.04] pb-4 mb-5">
          <h2 className="text-base font-bold text-slate-100 tracking-tight">Our IoT Sensor Network</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          
          <div className="flex items-center space-x-3.5 p-1.5 rounded-xl hover:bg-white/[0.01] transition-all">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl md:text-2xl font-black text-slate-100 tracking-tight">126</div>
              <div className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-wider">Active Sensors</div>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-1.5 rounded-xl hover:bg-white/[0.01] transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl md:text-2xl font-black text-slate-100 tracking-tight">98.7%</div>
              <div className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-wider">Network Uptime</div>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-1.5 rounded-xl hover:bg-white/[0.01] transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: "12s" }} />
            </div>
            <div>
              <div className="text-xl md:text-2xl font-black text-slate-100 tracking-tight">24/7</div>
              <div className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-wider">Data Monitoring</div>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-1.5 rounded-xl hover:bg-white/[0.01] transition-all">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl md:text-2xl font-black text-slate-100 tracking-tight">15</div>
              <div className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-wider">High Risk Zones</div>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-1.5 rounded-xl hover:bg-white/[0.01] transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl md:text-2xl font-black text-slate-100 tracking-tight">3</div>
              <div className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-wider">Active Alerts</div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
