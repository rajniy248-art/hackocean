import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Headline from "./components/Headline";
import ThreatCards from "./components/ThreatCards";
import DronesPage from "./components/DronesPage";
import IoTSensorsPage from "./components/IoTSensorsPage";
import SARSatellitePage from "./components/SARSatellitePage";
import AnalysisPage from "./components/AnalysisPage";
import ScrollAnimation from "./components/ScrollAnimation";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const isScrollingRef = useRef(false);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    isScrollingRef.current = true;

    if (tabId === "dashboard") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(tabId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    // Reset the scrolling flag after the smooth scroll completes
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  };

  // Safe fallback to highlight the "Dashboard" tab at the very top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 80 && !isScrollingRef.current) {
        setActiveTab("dashboard");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = [
      { id: "dashboard", elementId: "dashboard" },
      { id: "satellite", elementId: "satellite" },
      { id: "iot", elementId: "iot" },
      { id: "drones", elementId: "drones" },
      { id: "analytics", elementId: "analytics" }
    ];

    const observers = sections.map(({ id, elementId }) => {
      const el = document.getElementById(elementId);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          if (isScrollingRef.current) return;
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveTab(id);
            }
          });
        },
        {
          // Triggers when the section is centered within the viewport
          rootMargin: "-25% 0px -55% 0px",
          threshold: 0,
        }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.el);
        }
      });
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-start overflow-x-hidden text-white font-sans selection:bg-teal-500/20 selection:text-white pb-24">

      {/* ═══════════════════════════════════════════════════
          SCROLL ANIMATION — Fixed background canvas
          Plays frame-by-frame as the user scrolls the page
          ═══════════════════════════════════════════════════ */}
      <ScrollAnimation />

      {/* ═══════════════════════════════════════════════════
          MAIN WEBSITE CONTENT — Scrolls on top of animation
          ═══════════════════════════════════════════════════ */}

      {/* Sticky Header */}
      <Header 
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />

      {/* Main Content Area - Single continuous scroll layout */}
      <main className="flex-1 flex flex-col items-center pt-2 md:pt-3 pb-16 relative z-10 w-full max-w-[1537px] mx-auto px-4 space-y-24 md:space-y-36">
        
        {/* SECTION 1: DASHBOARD */}
        <section id="dashboard" className="w-full flex flex-col items-center scroll-mt-28">
          {/* Central Display Headings */}
          <Headline activeTab="dashboard" />

          {/* Threat monitoring grid of filtered cards */}
          <ThreatCards activeTab="dashboard" />
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

        {/* SECTION 2: SAR SATELLITE */}
        <section id="satellite" className="w-full scroll-mt-28">
          <SARSatellitePage />
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

        {/* SECTION 3: IOT SENSORS */}
        <section id="iot" className="w-full scroll-mt-28">
          <IoTSensorsPage />
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

        {/* SECTION 4: DRONES */}
        <section id="drones" className="w-full scroll-mt-28">
          <DronesPage />
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

        {/* SECTION 5: ANALYSIS */}
        <section id="analytics" className="w-full scroll-mt-28">
          <AnalysisPage />
        </section>

      </main>
    </div>
  );
}
