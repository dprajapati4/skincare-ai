"use client";

import Form from "../components/Form";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col text-ink">
      <main className="flex flex-col items-center justify-center flex-1 px-6 py-16">
        <h1 className="text-center text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-[var(--color-mauve)] via-[var(--color-blush)] to-[var(--color-gold)] bg-clip-text text-transparent tracking-tight drop-shadow-md animate-gradient text-shadow-sm">
          Skincare AI
        </h1>

        <h2 className="text-mauve text-2xl md:text-3xl text-center font-semibold mb-4">
          Discover Your Perfect Skincare Routine
        </h2>
        <p className="text-lg text-ink mb-10 text-center max-w-2xl px-4">
          Find personalized skincare products that suit your skin&apos;s unique
          needs. Let&apos;s get started!
        </p>

        <Form />
      </main>

      <Footer />
    </div>
  );
}
