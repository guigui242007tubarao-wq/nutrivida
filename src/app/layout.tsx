import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "NutriVida — Nutrição, treinos e bem-estar",
  description:
    "Conteúdo prático de nutrição, exercícios, receitas e calculadoras para melhorar sua saúde e performance.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-dvh bg-zinc-950 text-zinc-50 antialiased font-sans">
        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
