import { motion } from "motion/react";

interface HeadlineProps {
  activeTab?: string;
}

export default function Headline({ activeTab = "dashboard" }: HeadlineProps) {
  let upperTag = "Autonomous Ocean Safeguard";
  let titleAccent = "Secure Our Future";
  let description = "An intelligent platform that combines underwater drones, active sonar, satellite imagery, and IoT telemetry to detect anomalies and protect our fragile marine ecosystems.";

  if (activeTab === "iot") {
    upperTag = "IoT Sensor Network";
    titleAccent = "IoT Intelligence";
    description = "Active in-situ IoT sensor nodes and deep-sea telemetric grids measuring real-time aquatic indicators, temperature gradients, and ecosystem anomalies.";
  } else if (activeTab === "satellite") {
    upperTag = "SAR Satellite Array";
    titleAccent = "Space Imagery";
    description = "Synthetic Aperture Radar (SAR) constellations orbital tracking for micro-plastics accumulation, unauthorized dumping, and global maritime operations.";
  } else if (activeTab === "analytics") {
    upperTag = "Decision Analysis Core";
    titleAccent = "AI Diagnostic Core";
    description = "Our predictive analytics algorithms process petabytes of acoustic, satellite, and telemetry signals to identify threats before they spread.";
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 max-w-4xl text-center z-10 select-none" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.5)' }}>
      {/* Subtle upper tag */}
      <motion.div 
        key={`tag-${activeTab}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center space-x-1.5 bg-slate-950/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-2 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
      >
        <span className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)] animate-pulse" />
        <span className="font-mono text-[9.5px] tracking-[0.22em] uppercase font-semibold text-teal-300">
          {upperTag}
        </span>
      </motion.div>

      <motion.h1 
        key={`h1-${activeTab}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="font-display font-bold text-4xl sm:text-6xl md:text-[80px] leading-[1.05] tracking-tighter text-center"
      >
        <span className="inline-block w-auto md:inline" style={{ color: '#f0f0f0' }}>
          Guard the{" "}
        </span>
        <span className="text-cyan-400 font-light italic tracking-tight md:inline">
          DeepSea
        </span>
        <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent block mt-1 md:mt-2 font-black pb-1" style={{ textShadow: 'none' }}>
          {titleAccent}
        </span>
      </motion.h1>

      <motion.p
        key={`p-${activeTab}`}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-3 text-xs sm:text-sm md:text-base max-w-xl font-normal leading-relaxed tracking-normal" style={{ color: 'rgba(230, 235, 245, 0.95)' }}
      >
        {description}
      </motion.p>
    </div>
  );
}
