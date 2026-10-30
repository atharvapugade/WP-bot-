"use client";

import React, { useState } from "react";
import { CheckCircle, Copy, Check, Sparkles, Home, Clock } from "lucide-react";

export default function SuccessCard({
  requestId,
  serviceTitle = "Request",
  message = "",
  onReturnToMenu,
  onCheckStatus,
  theme = "dark",
}) {
  const [copied, setCopied] = useState(false);
  const isDark = theme === "dark";

  const handleCopy = () => {
    if (!requestId) return;
    navigator.clipboard?.writeText(requestId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`mt-3 w-full max-w-md rounded-xl border shadow-wa-sm overflow-hidden text-left animate-fadeIn ${
      isDark ? "bg-[#202C33] border-[#005C4B]" : "bg-white border-[#A7F3D0]"
    }`}>
      {/* Top Banner */}
      <div className="bg-[#008069] dark:bg-[#005C4B] px-4 py-3 border-b border-[#00A884]/30 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white text-[#008069] dark:bg-[#00A884] dark:text-white flex items-center justify-center flex-shrink-0 shadow-sm font-bold">
          <CheckCircle className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-[13.5px] text-white">
              {serviceTitle} Confirmed
            </span>
            <span className="text-[10px] bg-white/20 text-white font-bold px-1.5 py-0.2 rounded border border-white/30">
              Recorded
            </span>
          </div>
          <p className="text-[11px] text-white/90 leading-tight">
            Tomato FM 94.3 Kolhapur Desk
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Enquiry ID highlight box */}
        <div className={`border rounded-lg p-3 flex items-center justify-between ${
          isDark ? "bg-[#111B21] border-[#2A3942]" : "bg-[#F0F2F5] border-[#CBD5E1]"
        }`}>
          <div>
            <div className={`text-[10px] uppercase font-bold tracking-wider ${
              isDark ? "text-[#8696A0]" : "text-[#54656F]"
            }`}>
              Generated Enquiry ID
            </div>
            <div className="text-[16px] font-mono font-bold text-[#FF334B] tracking-wide mt-0.5">
              {requestId}
            </div>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-[11px] font-semibold transition-colors active:scale-95 ${
              isDark
                ? "bg-[#202C33] hover:bg-[#2A3942] border-[#2A3942] text-[#E9EDEF]"
                : "bg-white hover:bg-gray-100 border-[#CBD5E1] text-[#111B21]"
            }`}
            title="Copy Request ID"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#00A884]" />
                <span className="text-[#00A884]">Copied!</span>
              </>
            ) : (
              <>
                <Copy className={`w-3.5 h-3.5 ${isDark ? "text-[#8696A0]" : "text-[#54656F]"}`} />
                <span>Copy ID</span>
              </>
            )}
          </button>
        </div>

        {/* Message body formatted */}
        <p className={`text-[13px] leading-relaxed whitespace-pre-line p-3 rounded-lg border ${
          isDark
            ? "text-[#E9EDEF] bg-[#182229] border-[#2A3942]/60"
            : "text-[#111B21] bg-[#F7F9FA] border-[#E9EDEF]"
        }`}>
          {message}
        </p>

        {/* Station Notice */}
        <div className={`flex items-start gap-2 text-[11px] border rounded-lg p-2.5 ${
          isDark
            ? "text-[#8696A0] bg-[#111B21] border-[#2A3942]"
            : "text-[#54656F] bg-[#F0F2F5] border-[#CBD5E1]"
        }`}>
          <Clock className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Demo Submission Notice:</strong> Stored securely in demo session. Station executives contact advertisers & listeners during operating hours (Mon-Sat, 9:30 AM - 6:30 PM).
          </span>
        </div>
      </div>

      {/* Footer buttons */}
      <div className={`px-4 py-3 border-t flex items-center gap-2 ${
        isDark ? "bg-[#182229] border-[#2A3942]" : "bg-[#F7F9FA] border-[#CBD5E1]"
      }`}>
        <button
          type="button"
          onClick={onReturnToMenu}
          className={`flex-1 py-2 px-3 border rounded-lg text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs ${
            isDark
              ? "bg-[#202C33] hover:bg-[#2A3942] border-[#2A3942] text-[#E9EDEF]"
              : "bg-white hover:bg-gray-100 border-[#CBD5E1] text-[#111B21]"
          }`}
        >
          <Home className="w-3.5 h-3.5 text-[#FF334B]" />
          <span>Return to Menu</span>
        </button>

        {onCheckStatus && (
          <button
            type="button"
            onClick={() => onCheckStatus(requestId)}
            className="py-2 px-3 bg-[#008069] hover:bg-[#005C4B] border border-[#00A884] rounded-lg text-[12px] font-bold text-white flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Track Status</span>
          </button>
        )}
      </div>
    </div>
  );
}
