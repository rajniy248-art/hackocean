import { useState } from "react";
import Header from "./components/Header";
import Headline from "./components/Headline";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      <Header activeTab={activeTab} setActiveTab={handleTabChange} />
      <main className="pt-20">
        <Headline />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            Hackathon Build in Progress — Telemetry Dashboard Initializing...
          </div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            DeepSea Ocean AI Intelligence Platform. System components loading real-time marine sensor swarms and SAR satellite node networks.
          </p>
        </div>
      </main>
    </div>
  );
}
