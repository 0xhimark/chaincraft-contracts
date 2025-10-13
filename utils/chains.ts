import { defineChain } from "viem";

// Define Sanko testnet chain
export const sankoTestnet = defineChain({
  id: 1992,
  name: "Sanko Testnet",
  network: "sanko-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Test DMT",
    symbol: "tDMT",
  },
  rpcUrls: {
    default: {
      http: ["https://sanko-arb-sepolia.rpc.caldera.xyz/http"],
    },
    public: {
      http: ["https://sanko-arb-sepolia.rpc.caldera.xyz/http"],
    },
  },
  blockExplorers: {
    default: {
      name: "Sanko Explorer",
      url: "https://sanko-arb-sepolia.calderaexplorer.xyz",
    },
  },
});
