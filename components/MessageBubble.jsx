"use client";

import React from "react";
import QuickReplies from "./QuickReplies";
import SummaryCard from "./SummaryCard";
import SuccessCard from "./SuccessCard";
import {
  DoubleBlueTick,
  IncomingBubbleTail,
  OutgoingBubbleTail,
  BlueVerifiedBadge,
} from "./WhatsAppIcons";
import { Sparkles, CornerUpRight, Smile } from "lucide-react";

export default function MessageBubble({
  message,
  onSelectOption,
  onConfirmSummary,
  onBackSummary,
  onCancelSummary,
  onQuickReply,
  onReturnToMenu,
  onCheckStatus,
  isLatest = false,
  showTail = true,
  theme = "dark",
}) {
  const isDark = theme === "dark";
  const isBot = message.sender === "bot" || message.sender === "them";

  const renderFormattedText = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*[^*]+\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <strong key={index} className={`font-bold ${isDark ? "text-[#E9EDEF]" : "text-[#111B21]"}`}>
            {part.slice(1, -1)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div
      className={`group flex items-end my-1.5 ${
        isBot ? "justify-start" : "justify-end"
      } animate-fadeIn select-text`}
    >
      {/* Bubble Card */}
      <div
        className={`relative max-w-[92%] sm:max-w-[78%] md:max-w-[62%] rounded-lg shadow-wa-sm overflow-hidden ${
          isBot
            ? isDark
              ? "bg-[#202C33] text-[#E9EDEF] rounded-tl-none border border-[#2A3942]/60"
              : "bg-white text-[#111B21] rounded-tl-none border border-[#E9EDEF]/80"
            : isDark
            ? "bg-[#005C4B] text-[#E9EDEF] rounded-tr-none border border-[#005C4B]/80 px-3.5 pt-2 pb-1.5"
            : "bg-[#D9FDD3] text-[#111B21] rounded-tr-none border border-[#C5F3BD]/60 px-3.5 pt-2 pb-1.5"
        }`}
      >
        {/* Corner Tail */}
        {showTail && (
          isBot ? (
            <span className="absolute -left-[8px] top-0 pointer-events-none select-none">
              <svg viewBox="0 0 8 13" height="13" width="8">
                <path fill={isDark ? "#202C33" : "#FFFFFF"} d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z" />
              </svg>
            </span>
          ) : (
            <span className="absolute -right-[8px] top-0 pointer-events-none select-none">
              <svg viewBox="0 0 8 13" height="13" width="8">
                <path fill={isDark ? "#005C4B" : "#D9FDD3"} d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z" transform="scale(-1, 1) translate(-8, 0)" />
              </svg>
            </span>
          )
        )}

        {/* Banner Graphic at top of card */}
        {isBot && message.bannerImage && (
          <div className="relative w-full overflow-hidden bg-black/40">
            <img
              src={message.bannerImage}
              alt="Tomato FM 94.3 Kolhapur"
              className="w-full h-auto max-h-[220px] object-cover"
            />
            {/* Tomato FM Red Strip */}
            <div className="bg-gradient-to-r from-[#FF334B] via-[#E50914] to-[#B30710] py-1.5 px-4 text-center">
              <span className="text-[11px] font-black tracking-widest text-white uppercase drop-shadow-xs">
                TOMATO FM 94.3 • AAPLA KOLHAPUR
              </span>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className={isBot ? "px-3.5 pt-2.5 pb-1.5" : ""}>
          {isBot && !message.bannerImage && (
            <div className={`flex items-center gap-1.5 mb-1.5 pb-1.5 border-b ${isDark ? "border-[#2A3942]/50" : "border-gray-100"}`}>
              <span className="inline-flex items-center gap-1.5 bg-[#E50914] text-white px-2 py-0.5 rounded-md text-[11.5px] font-bold shadow-2xs">
                <span>{message.senderName || "Tomato FM Kolhapur"}</span>
                <BlueVerifiedBadge className="w-3.5 h-3.5 text-white" />
              </span>
              <span className="text-[10.5px] bg-[#008069] text-white font-bold px-2 py-0.5 rounded-md shadow-2xs">
                94.3 FM
              </span>
              {message.isAi && (
                <span className={`text-[9px] font-semibold px-1.5 py-0.2 rounded-full border flex items-center gap-0.5 ml-auto ${
                  isDark ? "bg-purple-900/40 text-purple-300 border-purple-500/30" : "bg-purple-50 text-purple-700 border-purple-200"
                }`}>
                  <Sparkles className="w-2.5 h-2.5" />
                  AI
                </span>
              )}
            </div>
          )}

          {/* Text body */}
          <div className={`whitespace-pre-line break-words text-[13.8px] leading-relaxed ${isDark ? "text-[#E9EDEF]" : "text-[#111B21]"}`}>
            {renderFormattedText(message.text)}
          </div>

          {/* Timestamp */}
          <div className={`flex items-center justify-end gap-1 mt-1 text-[11px] select-none ${isDark ? "text-[#8696A0]" : "text-[#667781]"}`}>
            <span>{message.timestamp || "7:19 pm"}</span>
            {!isBot && (
              <DoubleBlueTick className="w-4 h-3 text-[#53BDEB] inline-block ml-0.5" />
            )}
          </div>
        </div>

        {/* Attached WhatsApp CTA Buttons directly at bottom of message */}
        {message.buttons && message.buttons.length > 0 && (
          <div className={`border-t divide-y ${
            isDark
              ? "border-[#2A3942] divide-[#2A3942] bg-[#202C33]"
              : "border-[#E9EDEF] divide-[#E9EDEF] bg-[#F7F9FA]"
          }`}>
            {message.buttons.map((btn, bIdx) => (
              <button
                key={bIdx}
                type="button"
                onClick={() => {
                  if (btn.action === "menu") onReturnToMenu();
                  else if (btn.action === "service") onSelectOption(btn.service);
                  else if (btn.onClick) btn.onClick();
                  else if (btn.text) onQuickReply(btn.text);
                }}
                className={`w-full py-2.5 px-4 text-center font-medium text-[13.5px] transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  isDark
                    ? "text-[#00A884] hover:bg-[#233138] active:bg-[#1D282F]"
                    : "text-[#008069] hover:bg-white active:bg-gray-100"
                }`}
              >
                <span>{btn.label || btn.text}</span>
              </button>
            ))}
          </div>
        )}

        {/* Embedded Interactive Components */}
        {message.type === "quickReplies" && (
          <div className="px-3 pb-3">
            <QuickReplies
              options={message.options}
              onSelectOption={onQuickReply}
              disabled={!isLatest && false}
              selectedVal={message.selectedValue}
              theme={theme}
            />
          </div>
        )}

        {message.type === "summary" && (
          <div className="px-3 pb-3">
            <SummaryCard
              title={message.summaryTitle}
              data={message.summaryData}
              fields={message.fields}
              onConfirm={onConfirmSummary}
              onBack={onBackSummary}
              onCancel={onCancelSummary}
              disabled={!isLatest && false}
              theme={theme}
            />
          </div>
        )}

        {message.type === "success" && (
          <div className="px-3 pb-3">
            <SuccessCard
              requestId={message.requestId}
              serviceTitle={message.serviceTitle}
              message={message.successDetails}
              onReturnToMenu={onReturnToMenu}
              onCheckStatus={onCheckStatus}
              theme={theme}
            />
          </div>
        )}
      </div>

      {/* Reaction Hover Icons */}
      {isBot && (
        <div className={`hidden group-hover:flex items-center gap-1 ml-2 opacity-80 self-center transition-opacity ${
          isDark ? "text-[#8696A0]" : "text-[#54656F]"
        }`}>
          <button
            type="button"
            className={`p-1 rounded-full transition-colors ${
              isDark ? "hover:text-[#E9EDEF] hover:bg-[#202C33]" : "hover:text-[#111B21] hover:bg-black/5"
            }`}
            title="Forward message"
          >
            <CornerUpRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            className={`p-1 rounded-full transition-colors ${
              isDark ? "hover:text-[#E9EDEF] hover:bg-[#202C33]" : "hover:text-[#111B21] hover:bg-black/5"
            }`}
            title="React"
          >
            <Smile className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
