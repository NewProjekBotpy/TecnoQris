import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  variant?: "default" | "loading";
}

export function Logo({ className, variant = "default", ...props }: LogoProps) {
  const isLoading = variant === "loading";
  
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("overflow-visible", className)}
      {...props}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="logo-gradient-dark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="glow-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Outer Squircle Shell (QR Code Frame shape) */}
      <rect
        x="10"
        y="10"
        width="80"
        height="80"
        rx="20"
        stroke="url(#logo-gradient)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        className={cn(isLoading && "animate-[pulse_3s_ease-in-out_infinite]")}
        opacity="0.9"
      />

      {/* Rotating segments on the ring for loading */}
      {isLoading && (
        <path
          d="M 50 10 A 40 40 0 0 1 90 50"
          stroke="url(#logo-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          className="animate-[spin_2s_linear_infinite] origin-center"
        />
      )}

      {/* Inner Elements - Abstract QR/Circuit Patterns */}
      <g className={cn("origin-center", isLoading && "animate-[pulse_2s_ease-in-out_infinite]")}>
        {/* Top Left Corner Marker */}
        <rect x="25" y="25" width="15" height="15" rx="4" stroke="#3b82f6" strokeWidth="2" fill="url(#logo-gradient)" fillOpacity="0.1" />
        
        {/* Top Right Corner Marker */}
        <rect x="60" y="25" width="15" height="15" rx="4" stroke="#8b5cf6" strokeWidth="2" fill="url(#logo-gradient)" fillOpacity="0.1" />
        
        {/* Bottom Left Corner Marker */}
        <rect x="25" y="60" width="15" height="15" rx="4" stroke="#06b6d4" strokeWidth="2" fill="url(#logo-gradient)" fillOpacity="0.1" />

        {/* The "Q" Tail / Connection Line */}
        <path
          d="M 65 65 L 75 75"
          stroke="url(#logo-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glow-soft)"
          className={cn(isLoading && "animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]")}
        />
        
        {/* Central Data Dot */}
        <circle cx="50" cy="50" r="4" fill="white" filter="url(#glow-strong)" />
      </g>
      
      {/* Connecting Circuit Lines */}
      <path
        d="M 40 32 L 60 32 M 32 40 L 32 60 M 68 40 L 68 55"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />

    </svg>
  );
}
