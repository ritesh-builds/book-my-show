import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "BookMyShow — Distributed Movie Ticketing & Concurrency Engine",
  description: "High-throughput movie ticketing with atomic Redis distributed locking and Fastify v5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full">
      <body className="min-h-full bg-slate-50 dark:bg-[#08090c] text-slate-900 dark:text-zinc-100 antialiased selection:bg-rose-600 selection:text-white transition-colors duration-200">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
