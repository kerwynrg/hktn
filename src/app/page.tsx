"use client";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Matching Patients with Clinical Trials
      </h1>
      <Chatbot />
    </main>
  );
}
