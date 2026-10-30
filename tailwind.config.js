/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        mirchi: {
          red: "#E31E24",
          darkred: "#C7181D",
          lightred: "#FDF2F2",
          yellow: "#FFD200",
        },
        wa: {
          // WhatsApp Dark Mode Palette (Matching Real WhatsApp Screenshot)
          darkBg: "#0B141A",
          darkHeader: "#202C33",
          darkCard: "#202C33",
          darkCardHover: "#233138",
          darkIncoming: "#202C33",
          darkOutgoing: "#005C4B",
          darkOutgoingHover: "#026654",
          darkInput: "#2A3942",
          darkBorder: "#2A3942",
          darkPill: "#182229",
          darkText: "#E9EDEF",
          darkSubtext: "#8696A0",
          darkIcon: "#AEBAC1",
          teal: "#00A884",
          tealLight: "#00D7A0",
          blueTick: "#53BDEB",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        'wa-sm': '0 1px 0.5px rgba(11,20,26,.25)',
        'wa-md': '0 2px 6px 0 rgba(0,0,0,.35)',
        'wa-modal': '0 17px 50px 0 rgba(0,0,0,.5)',
      },
    },
  },
  plugins: [],
};
