"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import Chatbot from "@/components/Chatbot";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Chatbot</h1>
      <QueryClientProvider client={queryClient}>
        <Chatbot />
      </QueryClientProvider>
    </main>
  );
}
