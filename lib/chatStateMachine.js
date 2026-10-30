import { MAIN_MENU_OPTIONS, BRAND_CONFIG } from "./constants";
import { generateRequestId, saveDemoRequest, findRequestById, getDemoRequests } from "./storage";

/**
 * -------------------------------------------------------------
 * ENGLISH SERVICE FLOWS
 * -------------------------------------------------------------
 */
const FLOWS_EN = {
  SERVICE_A: {
    id: "SERVICE_A",
    title: "Radio Advertisement",
    intro: "Great! 📢 Thank you for your interest in advertising with Tomato FM Kolhapur (94.3 FM).\n\nLet's understand your advertising requirements.",
    summaryTitle: "📢 Radio Advertisement Enquiry Summary",
    questions: [
      {
        key: "brandName",
        label: "Business / Brand Name",
        text: "What is your business or brand name?",
        placeholder: "e.g. Kolhapur Jewellers, Hotel Shahu...",
        type: "text",
      },
      {
        key: "category",
        label: "Business Category",
        text: "Which category does your business belong to?",
        type: "select",
        options: [
          "Retail & Shopping",
          "Real Estate & Housing",
          "Education & Coaching",
          "Healthcare & Hospitals",
          "Food & Dining",
          "Automotive & Electronics",
          "Jewellery & Fashion",
          "Other Services",
        ],
      },
      {
        key: "objective",
        label: "Advertising Objective",
        text: "What is your advertisement objective?",
        type: "select",
        options: [
          "Brand Awareness & Reach",
          "New Store Launch / Walk-ins",
          "Festive / Discount Offer",
          "Product / Service Promotion",
          "Event Publicity",
        ],
      },
      {
        key: "product",
        label: "Product / Service",
        text: "What product or service do you want to promote?",
        placeholder: "e.g. Festive discount on gold, new residential flats...",
        type: "text",
      },
      {
        key: "adType",
        label: "Advertisement Type",
        text: "What type of advertisement are you interested in?",
        type: "select",
        options: [
          "Radio Advertisement (Audio Spot)",
          "RJ Mention",
          "Programme Sponsorship",
          "Promotional Campaign",
        ],
      },
      {
        key: "startDate",
        label: "Preferred Start Date",
        text: "What is your preferred campaign start date?",
        type: "select_or_text",
        options: [
          "Immediately (This Week)",
          "Next Week",
          "Beginning of Next Month",
          "Festive Season",
        ],
        placeholder: "Or type a specific date (e.g. 15th Nov)",
      },
      {
        key: "duration",
        label: "Campaign Duration",
        text: "What is the expected campaign duration?",
        type: "select",
        options: [
          "3 to 5 Days",
          "1 Week (7 Days)",
          "2 Weeks (14 Days)",
          "1 Month (30 Days)",
          "Long-term Campaign",
        ],
      },
      {
        key: "budget",
        label: "Approximate Budget",
        text: "What is your approximate advertising budget?",
        type: "select",
        options: [
          "Below ₹5,000",
          "₹5,000–₹10,000",
          "₹10,000–₹25,000",
          "₹25,000–₹50,000",
          "Above ₹50,000",
          "Flexible / Discuss with team",
        ],
      },
      {
        key: "specialInstructions",
        label: "Special Instructions",
        text: "Any preferred time slot or specific requirement for Tomato FM?",
        type: "select",
        options: [
          "Morning & Evening Prime Time",
          "Afternoon Run of Day",
          "Marathi Jingle Production Required",
          "Custom RJ Script / Interview",
          "Discuss with Station Executive",
        ],
      },
      {
        key: "contactName",
        label: "Contact Person Name",
        text: "What is the contact person's name?",
        placeholder: "Full name",
        type: "text",
      },
      {
        key: "phone",
        label: "Mobile Number",
        text: "What is your 10-digit mobile number?",
        placeholder: "10-digit mobile number",
        type: "phone",
      },
    ],
    confirmMessage: (id) =>
      `🎉 Your advertising enquiry has been successfully recorded!\n\nOur Tomato FM Kolhapur team will review your requirements and contact you regarding custom packages and pricing.\n\nEnquiry ID: *${id}*\n\nLet's grow your business with 94.3 FM! 🌟`,
  },

  SERVICE_B: {
    id: "SERVICE_B",
    title: "Birthday Wishes",
    intro: "🎂 Let's make someone's birthday extra special on Tomato FM Kolhapur (94.3 FM)!\n\nPlease provide the details below.",
    summaryTitle: "🎂 Birthday Wish Request Summary",
    questions: [
      {
        key: "birthdayPerson",
        label: "Birthday Person",
        text: "Who is celebrating their birthday?",
        placeholder: "Full name of the birthday person",
        type: "text",
      },
      {
        key: "age",
        label: "Age (Optional)",
        text: "What is their age? (Optional)",
        type: "select_or_text",
        options: ["Prefer not to say", "Turning 18", "Sweet 16", "25th Birthday", "50th Golden Jubilee"],
        placeholder: "Type age or pick option",
      },
      {
        key: "relationship",
        label: "Relationship",
        text: "What is your relationship with them?",
        type: "select",
        options: [
          "Best Friend",
          "Spouse / Partner",
          "Parent (Mom/Dad)",
          "Brother / Sister",
          "Son / Daughter",
          "Colleague",
          "Other",
        ],
      },
      {
        key: "message",
        label: "Greeting Message",
        text: "What message would you like to convey on air?",
        placeholder: "Your heartfelt birthday message...",
        type: "text",
      },
      {
        key: "song",
        label: "Song Dedication",
        text: "Is there a specific song you would like to dedicate?",
        placeholder: "Song name / movie / artist (e.g. Zingaat, Tum Hi Ho)",
        type: "text",
      },
      {
        key: "date",
        label: "Broadcast Date",
        text: "Which date should the birthday wish be aired?",
        type: "select_or_text",
        options: ["Today", "Tomorrow", "This Weekend"],
        placeholder: "Or enter date (e.g. 2nd November)",
      },
      {
        key: "senderName",
        label: "Your Name",
        text: "What is your name (sender)?",
        placeholder: "Your name",
        type: "text",
      },
      {
        key: "phone",
        label: "Mobile Number",
        text: "What is your contact number?",
        placeholder: "10-digit mobile number",
        type: "phone",
      },
    ],
    confirmMessage: (id) =>
      `🎉 Your birthday wish request has been submitted!\n\nOur team will review your message and schedule it for broadcast on Tomato FM 94.3.\n\nRequest ID: *${id}*\n\nWishing them a fantastic birthday filled with music! 🎂📻`,
  },

  SERVICE_C: {
    id: "SERVICE_C",
    title: "Anniversary Wishes",
    intro: "💐 Celebrating love on Tomato FM 94.3! Let's arrange a wonderful anniversary shoutout.\n\nPlease share the details below.",
    summaryTitle: "💐 Anniversary Wish Request Summary",
    questions: [
      {
        key: "coupleNames",
        label: "Couple Names",
        text: "What are the names of the anniversary couple?",
        placeholder: "e.g. Rajesh & Snehal",
        type: "text",
      },
      {
        key: "years",
        label: "Years of Marriage",
        text: "Which anniversary are they celebrating?",
        type: "select_or_text",
        options: [
          "1st Anniversary",
          "5th Anniversary",
          "10th Anniversary",
          "25th Silver Jubilee",
          "50th Golden Jubilee",
        ],
        placeholder: "Or type years (e.g. 7th Anniversary)",
      },
      {
        key: "relationship",
        label: "Relationship",
        text: "Who are you to the couple?",
        type: "select",
        options: [
          "Self (My own anniversary)",
          "Parents",
          "Close Friends",
          "Brother / Sister",
          "Children",
          "Relatives",
        ],
      },
      {
        key: "message",
        label: "Anniversary Message",
        text: "What anniversary wish would you like to dedicate?",
        placeholder: "Your anniversary wish...",
        type: "text",
      },
      {
        key: "song",
        label: "Dedicated Song",
        text: "Any special romantic song you would like us to play?",
        placeholder: "Song name / movie",
        type: "text",
      },
      {
        key: "date",
        label: "Broadcast Date",
        text: "When is their anniversary date?",
        type: "select_or_text",
        options: ["Today", "Tomorrow", "This Weekend"],
        placeholder: "Or enter date (e.g. 5th November)",
      },
      {
        key: "senderName",
        label: "Your Name",
        text: "What is your name?",
        placeholder: "Your name",
        type: "text",
      },
      {
        key: "phone",
        label: "Mobile Number",
        text: "What is your mobile number?",
        placeholder: "10-digit mobile number",
        type: "phone",
      },
    ],
    confirmMessage: (id) =>
      `💐 Your anniversary celebration request has been confirmed!\n\nOur RJs will air this sweet message on Tomato FM 94.3.\n\nRequest ID: *${id}*\n\nHappy Anniversary to the beautiful couple! 🥂✨`,
  },

  SERVICE_D: {
    id: "SERVICE_D",
    title: "Special Greetings & Dedications",
    intro: "❤️ Dedicate a heartfelt message or favourite song on Tomato FM Kolhapur (94.3 FM)!\n\nLet's get the details.",
    summaryTitle: "❤️ Special Greeting Dedication Summary",
    questions: [
      {
        key: "occasion",
        label: "Occasion / Reason",
        text: "What is the occasion for your dedication?",
        type: "select_or_text",
        options: [
          "Diwali / Festive Greetings",
          "Congratulations / Achievement",
          "Thank You Note",
          "Friendship Dedication",
          "Just Love & Appreciation",
        ],
        placeholder: "Or type the occasion",
      },
      {
        key: "recipient",
        label: "Recipient Name",
        text: "Who is this greeting for?",
        placeholder: "Name of the person or family",
        type: "text",
      },
      {
        key: "message",
        label: "Message Content",
        text: "What is your message for them?",
        placeholder: "Your message to be aired...",
        type: "text",
      },
      {
        key: "song",
        label: "Song Dedication",
        text: "Which song would you like to dedicate?",
        placeholder: "Track name or movie",
        type: "text",
      },
      {
        key: "senderName",
        label: "Sender Name",
        text: "What is your name?",
        placeholder: "Your name",
        type: "text",
      },
      {
        key: "phone",
        label: "Mobile Number",
        text: "What is your mobile number?",
        placeholder: "10-digit mobile number",
        type: "phone",
      },
    ],
    confirmMessage: (id) =>
      `❤️ Your song dedication has been recorded!\n\nTomato FM 94.3 will broadcast your heartfelt greetings.\n\nRequest ID: *${id}*\n\nKeep listening to Tomato FM Kolhapur! 🎶`,
  },

  SERVICE_E: {
    id: "SERVICE_E",
    title: "New Shows & Programme Information",
    intro: "📻 Tomato FM Kolhapur (94.3 FM) Programme Schedule:\n\nPlease select what you would like to know:",
    options: [
      "Morning Prime Time Shows",
      "Afternoon Family & Retro Shows",
      "Evening Drive Time Shows",
      "Weekend Special Music & Contests",
      "Talk to Station Executive",
    ],
    response: "Tomato FM 94.3 Kolhapur brings you non-stop entertainment with hit music, local Kolhapur city updates, contests, and lively RJs throughout the day!",
  },

  SERVICE_F: {
    id: "SERVICE_F",
    title: "Event & Promotional Campaigns",
    intro: "🎉 Promote your event across Kolhapur with Tomato FM 94.3 on-air & on-ground partnerships!\n\nPlease provide your event details.",
    summaryTitle: "🎉 Event Promotion Partnership Summary",
    questions: [
      {
        key: "eventName",
        label: "Event Name",
        text: "What is the name of your event?",
        placeholder: "e.g. Kolhapur Food Festival, College Fest 2026...",
        type: "text",
      },
      {
        key: "eventDate",
        label: "Event Date(s)",
        text: "When is the event scheduled?",
        placeholder: "e.g. 10th - 12th December 2026",
        type: "text",
      },
      {
        key: "venue",
        label: "Venue / Location",
        text: "Where is the event venue in Kolhapur?",
        placeholder: "e.g. Shahu Smarak, Rankala Grounds...",
        type: "text",
      },
      {
        key: "partnershipType",
        label: "Partnership Required",
        text: "What kind of partnership are you looking for with Tomato FM?",
        type: "select",
        options: [
          "Official Radio Partner",
          "On-air Promotional Jingles & Spots",
          "RJ Emcee / Live Broadcast at Venue",
          "Full Media Coverage Package",
        ],
      },
      {
        key: "contactName",
        label: "Contact Person Name",
        text: "What is the contact person's name?",
        placeholder: "Full name",
        type: "text",
      },
      {
        key: "phone",
        label: "Mobile Number",
        text: "What is your mobile number?",
        placeholder: "10-digit mobile number",
        type: "phone",
      },
    ],
    confirmMessage: (id) =>
      `🎉 Your event promotion enquiry has been submitted!\n\nOur team will review your proposal and contact you regarding partnership options and coverage.\n\nRequest ID: *${id}*\n\nLet's make your event a grand success with Tomato FM! 🌟`,
  },

  SERVICE_G: {
    id: "SERVICE_G",
    title: "General Enquiry",
    intro: "📻 Welcome to Tomato FM Kolhapur (94.3 FM) AI Helpdesk!\n\nYou can ask any questions regarding our station, advertising opportunities, frequency, or greetings in English, Hindi, or Marathi.",
  },

  SERVICE_H: {
    id: "SERVICE_H",
    title: "Talk to Our Team",
    intro: "Of course! Our team at Tomato FM Kolhapur will be happy to assist you. 👨‍💼\n\nPlease briefly describe your requirement.",
    confirmMessage: (id) =>
      `Thank you! Your support request has been recorded.\n\nOur station team will contact you regarding your enquiry.\n\nRequest ID: *${id}*\n\n(Simulated Human Support Ticket: Active • Tomato FM Executive Assigned)`,
  },
};

