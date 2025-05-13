"use client";

import Form from "../components/Form";

export default function Home() {
  return (
    <main className="bg-warmSand min-h-screen flex flex-col items-center justify-center text-charcoal">
      <h1 className="text-deepMauve text-3xl font-bold mb-4">
        Find a skincare routine for your skin type!
      </h1>
      <Form />
    </main>
  );
}
