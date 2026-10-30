import "./globals.css";

export const metadata = {
  title: "Tomato FM Kolhapur (94.3 FM) – WhatsApp Chatbot Demo",
  description:
    "Official WhatsApp Web chatbot demo for Tomato FM Kolhapur 94.3 FM. Aapla Kolhapur, Aapla Tomato FM! Enquire about radio advertising, birthday & anniversary wishes, dedications, programmes, and events.",
  keywords: [
    "Tomato FM",
    "Tomato FM Kolhapur",
    "94.3 FM",
    "Tomato FM Chatbot",
    "Radio Advertisement Kolhapur",
    "Birthday Wishes Radio",
  ],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased select-none">{children}</body>
    </html>
  );
}
