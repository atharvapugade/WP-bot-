import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are the official demo customer support assistant for Tomato FM Kolhapur (94.3 FM).
Station Location: Kolhapur, Maharashtra, India.
Contact Phone: +91 9561034157
Tagline: "Aapla Kolhapur, Aapla Tomato FM!"

Key Guidelines:
1. You assist listeners and businesses with advertising enquiries, birthday wishes, anniversary wishes, special greetings, event promotions, and radio programme guidance on Tomato FM 94.3.
2. Tone: Friendly, vibrant, warm, professional, and helpful (like a friendly radio station host).
3. CRITICAL MARATHI REQUIREMENT: If the user types in Marathi (Devanagari script or Roman Marathi / Marathlish), you MUST respond completely and naturally in Marathi! Use warm, polite, and fluent Kolhapuri Marathi ("नमस्कार!", "आपलं कोल्हापूर, आपलं टोमॅटो एफएम!"). If the user writes in English, reply in English. If in Hindi, reply in Hindi.
4. STRICT TRUTH POLICY: Never invent advertising package rates, guaranteed broadcast time slots, fake RJ names, or unauthorized programme schedules. If specific pricing, schedules, or slots are requested, explain that our station executives provide tailored packages and invite them to submit an enquiry or call +91 9561034157.
5. Keep your responses concise (2 to 4 sentences maximum) and suitable for a mobile WhatsApp chat screen. Use occasional pleasant emojis (📻, 🍅, ✨, 🎶, 📢).
6. Remind them they can type "MENU" at any time to access automated service bookings.`;

function getRuleBasedResponse(query, language = "mr") {
  const q = query.toLowerCase();
  const isMarathi =
    language === "mr" ||
    /[\u0900-\u097F]/.test(query) ||
    /\b(namaskar|kasa|kase|aahat|kay|mala|ahe|kiti|kuthe|jaherat|vadhdivas|subhechha|dhanyavad|apla|kolhapurkar|sang|bhet)\b/i.test(query);

  const isHindi =
    language === "hi" ||
    /\b(namaste|kya|kaise|kripya|chahiye|shubhkamnaye|vigyapan)\b/i.test(query);

  if (isMarathi && language !== "en") {
    if (q.includes("जाहिरात") || q.includes("jaherat") || q.includes("दर") || q.includes("rate") || q.includes("खर्च") || q.includes("प्रचार") || q.includes("ad")) {
      return {
        reply: "टोमॅटो एफएम ९४.३ कोल्हापूर वर जाहिरात करून आपला व्यवसाय संपूर्ण कोल्हापूर व आसपासच्या भागात घराघरात पोहोचवा! 📢 विशेष पॅकेजेस आणि जाहिरात दरांच्या माहितीसाठी कृपया मेनूमधून '1. Radio Advertisement' पर्याय निवडा किंवा आमच्या टीमशी +91 9561034157 वर थेट संपर्क साधा.",
        isFallback: true,
      };
    }

    if (q.includes("वाढदिवस") || q.includes("vadhdivas") || q.includes("शुभेच्छा") || q.includes("birthday")) {
      return {
        reply: "🎂 टोमॅटो एफएम ९४.३ वर आपल्या प्रिय व्यक्तीला ऑन-एअर वाढदिवसाच्या खास शुभेच्छा द्या आणि त्यांचे आवडते गाणे वाजवा! मेनूमधून '2. Birthday Wishes' निवडा आणि नाव व संदेश पाठवा.",
        isFallback: true,
      };
    }

    if (q.includes("लग्न") || q.includes("anniversary") || q.includes("सालगिरह")) {
      return {
        reply: "💐 लग्नाच्या वाढदिवसाच्या मनःपूर्वक शुभेच्छा! टोमॅटो एफएम ९४.३ वर ही खास भेट देण्यासाठी मेनूमधून '3. Anniversary Wishes' पर्याय निवडा.",
        isFallback: true,
      };
    }

    if (q.includes("कार्यक्रम") || q.includes("karyakram") || q.includes("शो") || q.includes("आरजे") || q.includes("वेळ") || q.includes("timing")) {
      return {
        reply: "🎙️ टोमॅटो एफएम ९४.३ वरील नवीन शो, मनोरंजक कार्यक्रम आणि आरजे शेड्युलच्या माहितीसाठी मेनूमधून 'New Shows & Programme Info' निवडा किंवा आमच्या स्टुडिओशी +91 9561034157 वर संपर्क करा!",
        isFallback: true,
      };
    }

    if (q.includes("पत्ता") || q.includes("कॉल") || q.includes("ऑफिस") || q.includes("कुठे") || q.includes("kuthe") || q.includes("नंबर") || q.includes("address")) {
      return {
        reply: "📍 टोमॅटो एफएम ९४.३ चे स्टुडिओ कार्यालय कोल्हापूर, महाराष्ट्र येथे आहे. कार्यालयीन वेळ: सोमवार ते शनिवार, सकाळी ९:३० ते संध्याकाळी ६:३०. अधिकृत संपर्क क्रमांक: +91 9561034157.",
        isFallback: true,
      };
    }

    return {
      reply: "नमस्कार कोल्हापूर! 🙏 टोमॅटो एफएम ९४.३ (आपलं कोल्हापूर, आपलं टोमॅटो एफएम!) मध्ये आपले सहर्ष स्वागत! जाहिरात, वाढदिवसाच्या शुभेच्छा किंवा इतर सेवेसाठी मेनू पाहण्यासाठी 'MENU' टाईप करा किंवा थेट कॉल करा +91 9561034157.",
      isFallback: true,
    };
  }

  if (isHindi) {
    if (q.includes("विज्ञापन") || q.includes("rate") || q.includes("cost") || q.includes("ad")) {
      return {
        reply: "टोमैटो एफएम 94.3 कोल्हापुर पर विज्ञापन देकर अपने व्यापार को पूरे कोल्हापुर में प्रसिद्ध करें! 📢 विशेष पैकेज और दरों की जानकारी के लिए कृपया मेनू से '1. रेडियो विज्ञापन' चुनें या हमारी टीम से +91 9561034157 पर संपर्क करें।",
        isFallback: true,
      };
    }

    return {
      reply: "नमस्ते! 👋 टोमैटो एफएम कोल्हापुर (94.3 FM) में आपका स्वागत है! विज्ञापन, बर्थडे विशेज या शो की जानकारी के लिए आप मेनू से विकल्प चुन सकते हैं या हमारी टीम से +91 9561034157 पर संपर्क कर सकते हैं।",
      isFallback: true,
    };
  }

  // English & general fallbacks
  if (q.includes("advertis") || q.includes("ads") || q.includes("rate") || q.includes("cost") || q.includes("prachar") || q.includes("jaherat")) {
    return {
      reply: "Tomato FM Kolhapur (94.3 FM) offers high-impact on-air spots, RJ mentions, and brand amplifications across Kolhapur! 📢 To receive customized packages and rates, please choose 'Radio Advertisement' from our main menu or call our team at +91 9561034157.",
      isFallback: true,
    };
  }

  if (q.includes("birthday") || q.includes("janmadin") || q.includes("vadhdivas")) {
    return {
      reply: "🎂 Let's make birthdays extra special on Tomato FM 94.3! You can dedicate an on-air wish and favorite song by selecting 'Birthday Wishes' from the menu.",
      isFallback: true,
    };
  }

  if (q.includes("anniversary") || q.includes("wedding")) {
    return {
      reply: "💐 Heartiest congratulations! You can celebrate couple milestones on 94.3 FM by selecting 'Anniversary Wishes' from the menu.",
      isFallback: true,
    };
  }

  if (q.includes("rj") || q.includes("show") || q.includes("timing") || q.includes("karyakram") || q.includes("schedule")) {
    return {
      reply: "🎙️ Our Tomato FM programme schedule and show line-ups are currently being updated for the new season. Please select 'New Shows & Programme Information' from the menu or reach out to our team at +91 9561034157 for today's show line-up!",
      isFallback: true,
    };
  }

  if (q.includes("address") || q.includes("location") || q.includes("office") || q.includes("kothe") || q.includes("kaha")) {
    return {
      reply: "📍 Tomato FM 94.3 station is located in Kolhapur, Maharashtra. Our studio operates Monday to Saturday, 9:30 AM to 6:30 PM. You can contact our desk directly at +91 9561034157.",
      isFallback: true,
    };
  }

  return {
    reply: "Thank you for reaching out to Tomato FM Kolhapur (94.3 FM)! 🍅📻 We are here to help you with radio ads, personal dedications, event promotions, and show information. You can type 'MENU' to view all automated services or call +91 9561034157.",
    isFallback: true,
  };
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { message, history = [], language = "mr" } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const isKeyPlaceholder =
      !apiKey ||
      apiKey === "PASTE_YOUR_GEMINI_API_KEY_HERE" ||
      apiKey.trim().length === 0;

    // Graceful rule-based fallback when API key is not yet configured
    if (isKeyPlaceholder) {
      const fallback = getRuleBasedResponse(message, language);
      return NextResponse.json({
        reply: fallback.reply,
        isFallback: true,
        reason: "API_KEY_NOT_CONFIGURED",
        note: "Add your Gemini API key in .env.local to enable live generative AI responses.",
      });
    }

    // Call Google GenAI SDK
    try {
      const ai = new GoogleGenAI({ apiKey });
      const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";

      const langInstruction =
        language === "mr"
          ? "CRITICAL REQUIREMENT: The user has selected MARATHI language. You MUST respond completely and naturally in fluent, polite Kolhapuri Marathi."
          : language === "hi"
          ? "CRITICAL REQUIREMENT: The user has selected HINDI language. You MUST respond completely and naturally in polite Hindi."
          : "CRITICAL REQUIREMENT: The user has selected ENGLISH language. You MUST respond in English.";

      const contextTurns = (history || [])
        .slice(-6)
        .filter((h) => h.text && typeof h.text === "string")
        .map((h) => `${h.sender === "user" ? "User" : "Tomato FM Assistant"}: ${h.text}`)
        .join("\n");

      const promptText = contextTurns
        ? `Recent Conversation Context:\n${contextTurns}\n\nCustomer Message: ${message}\nAssistant Reply:`
        : message;

      const response = await ai.models.generateContent({
        model: modelName,
        contents: promptText,
        config: {
          systemInstruction: `${SYSTEM_INSTRUCTION}\n\n${langInstruction}`,
          temperature: 0.7,
        },
      });

      const replyText =
        response?.text ||
        (language === "mr"
          ? "टोमॅटो एफएम ९४.३ कोल्हापूर शी संपर्क केल्याबद्दल धन्यवाद! कृपया मेनू पाहण्यासाठी 'MENU' टाईप करा."
          : "Thank you for contacting Tomato FM Kolhapur! Please feel free to ask any other questions or type 'MENU'.");

      return NextResponse.json({
        reply: replyText.trim(),
        isFallback: false,
      });
    } catch (apiError) {
      console.error("Gemini API call error:", apiError?.message || apiError);
      const fallback = getRuleBasedResponse(message, language);
      return NextResponse.json({
        reply: fallback.reply,
        isFallback: true,
        reason: "API_ERROR",
        errorDetails: apiError?.message || "AI service temporarily unavailable",
      });
    }
  } catch (err) {
    console.error("Chat API route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