/**
 * -------------------------------------------------------------
 * MARATHI SERVICE FLOWS (मराठी)
 * -------------------------------------------------------------
 */
const FLOWS_MR = {
  SERVICE_A: {
    id: "SERVICE_A",
    title: "रेडिओ जाहिरात (Radio Advertisement)",
    intro: "खूप छान! 📢 टोमॅटो एफएम ९४.३ कोल्हापूर वर जाहिरात करण्यात स्वारस्य दाखवल्याबद्दल धन्यवाद.\n\nचला, आपल्या जाहिरातीच्या गरजा जाणून घेऊया.",
    summaryTitle: "📢 रेडिओ जाहिरात चौकशी सारांश",
    questions: [
      {
        key: "brandName",
        label: "व्यवसाय / ब्रँडचे नाव",
        text: "आपल्या व्यवसायाचे किंवा ब्रँडचे नाव काय आहे?",
        placeholder: "उदा. कोल्हापूर ज्वेलर्स, हॉटेल शाहू...",
        type: "text",
      },
      {
        key: "category",
        label: "व्यवसाय श्रेणी",
        text: "आपला व्यवसाय कोणत्या श्रेणीमध्ये मोडतो?",
        type: "select",
        options: [
          "रिटेल व खरेदी (Retail & Shopping)",
          "रिअल इस्टेट व गृहनिर्माण (Real Estate)",
          "शिक्षण व कोचिंग (Education)",
          "आरोग्य व रुग्णालये (Healthcare)",
          "हॉटेल्स व खाद्यपदार्थ (Food & Dining)",
          "ऑटोमोबाईल व इलेक्ट्रॉनिक्स",
          "दागिने व फॅशन (Jewellery & Fashion)",
          "इतर सेवा (Other Services)",
        ],
      },
      {
        key: "objective",
        label: "जाहिरात उद्देश",
        text: "आपल्या जाहिरातीचा मुख्य उद्देश काय आहे?",
        type: "select",
        options: [
          "ब्रँड ओळख व पोहोच (Brand Awareness)",
          "नवीन स्टोअर लाँच / ग्राहक भेट",
          "सणासुदीची / विशेष सवलत ऑफर",
          "उत्पादन / सेवा प्रसिद्धी",
          "इव्हेंट प्रसिद्धी (Event Publicity)",
        ],
      },
      {
        key: "product",
        label: "उत्पादन / सेवा",
        text: "आपण कोणत्या उत्पादन किंवा सेवेचा प्रचार करू इच्छिता?",
        placeholder: "उदा. सोन्याच्या दागिन्यांवर सवलत, नवीन फ्लॅट्स...",
        type: "text",
      },
      {
        key: "adType",
        label: "जाहिरात प्रकार",
        text: "आपण कोणत्या प्रकारची जाहिरात करू इच्छिता?",
        type: "select",
        options: [
          "रेडिओ जाहिरात (Audio Spot)",
          "आरजे मेंशन (RJ Mention)",
          "कार्यक्रम प्रायोजकत्व (Sponsorship)",
          "प्रमोशनल मोहीम (Promotional Campaign)",
        ],
      },
      {
        key: "startDate",
        label: "सुरुवात तारीख",
        text: "जाहिरात मोहीम कधीपासून सुरू करायची आहे?",
        type: "select_or_text",
        options: [
          "ताबडतोब (या आठवड्यात)",
          "पुढील आठवड्यात",
          "पुढील महिन्याच्या सुरुवातीला",
          "सणासुदीच्या काळात",
        ],
        placeholder: "किंवा विशिष्ट तारीख टाईप करा (उदा. १५ नोव्हेंबर)",
      },
      {
        key: "duration",
        label: "मोहीम कालावधी",
        text: "जाहिरातीचा अपेक्षित कालावधी किती असेल?",
        type: "select",
        options: [
          "३ ते ५ दिवस",
          "१ आठवडा (७ दिवस)",
          "२ आठवडे (१४ दिवस)",
          "१ महिना (३० दिवस)",
          "दीर्घकालीन मोहीम",
        ],
      },
      {
        key: "budget",
        label: "अंदाजे बजेट",
        text: "आपले अंदाजे जाहिरात बजेट किती आहे?",
        type: "select",
        options: [
          "₹५,००० च्या आत",
          "₹५,०००–₹१०,०००",
          "₹१०,०००–₹२५,०००",
          "₹२५,०००–₹५०,०००",
          "₹५०,००० पेक्षा जास्त",
          "चर्चा करून ठरवू",
        ],
      },
      {
        key: "specialInstructions",
        label: "विशेष सूचना",
        text: "आपण टोमॅटो एफएम ९४.३ ला कोणती विशिष्ट सूचना देऊ इच्छिता?",
        type: "select",
        options: [
          "सकाळी व संध्याकाळी प्राईम टाईम",
          "दुपारचे कौटुंबिक स्लॉट",
          "मराठी जिंगल निर्मिती हवी आहे",
          "आरजे कडून विशेष अनाउन्समेंट",
          "स्टुडिओ टीमशी चर्चा करू",
        ],
      },
      {
        key: "contactName",
        label: "संपर्क व्यक्तीचे नाव",
        text: "संपर्क व्यक्तीचे पूर्ण नाव काय आहे?",
        placeholder: "पूर्ण नाव",
        type: "text",
      },
      {
        key: "phone",
        label: "मोबाईल नंबर",
        text: "आपला १० अंकी मोबाईल नंबर काय आहे?",
        placeholder: "१० अंकी मोबाईल नंबर",
        type: "phone",
      },
    ],
    confirmMessage: (id) =>
      `🎉 आपली जाहिरात चौकशी यशस्वीपणे नोंदवली गेली आहे!\n\nआमची टोमॅटो एफएम ९४.३ कोल्हापूर टीम लवकरच आपल्याशी संपर्क करेल.\n\nचौकशी आयडी: *${id}*\n\nआपला व्यवसाय वाढवण्यासाठी टोमॅटो एफएम सदैव तत्पर! 🌟`,
  },

  SERVICE_B: {
    id: "SERVICE_B",
    title: "वाढदिवस शुभेच्छा (Birthday Wishes)",
    intro: "🎂 टोमॅटो एफएम ९४.३ कोल्हापूर वर आपल्या प्रिय व्यक्तीला वाढदिवसाच्या खास शुभेच्छा द्या!\n\nकृपया खालील माहिती भरा.",
    summaryTitle: "🎂 वाढदिवस शुभेच्छा विनंती सारांश",
    questions: [
      {
        key: "birthdayPerson",
        label: "वाढदिवस व्यक्ती",
        text: "कोणाचा वाढदिवस आहे? (नाव)",
        placeholder: "वाढदिवस असलेल्या व्यक्तीचे नाव",
        type: "text",
      },
      {
        key: "age",
        label: "वय (ऐच्छिक)",
        text: "त्यांचे वय किती आहे? (ऐच्छिक)",
        type: "select_or_text",
        options: ["सांगू इच्छित नाही", "१८ वा वाढदिवस", "२५ वा वाढदिवस", "५० वी सुवर्णमहोत्सवी वर्षगाठ"],
        placeholder: "वय टाईप करा किंवा पर्याय निवडा",
      },
      {
        key: "relationship",
        label: "नाते",
        text: "त्यांच्याशी आपले नाते काय आहे?",
        type: "select",
        options: [
          "मित्र / मैत्रीण (Best Friend)",
          "पती / पत्नी (Spouse)",
          "आई / वडील (Parents)",
          "भाऊ / बहीण (Sibling)",
          "मुलगा / मुलगी",
          "सहकारी",
          "इतर",
        ],
      },
      {
        key: "message",
        label: "शुभेच्छा संदेश",
        text: "आपला वाढदिवसाचा गोड संदेश काय आहे?",
        placeholder: "आपल्या मनातील सदिच्छा संदेश...",
        type: "text",
      },
      {
        key: "song",
        label: "समर्पित गाणे",
        text: "त्यांच्यासाठी कोणते आवडते गाणे वाजवायचे आहे?",
        placeholder: "गाण्याचे नाव किंवा चित्रपट...",
        type: "text",
      },
      {
        key: "date",
        label: "प्रसारण तारीख",
        text: "वाढदिवस कोणत्या तारखेला प्रसारित करायचा आहे?",
        type: "select_or_text",
        options: ["आजच (Today)", "उद्या (Tomorrow)", "या आठवड्यात"],
        placeholder: "किंवा तारीख टाईप करा (उदा. २५ नोव्हेंबर)",
      },
      {
        key: "senderName",
        label: "आपले नाव",
        text: "शुभेच्छा देणाऱ्या व्यक्तीचे (आपले) नाव काय आहे?",
        placeholder: "आपले नाव",
        type: "text",
      },
      {
        key: "phone",
        label: "मोबाईल नंबर",
        text: "आपला १० अंकी संपर्क नंबर काय आहे?",
        placeholder: "१० अंकी मोबाईल नंबर",
        type: "phone",
      },
    ],
    confirmMessage: (id) =>
      `🎉 वाढदिवसाच्या शुभेच्छांची विनंती यशस्वीपणे नोंदवली गेली आहे!\n\nटोमॅटो एफएम ९४.३ कोल्हापूर वर हा संदेश ऑन-एअर प्रसारित केला जाईल.\n\nविनंती आयडी: *${id}*\n\nवाढदिवसाच्या हार्दिक शुभेच्छा! 🎂📻`,
  },

  SERVICE_C: {
    id: "SERVICE_C",
    title: "लग्नाचा वाढदिवस (Anniversary Wishes)",
    intro: "💐 लग्नाच्या वाढदिवसाच्या गोड आठवणी टोमॅटो एफएम ९४.३ वर साजरी करा!\n\nकृपया खालील माहिती द्या.",
    summaryTitle: "💐 लग्नाचा वाढदिवस शुभेच्छा सारांश",
    questions: [
      {
        key: "coupleNames",
        label: "दांपत्याचे नाव",
        text: "लग्नाचा वाढदिवस असलेल्या दांपत्याचे नाव काय आहे?",
        placeholder: "उदा. अमित आणि पूजा",
        type: "text",
      },
      {
        key: "years",
        label: "वर्षगाठ",
        text: "ही कितवी वर्षगाठ आहे?",
        type: "select_or_text",
        options: [
          "१ ली वर्षगाठ",
          "५ वी वर्षगाठ",
          "१० वी वर्षगाठ",
          "२५ वा रौप्य महोत्सव (Silver Jubilee)",
          "५० वी सुवर्ण वर्षगाठ",
        ],
        placeholder: "किंवा वर्ष टाईप करा",
      },
      {
        key: "relationship",
        label: "नाते",
        text: "त्यांच्याशी आपले नाते काय आहे?",
        type: "select",
        options: [
          "स्वतःचा (Self)",
          "आई-वडील (Parents)",
          "भाऊ-वहिनी",
          "मित्र / नातेवाईक",
          "इतर",
        ],
      },
      {
        key: "message",
        label: "शुभेच्छा संदेश",
        text: "आपला लग्नाच्या वाढदिवसाचा प्रेमळ संदेश काय आहे?",
        placeholder: "आपल्या सदिच्छा...",
        type: "text",
      },
      {
        key: "song",
        label: "समर्पित गाणे",
        text: "त्यांच्यासाठी कोणते रोमँटिक गाणे वाजवायचे आहे?",
        placeholder: "गाण्याचे नाव किंवा चित्रपट",
        type: "text",
      },
      {
        key: "date",
        label: "प्रसारण तारीख",
        text: "लग्नाचा वाढदिवस कोणत्या तारखेला आहे?",
        type: "select_or_text",
        options: ["आजच", "उद्या", "या आठवड्यात"],
        placeholder: "किंवा तारीख टाईप करा",
      },
      {
        key: "senderName",
        label: "आपले नाव",
        text: "शुभेच्छा पाठवणाऱ्याचे नाव काय आहे?",
        placeholder: "आपले नाव",
        type: "text",
      },
      {
        key: "phone",
        label: "मोबाईल नंबर",
        text: "आपला मोबाईल नंबर काय आहे?",
        placeholder: "१० अंकी मोबाईल नंबर",
        type: "phone",
      },
    ],
    confirmMessage: (id) =>
      `💐 लग्नाच्या वाढदिवसाच्या शुभेच्छांची नोंद झाली आहे!\n\nटोमॅटो एफएम ९४.३ कोल्हापूर वर ही खास भेट प्रसारित केली जाईल.\n\nविनंती आयडी: *${id}* 🥂✨`,
  },

  SERVICE_D: {
    id: "SERVICE_D",
    title: "विशेष शुभेच्छा व गाणी (Special Greetings)",
    intro: "❤️ टोमॅटो एफएम कोल्हापूर (९४.३ एफएम) वर आपले आवडते गाणे आणि सदिच्छा संदेश समर्पित करा!\n\nतपशील खाली भरा.",
    summaryTitle: "❤️ विशेष शुभेच्छा व गाणी समर्पण सारांश",
    questions: [
      {
        key: "occasion",
        label: "प्रसंग / कारण",
        text: "हा संदेश कोणत्या प्रसंगासाठी आहे?",
        type: "select_or_text",
        options: [
          "सण / उत्सव (दिवाळी, गणेशोत्सव इ.)",
          "अभिनंदन / मोठे यश",
          "आभार संदेश (Thank You)",
          "मैत्री विशेष (Friendship)",
          "प्रेम व आदर",
        ],
        placeholder: "किंवा प्रसंग टाईप करा",
      },
      {
        key: "recipient",
        label: "व्यक्तीचे नाव",
        text: "हा संदेश कोणासाठी आहे?",
        placeholder: "व्यक्तीचे किंवा कुटुंबाचे नाव",
        type: "text",
      },
      {
        key: "message",
        label: "संदेश मजकूर",
        text: "आपला ऑन-एअर सांगायचा संदेश काय आहे?",
        placeholder: "आपला संदेश...",
        type: "text",
      },
      {
        key: "song",
        label: "समर्पित गाणे",
        text: "कोणते गाणे समर्पित करू इच्छिता?",
        placeholder: "गाण्याचे नाव",
        type: "text",
      },
      {
        key: "senderName",
        label: "आपले नाव",
        text: "आपले नाव काय आहे?",
        placeholder: "आपले नाव",
        type: "text",
      },
      {
        key: "phone",
        label: "मोबाईल नंबर",
        text: "आपला १० अंकी मोबाईल नंबर काय आहे?",
        placeholder: "१० अंकी मोबाईल नंबर",
        type: "phone",
      },
    ],
    confirmMessage: (id) =>
      `❤️ आपले गाणे आणि संदेश यशस्वीपणे नोंदवले गेले आहे!\n\nटोमॅटो एफएम ९४.३ कोल्हापूर वर हा संदेश प्रसारित होईल.\n\nविनंती आयडी: *${id}* 🎶`,
  },

  SERVICE_E: {
    id: "SERVICE_E",
    title: "नवीन शो व कार्यक्रम माहिती",
    intro: "📻 टोमॅटो एफएम ९४.३ कोल्हापूर कार्यक्रम वेळापत्रक:\n\nआपल्याला कशाची माहिती हवी आहे?",
    options: [
      "सकाळचे शो व आरजे शेड्युल",
      "दुपारचे कौटुंबिक शो",
      "संध्याकाळचे प्राइम टाईम शो",
      "रविवार विशेष मराठी गाणी",
      "स्टुडिओ टीमशी बोला",
    ],
    response: "टोमॅटो एफएम ९४.३ कोल्हापूर वर सुपरहिट मराठी व हिंदी गाणी, कोल्हापुरातील ताज्या घडामोडी, स्पर्धा आणि उत्साही आरजे यांचा अखंड आनंद मिळतो!",
  },

  SERVICE_F: {
    id: "SERVICE_F",
    title: "इव्हेंट व प्रमोशनल मोहीम (Event Campaigns)",
    intro: "🎉 आपला इव्हेंट संपूर्ण कोल्हापुरात प्रसिद्ध करण्यासाठी टोमॅटो एफएम ९४.३ सोबत भागीदारी करा!\n\nइव्हेंटची माहिती खाली द्या.",
    summaryTitle: "🎉 इव्हेंट भागीदारी सारांश",
    questions: [
      {
        key: "eventName",
        label: "इव्हेंटचे नाव",
        text: "आपल्या इव्हेंटचे नाव काय आहे?",
        placeholder: "उदा. कोल्हापूर खाद्य महोत्सव, कॉलेज फेस्टिव्हल...",
        type: "text",
      },
      {
        key: "eventDate",
        label: "इव्हेंट तारीख",
        text: "इव्हेंट कधी आयोजित केला आहे?",
        placeholder: "उदा. १० ते १२ डिसेंबर २०२६",
        type: "text",
      },
      {
        key: "venue",
        label: "इव्हेंट ठिकाण",
        text: "कोल्हापुरात इव्हेंटचे ठिकाण कुठे आहे?",
        placeholder: "उदा. शाहू स्मारक, रंकाळा मैदान...",
        type: "text",
      },
      {
        key: "partnershipType",
        label: "भागीदारी प्रकार",
        text: "टोमॅटो एफएम सोबत कोणत्या प्रकारची भागीदारी हवी आहे?",
        type: "select",
        options: [
          "अधिकृत रेडिओ पार्टनर (Radio Partner)",
          "ऑन-एअर प्रमोशनल जिंगल्स व स्पॉट्स",
          "आरजे होस्टिंग / थेट स्टुडिओ कव्हरेज",
          "संपूर्ण मीडिया कव्हरेज पॅकेज",
        ],
      },
      {
        key: "contactName",
        label: "संपर्क व्यक्तीचे नाव",
        text: "संपर्क व्यक्तीचे नाव काय आहे?",
        placeholder: "पूर्ण नाव",
        type: "text",
      },
      {
        key: "phone",
        label: "मोबाईल नंबर",
        text: "आपला मोबाईल नंबर काय आहे?",
        placeholder: "१० अंकी मोबाईल नंबर",
        type: "phone",
      },
    ],
    confirmMessage: (id) =>
      `🎉 आपल्या इव्हेंट प्रमोशनची चौकशी नोंदवली गेली आहे!\n\nआमची टीम प्रस्तावाचा आढावा घेऊन लवकरच संपर्क करेल.\n\nचौकशी आयडी: *${id}*\n\nआपला इव्हेंट यशस्वी करूया! 🌟`,
  },

  SERVICE_G: {
    id: "SERVICE_G",
    title: "सामान्य चौकशी (General Enquiry)",
    intro: "📻 टोमॅटो एफएम ९४.३ कोल्हापूर एआय हेल्पडेस्क मध्ये आपले स्वागत आहे!\n\nतुम्ही जाहिरात, वारंवारता किंवा इतर कोणत्याही विषयावर प्रश्न विचारू शकता.",
  },

  SERVICE_H: {
    id: "SERVICE_H",
    title: "आमच्या टीमशी बोला (Talk to Team)",
    intro: "नक्कीच! टोमॅटो एफएम कोल्हापूरची टीम आपल्याला मदत करण्यास उत्सुक आहे. 👨‍💼\n\nकृपया आपली गरज किंवा संदेश खाली टाईप करा.",
    confirmMessage: (id) =>
      `धन्यवाद! आपली सहाय्य विनंती नोंदवली गेली आहे.\n\nटोमॅटो एफएम अधिकारी लवकरच आपल्याशी संपर्क साधतील.\n\nविनंती आयडी: *${id}*\n\n(प्रतिनिधी स्थिती: नियुक्त • टोमॅटो एफएम एक्झिक्युटिव्ह)`,
  },
};

