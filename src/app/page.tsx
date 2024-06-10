"use client";
import Chatbot from "@/components/Chatbot";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen md:p-10 p-4">
      <div className="w-12 h-12 sm:w-24 sm:h-24 relative">
        <Image
          src="/SVG/logo_1.svg"
          alt="logo"
          layout="fill"
          objectFit="contain"
          className="responsive-image"
        />
      </div>
      <h1 className="text-2xl font-bold mb-4 text-center">Healharmony AI</h1>
      <Chatbot />
    </main>
  );
}
