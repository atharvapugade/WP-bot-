"use client";

import React, { useState } from "react";
import TomatoFMLogo from "./TomatoFMLogo";
import {
  CommunitiesIcon,
  StatusDashedIcon,
  ChannelsIcon,
  BlueVerifiedBadge,
  DoubleBlueTick,
  DoubleGreyTick,
} from "./WhatsAppIcons";
import {
  Search,
  MessageSquarePlus,
  MoreVertical,
  Filter,
  Pin,
  Archive,
  Users,
  X,
  Phone,
} from "lucide-react";
import { DUMMY_CHATS } from "@/lib/dummyChats";

export default function Sidebar({
  activeChatId = "bot",
  onSelectChat,
  lastBotMessageSnippet = "Welcome to Tomato FM Kolhapur (94.3 FM)...",
  lastBotMessageTime = "7:19 pm",
  isOpen = true,
  onCloseMobile,
  theme = "dark",
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const isDark = theme === "dark";

  const filteredChats = DUMMY_CHATS.filter((chat) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = chat.name.toLowerCase().includes(q);
      const matchMsg = (chat.lastMessage || lastBotMessageSnippet).toLowerCase().includes(q);
      if (!matchName && !matchMsg) return false;
    }

    if (activeTab === "unread") {
      return (chat.unreadCount || 0) > 0;
    }
    if (activeTab === "groups") {
      return chat.isGroup;
    }
    if (activeTab === "favorites") {
      return chat.isPinned;
    }
    return true;
  });

  if (!isOpen) return null;

  return (
    <aside
      className={`w-full md:w-[380px] lg:w-[420px] h-full border-r flex flex-col flex-shrink-0 z-30 select-none transition-colors duration-150 ${
        isDark
          ? "bg-[#111B21] border-[#2A3942] text-[#E9EDEF]"
          : "bg-white border-[#E9EDEF] text-[#111B21]"
      }`}
    >
      {/* 1. Header matching WhatsApp Web */}
      <div className={`h-[60px] px-4 flex items-center justify-between border-b flex-shrink-0 ${
        isDark ? "bg-[#202C33] border-[#2A3942]" : "bg-[#F0F2F5] border-[#E9EDEF]"
      }`}>
        {/* User Avatar */}
        <div className="flex items-center gap-2">
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className={`md:hidden p-1.5 -ml-1 rounded-full ${
                isDark ? "text-[#AEBAC1] hover:text-[#E9EDEF] hover:bg-white/5" : "text-[#54656F] hover:text-[#111B21] hover:bg-black/5"
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] flex items-center justify-center text-white font-bold text-xs shadow-xs cursor-pointer border border-white/20">
            <span>YOU</span>
          </div>
          <span className={`md:hidden text-[16px] font-bold ${isDark ? "text-[#E9EDEF]" : "text-[#111B21]"}`}>
            WhatsApp
          </span>
        </div>

        {/* Action Icons */}
        <div className={`flex items-center gap-1 sm:gap-2 ${isDark ? "text-[#AEBAC1]" : "text-[#54656F]"}`}>
          <button
            type="button"
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
            title="Communities"
          >
            <CommunitiesIcon className="w-5 h-5" />
          </button>

          <button
            type="button"
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
            title="Status"
          >
            <StatusDashedIcon className="w-5 h-5" />
          </button>

          <button
            type="button"
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
            title="Channels"
          >
            <ChannelsIcon className="w-5 h-5" />
          </button>

          <button
            type="button"
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
            title="New Chat"
          >
            <MessageSquarePlus className="w-5 h-5" />
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-white/5 rounded-full transition-colors"
              title="Menu"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {menuOpen && (
              <div className={`absolute right-0 top-full mt-1 w-48 rounded-xl shadow-wa-md border py-1.5 z-40 text-[13px] ${
                isDark ? "bg-[#233138] border-[#2A3942] text-[#E9EDEF]" : "bg-white border-[#E9EDEF] text-[#111B21]"
              }`}>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onSelectChat("bot");
                  }}
                  className={`w-full text-left px-4 py-2 ${isDark ? "hover:bg-[#182229]" : "hover:bg-[#F0F2F5]"}`}
                >
                  Tomato FM Assistant
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setActiveTab("all");
                  }}
                  className={`w-full text-left px-4 py-2 ${isDark ? "hover:bg-[#182229]" : "hover:bg-[#F0F2F5]"}`}
                >
                  All Chats
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setActiveTab("unread");
                  }}
                  className={`w-full text-left px-4 py-2 ${isDark ? "hover:bg-[#182229]" : "hover:bg-[#F0F2F5]"}`}
                >
                  Unread Chats
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className={`p-2 flex items-center gap-2 border-b ${
        isDark ? "bg-[#111B21] border-[#2A3942]" : "bg-white border-[#F0F2F5]"
      }`}>
        <div className={`relative flex-1 flex items-center rounded-lg px-3 py-1.5 focus-within:ring-1 focus-within:ring-[#00A884] transition-all ${
          isDark ? "bg-[#202C33]" : "bg-[#F0F2F5]"
        }`}>
          <Search className={`w-4 h-4 mr-3 flex-shrink-0 ${isDark ? "text-[#8696A0]" : "text-[#54656F]"}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search or start new chat"
            className={`w-full bg-transparent text-[13.5px] focus:outline-none ${
              isDark ? "text-[#E9EDEF] placeholder-[#8696A0]" : "text-[#111B21] placeholder-[#667781]"
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className={`p-0.5 ${isDark ? "text-[#8696A0] hover:text-[#E9EDEF]" : "text-[#8696A0] hover:text-[#111B21]"}`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <button
          className={`p-1.5 rounded-full transition-colors flex-shrink-0 ${
            isDark ? "text-[#8696A0] hover:bg-[#202C33] hover:text-[#E9EDEF]" : "text-[#54656F] hover:bg-[#F0F2F5]"
          }`}
          title="Filter unread chats"
          onClick={() => setActiveTab(activeTab === "unread" ? "all" : "unread")}
        >
          <Filter
            className={`w-4 h-4 ${
              activeTab === "unread" ? "text-[#00A884]" : isDark ? "text-[#8696A0]" : "text-[#54656F]"
            }`}
          />
        </button>
      </div>

      {/* 3. Filter Pills Row */}
      <div className={`px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar border-b ${
        isDark ? "border-[#2A3942] bg-[#111B21]" : "border-[#F0F2F5] bg-white"
      }`}>
        {[
          { id: "all", label: "All" },
          { id: "unread", label: "Unread" },
          { id: "favorites", label: "Favourites" },
          { id: "groups", label: "Groups" },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1 rounded-full text-[12.5px] font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? isDark
                    ? "bg-[#005C4B] text-[#00D7A0] font-bold"
                    : "bg-[#E7FCE3] text-[#008069] font-bold"
                  : isDark
                  ? "bg-[#202C33] text-[#8696A0] hover:text-[#E9EDEF]"
                  : "bg-[#F0F2F5] text-[#54656F] hover:bg-[#E9EDEF]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 4. Archived Row */}
      <div className={`px-4 py-2.5 flex items-center justify-between cursor-pointer transition-colors border-b ${
        isDark ? "border-[#2A3942] hover:bg-[#202C33]" : "border-[#F0F2F5] hover:bg-[#F5F6F6]"
      }`}>
        <div className="flex items-center gap-6">
          <Archive className="w-4 h-4 text-[#00A884] ml-2" />
          <span className={`font-semibold text-[14px] ${isDark ? "text-[#E9EDEF]" : "text-[#111B21]"}`}>
            Archived
          </span>
        </div>
        <span className="text-[11px] font-bold text-[#00A884] mr-2">3</span>
      </div>

      {/* 5. Chat List */}
      <div className={`flex-1 overflow-y-auto divide-y ${
        isDark ? "divide-[#2A3942]/50 bg-[#111B21]" : "divide-[#F0F2F5] bg-white"
      }`}>
        {filteredChats.map((chat) => {
          const isSelected = activeChatId === chat.id;
          const isBotChat = chat.id === "bot";
          const displayMessage = isBotChat
            ? lastBotMessageSnippet
            : chat.lastMessage;
          const displayTime = isBotChat ? lastBotMessageTime : chat.time;

          return (
            <div
              key={chat.id}
              onClick={() => {
                onSelectChat(chat.id);
                if (onCloseMobile) onCloseMobile();
              }}
              className={`flex items-center gap-3 px-3.5 py-3 cursor-pointer transition-colors relative ${
                isSelected
                  ? isDark ? "bg-[#2A3942]" : "bg-[#F0F2F5]"
                  : isDark ? "hover:bg-[#202C33] bg-[#111B21]" : "hover:bg-[#F5F6F6] bg-white"
              }`}
            >
              {/* Profile Avatar */}
              <div className="relative flex-shrink-0">
                {isBotChat ? (
                  <TomatoFMLogo size={49} />
                ) : chat.avatarImg ? (
                  <img
                    src={chat.avatarImg}
                    alt={chat.name}
                    className="w-[49px] h-[49px] rounded-full object-cover border border-black/10 dark:border-white/20 shadow-xs"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-[49px] h-[49px] rounded-full bg-gradient-to-br from-[#008069] to-[#00A884] text-white font-bold flex items-center justify-center text-sm shadow-xs border border-white/20">
                    <span>{chat.name.slice(0, 2).toUpperCase()}</span>
                  </div>
                )}

                {/* Online Green Indicator for Bot */}
                {isBotChat && (
                  <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#25D366] border-2 rounded-full ${
                    isDark ? "border-[#111B21]" : "border-white"
                  }`} />
                )}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span
                      className={`text-[14.5px] truncate leading-tight ${
                        chat.unreadCount > 0
                          ? `font-bold ${isDark ? "text-[#E9EDEF]" : "text-[#111B21]"}`
                          : `font-medium ${isDark ? "text-[#E9EDEF]" : "text-[#111B21]"}`
                      }`}
                    >
                      {chat.name}
                    </span>
                    {chat.isVerified && (
                      <BlueVerifiedBadge className="w-3.5 h-3.5 text-[#53BDEB] flex-shrink-0" />
                    )}
                  </div>

                  <span
                    className={`text-[11px] whitespace-nowrap ml-2 flex-shrink-0 ${
                      chat.unreadCount > 0
                        ? "text-[#00D7A0] font-bold"
                        : isDark ? "text-[#8696A0]" : "text-[#667781]"
                    }`}
                  >
                    {displayTime}
                  </span>
                </div>

                {/* Message preview snippet */}
                <div className="flex items-center justify-between mt-0.5">
                  <div className={`flex items-center gap-1 text-[13px] truncate ${
                    isDark ? "text-[#8696A0]" : "text-[#667781]"
                  }`}>
                    {!chat.unreadCount && isBotChat && (
                      <DoubleBlueTick className="w-4 h-3 text-[#53BDEB] flex-shrink-0" />
                    )}
                    {!chat.unreadCount && !isBotChat && chat.lastMessage?.startsWith("✓✓") && (
                      <DoubleGreyTick className="w-4 h-3 text-[#8696A0] flex-shrink-0" />
                    )}

                    <span className="truncate">{displayMessage}</span>
                  </div>

                  {/* Pin icon or Unread Badge */}
                  <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
                    {chat.isPinned && (
                      <Pin className={`w-3.5 h-3.5 rotate-45 ${isDark ? "text-[#8696A0]" : "text-[#8696A0]"}`} />
                    )}

                    {chat.unreadCount > 0 && (
                      <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-[#00A884] text-white text-[10.5px] font-bold flex items-center justify-center">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 6. Bottom info strip */}
      <div className={`p-2.5 border-t text-[11px] flex items-center justify-between ${
        isDark ? "bg-[#202C33] border-[#2A3942] text-[#8696A0]" : "bg-[#F0F2F5] border-[#E9EDEF] text-[#667781]"
      }`}>
        <span className="flex items-center gap-1">
          <Phone className="w-3 h-3 text-[#FF334B]" />
          <span>Tomato FM: +91 95610 34157</span>
        </span>
        <span className="font-semibold text-[#00A884]">94.3 FM</span>
      </div>
    </aside>
  );
}