/**
 * -------------------------------------------------------------
 * HINDI SERVICE FLOWS (हिंदी)
 * -------------------------------------------------------------
 */
const FLOWS_HI = {
  SERVICE_A: {
    id: "SERVICE_A",
    title: "रेडियो विज्ञापन (Radio Advertisement)",
    intro: "बहुत बढ़िया! 📢 टोमैटो एफएम 94.3 कोल्हापुर पर विज्ञापन में रुचि दिखाने के लिए धन्यवाद।\n\nआइए आपकी विज्ञापन आवश्यकताओं को समझते हैं।",
    summaryTitle: "📢 रेडियो विज्ञापन पूछताछ सारांश",
    questions: [
      {
        key: "brandName",
        label: "व्यवसाय / ब्रांड का नाम",
        text: "आपके व्यवसाय या ब्रांड का नाम क्या है?",
        placeholder: "उदा. कोल्हापुर ज्वेलर्स, होटल शाहू...",
        type: "text",
      },
      {
        key: "category",
        label: "व्यवसाय श्रेणी",
        text: "आपका व्यवसाय किस श्रेणी में आता है?",
        type: "select",
        options: [
          "रिटेल और शॉपिंग (Retail & Shopping)",
          "रियल एस्टेट और आवास (Real Estate)",
          "शिक्षा और कोचिंग (Education)",
          "स्वास्थ्य और अस्पताल (Healthcare)",
          "होटल और खान-पान (Food & Dining)",
          "ऑटोमोबाइल और इलेक्ट्रॉनिक्स",
          "आभूषण और फैशन (Jewellery & Fashion)",
          "अन्य सेवाएं (Other Services)",
        ],
      },
      {
        key: "objective",
        label: "विज्ञापन उद्देश्य",
        text: "आपके विज्ञापन का मुख्य उद्देश्य क्या है?",
        type: "select",
        options: [
          "ब्रांड जागरूकता और पहुंच (Brand Awareness)",
          "नया स्टोर लॉन्च / वॉक-इन्स",
          "त्योहारी / विशेष छूट ऑफर",
          "उत्पाद / सेवा प्रचार",
          "इवेंट प्रचार (Event Publicity)",
        ],
      },
      {
        key: "product",
        label: "उत्पाद / सेवा",
        text: "आप किस उत्पाद या सेवा का प्रचार करना चाहते हैं?",
        placeholder: "उदा. सोने के गहनों पर छूट...",
        type: "text",
      },
      {
        key: "adType",
        label: "विज्ञापन प्रकार",
        text: "आप किस प्रकार का विज्ञापन चाहते हैं?",
        type: "select",
        options: [
          "रेडियो विज्ञापन (Audio Spot)",
          "आरजे मेंशन (RJ Mention)",
          "कार्यक्रम प्रायोजन (Sponsorship)",
          "प्रचार अभियान (Promotional Campaign)",
        ],
      },
      {
        key: "startDate",
        label: "प्रारंभ तिथि",
        text: "विज्ञापन अभियान कब से शुरू करना चाहते हैं?",
        type: "select_or_text",
        options: [
          "तुरंत (इस सप्ताह)",
          "अगले सप्ताह",
          "अगले महीने की शुरुआत में",
          "त्योहारी सीजन में",
        ],
        placeholder: "या तारीख लिखें (उदा. 15 नवंबर)",
      },
      {
        key: "duration",
        label: "अभियान अवधि",
        text: "विज्ञापन की अपेक्षित अवधि क्या होगी?",
        type: "select",
        options: [
          "3 से 5 दिन",
          "1 सप्ताह (7 दिन)",
          "2 सप्ताह (14 दिन)",
          "1 महीना (30 दिन)",
          "दीर्घकालिक अभियान",
        ],
      },
      {
        key: "budget",
        label: "अनुमानित बजट",
        text: "आपका अनुमानित विज्ञापन बजट क्या है?",
        type: "select",
        options: [
          "₹5,000 से कम",
          "₹5,000–₹10,000",
          "₹10,000–₹25,000",
          "₹25,000–₹50,000",
          "₹50,000 से अधिक",
          "टीम से चर्चा करेंगे",
        ],
      },
      {
        key: "specialInstructions",
        label: "विशेष निर्देश",
        text: "क्या टोमैटो एफएम 94.3 के लिए कोई विशेष प्राथमिकता है?",
        type: "select",
        options: [
          "सुबह और शाम प्राइम टाइम",
          "दोपहर का समय",
          "जिंगल निर्माण आवश्यक",
          "आरजे विशेष घोषणा",
          "स्टेशन टीम से चर्चा करेंगे",
        ],
      },
      {
        key: "contactName",
        label: "संपर्क व्यक्ति का नाम",
        text: "संपर्क व्यक्ति का पूरा नाम क्या है?",
        placeholder: "पूरा नाम",
        type: "text",
      },
      {
        key: "phone",
        label: "मोबाइल नंबर",
        text: "आपका 10 अंकों का मोबाइल नंबर क्या है?",
        placeholder: "10 अंकों का मोबाइल नंबर",
        type: "phone",
      },
    ],
    confirmMessage: (id) =>
      `🎉 आपकी विज्ञापन पूछताछ सफलतापूर्वक दर्ज हो गई है!\n\nहमारी टोमैटो एफएम 94.3 कोल्हापुर टीम जल्द ही आपसे संपर्क करेगी।\n\nपूछताछ आईडी: *${id}*\n\nटोमैटो एफएम के साथ अपने व्यवसाय को आगे बढ़ाएं! 🌟`,
  },

  SERVICE_B: {
    id: "SERVICE_B",
    title: "जन्मदिन की शुभकामनाएं (Birthday Wishes)",
    intro: "🎂 टोमैटो एफएम 94.3 कोल्हापुर पर अपने प्रियजन के जन्मदिन को खास बनाएं!\n\nकृपया विवरण नीचे दें।",
    summaryTitle: "🎂 जन्मदिन शुभकामना सारांश",
    questions: [
      {
        key: "birthdayPerson",
        label: "जन्मदिन व्यक्ति",
        text: "किसका जन्मदिन है? (पूरा नाम)",
        placeholder: "जन्मदिन वाले व्यक्ति का नाम",
        type: "text",
      },
      {
        key: "age",
        label: "उम्र (वैकल्पिक)",
        text: "उनकी उम्र क्या है? (वैकल्पिक)",
        type: "select_or_text",
        options: ["बताना नहीं चाहते", "18वां जन्मदिन", "25वां जन्मदिन", "50वीं स्वर्ण जयंती"],
        placeholder: "उम्र लिखें या विकल्प चुनें",
      },
      {
        key: "relationship",
        label: "रिश्ता",
        text: "उनके साथ आपका क्या रिश्ता है?",
        type: "select",
        options: [
          "मित्र / दोस्त (Best Friend)",
          "पति / पत्नी (Spouse)",
          "माता / पिता (Parents)",
          "भाई / बहन (Sibling)",
          "बेटा / बेटी",
          "सहकर्मी",
          "अन्य",
        ],
      },
      {
        key: "message",
        label: "शुभकामना संदेश",
        text: "आपका शुभकामना संदेश क्या है?",
        placeholder: "दिल से शुभकामना संदेश...",
        type: "text",
      },
      {
        key: "song",
        label: "समर्पित गाना",
        text: "उनके लिए कौन सा गाना समर्पित करना चाहते हैं?",
        placeholder: "गाने का नाम या फिल्म...",
        type: "text",
      },
      {
        key: "date",
        label: "प्रसारण तिथि",
        text: "जन्मदिन किस तारीख को प्रसारित करना है?",
        type: "select_or_text",
        options: ["आज ही (Today)", "कल (Tomorrow)", "इस सप्ताहांत"],
        placeholder: "या तारीख लिखें",
      },
      {
        key: "senderName",
        label: "आपका नाम",
        text: "शुभकामना भेजने वाले (आपका) नाम क्या है?",
        placeholder: "आपका नाम",
        type: "text",
      },
      {
        key: "phone",
        label: "मोबाइल नंबर",
        text: "आपका संपर्क नंबर क्या है?",
        placeholder: "10 अंकों का मोबाइल नंबर",
        type: "phone",
      },
    ],
    confirmMessage: (id) =>
      `🎉 जन्मदिन की शुभकामना अनुरोध दर्ज हो गया है!\n\nटोमैटो एफएम 94.3 कोल्हापुर पर यह संदेश प्रसारित किया जाएगा।\n\nअनुरोध आईडी: *${id}*\n\nजन्मदिन की ढेर सारी शुभकामनाएं! 🎂📻`,
  },

  SERVICE_C: {
    id: "SERVICE_C",
    title: "शादी की सालगिरह (Anniversary Wishes)",
    intro: "💐 टोमैटो एफएम 94.3 पर शादी की सालगिरह को यादगार बनाएं!\n\nकृपया विवरण नीचे भरें।",
    summaryTitle: "💐 सालगिरह शुभकामना सारांश",
    questions: [
      {
        key: "coupleNames",
        label: "दंपति का नाम",
        text: "सालगिरह वाले दंपति का नाम क्या है?",
        placeholder: "उदा. राजेश और स्नेहल",
        type: "text",
      },
      {
        key: "years",
        label: "वर्षगांठ",
        text: "यह कौन सी सालगिरह है?",
        type: "select_or_text",
        options: [
          "पहली सालगिरह",
          "5वीं सालगिरह",
          "10वीं सालगिरह",
          "25वीं रजत जयंती (Silver Jubilee)",
          "50वीं स्वर्ण जयंती",
        ],
        placeholder: "या वर्ष लिखें",
      },
      {
        key: "relationship",
        label: "रिश्ता",
        text: "दंपति से आपका क्या रिश्ता है?",
        type: "select",
        options: [
          "खुद की (Self)",
          "माता-पिता (Parents)",
          "भाई-भाभी",
          "दोस्त / रिश्तेदार",
        ],
      },
      {
        key: "message",
        label: "शुभकामना संदेश",
        text: "आपका प्यारा सालगिरह संदेश क्या है?",
        placeholder: "संदेश लिखें...",
        type: "text",
      },
      {
        key: "song",
        label: "समर्पित गाना",
        text: "कौन सा रोमांटिक गाना बजाना चाहते हैं?",
        placeholder: "गाने का नाम या फिल्म",
        type: "text",
      },
      {
        key: "date",
        label: "प्रसारण तिथि",
        text: "सालगिरह की तारीख क्या है?",
        type: "select_or_text",
        options: ["आज ही", "कल", "इस सप्ताहांत"],
        placeholder: "या तारीख लिखें",
      },
      {
        key: "senderName",
        label: "आपका नाम",
        text: "भेजने वाले का नाम क्या है?",
        placeholder: "आपका नाम",
        type: "text",
      },
      {
        key: "phone",
        label: "मोबाइल नंबर",
        text: "आपका मोबाइल नंबर क्या है?",
        placeholder: "10 अंकों का मोबाइल नंबर",
        type: "phone",
      },
    ],
    confirmMessage: (id) =>
      `💐 सालगिरह की शुभकामना दर्ज हो गई है!\n\nटोमैटो एफएम 94.3 पर यह संदेश प्रसारित किया जाएगा।\n\nअनुरोध आईडी: *${id}* 🥂✨`,
  },

  SERVICE_D: {
    id: "SERVICE_D",
    title: "विशेष शुभकामनाएं (Special Greetings)",
    intro: "❤️ टोमैटो एफएम 94.3 कोल्हापुर पर पसंदीदा गाना और संदेश समर्पित करें!\n\nकृपया विवरण नीचे भरें।",
    summaryTitle: "❤️ विशेष शुभकामना सारांश",
    questions: [
      {
        key: "occasion",
        label: "अवसर / कारण",
        text: "यह संदेश किस अवसर के लिए है?",
        type: "select_or_text",
        options: [
          "त्योहार (दिवाली आदि)",
          "बधाई / सफलता",
          "धन्यवाद संदेश",
          "दोस्ती विशेष",
          "प्रेम और आदर",
        ],
        placeholder: "या अवसर लिखें",
      },
      {
        key: "recipient",
        label: "व्यक्ति का नाम",
        text: "यह संदेश किसके लिए है?",
        placeholder: "व्यक्ति या परिवार का नाम",
        type: "text",
      },
      {
        key: "message",
        label: "संदेश",
        text: "आपका प्रसारित होने वाला संदेश क्या है?",
        placeholder: "संदेश लिखें...",
        type: "text",
      },
      {
        key: "song",
        label: "समर्पित गाना",
        text: "कौन सा गाना समर्पित करना चाहते हैं?",
        placeholder: "गाने का नाम",
        type: "text",
      },
      {
        key: "senderName",
        label: "आपका नाम",
        text: "आपका नाम क्या है?",
        placeholder: "आपका नाम",
        type: "text",
      },
      {
        key: "phone",
        label: "मोबाइल नंबर",
        text: "आपका मोबाइल नंबर क्या है?",
        placeholder: "10 अंकों का मोबाइल नंबर",
        type: "phone",
      },
    ],
    confirmMessage: (id) =>
      `❤️ आपका गाना और संदेश दर्ज हो गया है!\n\nटोमैटो एफएम 94.3 पर यह प्रसारित होगा।\n\nअनुरोध आईडी: *${id}* 🎶`,
  },

  SERVICE_E: {
    id: "SERVICE_E",
    title: "नए शो और कार्यक्रम की जानकारी",
    intro: "📻 टोमैटो एफएम 94.3 कोल्हापुर कार्यक्रम समय सारिणी:\n\nआप किस शो की जानकारी चाहते हैं?",
    options: [
      "सुबह के शो और आरजे शेड्यूल",
      "दोपहर के पारिवारिक शो",
      "शाम के प्राइम टाइम शो",
      "रविवार विशेष गाने",
      "स्टेशन टीम से बात करें",
    ],
    response: "टोमैटो एफएम 94.3 कोल्हापुर पर लगातार बेहतरीन संगीत, शहर के समाचार और आरजे के साथ मनोरंजन का आनंद लें!",
  },

  SERVICE_F: {
    id: "SERVICE_F",
    title: "इवेंट और प्रचार अभियान (Event Campaigns)",
    intro: "🎉 अपने इवेंट को पूरे कोल्हापुर में लोकप्रिय बनाने के लिए टोमैटो एफएम 94.3 से जुड़ें!\n\nइवेंट विवरण नीचे भरें।",
    summaryTitle: "🎉 इवेंट साझेदारी सारांश",
    questions: [
      {
        key: "eventName",
        label: "इवेंट का नाम",
        text: "आपके इवेंट का नाम क्या है?",
        placeholder: "उदा. कोल्हापुर फूड फेस्ट...",
        type: "text",
      },
      {
        key: "eventDate",
        label: "इवेंट की तारीख",
        text: "इवेंट कब आयोजित है?",
        placeholder: "उदा. 10 - 12 दिसंबर 2026",
        type: "text",
      },
      {
        key: "venue",
        label: "स्थान",
        text: "कोल्हापुर में इवेंट का स्थान कहाँ है?",
        placeholder: "स्थान का नाम",
        type: "text",
      },
      {
        key: "partnershipType",
        label: "साझेदारी का प्रकार",
        text: "टोमैटो एफएम से किस प्रकार की साझेदारी चाहते हैं?",
        type: "select",
        options: [
          "आधिकारिक रेडियो पार्टनर (Radio Partner)",
          "ऑन-एयर प्रचार जिंगल और स्पॉट्स",
          "आरजे होस्टिंग / लाइव कवरेज",
          "संपूर्ण मीडिया पैकेज",
        ],
      },
      {
        key: "contactName",
        label: "संपर्क व्यक्ति का नाम",
        text: "संपर्क व्यक्ति का नाम क्या है?",
        placeholder: "पूरा नाम",
        type: "text",
      },
      {
        key: "phone",
        label: "मोबाइल नंबर",
        text: "आपका मोबाइल नंबर क्या है?",
        placeholder: "10 अंकों का मोबाइल नंबर",
        type: "phone",
      },
    ],
    confirmMessage: (id) =>
      `🎉 आपके इवेंट प्रचार की पूछताछ दर्ज हो गई है!\n\nहमारी टीम जल्द ही आपसे संपर्क करेगी।\n\nपूछताछ आईडी: *${id}* 🌟`,
  },

  SERVICE_G: {
    id: "SERVICE_G",
    title: "सामान्य पूछताछ (General Enquiry)",
    intro: "📻 टोमैटो एफएम 94.3 कोल्हापुर एआई हेल्पडेस्क में आपका स्वागत है!\n\nआप किसी भी विषय पर प्रश्न पूछ सकते हैं।",
  },

  SERVICE_H: {
    id: "SERVICE_H",
    title: "हमारी टीम से बात करें (Talk to Team)",
    intro: "जरूर! टोमैटो एफएम कोल्हापुर की टीम आपकी सहायता के लिए तैयार है। 👨‍💼\n\nकृपया अपनी आवश्यकता नीचे लिखें।",
    confirmMessage: (id) =>
      `धन्यवाद! आपका सहायता अनुरोध दर्ज हो गया है। टोमैटो एफएम अधिकारी जल्द ही आपसे संपर्क करेंगे।\n\nअनुरोध आईडी: *${id}*`,
  },
};

