import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Starfield from "@/components/Starfield";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-dvh antialiased">
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