"use client";

import React from "react";

/**
 * Exact WhatsApp Double Cyan/Blue Tick (Read Receipt in Dark Mode)
 */
export function DoubleBlueTick({ className = "w-4 h-3 text-[#53BDEB]" }) {
  return (
    <svg viewBox="0 0 16 11" fill="none" className={className}>
      <path
        d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Exact WhatsApp Double Grey Tick (Delivered in Dark Mode)
 */
export function DoubleGreyTick({ className = "w-4 h-3 text-[#8696A0]" }) {
  return (
    <svg viewBox="0 0 16 11" fill="none" className={className}>
      <path
        d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Incoming message bubble tail in Dark Mode (#202C33)
 */
export function IncomingBubbleTail() {
  return (
    <span className="absolute -left-[8px] top-0 pointer-events-none select-none">
      <svg viewBox="0 0 8 13" height="13" width="8">
        <path fill="#202C33" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z" />
      </svg>
    </span>
  );
}

/**
 * Outgoing message bubble tail in Dark Mode (#005C4B)
 */
export function OutgoingBubbleTail() {
  return (
    <span className="absolute -right-[8px] top-0 pointer-events-none select-none">
      <svg viewBox="0 0 8 13" height="13" width="8">
        <path fill="#005C4B" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z" transform="scale(-1, 1) translate(-8, 0)" />
      </svg>
    </span>
  );
}

/**
 * Verified Blue Badge (matching Tata Play verified badge in screenshot)
 */
export function BlueVerifiedBadge({ className = "w-4 h-4 text-[#53BDEB]" }) {
  return (
    <svg viewBox="0 0 18 18" fill="none" className={className}>
      <circle cx="9" cy="9" r="8" fill="#53BDEB" />
      <path
        d="M12.5 6.5L7.6875 11.5L5.5 9.31818"
        stroke="#0B141A"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Communities icon in Dark Mode
 */
export function CommunitiesIcon({ className = "w-5 h-5 text-[#AEBAC1]" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  );
}

/**
 * Status (Dashed Circle) icon in Dark Mode
 */
export function StatusDashedIcon({ className = "w-5 h-5 text-[#AEBAC1]" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="3 3" className={className}>
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

/**
 * Channels / Newsletter icon in Dark Mode
 */
export function ChannelsIcon({ className = "w-5 h-5 text-[#AEBAC1]" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" />
    </svg>
  );
}
