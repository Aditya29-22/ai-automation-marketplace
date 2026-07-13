import type { Metadata } from "next";
import "@/index.css";
import Providers from "./providers";
import LayoutShell from "@/components/LayoutShell";

export const metadata: Metadata = {
  title: "AutomateStore — AI-Powered Automation Marketplace",
  description: "Buy, sell, and discover pre-built business automations. WhatsApp bots, email sequences, CRM workflows, and more. Verified, tested, and ready to deploy.",
  keywords: "automation, marketplace, n8n, zapier, make, whatsapp bot, email automation, CRM, business process automation",
  openGraph: {
    title: "AutomateStore — AI-Powered Automation Marketplace",
    description: "Pre-built business automations. Verified, tested, ready to deploy.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-[#0a0a0f] text-white antialiased">
        <Providers>
          <LayoutShell>{children}</LayoutShell>
        </Providers>
      </body>
    </html>
  );
}