/**
 * Returns the localized service flow for a given language
 */
export function getServiceFlow(serviceId, lang = "en") {
  if (lang === "mr") {
    return FLOWS_MR[serviceId] || FLOWS_EN[serviceId];
  }
  if (lang === "hi") {
    return FLOWS_HI[serviceId] || FLOWS_EN[serviceId];
  }
  return FLOWS_EN[serviceId];
}

export const SERVICE_FLOWS = FLOWS_EN;

/**
 * Returns main menu buttons localized for chosen language
 */
export function getMainMenuButtons(lang = "en") {
  if (lang === "mr") {
    return [
      { label: "1. 📢 रेडिओ जाहिरात (Radio Ads)", action: "service", service: { id: "SERVICE_A", num: "1", title: "रेडिओ जाहिरात" } },
      { label: "2. 🎂 वाढदिवस शुभेच्छा (Birthday Wishes)", action: "service", service: { id: "SERVICE_B", num: "2", title: "वाढदिवस शुभेच्छा" } },
      { label: "3. 💐 लग्नाचा वाढदिवस (Anniversary)", action: "service", service: { id: "SERVICE_C", num: "3", title: "लग्नाचा वाढदिवस" } },
      { label: "4. ❤️ विशेष शुभेच्छा व गाणी (Greetings)", action: "service", service: { id: "SERVICE_D", num: "4", title: "विशेष शुभेच्छा" } },
      { label: "5. 🎙️ नवीन शो व कार्यक्रम (Programmes)", action: "service", service: { id: "SERVICE_E", num: "5", title: "नवीन शो व कार्यक्रम माहिती" } },
      { label: "6. 🎉 इव्हेंट व मोहीम (Event Campaigns)", action: "service", service: { id: "SERVICE_F", num: "6", title: "इव्हेंट व प्रमोशनल मोहीम" } },
      { label: "7. 📻 सामान्य चौकशी (AI Helpdesk)", action: "service", service: { id: "SERVICE_G", num: "7", title: "सामान्य चौकशी" } },
      { label: "8. 👨‍💼 आमच्या टीमशी बोला (Talk to Team)", action: "service", service: { id: "SERVICE_H", num: "8", title: "आमच्या टीमशी बोला" } },
    ];
  }
  if (lang === "hi") {
    return [
      { label: "1. 📢 रेडियो विज्ञापन (Radio Ads)", action: "service", service: { id: "SERVICE_A", num: "1", title: "रेडियो विज्ञापन" } },
      { label: "2. 🎂 जन्मदिन की शुभकामनाएं (Birthday)", action: "service", service: { id: "SERVICE_B", num: "2", title: "जन्मदिन की शुभकामनाएं" } },
      { label: "3. 💐 शादी की सालगिरह (Anniversary)", action: "service", service: { id: "SERVICE_C", num: "3", title: "शादी की सालगिरह" } },
      { label: "4. ❤️ विशेष शुभकामनाएं (Greetings)", action: "service", service: { id: "SERVICE_D", num: "4", title: "विशेष शुभकामनाएं" } },
      { label: "5. 🎙️ नए शो और कार्यक्रम (Programmes)", action: "service", service: { id: "SERVICE_E", num: "5", title: "नए शो और कार्यक्रम" } },
      { label: "6. 🎉 इवेंट और प्रचार अभियान (Events)", action: "service", service: { id: "SERVICE_F", num: "6", title: "इवेंट और प्रचार अभियान" } },
      { label: "7. 📻 सामान्य पूछताछ (AI Helpdesk)", action: "service", service: { id: "SERVICE_G", num: "7", title: "सामान्य पूछताछ" } },
      { label: "8. 👨‍💼 हमारी टीम से बात करें (Talk to Team)", action: "service", service: { id: "SERVICE_H", num: "8", title: "हमारी टीम से बात करें" } },
    ];
  }
  return [
    { label: "1. 📢 Radio Advertisement", action: "service", service: MAIN_MENU_OPTIONS[0] },
    { label: "2. 🎂 Birthday Wishes", action: "service", service: MAIN_MENU_OPTIONS[1] },
    { label: "3. 💐 Anniversary Wishes", action: "service", service: MAIN_MENU_OPTIONS[2] },
    { label: "4. ❤️ Special Greetings & Dedications", action: "service", service: MAIN_MENU_OPTIONS[3] },
    { label: "5. 🎙️ New Shows & Programme Info", action: "service", service: MAIN_MENU_OPTIONS[4] },
    { label: "6. 🎉 Event & Promotional Campaigns", action: "service", service: MAIN_MENU_OPTIONS[5] },
    { label: "7. 📻 General Enquiry (AI Support)", action: "service", service: MAIN_MENU_OPTIONS[6] },
    { label: "8. 👨‍💼 Talk to Our Team", action: "service", service: MAIN_MENU_OPTIONS[7] },
  ];
}

