"use client";

import React, { useState, useEffect } from "react";
import { getDemoRequests, findRequestById } from "@/lib/storage";
import { X, Search, CheckCircle2, Clock } from "lucide-react";

export default function StatusModal({ isOpen, onClose, initialQuery = "", theme = "dark" }) {
  const [query, setQuery] = useState(initialQuery);
  const [requests, setRequests] = useState([]);
  const [searchedItem, setSearchedItem] = useState(null);
  const isDark = theme === "dark";

  useEffect(() => {
    if (isOpen) {
      const all = getDemoRequests();
      setRequests(all);
      if (initialQuery) {
        setQuery(initialQuery);
        const match = findRequestById(initialQuery);
        setSearchedItem(match);
      } else {
        setSearchedItem(null);
      }
    }
  }, [isOpen, initialQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setSearchedItem(null);
      return;
    }
    const match = findRequestById(query.trim());
    setSearchedItem(match || "NOT_FOUND");
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fadeIn ${
      isDark ? "bg-black/75" : "bg-black/35"
    }`}>
      <div className={`rounded-2xl shadow-wa-modal max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden border ${
        isDark
          ? "bg-[#202C33] border-[#2A3942] text-[#E9EDEF]"
          : "bg-white border-[#CBD5E1] text-[#111B21]"
      }`}>
        {/* Header */}
        <div className={`px-5 py-4 flex items-center justify-between border-b ${
          isDark
            ? "bg-[#111B21] border-[#2A3942] text-white"
            : "bg-[#008069] border-[#00705B] text-white"
        }`}>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-white" />
            <div>
              <h3 className="font-bold text-[15px] leading-tight text-white">
                Demo Request Tracker
              </h3>
              <p className="text-[11px] text-white/80">
                Tomato FM Kolhapur (94.3 FM)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className={`p-4 border-b ${
          isDark ? "bg-[#182229] border-[#2A3942]" : "bg-[#F7F9FA] border-[#CBD5E1]"
        }`}>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className={`w-4 h-4 absolute left-3 top-3 ${isDark ? "text-[#8696A0]" : "text-[#54656F]"}`} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Enquiry ID (e.g. TF-2026-00102)"
                className={`w-full pl-9 pr-3 py-2 rounded-lg text-[13px] border focus:outline-none focus:border-[#00A884] ${
                  isDark
                    ? "bg-[#2A3942] text-[#E9EDEF] placeholder-[#8696A0] border-transparent"
                    : "bg-white text-[#111B21] placeholder-[#64748B] border-[#CBD5E1]"
                }`}
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#00A884] hover:bg-[#008F6F] text-white font-semibold text-[13px] rounded-lg transition-colors flex-shrink-0"
            >
              Search
            </button>
          </form>
        </div>

        {/* Content list */}
        <div className={`p-4 overflow-y-auto flex-1 space-y-3 ${
          isDark ? "bg-[#202C33]" : "bg-white"
        }`}>
          {searchedItem === "NOT_FOUND" && (
            <div className={`p-4 rounded-xl text-center text-[13px] border ${
              isDark
                ? "bg-amber-950/40 border-amber-600/40 text-amber-300"
                : "bg-amber-50 border-amber-300 text-amber-800"
            }`}>
              No demo request found matching <strong>{query}</strong>. Please check your Enquiry ID.
            </div>
          )}

          {searchedItem && searchedItem !== "NOT_FOUND" && (
            <div className={`p-4 rounded-xl border shadow-xs ${
              isDark
                ? "bg-[#111B21] border-[#00A884]/40"
                : "bg-[#F0F2F5] border-[#CBD5E1]"
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-[#FF334B] text-[14px]">
                  {searchedItem.id}
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border ${
                  isDark
                    ? "bg-emerald-950/60 text-emerald-300 border-emerald-500/30"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                }`}>
                  <CheckCircle2 className="w-3 h-3 text-[#00A884]" />
                  {searchedItem.status || "Submitted"}
                </span>
              </div>
              <div className={`text-[12px] space-y-1 ${isDark ? "text-[#E9EDEF]" : "text-[#111B21]"}`}>
                <div className="font-semibold text-[13px]">
                  {searchedItem.serviceTitle}
                </div>
                <div className={`text-[11px] ${isDark ? "text-[#8696A0]" : "text-[#54656F]"}`}>
                  Submitted on: {new Date(searchedItem.createdAt).toLocaleString()}
                </div>
                <div className={`mt-2 pt-2 border-t space-y-1 ${isDark ? "border-[#2A3942]" : "border-[#CBD5E1]"}`}>
                  {searchedItem.data &&
                    Object.entries(searchedItem.data).map(([k, v]) => (
                      <div key={k} className="flex justify-between text-[11px]">
                        <span className={`capitalize ${isDark ? "text-[#8696A0]" : "text-[#54656F]"}`}>{k}:</span>
                        <span className="font-medium text-right">{String(v)}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          <div className="pt-2">
            <h4 className={`text-[11px] font-bold uppercase tracking-wider mb-2 ${
              isDark ? "text-[#8696A0]" : "text-[#54656F]"
            }`}>
              All Stored Demo Enquiries ({requests.length})
            </h4>

            {requests.length === 0 ? (
              <div className={`text-center py-8 text-[13px] ${isDark ? "text-[#8696A0]" : "text-[#64748B]"}`}>
                No demo requests submitted yet in this browser session.
              </div>
            ) : (
              <div className="space-y-2">
                {requests.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className={`p-3 rounded-xl border transition-all cursor-pointer shadow-2xs ${
                      isDark
                        ? "bg-[#111B21] border-[#2A3942] hover:border-[#00A884]"
                        : "bg-[#F7F9FA] border-[#CBD5E1] hover:border-[#00A884] hover:bg-[#F0F2F5]"
                    }`}
                    onClick={() => {
                      setQuery(item.id);
                      setSearchedItem(item);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[#FF334B] text-[12px]">
                        {item.id}
                      </span>
                      <span className="text-[10px] font-bold bg-[#00A884] text-white px-2 py-0.5 rounded-full">
                        {item.status || "Active"}
                      </span>
                    </div>
                    <div className={`text-[12px] font-semibold mt-1 ${isDark ? "text-[#E9EDEF]" : "text-[#111B21]"}`}>
                      {item.serviceTitle}
                    </div>
                    <div className={`text-[11px] mt-0.5 flex items-center gap-1 ${isDark ? "text-[#8696A0]" : "text-[#54656F]"}`}>
                      <Clock className="w-3 h-3" />
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={`p-3 border-t text-right ${
          isDark ? "bg-[#182229] border-[#2A3942]" : "bg-[#F7F9FA] border-[#CBD5E1]"
        }`}>
          <button
            onClick={onClose}
            className={`px-4 py-1.5 border font-semibold text-[12px] rounded-lg transition-colors ${
              isDark
                ? "bg-[#202C33] hover:bg-[#2A3942] border-[#2A3942] text-[#E9EDEF]"
                : "bg-white hover:bg-gray-100 border-[#CBD5E1] text-[#111B21]"
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
