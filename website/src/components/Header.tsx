import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({
  activeTab,
  setActiveTab,
}: HeaderProps) {
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);
  const [modalStage, setModalStage] = useState(0); // 0=closed, 1=backdrop, 2=logo, 3=text

  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "satellite", label: "SAR Satellite" },
    { id: "iot", label: "IoT Sensors" },
    { id: "drones", label: "Drones" },
    { id: "analytics", label: "Analysis" },
  ];

  // Staggered animation stages when modal opens
  useEffect(() => {
    if (isFullScreenOpen) {
      setModalStage(1); // backdrop
      const t1 = setTimeout(() => setModalStage(2), 200);  // logo appears
      const t2 = setTimeout(() => setModalStage(3), 700);  // text appears
      return () => { clearTimeout(t1); clearTimeout(t2); };
    } else {
      setModalStage(0);
    }
  }, [isFullScreenOpen]);

  const handleClose = () => {
    setModalStage(0);
    setTimeout(() => setIsFullScreenOpen(false), 400);
  };

  return (
    <header className="w-full sticky top-0 flex flex-col lg:flex-row items-center justify-between py-4 px-6 md:px-12 gap-5 z-50 border-b border-white/[0.06] bg-slate-950/70 backdrop-blur-lg">
      {/* Left: Logo and Slogan */}
      <div 
        className="flex flex-col items-center lg:items-start cursor-pointer group" 
        onClick={() => setActiveTab("dashboard")}
      >
        <span className="font-display font-semibold text-xl md:text-2xl text-white tracking-tight flex items-center gap-2.5 transition-transform group-hover:scale-[1.01]">
          <img 
            src="https://res.cloudinary.com/wzptbd4w/image/upload/v1784525621/logo_zmbi1x.png" 
            alt="DeepSea Guardian Logo" 
            className="w-8 h-8 object-contain rounded-lg border border-white/10 bg-slate-900/50 p-0.5" 
            referrerPolicy="no-referrer"
          />
          <span>
            DeepSea <span className="font-light text-white/80">Guardian</span>
            <span className="text-[10px] align-super font-normal text-teal-400 opacity-90 ml-0.5">™</span>
          </span>
        </span>
        <span className="text-[8px] md:text-[9px] font-mono tracking-[0.12em] text-slate-400/80 uppercase mt-1">
          Guard the Deep, Secure Our Future
        </span>
      </div>

      {/* Middle: Capsule Menu */}
      <nav className="flex items-center justify-center bg-slate-950/40 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.05)] rounded-full p-1 space-x-1 overflow-x-auto max-w-full lg:absolute lg:left-1/2 lg:-translate-x-1/2">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide transition-all duration-300 whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 shadow-lg shadow-teal-400/20 font-bold"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right side: Clickable corner logo with full screen preview */}
      <div className="absolute top-3 right-6 lg:static lg:w-40 lg:flex lg:justify-end lg:items-center">
        <img 
          src="https://res.cloudinary.com/wzptbd4w/image/upload/v1784525621/logo_zmbi1x.png" 
          alt="DeepSea Guardian Corner Logo" 
          className="w-14 h-14 md:w-16 md:h-16 object-contain rounded-2xl border-2 border-white/20 bg-slate-900/90 p-1.5 cursor-pointer transition-all hover:scale-110 hover:border-teal-400/50 hover:shadow-[0_0_25px_rgba(45,212,191,0.2)] active:scale-95 duration-300" 
          onClick={() => setIsFullScreenOpen(true)}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* ═══════════════════════════════════════════════════════
          PREMIUM FULL-SCREEN LOGO MODAL — Multi-stage animation
          ═══════════════════════════════════════════════════════ */}
      {isFullScreenOpen && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer"
          onClick={handleClose}
          style={{
            backgroundColor: modalStage >= 1 ? "rgba(2, 6, 23, 0.97)" : "transparent",
            backdropFilter: modalStage >= 1 ? "blur(24px)" : "none",
            transition: "background-color 0.5s cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 0.5s ease",
          }}
        >
          {/* Animated background glow rings */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(45,212,191,0.08) 0%, rgba(45,212,191,0.02) 40%, transparent 70%)",
              opacity: modalStage >= 2 ? 1 : 0,
              transform: modalStage >= 2 ? "scale(1)" : "scale(0.3)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              width: "900px",
              height: "900px",
              borderRadius: "50%",
              border: "1px solid rgba(45,212,191,0.06)",
              opacity: modalStage >= 2 ? 1 : 0,
              transform: modalStage >= 2 ? "scale(1) rotate(0deg)" : "scale(0.5) rotate(-90deg)",
              transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
              animation: modalStage >= 2 ? "logo-ring-spin 30s linear infinite" : "none",
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              width: "700px",
              height: "700px",
              borderRadius: "50%",
              border: "1px dashed rgba(34,211,238,0.04)",
              opacity: modalStage >= 2 ? 1 : 0,
              transform: modalStage >= 2 ? "scale(1) rotate(0deg)" : "scale(0.3) rotate(90deg)",
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
              animation: modalStage >= 2 ? "logo-ring-spin 45s linear infinite reverse" : "none",
            }}
          />

          {/* Floating particles */}
          {modalStage >= 2 && (
            <>
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute pointer-events-none rounded-full"
                  style={{
                    width: `${3 + i * 1.5}px`,
                    height: `${3 + i * 1.5}px`,
                    background: i % 2 === 0 ? "rgba(45,212,191,0.4)" : "rgba(34,211,238,0.3)",
                    boxShadow: `0 0 ${6 + i * 2}px ${i % 2 === 0 ? "rgba(45,212,191,0.4)" : "rgba(34,211,238,0.3)"}`,
                    top: `${20 + i * 10}%`,
                    left: `${15 + i * 12}%`,
                    animation: `logo-particle-float ${3 + i * 0.5}s ease-in-out infinite ${i * 0.3}s`,
                  }}
                />
              ))}
            </>
          )}

          {/* Logo container */}
          <div
            className="relative flex flex-col items-center justify-center"
            style={{
              opacity: modalStage >= 2 ? 1 : 0,
              transform: modalStage >= 2 ? "scale(1) translateY(0)" : "scale(0.6) translateY(30px)",
              transition: "all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {/* Glowing halo behind logo */}
            <div
              style={{
                position: "absolute",
                width: "110%",
                height: "110%",
                borderRadius: "2rem",
                background: "radial-gradient(ellipse, rgba(45,212,191,0.15) 0%, transparent 70%)",
                filter: "blur(30px)",
                animation: modalStage >= 2 ? "logo-halo-pulse 3s ease-in-out infinite" : "none",
                pointerEvents: "none",
              }}
            />

            <img 
              src="https://res.cloudinary.com/wzptbd4w/image/upload/v1784525621/logo_zmbi1x.png" 
              alt="DeepSea Guardian Logo Full" 
              className="relative max-w-full max-h-[85vh] md:max-h-[88vh] object-contain select-none"
              style={{
                borderRadius: "1.5rem",
                border: "1px solid rgba(255,255,255,0.08)",
                backgroundColor: "rgba(2,6,23,0.6)",
                padding: "1.5rem",
                boxShadow: modalStage >= 2
                  ? "0 0 80px rgba(45,212,191,0.25), 0 0 160px rgba(45,212,191,0.08), 0 25px 50px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05)"
                  : "none",
                transition: "box-shadow 0.8s ease, transform 0.5s ease",
              }}
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Bottom text — staggered reveal */}
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.75rem",
              opacity: modalStage >= 3 ? 1 : 0,
              transform: modalStage >= 3 ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <p 
              className="font-display font-semibold text-lg md:text-xl tracking-tight"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #2dd4bf 50%, #22d3ee 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              DeepSea Guardian™
            </p>
            <p
              className="font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase"
              style={{
                color: "rgba(45,212,191,0.7)",
                backgroundColor: "rgba(20,60,50,0.4)",
                padding: "0.5rem 1.5rem",
                borderRadius: "9999px",
                border: "1px solid rgba(45,212,191,0.15)",
                boxShadow: "0 0 20px rgba(45,212,191,0.08)",
              }}
            >
              Tap anywhere to dismiss
            </p>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
