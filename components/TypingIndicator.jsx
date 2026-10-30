"use client";

import React from "react";

export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 my-2 animate-fadeIn">
      <div className="bg-[#202C33] rounded-lg rounded-tl-none px-4 py-3 shadow-wa-sm max-w-[150px] flex items-center gap-2 border border-[#2A3942]/60">
        <span className="text-[11px] text-[#8696A0] font-medium select-none">Radio Mirchi</span>
        <div className="flex items-center gap-1 py-1">
          <span className="w-2 h-2 rounded-full bg-[#8696A0] animate-bounce [animation-delay:-0.32s]"></span>
          <span className="w-2 h-2 rounded-full bg-[#8696A0] animate-bounce [animation-delay:-0.16s]"></span>
          <span className="w-2 h-2 rounded-full bg-[#8696A0] animate-bounce"></span>
        </div>
      </div>
    </div>
  );
}
