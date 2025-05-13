"use client";

import Form from "../components/Form";

export default function Home() {
  return (
    <main className=" min-h-screen flex flex-col items-center justify-center text-charcoal">
      <h1 className="text-mauve text-4xl font-semibold mb-6">
        Discover Your Perfect Skincare Routine
      </h1>
      <p className="text-lg text-ink mb-12 text-center">
        Find personalized skincare products that suit your skin&apos;s unique
        needs. Let&apos;s get started!
      </p>
      <Form />
    </main>
  );
}
