"use client";

import React, { useState } from "react";

export default function TomatoFMLogo({ size = 48, className = "" }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-full bg-white flex items-center justify-center shadow-xs select-none flex-shrink-0 border border-black/10 dark:border-white/20 overflow-hidden ${className}`}
      title="Tomato FM 94.3 Kolhapur"
    >
      {!imgError ? (
        <img
          src="/tomato_logo.png"
          alt="Tomato FM 94.3 Kolhapur"
          onError={() => setImgError(true)}
          className="w-full h-full object-contain p-0.5 rounded-full bg-white"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#FF334B] to-[#B30710] flex flex-col items-center justify-center text-white">
          <span className="text-[10px] font-black leading-none">94.3</span>
          <span className="text-[8px] font-bold leading-none mt-0.5">TOMATO</span>
        </div>
      )}
    </div>
  );
}
