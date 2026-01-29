import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Starfield from "@/components/Starfield";

export const metadata: Metadata = {
  title: {
    default: "NutriVida — Nutrição, treinos e bem-estar",
    template: "%s • NutriVida",
  },
  description:
    "Nutrição, exercícios, receitas e calculadoras para melhorar sua saúde e performance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-dvh bg-zinc-950 text-zinc-50 antialiased">
        <Starfield />
        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
