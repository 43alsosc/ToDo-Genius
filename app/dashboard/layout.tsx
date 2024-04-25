import { GeistSans } from "geist/font/sans";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SideNav } from "@/components/side-nav";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "ToDo Genius",
  description: "The fastest way to get things done.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-muted/40 min-h-screen w-screen flex flex-col items-center">
      <SideNav />
      {children}
    </div>
  );
}
