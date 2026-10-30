"use client";

import React from "react";
import { Check } from "lucide-react";

export default function QuickReplies({
  options = [],
  onSelectOption,
  disabled = false,
  selectedVal = null,
  theme = "dark",
}) {
  if (!options || options.length === 0) return null;
  const isDark = theme === "dark";

  return (
    <div className="mt-3 space-y-2 w-full max-w-sm">
      <div className={`text-[10px] uppercase font-bold tracking-wider px-0.5 ${
        isDark ? "text-[#8696A0]" : "text-[#54656F]"
      }`}>
        Choose an option:
      </div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt, idx) => {
          const isSelected = selectedVal === opt;
          return (
            <button
              key={idx}
              type="button"
              disabled={disabled}
              onClick={() => onSelectOption(opt)}
              className={`text-left text-[12.5px] font-medium px-3.5 py-2 rounded-lg transition-all duration-150 flex items-center gap-1.5 shadow-2xs border ${
                isSelected
                  ? isDark
                    ? "bg-[#005C4B] text-[#E9EDEF] border-[#00A884] font-semibold"
                    : "bg-[#008069] text-white border-[#008069] font-semibold shadow-sm"
                  : isDark
                  ? "bg-[#202C33] text-[#E9EDEF] border-[#2A3942] hover:border-[#00A884] hover:bg-[#233138] active:scale-[0.98]"
                  : "bg-[#F0F2F5] text-[#111B21] border-[#CBD5E1] hover:bg-[#E7FCE3] hover:border-[#00A884] hover:text-[#008069] active:bg-[#D9FDD3] active:scale-[0.98]"
              } disabled:opacity-50 disabled:pointer-events-none`}
            >
              {isSelected && (
                <Check className={`w-3.5 h-3.5 ${isDark ? "text-[#00D7A0]" : "text-white"}`} />
              )}
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
