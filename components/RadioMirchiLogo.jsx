"use client";

import React from "react";

export default function RadioMirchiLogo({ size = 48, className = "" }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-full bg-gradient-to-br from-[#E31E24] to-[#B31217] flex items-center justify-center shadow-sm select-none flex-shrink-0 text-white ${className}`}
      title="Radio Mirchi Kolhapur"
    >
      <div className="flex flex-col items-center justify-center leading-none text-center px-1">
        <div className="flex items-center gap-0.5">
          <span className="text-[10px] font-black tracking-tighter text-[#FFD200]">98.3</span>
          <span className="text-[8px] font-bold text-white/90">FM</span>
        </div>
        <span className="text-[11px] font-black tracking-tight text-white uppercase drop-shadow-sm font-sans mt-0.5">
          MIRCHI
        </span>
        <span className="text-[7px] font-semibold text-white/90 uppercase tracking-widest scale-90">
          KOLHAPUR
        </span>
      </div>
      {/* Subtle shine ring */}
      <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
    </div>
  );
}
