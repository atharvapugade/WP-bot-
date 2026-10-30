"use client";

import React from "react";
import { MAIN_MENU_OPTIONS } from "@/lib/constants";
import { ChevronRight } from "lucide-react";

export default function InteractiveMenu({
  onSelectOption,
  disabled = false,
  theme = "dark",
}) {
  const isDark = theme === "dark";

  return (
    <div className="mt-3 space-y-2 max-w-md w-full">
      <div className={`text-[11px] font-semibold uppercase tracking-wider px-1 flex items-center justify-between ${
        isDark ? "text-[#8696A0]" : "text-[#54656F]"
      }`}>
        <span>Select a Service</span>
        <span className="text-[10px] bg-red-500/15 text-[#FF334B] font-bold px-2 py-0.5 rounded-full border border-red-500/30">
          8 Services
        </span>
      </div>

      <div className="grid grid-cols-1 gap-1.5">
        {MAIN_MENU_OPTIONS.map((item) => (
          <button
            key={item.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelectOption(item)}
            className={`group relative flex items-center gap-3 w-full text-left p-2.5 rounded-lg border transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.99] ${
              isDark
                ? "bg-[#182229] hover:bg-[#202C33] border-[#2A3942] hover:border-[#00A884]"
                : "bg-[#F0F2F5] hover:bg-[#E7FCE3] border-[#CBD5E1] hover:border-[#00A884]"
            }`}
          >
            {/* Number + Icon badge */}
            <div className={`w-9 h-9 rounded-md flex items-center justify-center text-lg flex-shrink-0 border transition-colors ${
              isDark
                ? "bg-[#202C33] group-hover:bg-[#005C4B]/40 border-[#2A3942] group-hover:border-[#00A884]/40"
                : "bg-white group-hover:bg-[#008069]/10 border-[#CBD5E1] group-hover:border-[#00A884]"
            }`}>
              <span>{item.icon}</span>
            </div>

            {/* Text description */}
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-2">
                <span className={`font-semibold text-[13px] transition-colors truncate ${
                  isDark
                    ? "text-[#E9EDEF] group-hover:text-[#00D7A0]"
                    : "text-[#111B21] group-hover:text-[#008069]"
                }`}>
                  {item.num}. {item.title}
                </span>
              </div>
              <p className={`text-[11px] leading-tight line-clamp-1 mt-0.5 ${
                isDark ? "text-[#8696A0]" : "text-[#54656F]"
              }`}>
                {item.desc}
              </p>
            </div>

            {/* Action arrow */}
            <div className={`transition-all group-hover:translate-x-0.5 ${
              isDark
                ? "text-[#8696A0] group-hover:text-[#00A884]"
                : "text-[#64748B] group-hover:text-[#008069]"
            }`}>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        ))}
      </div>

      <div className={`pt-1 text-[11px] text-center italic ${
        isDark ? "text-[#8696A0]" : "text-[#64748B]"
      }`}>
        💡 Tip: You can also type <span className="font-semibold text-[#00A884]">1 to 8</span>, or type <span className="font-semibold text-[#00A884]">MENU</span> anytime.
      </div>
    </div>
  );
}
