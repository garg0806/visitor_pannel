

import { useEffect, useState } from "react";
import { Building2, Users, Briefcase, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Self-contained premium button matching the polished Figma style
function Button({ variant = "default", className = "", children, ...props }) {
  const baseStyles = "inline-flex items-center justify-center rounded-full text-sm font-semibold tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-11 px-6 shadow-sm";
  
  const variants = {
    default: "bg-[#2453D8] text-white hover:bg-[#1e46bd] focus:ring-[#2453D8] shadow-md shadow-[#2453D8]/10",
    secondary: "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 focus:ring-slate-300",
  };

  return (
    <button
      {...props}
      className={`${baseStyles} ${variants[variant] || variants.default} ${className}`}
    >
      {children}
    </button>
  );
}

// Crisp, stylized barcode strip
function BarcodeStrip({ accent }) {
  const bars = [2, 1, 3, 1, 1, 2, 4, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 4, 1, 2];
  return (
    <div className="flex items-end gap-[2px] h-7 opacity-80">
      {bars.map((w, i) => (
        <div 
          key={i}
          className="rounded-[1px]"
          style={{
            width: `${w * 1.5}px`,
            height: i % 3 === 0 ? "100%" : "70%",
            backgroundColor: accent
          }}
        />
      ))}
    </div>
  );
}

// Figma-polished Badge Card
function BadgeCard({ icon: Icon, title, description, to, cta, accent, accentSoft }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_15px_40px_-18px_rgba(20,33,61,0.12)] hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-15px_rgba(20,33,61,0.18)] transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Top Header of Ticket */}
      <div className="px-6 sm:px-8 py-5 flex items-center justify-between" style={{ backgroundColor: accentSoft }}>
        <span className="text-[11px] uppercase tracking-[0.18em] font-bold" style={{ color: accent }}>
          Reception Pass
        </span>
        <span className="text-[10px] tracking-widest font-bold text-slate-400">ENTRY SECURE</span>
      </div>

      {/* Dashed Separator */}
      <div className="relative">
        <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-slate-50" />
        <div className="border-t border-dashed border-slate-200 w-full" />
        <div className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-slate-50" />
      </div>

      {/* Main Card Content */}
      <div className="p-6 sm:p-8 flex flex-col flex-1 items-center text-center">
        {/* Icon Circle */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 hover:scale-105" style={{ backgroundColor: accentSoft }}>
          <Icon className="w-7 h-7" style={{ color: accent }} />
        </div>

        {/* Text Content */}
        <h3 className="mt-6 text-xl sm:text-2xl font-bold text-[#14213D] tracking-tight">
          {title}
        </h3>

        <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-400 font-medium max-w-[260px] flex-1">
          {description}
        </p>

        {/* Barcode Strip */}
        <div className="mt-6 flex justify-center py-2">
          <BarcodeStrip accent={accent} />
        </div>

        {/* Action Button */}
        <Link to={to} className="block mt-6 w-full">
          <Button
            className="w-full !h-12 text-sm font-bold text-white shadow-md transition-all duration-200"
            style={{ 
              backgroundColor: accent,
              boxShadow: `0 8px 20px -6px ${accent}4D` 
            }}
          >
            {cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

// Header Digital Clock
function LobbyClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hidden md:flex flex-col items-end border-r border-slate-200 pr-4 mr-1">
      <span className="text-slate-800 font-bold text-sm">
        {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </span>
      <span className="text-[10px] tracking-wider uppercase font-bold text-slate-400 mt-0.5">
        {now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}
      </span>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans antialiased">
      
      {/* 1. Header (Premium White Layout matching Figma UI) */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2453D8] flex items-center justify-center shadow-md shadow-[#2453D8]/20">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-[#14213D] leading-none">
                SHOEPAL'S
              </span>
              <span className="text-[9px] font-bold text-[#2453D8] uppercase tracking-widest mt-1">
                Lobby Terminal
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-semibold tracking-wide text-slate-500">
            <Link to="/" className="text-[#2453D8] border-b-2 border-[#2453D8] pb-1.5 px-0.5">HOME</Link>
            <Link to="/visitor" className="hover:text-[#2453D8] transition-colors pb-1.5 px-0.5">VISITORS</Link>
            <Link to="/interview" className="hover:text-[#2453D8] transition-colors pb-1.5 px-0.5">CANDIDATES</Link>
            <span className="text-slate-300">|</span>
            <span className="text-slate-400 text-xs">FRONT DESK</span>
          </nav>

          {/* Actions: Clock & Admin Button */}
          <div className="flex items-center gap-4">
            <LobbyClock />
            <Link to="/admin">
              <Button 
                variant="secondary" 
                className="h-9 px-4 text-xs font-bold uppercase tracking-wider"
              >
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area: Centered horizontally and vertically */}
      <main className="flex-1 w-full mx-auto px-2 sm:px-6 lg:px-8 py-2 md:py-4 flex flex-col items-center ">
        <div className="w-full max-w-5xl flex flex-col items-center">
          
          {/* 2. Top Header Typography (Your Original Text, Polished & Centered) */}
          <div className="text-center  w-full max-w-2xl">
            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#2453D8] font-bold">
              Reception Check-In
            </span>

            <h2 className=" text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#14213D] tracking-tight">
              Welcome to SHOEPAL'S
            </h2>

            <p className="mt-4 mb-4 text-sm sm:text-base text-slate-400 font-medium leading-relaxed">
              Select a pass below and we'll have you checked in in under a minute.
            </p>
          </div>

          {/* 3. Your Original Two Cards Layout (Polished CSS & Centered Alignment) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 w-full max-w-4xl justify-center">
            <BadgeCard
              icon={Users}
              title="Visitor Entry"
              description="Coming to meet someone in the office? Register your visit and get your pass here."
              to="/visitor"
              cta="Get Visitor Pass"
              accent="#2453D8"
              accentSoft="#E7EEFC"
            />

            <BadgeCard
              icon={Briefcase}
              title="Interview Entry"
              description="Scheduled for an interview? Register yourself and get your pass here."
              to="/interview"
              cta="Get Candidate Pass"
              accent="#C7791F"
              accentSoft="#FBF0E1"
            />
          </div>
          
        </div>
      </main>
    </div>
  );
}