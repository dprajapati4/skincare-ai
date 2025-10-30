"use client";

import Form from "../components/Form";

export default function Home() {
  return (
    <main className=" min-h-screen min-w-md mx-auto flex flex-col items-center justify-center text-charcoal">
      <h1
        className="text-center text-5xl font-extrabold m-4 bg-gradient-to-r from-[var(--color-mauve)] via-[var(--color-blush)] to-[var(--color-gold)] bg-clip-text text-transparent tracking-tight drop-shadow-md animate-gradient text-shadow-sm
"
      >
        Skincare AI
      </h1>

      <h2 className="text-mauve text-2xl text-center font-semibold mb-6 p-4">
        Discover Your Perfect Skincare Routine
      </h2>
      <p className="text-lg text-ink mb-12 text-center">
        Find personalized skincare products that suit your skin&apos;s unique
        needs. Let&apos;s get started!
      </p>
      <Form />
    </main>
  );
}
