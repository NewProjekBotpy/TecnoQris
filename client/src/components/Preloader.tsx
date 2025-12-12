import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function Preloader() {
  const [show, setShow] = useState(true);
  const [entered, setEntered] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setEntered(true));
    
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => setShow(false), 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-[#020817] flex flex-col items-center justify-center"
      style={{
        transform: exiting ? 'translateY(-100%)' : entered ? 'translateY(0)' : 'translateY(-100%)',
        opacity: exiting ? 0 : 1,
        transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease-out'
      }}
    >
      <div 
        className="flex flex-col items-center gap-6"
        style={{
          transform: exiting ? 'scale(0.95)' : entered ? 'scale(1)' : 'scale(0.95)',
          opacity: exiting ? 0 : entered ? 1 : 0,
          transition: 'transform 300ms ease-out, opacity 200ms ease-out'
        }}
      >
        <Logo className="w-20 h-20 md:w-24 md:h-24" />
        
        <h2 className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient bg-300%">
          TecnoQris
        </h2>
        
        <div className="w-6 h-6 rounded-full animate-spin" style={{
          background: 'conic-gradient(from 0deg, transparent 0%, #3b82f6 100%)',
          WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))',
          mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))'
        }}></div>
        
        <p className="text-xs text-slate-500 font-mono uppercase tracking-[0.3em]">
          Secure Payment Gateway
        </p>
      </div>
    </div>
  );
}
