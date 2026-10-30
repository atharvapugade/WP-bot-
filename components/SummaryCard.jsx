"use client";

import React from "react";
import { CheckCircle2, RotateCcw, XCircle, FileText } from "lucide-react";

export default function SummaryCard({
  title = "Enquiry Summary",
  data = {},
  fields = [],
  onConfirm,
  onBack,
  onCancel,
  disabled = false,
  theme = "dark",
}) {
  const isDark = theme === "dark";

  return (
    <div className={`mt-3 w-full max-w-md rounded-xl border shadow-wa-sm overflow-hidden text-left ${
      isDark
        ? "bg-[#202C33] border-[#2A3942]"
        : "bg-white border-[#CBD5E1]"
    }`}>
      {/* Header bar */}
      <div className={`px-4 py-3 border-b flex items-center justify-between ${
        isDark ? "bg-[#182229] border-[#2A3942]" : "bg-[#F0F2F5] border-[#CBD5E1]"
      }`}>
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#FF334B]" />
          <h4 className={`text-[13px] font-bold tracking-tight ${
            isDark ? "text-[#E9EDEF]" : "text-[#111B21]"
          }`}>
            {title}
          </h4>
        </div>
        <span className="text-[10px] bg-amber-500/15 text-amber-600 dark:text-amber-300 font-semibold px-2 py-0.5 rounded-full border border-amber-500/30">
          Ready to Confirm
        </span>
      </div>

      {/* Details list */}
      <div className={`p-3.5 space-y-2 text-[12.5px] divide-y ${
        isDark ? "divide-[#2A3942]/60" : "divide-[#E9EDEF]"
      }`}>
        {fields.map((field) => {
          const val = data[field.key];
          if (!val) return null;
          return (
            <div key={field.key} className="pt-2 first:pt-0 flex items-start justify-between gap-3">
              <span className={`font-medium min-w-[110px] flex-shrink-0 ${
                isDark ? "text-[#8696A0]" : "text-[#54656F]"
              }`}>
                {field.label}:
              </span>
              <span className={`font-semibold text-right break-words ${
                isDark ? "text-[#E9EDEF]" : "text-[#111B21]"
              }`}>
                {String(val)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className={`p-3 border-t space-y-2 ${
        isDark ? "bg-[#182229] border-[#2A3942]" : "bg-[#F7F9FA] border-[#CBD5E1]"
      }`}>
        <button
          type="button"
          disabled={disabled}
          onClick={onConfirm}
          className="w-full py-2.5 px-4 bg-[#00A884] hover:bg-[#008F6F] active:bg-[#007A5E] text-white font-bold text-[13px] rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors disabled:opacity-50"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Confirm & Submit Request</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={disabled}
            onClick={onBack}
            className={`flex-1 py-1.5 px-3 text-[12px] font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors border ${
              isDark
                ? "bg-[#202C33] hover:bg-[#2A3942] border-[#2A3942] text-[#AEBAC1] hover:text-[#E9EDEF]"
                : "bg-white hover:bg-gray-100 border-[#CBD5E1] text-[#334155]"
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Edit Previous</span>
          </button>

          <button
            type="button"
            disabled={disabled}
            onClick={onCancel}
            className={`py-1.5 px-3 text-[12px] font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors border ${
              isDark
                ? "bg-[#202C33] hover:bg-red-950/40 border-[#2A3942] hover:border-red-500/40 text-[#8696A0] hover:text-red-400"
                : "bg-white hover:bg-red-50 border-[#CBD5E1] hover:border-red-300 text-[#64748B] hover:text-red-600"
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
}
