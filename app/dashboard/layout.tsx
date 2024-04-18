import { GeistSans } from "geist/font/sans";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SideNav } from "@/components/side-nav";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center">
      <SideNav />
      {children}
    </div>
  );
}
