"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Smile,
  Paperclip,
  Send,
  Mic,
  RotateCcw,
  XCircle,
  Menu as MenuIcon,
  Image as ImageIcon,
  FileText,
  Camera,
  User,
  BarChart2,
  Sticker,
} from "lucide-react";

const QUICK_EMOJIS = ["👋", "📻", "🍅", "🎂", "💐", "❤️", "🎙️", "🎉", "🙏", "✨", "👍", "🍿"];

export default function MessageInput({
  onSendMessage,
  onTriggerCommand,
  activeWorkflow = null,
  disabled = false,
  inputPlaceholder = "Type a message",
  theme = "dark",
}) {
  const isDark = theme === "dark";
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!disabled && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [disabled, activeWorkflow]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore cleanup errors
        }
      }
    };
  }, []);

  const toggleListening = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please open in Google Chrome or Microsoft Edge for voice support.");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-IN";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          setText(transcript);
        }
      };

      recognition.onerror = (event) => {
        console.warn("Speech recognition error:", event.error);
        if (event.error === "not-allowed") {
          alert("Microphone access was denied. Please allow microphone permissions in your browser to use voice typing.");
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error("Speech recognition start failed:", err);
      setIsListening(false);
    }
  };

  const handleSend = () => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    if (!text.trim() || disabled) return;
    onSendMessage(text.trim());
    setText("");
    setShowEmojiPicker(false);
    setShowAttachMenu(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const addEmoji = (emoji) => {
    setText((prev) => prev + emoji);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className={`px-2 sm:px-4 py-2.5 border-t select-none flex-shrink-0 z-10 relative transition-colors duration-150 ${
      isDark ? "bg-[#202C33] border-[#2A3942]" : "bg-[#F0F2F5] border-[#E9EDEF]"
    }`}>
      {/* Quick Action Navigation Chips */}
      <div className="flex items-center gap-1.5 pb-2 overflow-x-auto no-scrollbar text-[11.5px]">
        <button
          type="button"
          onClick={() => onTriggerCommand("MENU")}
          className={`px-2.5 py-1 rounded-full border font-semibold flex items-center gap-1 flex-shrink-0 active:scale-95 transition-all shadow-2xs ${
            isDark
              ? "bg-[#111B21] hover:bg-[#2A3942] border-[#2A3942] text-[#E9EDEF]"
              : "bg-white hover:bg-gray-50 border-[#CBD5E1] text-[#334155]"
          }`}
          title="Return to main menu"
        >
          <MenuIcon className="w-3 h-3 text-[#FF334B]" />
          <span>Main Menu</span>
        </button>

        {activeWorkflow && (
          <>
            <button
              type="button"
              onClick={() => onTriggerCommand("BACK")}
              className={`px-2.5 py-1 rounded-full border font-semibold flex items-center gap-1 flex-shrink-0 active:scale-95 transition-all shadow-2xs ${
                isDark
                  ? "bg-[#111B21] hover:bg-[#2A3942] border-[#2A3942] text-[#E9EDEF]"
                  : "bg-white hover:bg-gray-50 border-[#CBD5E1] text-[#334155]"
              }`}
              title="Go back to previous question"
            >
              <RotateCcw className="w-3 h-3 text-[#00A884]" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={() => onTriggerCommand("CANCEL")}
              className={`px-2.5 py-1 rounded-full border font-semibold flex items-center gap-1 flex-shrink-0 active:scale-95 transition-all shadow-2xs ${
                isDark
                  ? "bg-[#111B21] hover:bg-red-950/40 border-[#2A3942] text-red-400"
                  : "bg-white hover:bg-red-50 border-[#CBD5E1] text-red-600"
              }`}
              title="Cancel current request"
            >
              <XCircle className="w-3 h-3 text-red-500" />
              <span>Cancel</span>
            </button>
          </>
        )}

        <button
          type="button"
          onClick={() => onTriggerCommand("HUMAN")}
          className={`px-2.5 py-1 rounded-full border font-semibold flex items-center gap-1 flex-shrink-0 active:scale-95 transition-all shadow-2xs ${
            isDark
              ? "bg-[#111B21] hover:bg-[#2A3942] border-[#2A3942] text-[#E9EDEF]"
              : "bg-white hover:bg-gray-50 border-[#CBD5E1] text-[#334155]"
          }`}
          title="Connect with Tomato FM support desk"
        >
          <span className="text-xs">👨‍💼</span>
          <span>Talk to Team</span>
        </button>

        <button
          type="button"
          onClick={() => onTriggerCommand("STATUS")}
          className={`px-2.5 py-1 rounded-full border font-semibold flex items-center gap-1 flex-shrink-0 active:scale-95 transition-all shadow-2xs ${
            isDark
              ? "bg-[#111B21] hover:bg-[#2A3942] border-[#2A3942] text-[#E9EDEF]"
              : "bg-white hover:bg-gray-50 border-[#CBD5E1] text-[#334155]"
          }`}
          title="Check status of enquiry"
        >
          <span className="text-xs">📊</span>
          <span>Status</span>
        </button>

        <button
          type="button"
          onClick={() => onTriggerCommand("LANGUAGE")}
          className={`px-2.5 py-1 rounded-full border font-semibold flex items-center gap-1 flex-shrink-0 active:scale-95 transition-all shadow-2xs ${
            isDark
              ? "bg-[#111B21] hover:bg-[#2A3942] border-[#2A3942] text-[#E9EDEF]"
              : "bg-white hover:bg-gray-50 border-[#CBD5E1] text-[#334155]"
          }`}
          title="Change language / भाषा बदला"
        >
          <span className="text-xs">🌐</span>
          <span>भाषा / Lang</span>
        </button>
      </div>

      {/* Attachment Tray */}
      {showAttachMenu && (
        <div className={`absolute bottom-full mb-2 left-6 p-3 rounded-2xl shadow-wa-md border grid grid-cols-3 gap-3 z-30 animate-fadeIn ${
          isDark ? "bg-[#233138] border-[#2A3942]" : "bg-white border-[#E9EDEF]"
        }`}>
          {[
            { icon: ImageIcon, label: "Photos", bg: "bg-purple-600" },
            { icon: Camera, label: "Camera", bg: "bg-red-500" },
            { icon: FileText, label: "Document", bg: "bg-indigo-600" },
            { icon: User, label: "Contact", bg: "bg-blue-500" },
            { icon: BarChart2, label: "Poll", bg: "bg-amber-500" },
            { icon: Sticker, label: "Sticker", bg: "bg-teal-500" },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setShowAttachMenu(false);
                  alert(`Demo: ${item.label} attachment simulated.`);
                }}
                className="flex flex-col items-center gap-1 group"
              >
                <div
                  className={`w-11 h-11 rounded-full ${item.bg} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[11px] font-medium ${isDark ? "text-[#AEBAC1]" : "text-[#54656F]"}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Emoji Tray */}
      {showEmojiPicker && (
        <div className={`absolute bottom-full mb-2 left-2 sm:left-4 p-2.5 rounded-2xl shadow-wa-md border flex items-center gap-2 z-30 animate-fadeIn ${
          isDark ? "bg-[#233138] border-[#2A3942]" : "bg-white border-[#E9EDEF]"
        }`}>
          {QUICK_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => addEmoji(emoji)}
              className={`text-xl p-1.5 rounded-lg transition-transform active:scale-125 ${
                isDark ? "hover:bg-[#182229]" : "hover:bg-[#F0F2F5]"
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Input Composer row */}
      <div className="flex items-center gap-2">
        {/* Paperclip */}
        <button
          type="button"
          onClick={() => {
            setShowAttachMenu(!showAttachMenu);
            setShowEmojiPicker(false);
          }}
          className={`p-1.5 rounded-full transition-colors flex-shrink-0 ${
            showAttachMenu
              ? "text-[#00A884]"
              : isDark ? "text-[#8696A0] hover:text-[#E9EDEF] hover:bg-white/5" : "text-[#54656F] hover:text-[#111B21] hover:bg-black/5"
          }`}
          title="Attach"
        >
          <Paperclip className="w-6 h-6 rotate-45" />
        </button>

        {/* Emoji Button */}
        <button
          type="button"
          onClick={() => {
            setShowEmojiPicker(!showEmojiPicker);
            setShowAttachMenu(false);
          }}
          className={`p-1.5 rounded-full transition-colors flex-shrink-0 ${
            showEmojiPicker
              ? "text-[#00A884]"
              : isDark ? "text-[#8696A0] hover:text-[#E9EDEF] hover:bg-white/5" : "text-[#54656F] hover:text-[#111B21] hover:bg-black/5"
          }`}
          title="Add Emoji"
        >
          <Smile className="w-6 h-6" />
        </button>

        {/* Text Input Pill */}
        <div className={`flex-1 rounded-lg border transition-all flex items-center px-4 py-2 shadow-2xs ${
          isListening
            ? "border-red-500/80 ring-2 ring-red-500/20 " + (isDark ? "bg-[#182229]" : "bg-red-50/50")
            : isDark
            ? "bg-[#2A3942] border-transparent"
            : "bg-white border-[#E9EDEF]"
        }`}>
          {isListening && (
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping mr-2 flex-shrink-0" />
          )}
          <input
            ref={textareaRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isListening
                ? "🎙️ Listening... speak now in English, Hindi, or Marathi"
                : inputPlaceholder
            }
            disabled={disabled}
            className={`w-full bg-transparent text-[14.5px] focus:outline-none leading-normal ${
              isDark ? "text-[#E9EDEF] placeholder-[#8696A0]" : "text-[#111B21] placeholder-[#667781]"
            }`}
          />
        </div>

        {/* Mic / Send button */}
        {isListening ? (
          <button
            type="button"
            onClick={toggleListening}
            className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center flex-shrink-0 transition-transform active:scale-95 shadow-md animate-pulse ring-4 ring-red-400/30"
            title="Stop voice typing"
          >
            <Mic className="w-5 h-5 text-white" />
          </button>
        ) : text.trim().length > 0 ? (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2 rounded-full transition-colors flex-shrink-0 ${
                isDark ? "text-[#8696A0] hover:text-[#E9EDEF] hover:bg-white/5" : "text-[#54656F] hover:text-[#111B21] hover:bg-black/5"
              }`}
              title="Voice type more"
            >
              <Mic className="w-5 h-5 hover:text-[#00A884]" />
            </button>
            <button
              type="button"
              onClick={handleSend}
              disabled={disabled}
              className="w-10 h-10 rounded-full bg-[#00A884] hover:bg-[#008F6F] active:bg-[#007A5E] text-white flex items-center justify-center flex-shrink-0 transition-transform active:scale-95 shadow-sm disabled:opacity-50"
              title="Send message"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={toggleListening}
            className={`p-2 rounded-full transition-colors flex-shrink-0 ${
              isDark ? "text-[#8696A0] hover:text-[#E9EDEF] hover:bg-white/5" : "text-[#54656F] hover:text-[#111B21] hover:bg-black/5"
            }`}
            title="Click to speak (Voice typing)"
          >
            <Mic className="w-6 h-6 hover:text-[#00A884] transition-colors" />
          </button>
        )}
      </div>
    </div>
  );
}
