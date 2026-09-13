import type { Metadata } from "next";
import "./globals.css";
import { withBasePath } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Street Art Tattoo — Arte para levar pra rua",
  description: "Camisetas, ecobags, acessórios e arte. Conheça o universo da Street Art Tattoo.",
  icons: {
    icon: withBasePath("/assets/logo.webp"),
    shortcut: withBasePath("/assets/logo.webp"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
