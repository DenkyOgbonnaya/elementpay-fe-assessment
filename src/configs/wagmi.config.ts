import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";

import { mainnet, polygon, arbitrum, optimism } from "wagmi/chains";
import envConfig from "./env.config";

export const wagmiConfig = getDefaultConfig({
  appName: envConfig.NEXT_PUBLIC_WALLETCONNECT_PROJECT_NAME!,
  projectId: envConfig.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [mainnet, polygon, arbitrum, optimism],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
  },
});
