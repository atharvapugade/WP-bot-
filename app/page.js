"use client";

import React, { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import ChatHeader from "@/components/ChatHeader";
import MessageBubble from "@/components/MessageBubble";
import MessageInput from "@/components/MessageInput";
import TypingIndicator from "@/components/TypingIndicator";
import StatusModal from "@/components/StatusModal";
import {
  SERVICE_FLOWS,
  getServiceFlow,
  getMainMenuButtons,
  getMainMenuIntro,
  createInitialGreeting,
  createLanguageSelectionGreeting,
} from "@/lib/chatStateMachine";
import { MAIN_MENU_OPTIONS, BRAND_CONFIG, COMMANDS } from "@/lib/constants";
import { DUMMY_CHATS } from "@/lib/dummyChats";
import {
  generateRequestId,
  saveDemoRequest,
  saveChatSession,
  loadChatSession,
  clearChatSession,
  findRequestById,
} from "@/lib/storage";
import { Radio } from "lucide-react";

export default function ChatPage() {
  const [theme, setTheme] = useState("dark"); // 'dark' | 'light'
  const [selectedLanguage, setSelectedLanguage] = useState("mr"); // 'mr' | 'en' | 'hi'
  const [languageChosen, setLanguageChosen] = useState(false);
  const [activeChatId, setActiveChatId] = useState("bot");
  const [messages, setMessages] = useState([]);
  const [dummyConversations, setDummyConversations] = useState({});
  const [workflowState, setWorkflowState] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusSearchQuery, setStatusSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [inputPlaceholder, setInputPlaceholder] = useState("Choose language / भाषा निवडा (1: Marathi, 2: English, 3: Hindi)...");

  const messagesEndRef = useRef(null);
  const isInitialLoad = useRef(true);

  // Initialize theme, language and conversations
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Load theme
    const savedTheme = localStorage.getItem("tf_theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    } else {
      setTheme("dark");
    }

    // Load language preference
    const savedLang = localStorage.getItem("tf_lang");
    if (savedLang === "en" || savedLang === "mr" || savedLang === "hi") {
      setSelectedLanguage(savedLang);
    } else {
      setSelectedLanguage("mr");
    }

    const savedLangChosen = localStorage.getItem("tf_lang_chosen");
    const saved = loadChatSession();
    if (savedLangChosen === "true" && saved && saved.messages && saved.messages.length > 0) {
      setLanguageChosen(true);
      setMessages(saved.messages);
      setWorkflowState(saved.workflowState || null);
    } else {
      setLanguageChosen(false);
      clearChatSession();
      setMessages(createLanguageSelectionGreeting());
      setWorkflowState(null);
    }

    // Populate initial dummy chats
    const initialDummy = {};
    DUMMY_CHATS.forEach((chat) => {
      if (!chat.isBot && chat.previewChat) {
        initialDummy[chat.id] = chat.previewChat.map((m, idx) => ({
          id: `dummy-${chat.id}-${idx}`,
          sender: m.sender === "me" ? "user" : "them",
          senderName: m.senderName || chat.name,
          text: m.text,
          timestamp: m.time || "Yesterday",
        }));
      }
    });
    setDummyConversations(initialDummy);

    // Default sidebar to true on desktop (>=768px), false on mobile (<768px)
    setIsSidebarOpen(window.innerWidth >= 768);
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);

    isInitialLoad.current = false;
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Save conversation state whenever bot messages or workflow changes
  useEffect(() => {
    if (isInitialLoad.current) return;
    saveChatSession(messages, workflowState);
  }, [messages, workflowState]);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, dummyConversations, isTyping, activeChatId]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("tf_theme", nextTheme);
  };

  const getTimeString = () => {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }).toLowerCase();
  };

  /**
   * Append a user message to the active conversation
   */
  const addUserMessage = (text) => {
    const userMsg = {
      id: `usr-${Date.now()}-${Math.random()}`,
      sender: "user",
      text,
      timestamp: getTimeString(),
    };

    if (activeChatId === "bot") {
      setMessages((prev) => [...prev, userMsg]);
    } else {
      setDummyConversations((prev) => ({
        ...prev,
        [activeChatId]: [...(prev[activeChatId] || []), userMsg],
      }));
    }
    return userMsg;
  };

  /**
   * Append a bot message with simulated typing delay
   */
  const addBotMessage = (msgData, delay = 500) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}-${Math.random()}`,
          sender: "bot",
          timestamp: getTimeString(),
          ...msgData,
        },
      ]);
    }, delay);
  };

  /**
   * Restart / Reset the bot chat
   */
  const handleRestart = () => {
    clearChatSession();
    localStorage.removeItem("tf_lang_chosen");
    setLanguageChosen(false);
    setWorkflowState(null);
    setIsTyping(false);
    const initial = createLanguageSelectionGreeting();
    setMessages(initial);
    setInputPlaceholder("Choose language / भाषा निवडा (1: Marathi, 2: English, 3: Hindi)...");
  };

  /**
   * Show Main Menu (localized)
   */
  const handleShowMainMenu = (customIntro, langOverride) => {
    const lang = langOverride || selectedLanguage || "mr";
    setWorkflowState(null);
    setInputPlaceholder(
      lang === "mr"
        ? "पर्याय निवडा किंवा संदेश टाईप करा..."
        : lang === "hi"
        ? "विकल्प चुनें या संदेश लिखें..."
        : "Type a message or select an option..."
    );

    addBotMessage({
      bannerImage: "/tomato_banner.jpg",
      text: customIntro || getMainMenuIntro(lang),
      buttons: getMainMenuButtons(lang),
    });
  };

  /**
   * Initiate one of the 8 services (localized)
   */
  const startService = (serviceId) => {
    const lang = selectedLanguage || "mr";
    const flow = getServiceFlow(serviceId, lang);
    if (!flow) return;

    if (serviceId === "SERVICE_E") {
      setWorkflowState({ serviceId: "SERVICE_E", stepIndex: 0, data: {} });
      addBotMessage({
        text: flow.intro,
        type: "quickReplies",
        options: flow.options,
      });
      setInputPlaceholder(
        lang === "mr"
          ? "कार्यक्रमाचा पर्याय निवडा किंवा प्रश्न विचारा..."
          : lang === "hi"
          ? "शो का विकल्प चुनें या प्रश्न पूछें..."
          : "Choose a programme option or ask a question..."
      );
      return;
    }

    if (serviceId === "SERVICE_G") {
      setWorkflowState({ serviceId: "SERVICE_G", stepIndex: 0, data: {} });
      addBotMessage({
        text: `${flow.intro}\n\n💬 Feel free to ask any question!`,
        isAi: true,
      });
      setInputPlaceholder(
        lang === "mr"
          ? "टोमॅटो एफएम ९४.३ बद्दल कोणताही प्रश्न विचारा..."
          : lang === "hi"
          ? "टोमैटो एफएम 94.3 के बारे में प्रश्न पूछें..."
          : "Ask a question about Tomato FM Kolhapur..."
      );
      return;
    }

    if (serviceId === "SERVICE_H") {
      setWorkflowState({ serviceId: "SERVICE_H", stepIndex: 0, data: {} });
      addBotMessage({
        text: flow.intro,
      });
      setInputPlaceholder(
        lang === "mr"
          ? "आपली आवश्यकता किंवा संदेश टाईप करा..."
          : lang === "hi"
          ? "अपनी आवश्यकता या संदेश लिखें..."
          : "Describe your requirement for our station team..."
      );
      return;
    }

    setWorkflowState({
      serviceId,
      stepIndex: 0,
      data: {},
      historySteps: [],
    });

    const firstQ = flow.questions[0];
    setInputPlaceholder(firstQ.placeholder || `Enter ${firstQ.label}...`);

    const qLabel =
      lang === "mr"
        ? `*प्रश्न १ पैकी ${flow.questions.length}:*\n${firstQ.text}`
        : lang === "hi"
        ? `*प्रश्न 1 कुल ${flow.questions.length} में से:*\n${firstQ.text}`
        : `*Question 1 of ${flow.questions.length}:*\n${firstQ.text}`;

    addBotMessage({
      text: `${flow.intro}\n\n${qLabel}`,
      type: firstQ.options ? "quickReplies" : "text",
      options: firstQ.options || null,
    });
  };

  const handleSelectMenuOption = (item) => {
    addUserMessage(`${item.num || ""}. ${item.title}`.trim());
    startService(item.id);
  };

  const handleQuickReply = (val) => {
    handleUserResponse(val);
  };

  const handleDummyChatResponse = (input, currentChat) => {
    addUserMessage(input);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setDummyConversations((prev) => ({
        ...prev,
        [currentChat.id]: [
          ...(prev[currentChat.id] || []),
          {
            id: `reply-${Date.now()}`,
            sender: "them",
            senderName: currentChat.name,
            text: `Namaskar! Thanks for messaging Tomato FM. For commercial ads, birthday wishes, or programme info, please switch to our official Tomato FM Assistant! 🍅📻`,
            timestamp: getTimeString(),
          },
        ],
      }));
    }, 800);
  };

  const handleUserResponse = async (input) => {
    const trimmed = input.trim();
    if (!trimmed) return;

    if (activeChatId !== "bot") {
      const chat = DUMMY_CHATS.find((c) => c.id === activeChatId);
      handleDummyChatResponse(trimmed, chat);
      return;
    }

    const lower = trimmed.toLowerCase();

    // Check if user is answering language selection or requesting to switch language
    const isLangSelect =
      trimmed.includes("मराठी") ||
      trimmed.includes("Marathi") ||
      trimmed.includes("English") ||
      trimmed.includes("हिंदी") ||
      trimmed.includes("Hindi") ||
      lower === "1" ||
      lower === "2" ||
      lower === "3" ||
      lower === "marathi" ||
      lower === "english" ||
      lower === "hindi" ||
      lower === "mr" ||
      lower === "en" ||
      lower === "hi" ||
      lower === "मराठी" ||
      lower === "हिंदी";

    const isLanguageCommand =
      lower === "language" ||
      lower === "भाषा" ||
      lower === "lang" ||
      lower === "change language";

    if (isLanguageCommand) {
      addUserMessage(trimmed);
      setLanguageChosen(false);
      addBotMessage({
        text: "Please select your preferred language / कृपया आपली भाषा निवडा / कृपया अपनी भाषा चुनें:",
        type: "quickReplies",
        options: ["मराठी (Marathi) 🚩", "English 🇬🇧", "हिंदी (Hindi) 🇮🇳"],
      });
      return;
    }

    // If user has not chosen language yet, ANY input must resolve language choice or prompt for it
    if (!languageChosen) {
      if (
        trimmed.includes("मराठी") ||
        lower === "marathi" ||
        lower === "मराठी" ||
        lower === "mr" ||
        lower === "1"
      ) {
        addUserMessage(trimmed);
        const newLang = "mr";
        const confirmationText = "तुम्ही *मराठी (Marathi)* भाषा निवडली आहे. आपलं कोल्हापूर, आपलं टोमॅटो एफएम! 🍅📻\nखालीलपैकी हवी ती सेवा निवडा:";
        setLanguageChosen(true);
        setSelectedLanguage(newLang);
        localStorage.setItem("tf_lang_chosen", "true");
        localStorage.setItem("tf_lang", newLang);
        setTimeout(() => {
          handleShowMainMenu(confirmationText, newLang);
        }, 400);
        return;
      } else if (
        trimmed.includes("English") ||
        lower === "english" ||
        lower === "en" ||
        lower === "2"
      ) {
        addUserMessage(trimmed);
        const newLang = "en";
        const confirmationText = "You have selected *English*. Welcome to Tomato FM Kolhapur (94.3 FM)! Aapla Kolhapur, Aapla Tomato FM! 🍅📻\nPlease select a service from the options below:";
        setLanguageChosen(true);
        setSelectedLanguage(newLang);
        localStorage.setItem("tf_lang_chosen", "true");
        localStorage.setItem("tf_lang", newLang);
        setTimeout(() => {
          handleShowMainMenu(confirmationText, newLang);
        }, 400);
        return;
      } else if (
        trimmed.includes("हिंदी") ||
        lower === "hindi" ||
        lower === "हिंदी" ||
        lower === "hi" ||
        lower === "3"
      ) {
        addUserMessage(trimmed);
        const newLang = "hi";
        const confirmationText = "आपने *हिंदी (Hindi)* भाषा चुनी है। टोमैटो एफएम कोल्हापुर (94.3 FM) में आपका स्वागत है! 🍅📻\nकृपया नीचे दिए गए विकल्पों में से सेवा चुनें:";
        setLanguageChosen(true);
        setSelectedLanguage(newLang);
        localStorage.setItem("tf_lang_chosen", "true");
        localStorage.setItem("tf_lang", newLang);
        setTimeout(() => {
          handleShowMainMenu(confirmationText, newLang);
        }, 400);
        return;
      } else {
        // Any other input when language not yet chosen
        addUserMessage(trimmed);
        addBotMessage({
          text: "⚠️ Please select your preferred language first to continue / कृपया पुढे जाण्यासाठी आपली भाषा निवडा / कृपया आगे बढ़ने के लिए अपनी भाषा चुनें:\n\n१. मराठी (Marathi) 🚩\n२. English 🇬🇧\n३. हिंदी (Hindi) 🇮🇳",
          type: "quickReplies",
          options: ["मराठी (Marathi) 🚩", "English 🇬🇧", "हिंदी (Hindi) 🇮🇳"],
        });
        return;
      }
    }

    if (isLangSelect && (!workflowState || !workflowState.serviceId)) {
      addUserMessage(trimmed);
      let newLang = "mr";
      let confirmationText = "";
      if (trimmed.includes("मराठी") || lower === "marathi" || lower === "मराठी" || lower === "mr") {
        newLang = "mr";
        confirmationText = "तुम्ही *मराठी (Marathi)* भाषा निवडली आहे. आपलं कोल्हापूर, आपलं टोमॅटो एफएम! 🍅📻\nखालीलपैकी हवी ती सेवा निवडा:";
      } else if (trimmed.includes("हिंदी") || lower === "hindi" || lower === "हिंदी" || lower === "hi") {
        newLang = "hi";
        confirmationText = "आपने *हिंदी (Hindi)* भाषा चुनी है। टोमैटो एफएम कोल्हापुर (94.3 FM) में आपका स्वागत है! 🍅📻\nकृपया नीचे दिए गए विकल्पों में से सेवा चुनें:";
      } else {
        newLang = "en";
        confirmationText = "You have selected *English*. Welcome to Tomato FM Kolhapur (94.3 FM)! Aapla Kolhapur, Aapla Tomato FM! 🍅📻\nPlease select a service from the options below:";
      }
      setSelectedLanguage(newLang);
      localStorage.setItem("tf_lang_chosen", "true");
      localStorage.setItem("tf_lang", newLang);
      setTimeout(() => {
        handleShowMainMenu(confirmationText, newLang);
      }, 400);
      return;
    }

    if (COMMANDS.MENU.includes(lower)) {
      addUserMessage("MENU");
      handleShowMainMenu();
      return;
    }

    if (COMMANDS.RESTART.includes(lower)) {
      addUserMessage("RESTART");
      handleRestart();
      return;
    }

    if (COMMANDS.CANCEL.includes(lower)) {
      const lang = selectedLanguage || "mr";
      addUserMessage("CANCEL");
      if (workflowState) {
        addBotMessage({
          text:
            lang === "mr"
              ? "सक्रिय विनंती रद्द केली. मुख्य मेनूवर परत आलो आहोत."
              : lang === "hi"
              ? "अनुरोध रद्द कर दिया गया। मुख्य मेनू पर वापस जा रहे हैं।"
              : "Active request cancelled. Returning to main menu.",
        });
        setTimeout(() => handleShowMainMenu(), 400);
      } else {
        handleShowMainMenu();
      }
      return;
    }

    if (COMMANDS.BACK.includes(lower)) {
      addUserMessage("BACK");
      handleBackNavigation();
      return;
    }

    if (COMMANDS.HUMAN.includes(lower)) {
      addUserMessage("HUMAN");
      startService("SERVICE_H");
      return;
    }

    if (COMMANDS.STATUS.includes(lower) || lower.startsWith("rmk-") || lower.startsWith("tf-")) {
      addUserMessage(trimmed);
      handleStatusLookup(trimmed);
      return;
    }

    if (!workflowState || !workflowState.serviceId) {
      addUserMessage(trimmed);

      const matchedOption = MAIN_MENU_OPTIONS.find(
        (o) =>
          o.num === trimmed ||
          o.title.toLowerCase().includes(lower) ||
          lower.includes(o.title.toLowerCase()) ||
          (o.id === "SERVICE_A" && (lower.includes("जाहिरात") || lower.includes("jaherat") || lower.includes("ad"))) ||
          (o.id === "SERVICE_B" && (lower.includes("वाढदिवस") || lower.includes("vadhdivas") || lower.includes("birthday"))) ||
          (o.id === "SERVICE_C" && (lower.includes("लग्न") || lower.includes("anniversary"))) ||
          (o.id === "SERVICE_D" && (lower.includes("शुभेच्छा") || lower.includes("greeting") || lower.includes("dedication"))) ||
          (o.id === "SERVICE_E" && (lower.includes("कार्यक्रम") || lower.includes("शो") || lower.includes("show") || lower.includes("timing"))) ||
          (o.id === "SERVICE_F" && (lower.includes("इव्हेंट") || lower.includes("event") || lower.includes("campaign"))) ||
          (o.id === "SERVICE_H" && (lower.includes("टीम") || lower.includes("team") || lower.includes("बोलणे") || lower.includes("human")))
      );

      if (matchedOption) {
        startService(matchedOption.id);
      } else {
        handleGeminiQuestion(trimmed);
      }
      return;
    }

    const { serviceId, stepIndex, data = {}, historySteps = [] } = workflowState;
    const lang = selectedLanguage || "mr";
    const flow = getServiceFlow(serviceId, lang);

    if (serviceId === "SERVICE_E") {
      addUserMessage(trimmed);
      addBotMessage({
        text: `*${flow.response}*\n\nFor verified live programme timings on Tomato FM 94.3, please call our studio at *${BRAND_CONFIG.phone}* or connect directly with our station executives.`,
        type: "quickReplies",
        options:
          lang === "mr"
            ? ["👨‍💼 आमच्या टीमशी बोला", "❓ दुसरा प्रश्न विचारा", "🔙 मुख्य मेनू"]
            : lang === "hi"
            ? ["👨‍💼 हमारी टीम से बात करें", "❓ अन्य प्रश्न पूछें", "🔙 मुख्य मेनू"]
            : ["👨‍💼 Talk to Our Team", "❓ Ask Another Question", "🔙 Main Menu"],
      });
      return;
    }

    if (serviceId === "SERVICE_G") {
      addUserMessage(trimmed);
      await handleGeminiQuestion(trimmed);
      return;
    }

    if (serviceId === "SERVICE_H") {
      addUserMessage(trimmed);
      const reqId = generateRequestId();
      saveDemoRequest({
        id: reqId,
        serviceId: "SERVICE_H",
        serviceTitle: flow.title,
        data: { requirement: trimmed },
      });

      addBotMessage({
        text: flow.confirmMessage(reqId),
        type: "success",
        requestId: reqId,
        serviceTitle: flow.title,
        successDetails: `Tomato FM 94.3: "${trimmed}"\n\nRepresentative status: Assigned • Tomato FM executive will reach out at the earliest.`,
      });

      setWorkflowState(null);
      setInputPlaceholder("Type a message");
      return;
    }

    const questions = flow.questions;
    const currentQ = questions[stepIndex];

    let selectedAnswer = trimmed;

    // Check if the current question requires selecting from predefined options
    if (currentQ.options && currentQ.options.length > 0) {
      const lowerInput = trimmed.toLowerCase();
      let matched = null;

      // Check numeric input (e.g. "1", "2")
      if (/^\d+$/.test(trimmed)) {
        const numIdx = parseInt(trimmed, 10) - 1;
        if (numIdx >= 0 && numIdx < currentQ.options.length) {
          matched = currentQ.options[numIdx];
        }
      }

      // Check string match against options
      if (!matched) {
        matched = currentQ.options.find(
          (opt) =>
            opt.toLowerCase() === lowerInput ||
            opt.toLowerCase().startsWith(lowerInput) ||
            lowerInput.includes(opt.toLowerCase())
        );
      }

      // If invalid response not matching any option:
      if (!matched) {
        addUserMessage(trimmed);

        const warningMsg =
          lang === "mr"
            ? `⚠️ हे मला अपेक्षित असलेले उत्तर नाही. कृपया खाली दिलेल्या पर्यायांपैकी एक पर्याय निवडा:\n\n*प्रश्न ${stepIndex + 1} पैकी ${questions.length}:*\n${currentQ.text}`
            : lang === "hi"
            ? `⚠️ यह अपेक्षित उत्तर नहीं है। कृपया नीचे दिए गए विकल्पों में से एक चुनें:\n\n*प्रश्न ${stepIndex + 1} कुल ${questions.length} में से:*\n${currentQ.text}`
            : `⚠️ That is not the answer I am expecting. Please select or type one of the given options below:\n\n*Question ${stepIndex + 1} of ${questions.length}:*\n${currentQ.text}`;

        addBotMessage({
          text: warningMsg,
          type: "quickReplies",
          options: currentQ.options,
        });
        return;
      }

      selectedAnswer = matched;
    }

    addUserMessage(selectedAnswer);

    const updatedData = {
      ...data,
      [currentQ.key]: selectedAnswer,
    };

    const nextIndex = stepIndex + 1;

    const updatedHistory = [
      ...historySteps,
      { stepIndex, dataSnapshot: { ...data } },
    ];

    if (nextIndex < questions.length) {
      const nextQ = questions[nextIndex];
      setWorkflowState({
        serviceId,
        stepIndex: nextIndex,
        data: updatedData,
        historySteps: updatedHistory,
      });

      setInputPlaceholder(nextQ.placeholder || `Enter ${nextQ.label}...`);

      const qLabel =
        lang === "mr"
          ? `*प्रश्न ${nextIndex + 1} पैकी ${questions.length}:*\n${nextQ.text}`
          : lang === "hi"
          ? `*प्रश्न ${nextIndex + 1} कुल ${questions.length} में से:*\n${nextQ.text}`
          : `*Question ${nextIndex + 1} of ${questions.length}:*\n${nextQ.text}`;

      addBotMessage({
        text: qLabel,
        type: nextQ.options ? "quickReplies" : "text",
        options: nextQ.options || null,
      });
    } else {
      setWorkflowState({
        serviceId,
        stepIndex: nextIndex,
        data: updatedData,
        historySteps: updatedHistory,
      });

      setInputPlaceholder(
        lang === "mr"
          ? "तपशील तपासून कन्फर्म करा किंवा एडिट करा..."
          : lang === "hi"
          ? "विवरण की पुष्टि करें या संपादित करें..."
          : "Click Confirm & Submit or Edit Details above..."
      );

      const reviewIntro =
        lang === "mr"
          ? `कृपया आपल्या *${flow.title}* चे तपशील तपासून खाली कन्फर्म करा:`
          : lang === "hi"
          ? `कृपया अपने *${flow.title}* का विवरण जांचें और पुष्टि करें:`
          : `Please review your *${flow.title}* details below and confirm:`;

      addBotMessage({
        text: reviewIntro,
        type: "summary",
        summaryTitle: flow.summaryTitle,
        summaryData: updatedData,
        fields: flow.questions.map((q) => ({ key: q.key, label: q.label })),
      });
    }
  };

  const handleBackNavigation = () => {
    if (!workflowState || !workflowState.serviceId) {
      addBotMessage({ text: "You are currently at the main menu." });
      return;
    }

    const { serviceId, stepIndex, historySteps = [] } = workflowState;
    const lang = selectedLanguage || "mr";
    const flow = getServiceFlow(serviceId, lang);

    if (!flow.questions || stepIndex === 0) {
      handleShowMainMenu(
        lang === "mr"
          ? "मुख्य मेनूवर परत आलो आहोत."
          : lang === "hi"
          ? "मुख्य मेनू पर वापस आ गए हैं।"
          : "Moved back to main menu."
      );
      return;
    }

    const prevHistory = [...historySteps];
    const lastStep = prevHistory.pop() || {
      stepIndex: Math.max(0, stepIndex - 1),
      dataSnapshot: {},
    };

    const prevIndex = Math.max(0, stepIndex - 1);
    const targetQ = flow.questions[prevIndex];

    setWorkflowState({
      serviceId,
      stepIndex: prevIndex,
      data: lastStep.dataSnapshot || {},
      historySteps: prevHistory,
    });

    setInputPlaceholder(targetQ.placeholder || `Enter ${targetQ.label}...`);

    const qLabel =
      lang === "mr"
        ? `*प्रश्न ${prevIndex + 1} पैकी ${flow.questions.length}:*\n${targetQ.text}`
        : lang === "hi"
        ? `*प्रश्न ${prevIndex + 1} कुल ${flow.questions.length} में से:*\n${targetQ.text}`
        : `*Rewound to Question ${prevIndex + 1} of ${flow.questions.length}:*\n${targetQ.text}`;

    addBotMessage({
      text: qLabel,
      type: targetQ.options ? "quickReplies" : "text",
      options: targetQ.options || null,
    });
  };

  const handleConfirmSummary = () => {
    if (!workflowState || !workflowState.serviceId) return;

    const { serviceId, data } = workflowState;
    const lang = selectedLanguage || "mr";
    const flow = getServiceFlow(serviceId, lang);
    const dynamicId = generateRequestId();

    saveDemoRequest({
      id: dynamicId,
      serviceId,
      serviceTitle: flow.title,
      data,
    });

    const confirmLabel =
      lang === "mr"
        ? "तपशील निश्चित करा व पाठवा (Confirm & Submit)"
        : lang === "hi"
        ? "पुष्टि करें और जमा करें (Confirm & Submit)"
        : "Confirm & Submit Request";

    addUserMessage(confirmLabel);

    const confirmText = flow.confirmMessage(dynamicId);

    addBotMessage({
      text: confirmText,
      type: "success",
      requestId: dynamicId,
      serviceTitle: flow.title,
      successDetails: confirmText,
    });

    setWorkflowState(null);
    setInputPlaceholder("Type a message");
  };

  const handleCancelSummary = () => {
    const lang = selectedLanguage || "mr";
    addUserMessage(
      lang === "mr" ? "रद्द करा (Cancel)" : lang === "hi" ? "रद्द करें (Cancel)" : "Cancel Request"
    );
    addBotMessage({
      text:
        lang === "mr"
          ? "चौकशी रद्द केली गेली आहे. कोणतेही तपशील सबमिट झाले नाहीत."
          : lang === "hi"
          ? "पूछताछ रद्द कर दी गई है। कोई विवरण जमा नहीं किया गया।"
          : "Enquiry cancelled. No details were submitted.",
    });
    setTimeout(() => handleShowMainMenu(), 400);
  };

  const handleGeminiQuestion = async (userQuery) => {
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userQuery,
          language: selectedLanguage || "mr",
          history: messages.slice(-6).map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      const data = await res.json();
      setIsTyping(false);

      if (data && data.reply) {
        addBotMessage(
          {
            text: data.reply,
            isAi: !data.isFallback,
          },
          100
        );
      } else {
        const isUserMarathi = /[\u0900-\u097F]/.test(userQuery);
        addBotMessage(
          {
            text: isUserMarathi
              ? "टोमॅटो एफएम ९४.३ कोल्हापूर शी संपर्क केल्याबद्दल धन्यवाद! 🍅📻 सर्व सेवांसाठी मेनू पाहण्यासाठी *MENU* टाईप करा किंवा आमच्या स्टुडिओशी *+91 9561034157* वर संपर्क करा."
              : "Tomato FM Kolhapur (94.3 FM) is always happy to help! You can type *MENU* to view all our services or call us at *+91 9561034157*.",
          },
          100
        );
      }
    } catch (err) {
      console.error("Chat API error:", err);
      setIsTyping(false);
      const isUserMarathi = /[\u0900-\u097F]/.test(userQuery);
      addBotMessage(
        {
          text: isUserMarathi
            ? "टोमॅटो एफएम ९४.३ कोल्हापूर शी संपर्क केल्याबद्दल धन्यवाद! 🍅📻 सर्व सेवांसाठी मेनू पाहण्यासाठी *MENU* टाईप करा किंवा आमच्या स्टुडिओशी *+91 9561034157* वर संपर्क करा."
            : "Thank you for reaching out to Tomato FM Kolhapur (94.3 FM)! 🍅📻 Please feel free to select a service from our menu by typing *MENU* or call our desk at *+91 9561034157*.",
        },
        100
      );
    }
  };

  const handleStatusLookup = (query) => {
    if (query.toUpperCase().startsWith("RMK-") || query.toUpperCase().startsWith("TF-")) {
      const match = findRequestById(query);
      if (match) {
        addBotMessage({
          text: `🔍 *Enquiry Found: ${match.id}*\n\n*Service:* ${match.serviceTitle}\n*Status:* ${match.status}\n*Submitted on:* ${new Date(match.createdAt).toLocaleDateString()}\n\nOur team is reviewing your enquiry. You will receive a call or WhatsApp update soon!`,
        });
        return;
      }
    }
    setStatusSearchQuery(query.toUpperCase().startsWith("RMK-") || query.toUpperCase().startsWith("TF-") ? query : "");
    setShowStatusModal(true);
  };

  const activeChat = DUMMY_CHATS.find((c) => c.id === activeChatId) || DUMMY_CHATS[0];
  const currentMessages = activeChatId === "bot" ? messages : (dummyConversations[activeChatId] || []);

  const lastBotMsg = messages[messages.length - 1];
  const lastBotMessageSnippet = lastBotMsg
    ? lastBotMsg.text.replace(/\n+/g, " ").slice(0, 48) + "..."
    : "Welcome to Tomato FM Kolhapur (94.3 FM)...";

  const isDark = theme === "dark";

  return (
    <div className={`h-screen w-screen overflow-hidden flex flex-col justify-center transition-colors duration-150 ${
      isDark ? "bg-[#0B141A]" : "bg-[#D1D7DB]"
    }`}>
      {/* WhatsApp Web Desktop Top Green Strip (in Light Mode) */}
      {!isDark && <div className="wa-web-top-strip hidden md:block" />}

      {/* Main WhatsApp Window Container */}
      <div className={`relative z-10 flex h-full w-full max-w-[1700px] mx-auto overflow-hidden border-0 md:border transition-all duration-150 ${
        isDark
          ? "bg-[#0B141A] border-[#2A3942]"
          : "bg-white border-[#E9EDEF] md:h-[calc(100vh-38px)] md:my-auto md:rounded-lg shadow-2xl"
      }`}>
        {/* Left Sidebar */}
        <Sidebar
          activeChatId={activeChatId}
          onSelectChat={(id) => {
            setActiveChatId(id);
            if (typeof window !== "undefined" && window.innerWidth < 768) {
              setIsSidebarOpen(false);
            }
          }}
          lastBotMessageSnippet={lastBotMessageSnippet}
          lastBotMessageTime={lastBotMsg?.timestamp || "7:19 pm"}
          isOpen={isSidebarOpen}
          onCloseMobile={() => setIsSidebarOpen(false)}
          theme={theme}
        />

        {/* Right Main Chat Area */}
        <main className={`h-full min-w-0 relative flex-1 ${
          isSidebarOpen ? "hidden md:flex flex-col" : "flex flex-col w-full"
        } ${isDark ? "bg-[#0B141A]" : "bg-[#EFEAE2]"}`}>
          {/* Main Chat Header */}
          <ChatHeader
            activeChat={activeChat}
            onRestart={handleRestart}
            onOpenMenu={() => {
              if (activeChatId !== "bot") setActiveChatId("bot");
              handleShowMainMenu();
            }}
            onOpenStatusTracker={() => setShowStatusModal(true)}
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            theme={theme}
            onToggleTheme={toggleTheme}
          />

          {/* Dummy Chat Notice Banner */}
          {activeChatId !== "bot" && (
            <div className={`px-4 py-2 border-b flex items-center justify-between text-[12px] z-10 flex-shrink-0 animate-fadeIn ${
              isDark ? "bg-[#182229] border-[#2A3942] text-[#8696A0]" : "bg-[#FFF8E1] border-[#FFE082] text-[#795548]"
            }`}>
              <div className="flex items-center gap-2 truncate">
                <Radio className="w-4 h-4 text-[#FF334B] flex-shrink-0" />
                <span className="truncate">
                  Viewing simulated conversation with <strong className={isDark ? "text-[#E9EDEF]" : "text-[#111B21]"}>{activeChat.name}</strong>.
                </span>
              </div>
              <button
                onClick={() => setActiveChatId("bot")}
                className="ml-2 px-2.5 py-1 bg-[#00A884] text-white font-bold text-[11px] rounded-md shadow-2xs hover:bg-[#008F6F] whitespace-nowrap transition-colors"
              >
                Switch to Tomato Bot
              </button>
            </div>
          )}

          {/* Messages Container with WhatsApp Wallpaper */}
          <div className={`flex-1 overflow-y-auto px-3 sm:px-6 md:px-10 lg:px-14 py-3 ${
            isDark ? "whatsapp-dark-bg" : "whatsapp-chat-bg"
          }`}>
            <div className="max-w-4xl mx-auto space-y-2">
              {/* WhatsApp Date Pill (Today) */}
              <div className="flex justify-center my-3 select-none">
                <span className={`text-[12px] font-medium px-3.5 py-1 rounded-md shadow-wa-sm uppercase tracking-wider border ${
                  isDark
                    ? "bg-[#182229] text-[#8696A0] border-[#222D34]"
                    : "bg-white text-[#54656F] border-[#E9EDEF]/80"
                }`}>
                  Today
                </span>
              </div>

              {/* Message Bubbles */}
              {currentMessages.map((msg, index) => (
                <MessageBubble
                  key={msg.id || index}
                  message={msg}
                  isLatest={index === currentMessages.length - 1}
                  onSelectOption={handleSelectMenuOption}
                  onQuickReply={handleQuickReply}
                  onConfirmSummary={handleConfirmSummary}
                  onBackSummary={handleBackNavigation}
                  onCancelSummary={handleCancelSummary}
                  onReturnToMenu={() => handleShowMainMenu()}
                  onCheckStatus={(reqId) => {
                    if (reqId && typeof reqId === "string") setStatusSearchQuery(reqId);
                    setShowStatusModal(true);
                  }}
                  theme={theme}
                />
              ))}

              {/* Bot Typing Indicator */}
              {isTyping && <TypingIndicator />}

              <div ref={messagesEndRef} className="h-1" />
            </div>
          </div>

          {/* Bottom Message Input Area */}
          <MessageInput
            onSendMessage={handleUserResponse}
            onTriggerCommand={(cmd) => {
              if (activeChatId !== "bot") setActiveChatId("bot");
              if (cmd === "MENU") handleShowMainMenu();
              if (cmd === "BACK") handleBackNavigation();
              if (cmd === "CANCEL") {
                addUserMessage("CANCEL");
                handleShowMainMenu("Request cancelled. Back to main menu:");
              }
              if (cmd === "HUMAN") {
                addUserMessage("HUMAN");
                startService("SERVICE_H");
              }
              if (cmd === "STATUS") {
                setShowStatusModal(true);
              }
              if (cmd === "LANGUAGE") {
                addUserMessage("Language / भाषा");
                setLanguageChosen(false);
                addBotMessage({
                  text: "Please select your preferred language / कृपया आपली भाषा निवडा / कृपया अपनी भाषा चुनें:",
                  type: "quickReplies",
                  options: ["मराठी (Marathi) 🚩", "English 🇬🇧", "हिंदी (Hindi) 🇮🇳"],
                });
              }
            }}
            activeWorkflow={activeChatId === "bot" ? workflowState?.serviceId : null}
            disabled={isTyping}
            inputPlaceholder={
              activeChatId === "bot"
                ? inputPlaceholder
                : `Message ${activeChat.name}...`
            }
            theme={theme}
          />
        </main>
      </div>

      {/* Demo Status & Request Tracker Modal */}
      <StatusModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        initialQuery={statusSearchQuery}
        theme={theme}
      />
    </div>
  );
}
