import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "ToDo Genius",
  description: "The fastest way to get things done.",
};

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={(inter.className, "w-full dark")}>
      <body className="w-full bg-background text-foreground">
        <Providers>
          <main className="min-w-full min-h-screen flex flex-col items-center">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
