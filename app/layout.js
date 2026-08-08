import "./globals.css";
import { Sora, Inter } from "next/font/google";

const display = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata = {
  title: "Roxy — your AI companion",
  description: "Roxy is a fast, thoughtful AI assistant powered by Gemini.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-ink text-paper font-body antialiased">
        {children}
      </body>
    </html>
  );
}
