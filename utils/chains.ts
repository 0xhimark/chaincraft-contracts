import { defineChain, type Chain } from "viem";
import type hre from "hardhat";

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

// Define Arbitrum Sepolia chain
export const arbitrumSepolia = defineChain({
  id: 421614,
  name: "Arbitrum Sepolia",
  network: "arbitrum-sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://arbitrum-sepolia-rpc.publicnode.com"],
    },
    public: {
      http: ["https://arbitrum-sepolia-rpc.publicnode.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Arbiscan",
      url: "https://sepolia.arbiscan.io",
    },
  },
});

/**
 * Get chain configuration based on Hardhat network
 * @param hre Hardhat runtime environment
 * @returns Object containing chain, chainId, and rpcUrl
 */
export function getNetworkConfig(hre: typeof import("hardhat").default): {
  chain: Chain;
  chainId: number;
  rpcUrl: string;
} {
  // Get the network name from command line arguments
  const networkArgIndex = process.argv.indexOf("--network");
  const networkName =
    networkArgIndex !== -1 && process.argv[networkArgIndex + 1]
      ? process.argv[networkArgIndex + 1]
      : "hardhat";

  // Get network config from Hardhat
  const networkConfig = hre.config.networks[networkName] as
    | { chainId?: number; url?: string; type?: string }
    | undefined;

  if (!networkConfig || networkConfig.type !== "http") {
    console.error(`❌ Error: Invalid or unsupported network: ${networkName}`);
    console.log("Supported networks: arbitrumSepolia, sankoTestnet");
    process.exit(1);
  }

  const configChainId = networkConfig.chainId;

  // Determine which chain to use based on chainId
  // Use RPC URL from chain definition for reliability
  if (configChainId === arbitrumSepolia.id) {
    return {
      chain: arbitrumSepolia,
      chainId: arbitrumSepolia.id,
      rpcUrl: arbitrumSepolia.rpcUrls.default.http[0],
    };
  } else if (configChainId === sankoTestnet.id) {
    return {
      chain: sankoTestnet,
      chainId: sankoTestnet.id,
      rpcUrl: sankoTestnet.rpcUrls.default.http[0],
    };
  } else {
    console.error(
      `❌ Error: Unsupported network with chainId: ${configChainId}`
    );
    console.log(
      "Supported networks: arbitrumSepolia (421614), sankoTestnet (1992)"
    );
    process.exit(1);
  }
}