/**
 * Returns main menu intro text localized for chosen language
 */
export function getMainMenuIntro(lang = "en") {
  if (lang === "mr") {
    return "आपलं कोल्हापूर, आपलं टोमॅटो एफएम! 🥳🍿\nटोमॅटो एफएम ९४.३ कोल्हापूर मध्ये आपले सहर्ष स्वागत! कृपया खालीलपैकी हवी ती सेवा निवडा:";
  }
  if (lang === "hi") {
    return "टोमैटो एफएम कोल्हापुर (94.3 FM) में आपका स्वागत है! 🥳🍿\nकृपया नीचे दिए गए विकल्पों में से अपनी सेवा चुनें:";
  }
  return "Hansi Ka TyoHAHAAar Shuru 🥳🍿\nWelcome to Tomato FM Kolhapur (94.3 FM)! Aapla Kolhapur, Aapla Tomato FM! Please select a service from the options below:";
}

/**
 * Creates initial language preference question greeting
 */
export function createLanguageSelectionGreeting() {
  return [
    {
      id: "init-lang-selection",
      sender: "bot",
      bannerImage: "/tomato_banner.jpg",
      text: "🙏 Welcome to Tomato FM Kolhapur (94.3 FM)!\nटोमॅटो एफएम ९४.३ कोल्हापूर मध्ये आपले सहर्ष स्वागत!\nटोमैटो एफएम कोल्हापुर (94.3 FM) में आपका स्वागत है!\n\n*Please select your preferred language / कृपया आपली भाषा निवडा / कृपया अपनी भाषा चुनें:*",
      timestamp: "Just now",
      type: "quickReplies",
      options: [
        "मराठी (Marathi) 🚩",
        "English 🇬🇧",
        "हिंदी (Hindi) 🇮🇳",
      ],
    },
  ];
}

export function createInitialGreeting() {
  return createLanguageSelectionGreeting();
}
