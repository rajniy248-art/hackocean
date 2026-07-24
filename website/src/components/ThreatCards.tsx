import React from "react";
import { motion } from "motion/react";
import { 
  ArrowLeftRight, 
  Trash2, 
  Ship, 
  Bot, 
  Activity, 
  ShieldCheck, 
  ArrowRight,
  ShieldAlert
} from "lucide-react";

export interface ThreatItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
  telemetryCode: string;
  threatLevel: "CRITICAL" | "WARNING" | "NOMINAL" | "STABLE";
  metric: string;
  statusText: string;
  accentColor: string;
}

export default function ThreatCards({ activeTab = "dashboard" }: { activeTab?: string }) {
  const threats: ThreatItem[] = [
    {
      id: "plastic",
      title: "Plastic Accumulation",
      description: "SAR & AI algorithms detect plastic hotspots and ocean debris concentration zones.",
      icon: Trash2,
      iconColor: "text-cyan-400 border-cyan-400/30 bg-cyan-400/5",
      telemetryCode: "SAR-PL92",
      threatLevel: "WARNING",
      metric: "Hotspots: 18",
      statusText: "98.4% Signal",
      accentColor: "cyan",
    },
    {
      id: "dumping",
      title: "Illegal Dumping",
      description: "Automated tracking identifies unauthorized waste discharge and vessel anomalies.",
      icon: Ship,
      iconColor: "text-amber-400 border-amber-400/30 bg-amber-400/5",
      telemetryCode: "VES-ID04",
      threatLevel: "CRITICAL",
      metric: "Anomalies: 3",
      statusText: "Live Feed",
      accentColor: "amber",
    },
    {
      id: "hydrogen_auv",
      title: "Hydrogen AUV",
      description: "Hydrogen-powered autonomous underwater vehicles mapping extreme deep sea trenches.",
      icon: Bot,
      iconColor: "text-emerald-400 border-emerald-400/30 bg-emerald-400/5",
      telemetryCode: "AUV-H2-1",
      threatLevel: "NOMINAL",
      metric: "Battery: 96%",
      statusText: "Operational",
      accentColor: "emerald",
    },
    {
      id: "bleaching",
      title: "Coral Bleaching",
      description: "In-situ IoT nodes measure water temperatures and forecast critical coral stress.",
      icon: Activity,
      iconColor: "text-rose-400 border-rose-400/30 bg-rose-400/5",
      telemetryCode: "IOT-CB88",
      threatLevel: "WARNING",
      metric: "Temp: +1.4°C",
      statusText: "Warning Zone",
      accentColor: "rose",
    },
    {
      id: "endangered",
      title: "Endangered Species",
      description: "Acoustic telemetry and hydrophone arrays detecting marine mammal behaviors.",
      icon: ShieldAlert,
      iconColor: "text-teal-400 border-teal-400/30 bg-teal-400/5",
      telemetryCode: "DET-ES99",
      threatLevel: "STABLE",
      metric: "Sightings: 42",
      statusText: "Monitoring",
      accentColor: "teal",
    },
  ];

  // Filter threats based on the active tab
  const filteredThreats = threats.filter((threat) => {
    if (activeTab === "iot") {
      return ["bleaching", "endangered", "hydrogen_auv"].includes(threat.id);
    }
    if (activeTab === "satellite") {
      return ["plastic"].includes(threat.id);
    }
    if (activeTab === "analytics") {
      return ["dumping", "plastic", "endangered"].includes(threat.id);
    }
    return true; // "dashboard" or other shows all
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-6 mt-6 mb-8 z-20 relative select-none">
      {/* Title Header with Arrow Icon */}
      <div className="flex items-center justify-center space-x-2.5 mb-5 border-b border-white/[0.06] pb-4">
        <ArrowLeftRight className="w-4 h-4 text-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.4)]" />
        <h2 className="font-mono text-xs tracking-[0.25em] text-teal-400 uppercase font-bold border border-black bg-black/25 px-4 py-1.5 rounded-md shadow-sm">
          {activeTab === "iot" ? "Active In-Situ IoT Telemetry" :
           activeTab === "satellite" ? "Orbital SAR Satellite Observations" :
           activeTab === "analytics" ? "Predictive AI Threat Diagnostics" :
           "Detecting What Threatens Our Ocean"}
        </h2>
      </div>

      {/* Grid of Cards with Frost Effect */}
      <div className={`grid gap-5 justify-center ${
        filteredThreats.length === 1 ? "grid-cols-1 max-w-sm mx-auto" :
        filteredThreats.length === 2 ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto" :
        filteredThreats.length === 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto" :
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
      }`}>
        {filteredThreats.map((threat, idx) => {
          const Icon = threat.icon;
          
          // Determine color scheme classes based on threat level
          const levelColorClass = 
            threat.threatLevel === "CRITICAL" ? "text-rose-400 border-rose-500/20 bg-rose-500/10" :
            threat.threatLevel === "WARNING" ? "text-amber-400 border-amber-500/20 bg-amber-500/10" :
            threat.threatLevel === "NOMINAL" ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/10" :
            "text-teal-400 border-teal-500/20 bg-teal-500/10";

          const dotColorClass = 
            threat.threatLevel === "CRITICAL" ? "bg-rose-400 shadow-[0_0_6px_#f43f5e]" :
            threat.threatLevel === "WARNING" ? "bg-amber-400 shadow-[0_0_6px_#fbbf24]" :
            threat.threatLevel === "NOMINAL" ? "bg-emerald-400 shadow-[0_0_6px_#34d399]" :
            "bg-teal-400 shadow-[0_0_6px_#2dd4bf]";

          return (
            <motion.div
              key={threat.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
              className={`group flex flex-col bg-slate-950/35 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08] hover:border-teal-500/35 hover:bg-slate-950/50 transition-all duration-500 min-h-[355px] shadow-2xl relative ${
                threat.id === "plastic" ? "ring-1 ring-teal-400/15 border-teal-400/25" : ""
              }`}
            >
              {/* Frost Sensor Header (No Image) */}
              <div className="w-full h-40 overflow-hidden relative flex items-center justify-center border-b border-white/[0.06] bg-slate-950/20">
                {/* Grid background */}
                <svg className="absolute inset-0 w-full h-full text-white/[0.02] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id={`grid-${threat.id}`} width="14" height="14" patternUnits="userSpaceOnUse">
                      <circle cx="1.5" cy="1.5" r="0.75" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#grid-${threat.id})`} />
                </svg>

                {/* Sonar Radar Circles */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-24 h-24 rounded-full border border-dashed border-white/[0.04] animate-spin" style={{ animationDuration: "35s" }} />
                  <div className="w-16 h-16 rounded-full border border-white/[0.03] absolute" />
                  <div className="w-32 h-32 rounded-full absolute border border-white/[0.015] animate-pulse" />
                </div>



                {/* Threat Level Badge Top Right */}
                <div className={`absolute top-3.5 right-4 flex items-center space-x-1.5 border px-2 py-0.5 rounded-full text-[8.5px] font-mono font-semibold tracking-wider ${levelColorClass}`}>
                  <span className={`w-1 h-1 rounded-full animate-pulse ${dotColorClass}`} />
                  <span>{threat.threatLevel}</span>
                </div>

                {/* Center Glowing Circular Icon */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-500 group-hover:scale-110 shadow-xl ${threat.iconColor} relative z-10 backdrop-blur-md`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {/* Content Area */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  {/* Metric Row */}
                  <div className="flex items-center justify-between mb-3.5 text-[9.5px] font-mono tracking-wider text-slate-400">
                    <span className="bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.05]">{threat.metric}</span>
                    <span>{threat.statusText}</span>
                  </div>

                  <h3 className="font-display font-semibold text-[15px] text-white tracking-tight mb-2 group-hover:text-teal-300 transition-colors duration-300">
                    {threat.title}
                  </h3>
                  
                  <p className="text-[11.5px] text-slate-400/80 leading-relaxed font-normal mb-4">
                    {threat.description}
                  </p>
                </div>

                {/* High-tech telemetry waveform at bottom of content */}
                <div className="w-full h-8 flex items-end gap-[3px] opacity-20 group-hover:opacity-70 transition-opacity duration-500 border-t border-white/[0.03] pt-4 mt-2">
                  {Array.from({ length: 15 }).map((_, i) => {
                    // Generate a waveform curve that animates/looks technical
                    const heights = [35, 60, 40, 85, 30, 75, 45, 90, 50, 65, 80, 55, 70, 40, 55];
                    return (
                      <div
                        key={i}
                        className={`flex-1 rounded-sm transition-all duration-300 ${
                          threat.accentColor === "cyan" ? "bg-cyan-400" :
                          threat.accentColor === "amber" ? "bg-amber-400" :
                          threat.accentColor === "emerald" ? "bg-emerald-400" :
                          threat.accentColor === "rose" ? "bg-rose-400" :
                          "bg-teal-400"
                        }`}
                        style={{ height: `${heights[i]}%` }}
                      />
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mission Statement Bottom Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="mt-12 bg-slate-950/45 backdrop-blur-xl border border-white/10 hover:border-teal-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-5 text-center sm:text-left transition-all duration-500 shadow-2xl relative overflow-hidden"
      >
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/[0.02] rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.1)]">
          <ShieldCheck className="w-5.5 h-5.5 animate-pulse" />
        </div>
        <p className="text-xs sm:text-sm font-normal text-slate-300 tracking-wide leading-relaxed">
          One Ocean. One Intelligence Network. One Mission: <span className="text-teal-400 font-semibold tracking-wide">A Cleaner, Safer, and Healthier Deep Sea.</span>
        </p>
      </motion.div>
    </div>
  );
}
