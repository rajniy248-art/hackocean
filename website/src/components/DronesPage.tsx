import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, 
  Cpu, 
  Globe2, 
  LineChart, 
  ShieldAlert, 
  Layers, 
  Eye, 
  Compass, 
  Play, 
  ArrowRight, 
  Navigation,
  Database,
  Search,
  CheckCircle,
  TrendingUp,
  Thermometer,
  Droplets,
  Gauge,
  Sliders,
  Maximize2,
  Minimize2,
  RefreshCw,
  Info
} from "lucide-react";

// Drone Specification Data
interface DroneModel {
  id: string;
  name: string;
  subtitle: string;
  endurance: string;
  depthRating: string;
  payload: string;
  color: string;
  status: string;
}

export default function DronesPage() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeSpecDrone, setActiveSpecDrone] = useState<string>("explorer");
  const [sonarRadarActive, setSonarRadarActive] = useState<boolean>(true);
  const [telemetry, setTelemetry] = useState({
    depth: 2450,
    speed: 3.2,
    heading: 184,
    temp: 2.4,
    salinity: 34.7,
  });

  // Keep telemetry dynamically ticking to simulate real-time live feed
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        depth: prev.depth + (Math.random() > 0.5 ? 1 : -1),
        speed: parseFloat((prev.speed + (Math.random() - 0.5) * 0.1).toFixed(1)),
        heading: (prev.heading + (Math.random() > 0.6 ? 1 : -1) + 360) % 360,
        temp: parseFloat((prev.temp + (Math.random() - 0.5) * 0.05).toFixed(2)),
        salinity: parseFloat((prev.salinity + (Math.random() - 0.5) * 0.02).toFixed(1)),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const droneFleet: DroneModel[] = [
    {
      id: "explorer",
      name: "Guardian H2 Explorer",
      subtitle: "Long-Endurance Explorer",
      endurance: "72+ Hours",
      depthRating: "6000m",
      payload: "Multi-beam Sonar, 4K Camera, CTD",
      color: "from-teal-400 to-emerald-500",
      status: "Active",
    },
    {
      id: "surveyor",
      name: "Guardian H2 Surveyor",
      subtitle: "High-Resolution Mapper",
      endurance: "48+ Hours",
      depthRating: "4000m",
      payload: "Side Scan Sonar, Sub-bottom Profiler",
      color: "from-cyan-400 to-blue-500",
      status: "Standby",
    },
    {
      id: "observer",
      name: "Guardian H2 Observer",
      subtitle: "AI Imaging Specialist",
      endurance: "36+ Hours",
      depthRating: "3000m",
      payload: "AI Camera Suite, Holographic Sonar",
      color: "from-amber-400 to-orange-500",
      status: "Mapping",
    },
    {
      id: "scout",
      name: "Guardian H2 Scout",
      subtitle: "Rapid Response Drone",
      endurance: "24+ Hours",
      depthRating: "2000m",
      payload: "HD Camera, Environmental Sensors",
      color: "from-indigo-400 to-purple-500",
      status: "Docked",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-4 mb-20 relative text-slate-100 selection:bg-teal-500/30">
      
      {/* SECTION 1: HERO CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2 pb-16">
        
        {/* Left Column: Title & Intro */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs font-semibold tracking-[0.25em] text-teal-400 uppercase">
              Our Drones
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-5xl leading-[1.1] tracking-tight">
              Intelligent Drones. <br />
              <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent font-black">
                Advanced Missions.
              </span>
            </h1>
          </div>

          <p className="text-sm md:text-[15px] text-slate-400 leading-relaxed font-normal">
            Our next-generation AUVs combine autonomous intelligence, clean hydrogen propulsion, and AI-powered imaging to explore deeper, smarter, and safer than ever before.
          </p>

          {/* Core USP Bullet Checklist */}
          <div className="space-y-4 pt-1">
            {[
              { text: "Autonomous & Adaptive", desc: "Real-time decision making in extreme depths." },
              { text: "AI-Powered Perception", desc: "Object classification and neural sonar maps." },
              { text: "Hydrogen-Powered Endurance", desc: "Clean power harvested from marine cells." },
              { text: "Real-time Data & 3D Reconstruction", desc: "Live high-density telemetry streaming." }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start space-x-3 group">
                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full border border-teal-500/30 bg-teal-950/40 flex items-center justify-center text-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.2)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200 group-hover:text-teal-300 transition-colors">
                    {item.text}
                  </h4>
                </div>
              </div>
            ))}
          </div>


        </div>

        {/* Center Column: Futuristic Submarine Drone Illustration */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[400px] bg-slate-950/20 rounded-3xl border border-white/[0.04] overflow-hidden p-4">
          
          {/* Sonar Depth Grid Rings Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-[120%] h-[120%] rounded-full border border-teal-500/10 animate-spin" style={{ animationDuration: "60s" }} />
            <div className="w-[90%] h-[90%] rounded-full border border-dashed border-cyan-500/10 absolute" />
            <div className="w-[60%] h-[60%] rounded-full border border-emerald-500/10 absolute" />
          </div>

          {/* Underwater glowing light beam */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-[120%] bg-gradient-to-b from-teal-500/[0.06] to-transparent filter blur-2xl transform rotate-12 pointer-events-none" />

          {/* Interactive Submarine Vector Drone */}
          <div className="relative w-full max-w-[420px] h-[300px] flex items-center justify-center z-10 select-none">
            
            {/* Soft bioluminescent glow behind AUV */}
            <div className="absolute w-48 h-20 rounded-full bg-teal-400/25 blur-[50px] animate-pulse" />

            {/* Submarine body with custom SVG for total design control */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Leader Line Labels */}
              <div className="absolute -top-4 left-10 text-[10px] font-mono text-teal-400/80 bg-slate-900/90 px-2 py-1 rounded border border-teal-500/20 backdrop-blur-sm flex items-center gap-1.5 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                <span>MULTIBEAM SONAR ARRAY</span>
              </div>
              <div className="absolute top-[210px] right-2 text-[10px] font-mono text-cyan-400/80 bg-slate-900/90 px-2 py-1 rounded border border-cyan-500/20 backdrop-blur-sm flex items-center gap-1.5 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>H₂ FUEL MODULE</span>
              </div>

              {/* Autoplay looping video of the underwater drone */}
              <video 
                src="https://res.cloudinary.com/wzptbd4w/video/upload/v1784535930/create_video_of_this_picture_b_kl8vnu.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(45,212,191,0.15)] bg-slate-950/40"
              />

              {/* Animated exhaust micro-bubbles */}
              <div className="absolute right-4 top-1/2 flex flex-col space-y-2 select-none">
                <span className="w-1.5 h-1.5 bg-cyan-400/40 rounded-full animate-ping" style={{ animationDelay: "0.2s" }} />
                <span className="w-2.5 h-2.5 bg-teal-400/30 rounded-full animate-ping" style={{ animationDelay: "0.5s" }} />
                <span className="w-1 h-1 bg-white/20 rounded-full animate-ping" style={{ animationDelay: "0.9s" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: ADVANCED FEATURES list */}
        <div className="lg:col-span-3 flex flex-col justify-center space-y-4">
          <h3 className="font-mono text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase mb-2 border-l-2 border-teal-500 pl-3">
            Advanced Features
          </h3>

          {[
            {
              icon: Cpu,
              title: "Hydrogen Fuel System",
              desc: "Onboard system converts seawater into hydrogen fuel for ultra-long endurance.",
              accent: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5"
            },
            {
              icon: Eye,
              title: "AI Vision & Sonar Fusion",
              desc: "AI models analyze holographic sonar data to detect, classify, and understand marine life.",
              accent: "text-teal-400 border-teal-500/20 bg-teal-500/5"
            },
            {
              icon: Layers,
              title: "3D Reconstruction",
              desc: "Generates accurate, colorful 3D models of deep-sea species and habitats in real-time.",
              accent: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5"
            },
            {
              icon: Compass,
              title: "Adaptive Autonomy",
              desc: "Advanced navigation and mission planning for complex underwater environments.",
              accent: "text-amber-400 border-amber-500/20 bg-amber-500/5"
            }
          ].map((feature, i) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-slate-950/35 backdrop-blur-xl border border-white/[0.06] hover:border-teal-500/30 rounded-xl p-4 flex items-start space-x-3.5 transition-all duration-300 group shadow-md"
              >
                <div className={`p-2.5 rounded-lg border flex-shrink-0 transition-transform group-hover:scale-105 ${feature.accent}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold tracking-wide text-slate-100 group-hover:text-teal-300 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-[11px] leading-relaxed text-slate-400">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: AI-POWERED PERCEPTION (Middle Dashboard Grid) */}
      <div className="border-t border-white/[0.06] pt-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Flow of process steps */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-xs font-semibold tracking-wider text-teal-400 uppercase">
                AI-Powered Perception
              </span>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                Our drones use holographic sonar and AI models to scan, analyze, and reconstruct detailed 3D models of deep-sea species and ecosystems.
              </p>
            </div>

            {/* Horizontal connected process flowcards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
              {[
                {
                  step: "1",
                  title: "1. Holographic Sonar Scan",
                  desc: "Captures high-resolution acoustic data",
                  color: "border-cyan-500/20 bg-cyan-950/20 text-cyan-400",
                  visual: (
                    <div className="w-full h-12 relative flex items-center justify-center overflow-hidden">
                      {/* Interactive Sonar Sweep Cone */}
                      <div className="w-10 h-10 rounded-full border border-cyan-500/20 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full border border-dashed border-cyan-400/40 animate-ping" />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      </div>
                    </div>
                  )
                },
                {
                  step: "2",
                  title: "2. AI Analysis",
                  desc: "AI model detects and classifies species",
                  color: "border-teal-500/20 bg-teal-950/20 text-teal-400",
                  visual: (
                    <div className="w-full h-12 relative flex items-center justify-center overflow-hidden font-mono text-[9px] text-teal-400/80">
                      <div className="flex flex-col items-center justify-center text-center">
                        <span className="animate-pulse">[AI MESH_v2]</span>
                        <span className="text-[7px] text-slate-300">CONFIDENCE: 99.4%</span>
                      </div>
                    </div>
                  )
                },
                {
                  step: "3",
                  title: "3. 3D Reconstruction",
                  desc: "Generates accurate 3D models in real-time",
                  color: "border-blue-500/20 bg-blue-950/20 text-blue-400",
                  visual: (
                    <div className="w-full h-12 relative flex items-center justify-center overflow-hidden">
                      <div className="w-10 h-8 border border-blue-400/30 rounded flex flex-wrap items-center justify-center gap-1 p-0.5">
                        <div className="w-1.5 h-1.5 bg-blue-400/50 rounded-sm" />
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-sm" />
                        <div className="w-1.5 h-1.5 bg-blue-400/20 rounded-sm" />
                      </div>
                    </div>
                  )
                },
                {
                  step: "4",
                  title: "4. Colorized Model",
                  desc: "AI adds color and texture for realistic visualization",
                  color: "border-emerald-500/20 bg-emerald-950/20 text-emerald-400",
                  visual: (
                    <div className="w-full h-12 relative flex items-center justify-center overflow-hidden">
                      <div className="w-9 h-6 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full filter blur-[2px] opacity-80 animate-pulse" />
                    </div>
                  )
                }
              ].map((stepItem, idx) => (
                <div 
                  key={idx} 
                  className={`border rounded-xl p-3 flex flex-col justify-between space-y-3 cursor-pointer transition-all duration-300 shadow-md ${
                    activeStep === idx 
                      ? "border-teal-400 bg-slate-900/80 shadow-[0_4px_20px_rgba(45,212,191,0.15)] ring-1 ring-teal-400/30" 
                      : "border-white/[0.06] bg-slate-950/40 hover:border-slate-700 hover:bg-slate-900/20"
                  }`}
                  onClick={() => setActiveStep(idx)}
                >
                  <div className="space-y-1">
                    <span className="block text-[10px] font-mono font-bold tracking-wide text-slate-300">
                      {stepItem.title}
                    </span>
                    <p className="text-[9.5px] leading-snug text-slate-300">
                      {stepItem.desc}
                    </p>
                  </div>
                  {stepItem.visual}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Holographic HUD Diagnostics Panel */}
          <div className="lg:col-span-6 bg-[#030712]/80 backdrop-blur-2xl rounded-2xl border border-white/[0.08] overflow-hidden p-6 shadow-2xl relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/[0.02] rounded-full blur-3xl pointer-events-none" />

            {/* Hud Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5 mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">
                  RAW STREAMING TELEMETRY FEED
                </span>
              </div>
              <button 
                onClick={() => setSonarRadarActive(!sonarRadarActive)}
                className="font-mono text-[9px] text-teal-400 hover:text-teal-300 border border-teal-400/20 bg-teal-400/5 px-2 py-0.5 rounded transition-all"
              >
                {sonarRadarActive ? "DISABLE SONAR" : "ACTIVATE SONAR"}
              </button>
            </div>

            {/* HUD Content Grid */}
            <div className="grid grid-cols-12 gap-6 items-center">
              
              {/* Telemetry Numbers left side */}
              <div className="col-span-4 space-y-4">
                <div className="bg-slate-950/60 border border-white/[0.04] p-3 rounded-lg">
                  <div className="font-mono text-[9px] text-slate-500 uppercase">DEPTH</div>
                  <div className="text-xl font-bold font-mono text-white mt-0.5 tracking-tight">
                    {telemetry.depth} <span className="text-xs text-teal-400 font-normal">m</span>
                  </div>
                </div>

                <div className="bg-slate-950/60 border border-white/[0.04] p-3 rounded-lg">
                  <div className="font-mono text-[9px] text-slate-500 uppercase">SPEED</div>
                  <div className="text-xl font-bold font-mono text-white mt-0.5 tracking-tight">
                    {telemetry.speed} <span className="text-xs text-cyan-400 font-normal">kn</span>
                  </div>
                </div>

                <div className="bg-slate-950/60 border border-white/[0.04] p-3 rounded-lg">
                  <div className="font-mono text-[9px] text-slate-500 uppercase">HEADING</div>
                  <div className="text-xl font-bold font-mono text-white mt-0.5 tracking-tight">
                    {telemetry.heading}° <span className="text-xs text-amber-400 font-normal">NNE</span>
                  </div>
                </div>

                <div className="bg-slate-950/60 border border-white/[0.04] p-3 rounded-lg">
                  <div className="font-mono text-[9px] text-slate-500 uppercase">TEMPERATURE</div>
                  <div className="text-xl font-bold font-mono text-white mt-0.5 tracking-tight">
                    {telemetry.temp} <span className="text-xs text-rose-400 font-normal">°C</span>
                  </div>
                </div>
              </div>

              {/* Holographic Sonar display right side */}
              <div className="col-span-8 flex flex-col items-center justify-center relative bg-slate-950/50 rounded-xl border border-white/[0.04] p-4 min-h-[260px] overflow-hidden">
                
                {/* Coral background image */}
                <div className="absolute inset-0 pointer-events-none z-0">
                  <img 
                    src="https://res.cloudinary.com/wzptbd4w/image/upload/v1784537741/corals_gd1cu9.png" 
                    alt="Deep sea corals" 
                    className="w-full h-full object-cover opacity-60 filter saturate-[1.3] brightness-[0.7] contrast-[1.15]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Radial gradient vignette to highlight the center radar sweep while blending outer edges */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,#020617_90%)] opacity-85" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
                </div>

                {/* Sonar sweep line overlay */}
                {sonarRadarActive && (
                  <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-xl">
                    <div className="w-full h-full bg-gradient-to-r from-transparent via-teal-400/10 to-transparent absolute -left-full animate-[shimmer_3s_infinite]" />
                    <div className="w-[100%] h-[100%] origin-center rotate-[64deg] absolute left-0 top-0 bg-gradient-to-t from-teal-400/[0.05] via-transparent to-transparent animate-spin" style={{ animationDuration: "8s" }} />
                  </div>
                )}

                {/* Simulated radar rings */}
                <div className="w-48 h-48 rounded-full border border-dashed border-teal-500/15 flex items-center justify-center relative">
                  <div className="w-36 h-36 rounded-full border border-teal-500/20 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border border-teal-500/30 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full border border-dashed border-teal-400/40" />
                    </div>
                  </div>

                  {/* Dynamic Bioluminescent Coral lifeform centered in the scan */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <motion.div 
                      animate={{ 
                        scale: [0.95, 1.05, 0.95],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 8, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-28 h-28 flex items-center justify-center pointer-events-none"
                    >
                      {/* Bioluminescent Coral Glow using modern organic SVG */}
                      <svg viewBox="0 0 100 100" className="w-full h-full text-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.5)]">
                        {/* Interactive Coral branches */}
                        <path d="M 50 90 Q 48 60 40 40 Q 38 30 45 20" fill="none" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M 50 90 Q 52 65 62 48 Q 72 35 68 22" fill="none" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M 40 40 Q 25 35 20 25" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 62 48 Q 78 45 82 30" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 50 90 Q 50 70 50 50 Q 50 35 52 10" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" />

                        {/* Floating micro-biomaterial points */}
                        <circle cx="45" cy="20" r="1.5" fill="#a7f3d0" className="animate-ping" />
                        <circle cx="68" cy="22" r="1.5" fill="#a7f3d0" />
                        <circle cx="20" cy="25" r="1" fill="#bae6fd" />
                        <circle cx="82" cy="30" r="1" fill="#bae6fd" />
                        <circle cx="52" cy="10" r="2" fill="#2dd4bf" className="animate-ping" />
                      </svg>
                    </motion.div>
                  </div>
                </div>

                {/* Sub-label for coral life detected */}
                <div className="absolute bottom-2 font-mono text-[9px] tracking-widest text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20 shadow">
                  SPECIES: LOPHELIA PERTUSA CORAL (98.2% MATCH)
                </div>
              </div>
            </div>

            {/* Bottom mini diagnostics buttons row */}
            <div className="grid grid-cols-5 gap-2 mt-4 pt-4 border-t border-white/[0.04]">
              {["GRID", "3D ENV", "SONAR", "CHART", "EXPORT"].map((btnName, i) => (
                <button 
                  key={i}
                  className="font-mono text-[8px] py-1 bg-slate-900 border border-white/[0.05] hover:border-teal-500/20 text-slate-400 hover:text-white rounded transition-all"
                >
                  {btnName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: OUR ADVANCED DRONE FLEET */}
      <div className="border-t border-white/[0.06] pt-12 pb-16">
        <div className="text-center space-y-3 mb-10">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-white">
            Our Advanced Drone Fleet
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto" />
          <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
            Four specialized deep-ocean explorer units engineered for ultra-deep hydro-pressure operations.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {droneFleet.map((drone) => {
            const isSelected = activeSpecDrone === drone.id;
            
            // Map each drone to its unique high-quality image URL
            const droneImages: Record<string, string> = {
              explorer: "/src/assets/images/regenerated_image_1784540450540.png",
              surveyor: "/src/assets/images/regenerated_image_1784540452502.png",
              observer: "/src/assets/images/regenerated_image_1784540454457.png",
              scout: "/src/assets/images/regenerated_image_1784540456079.png"
            };

            return (
              <motion.div
                key={drone.id}
                whileHover={{ y: -4 }}
                onClick={() => setActiveSpecDrone(drone.id)}
                className={`group cursor-pointer p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between min-h-[410px] relative overflow-hidden ${
                  isSelected
                    ? "bg-slate-900/50 border-teal-500/40 shadow-xl shadow-teal-500/[0.03] ring-1 ring-teal-400/20"
                    : "bg-slate-950/20 border-white/[0.06] hover:border-slate-800"
                }`}
              >
                {/* Tech scan grid pattern overlay for active item */}
                {isSelected && (
                  <div className="absolute inset-0 z-1 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:10px_10px] opacity-40 pointer-events-none" />
                )}

                <div className="relative z-10 flex flex-col justify-between h-full flex-1">
                  <div>
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[9px] font-mono tracking-widest px-2 py-0.5 rounded border ${
                        drone.status === "Active" ? "text-emerald-400 border-emerald-500/25 bg-emerald-500/5" :
                        drone.status === "Mapping" ? "text-amber-400 border-amber-500/25 bg-amber-500/5" :
                        "text-slate-400 border-white/[0.05] bg-white/[0.02]"
                      }`}>
                        {drone.status}
                      </span>
                      <span className="font-mono text-[9px] text-slate-300">#{drone.id.toUpperCase()}-v3</span>
                    </div>

                    {/* Integrated Dedicated Drone Image Frame */}
                    <div className="relative w-full h-36 rounded-lg overflow-hidden border border-white/[0.08] mb-4 bg-slate-950 flex items-center justify-center">
                      <img 
                        src={droneImages[drone.id]} 
                        alt={drone.name} 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      {/* High-tech telemetry viewfinder frame corner accents */}
                      <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-teal-400/30" />
                      <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-teal-400/30" />
                      <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-teal-400/30" />
                      <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-teal-400/30" />
                    </div>

                    <h3 className="font-display font-bold text-[15px] text-slate-100 mb-1 group-hover:text-teal-300 transition-colors">
                      {drone.name}
                    </h3>
                    <span className="text-[11px] font-medium text-teal-400/90 block mb-4">
                      {drone.subtitle}
                    </span>

                    {/* Specs list with inline technical styling */}
                    <div className="space-y-3 pt-2 text-xs border-t border-white/[0.04]">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300 font-mono text-[10px]">ENDURANCE:</span>
                        <span className="text-slate-300 font-semibold">{drone.endurance}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300 font-mono text-[10px]">DEPTH RATING:</span>
                        <span className="text-slate-300 font-semibold">{drone.depthRating}</span>
                      </div>
                      <div className="flex flex-col gap-1 pt-1">
                        <span className="text-slate-300 font-mono text-[10px]">PAYLOAD & SENSORS:</span>
                        <span className="text-slate-300 text-[10.5px] leading-relaxed bg-slate-900/40 p-1.5 rounded border border-white/[0.04]">
                          {drone.payload}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Footer element indicating current selection */}
                  <div className="pt-4 mt-3 border-t border-white/[0.04] flex items-center justify-between">
                    <span className="text-[9px] font-mono text-slate-300 uppercase">SYSTEM DIAGNOSTICS</span>
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      isSelected ? "bg-teal-400 shadow-[0_0_8px_#2dd4bf]" : "bg-slate-700"
                    }`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>



    </div>
  );
}
