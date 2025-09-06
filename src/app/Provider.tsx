"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "@/configs/wagmi.config";
// import { useEffect } from "react";

const queryClient = new QueryClient();
export default function RootProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  // useEffect(() => {
  //   if ("serviceWorker" in navigator) {
  //     navigator.serviceWorker
  //       .register("/sw.js")
  //       .then((reg) => console.log("Service Worker registered:", reg.scope))
  //       .catch((err) => console.error("SW registration failed:", err));
  //   }
  // }, []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
