"use client";

import React, { useState, useRef, useEffect } from "react";
import TomatoFMLogo from "./TomatoFMLogo";
import { BlueVerifiedBadge } from "./WhatsAppIcons";
import {
  Search,
  MoreVertical,
  PanelLeftClose,
  PanelLeftOpen,
  ArrowLeft,
  RotateCcw,
  FileText,
  Menu as MenuIcon,
  Sun,
  Moon,
} from "lucide-react";
import { BRAND_CONFIG } from "@/lib/constants";

export default function ChatHeader({
  activeChat,
  onRestart,
  onOpenMenu,
  onOpenStatusTracker,
  isSidebarOpen,
  onToggleSidebar,
  theme = "dark",
  onToggleTheme,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const isDark = theme === "dark";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isBotChat = !activeChat || activeChat.id === "bot";
  const chatName = isBotChat ? "Tomato FM Kolhapur" : activeChat.name;

  return (
    <header className={`h-[56px] sm:h-[60px] px-2 sm:px-4 flex items-center justify-between select-none z-20 flex-shrink-0 border-b transition-colors duration-150 ${
      isDark
        ? "bg-[#202C33] border-[#2A3942] text-white"
        : "bg-[#008069] border-[#00705B] text-white shadow-xs"
    }`}>
      {/* Left side: Avatar + Title + Subtitle + Sidebar Toggle */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 flex-1 mr-1 sm:mr-2">
        {/* Toggle sidebar / WhatsApp back button */}
        <button
          onClick={onToggleSidebar}
          className="p-1 sm:p-1.5 -ml-0.5 sm:ml-0 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
          title={isSidebarOpen ? "Hide sidebar" : "Show sidebar / all chats"}
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="w-5 h-5" />
          ) : (
            <>
              <ArrowLeft className="w-5 h-5 sm:hidden" />
              <PanelLeftOpen className="w-5 h-5 hidden sm:inline-block" />
            </>
          )}
        </button>

        {/* Profile Avatar */}
        <div
          className="relative cursor-pointer flex-shrink-0"
          onClick={onOpenMenu}
          title={chatName}
        >
          {isBotChat ? (
            <TomatoFMLogo size={38} className="w-[38px] h-[38px] sm:w-[40px] sm:h-[40px]" />
          ) : activeChat?.avatarImg ? (
            <img
              src={activeChat.avatarImg}
              alt={chatName}
              className="w-[38px] h-[38px] sm:w-10 sm:h-10 rounded-full object-cover border border-white/30 shadow-xs"
            />
          ) : (
            <div
              className={`w-[38px] h-[38px] sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${
                activeChat?.avatarBg || "from-teal-600 to-emerald-700"
              } text-white font-bold flex items-center justify-center text-xs shadow-xs border border-white/20`}
            >
              <span>{activeChat?.avatarText || "TF"}</span>
            </div>
          )}

          {/* Green Online Dot */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#25D366] border-2 border-white rounded-full flex-shrink-0" />
        </div>

        {/* Name & Subtitle - Cleanly aligned for mobile */}
        <div className="min-w-0 flex-1 flex flex-col justify-center leading-tight">
          <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
            <h1 className="font-bold text-[14.5px] sm:text-[16px] leading-tight truncate text-white">
              {chatName}
            </h1>
            {isBotChat && (
              <BlueVerifiedBadge className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#53BDEB] flex-shrink-0" />
            )}
            {isBotChat && (
              <span className="text-[9px] sm:text-[10px] font-black tracking-wider text-white bg-[#E50914] px-1.5 py-0.5 rounded shadow-2xs whitespace-nowrap flex-shrink-0 leading-none uppercase">
                94.3 FM
              </span>
            )}
          </div>

          <div className="text-[11px] sm:text-[12px] leading-tight text-white/90 truncate min-w-0 mt-0.5">
            {isBotChat ? (
              <span className="inline-flex items-center gap-1 truncate text-[#A7F3D0]">
                <span className="text-[#A7F3D0] font-semibold text-[11px] sm:text-[12px]">online</span>
                <span className="hidden sm:inline text-white/80 font-normal truncate">• Kolhapur Desk (94.3 FM)</span>
              </span>
            ) : (
              <span className="truncate text-white/85 text-[11px] sm:text-[12px]">
                {activeChat?.isGroup ? "Community • 94.3 FM" : "online"}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right side icons: Theme toggle + Search + 3-dots */}
      <div className="flex items-center gap-0.5 sm:gap-1 text-white/90 flex-shrink-0">
        {/* Theme Toggle Button (Light / Dark) */}
        <button
          id="theme-toggle-btn"
          type="button"
          onClick={onToggleTheme}
          className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 text-white transition-colors flex items-center gap-1 text-[12px] font-medium cursor-pointer"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? (
            <Sun className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#FFD200]" />
          ) : (
            <Moon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white" />
          )}
          <span className="hidden xl:inline text-white text-[12px] font-medium ml-0.5">
            {isDark ? "Light" : "Dark"}
          </span>
        </button>

        {/* Search */}
        <button
          onClick={onOpenStatusTracker}
          className={`p-1.5 sm:p-2 rounded-full transition-colors ${
            isDark ? "hover:bg-white/5 hover:text-[#E9EDEF]" : "hover:bg-black/5 hover:text-[#111B21]"
          }`}
          title="Search / Tracker"
        >
          <Search className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
        </button>

        {/* Restart Conversation */}
        {isBotChat && (
          <button
            onClick={onRestart}
            className={`hidden sm:flex p-1.5 sm:p-2 rounded-full transition-colors ${
              isDark ? "hover:bg-white/5 hover:text-red-400" : "hover:bg-black/5 hover:text-red-600"
            }`}
            title="Restart Conversation"
          >
            <RotateCcw className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>
        )}

        {/* Three dots dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-1.5 sm:p-2 rounded-full transition-colors ${
              isDark ? "hover:bg-white/5 hover:text-[#E9EDEF]" : "hover:bg-black/5 hover:text-[#111B21]"
            }`}
            title="Menu"
          >
            <MoreVertical className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
          </button>

          {menuOpen && (
            <div className={`absolute right-0 top-full mt-1 w-52 rounded-xl shadow-wa-md border py-1.5 z-40 text-[13px] animate-fadeIn ${
              isDark
                ? "bg-[#233138] border-[#2A3942] text-[#E9EDEF]"
                : "bg-white border-[#E9EDEF] text-[#111B21]"
            }`}>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onToggleTheme();
                }}
                className={`w-full text-left px-4 py-2 flex items-center gap-2.5 ${
                  isDark ? "hover:bg-[#182229]" : "hover:bg-[#F0F2F5]"
                }`}
              >
                {isDark ? <Sun className="w-4 h-4 text-[#FFD200]" /> : <Moon className="w-4 h-4 text-[#54656F]" />}
                <span>{isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}</span>
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenMenu();
                }}
                className={`w-full text-left px-4 py-2 flex items-center gap-2.5 ${
                  isDark ? "hover:bg-[#182229]" : "hover:bg-[#F0F2F5]"
                }`}
              >
                <MenuIcon className="w-4 h-4 text-[#FF334B]" />
                <span>Show Services Menu</span>
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenStatusTracker();
                }}
                className={`w-full text-left px-4 py-2 flex items-center gap-2.5 ${
                  isDark ? "hover:bg-[#182229]" : "hover:bg-[#F0F2F5]"
                }`}
              >
                <FileText className="w-4 h-4 text-[#00A884]" />
                <span>Track Demo Enquiries</span>
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onRestart();
                }}
                className={`w-full text-left px-4 py-2 flex items-center gap-2.5 text-red-500 ${
                  isDark ? "hover:bg-[#182229]" : "hover:bg-[#F0F2F5]"
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restart Conversation</span>
              </button>

              <div className={`my-1 border-t ${isDark ? "border-[#2A3942]" : "border-gray-100"}`} />

              <div className={`px-4 py-1.5 text-[11px] leading-tight ${
                isDark ? "text-[#8696A0]" : "text-[#667781]"
              }`}>
                <div className={`font-semibold ${isDark ? "text-[#E9EDEF]" : "text-[#111B21]"}`}>
                  Tomato FM Kolhapur
                </div>
                <div>Phone: {BRAND_CONFIG.phone}</div>
                <div>Frequency: 94.3 FM</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
