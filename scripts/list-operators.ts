import { createRequire } from "module";
import { createPublicClient, http, getContract } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sankoTestnet } from "../utils/chains.js";

const require = createRequire(import.meta.url);

// CCERC721Facet ABI
const CCERC721_FACET_ABI = [
  {
    type: "function",
    name: "getOperators",
    inputs: [],
    outputs: [{ name: "", type: "address[]", internalType: "address[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalGames",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
] as const;

async function main() {
  console.log("📋 Listing operators for ChainCraftDiamond contract...");

  // Contract address (deployed on Sanko testnet)
  const contractAddress = "0x7E59B3706CbebC93f3250Ed56BAf8153f1e978aa";

  console.log(`📋 Contract Address: ${contractAddress}`);

  try {
    // Create public client
    const publicClient = createPublicClient({
      chain: sankoTestnet,
      transport: http(),
    });

    // Get contract instance
    const contract = getContract({
      address: contractAddress as `0x${string}`,
      abi: CCERC721_FACET_ABI,
      client: publicClient,
    });

    // Get all operators
    console.log("🔍 Fetching operators...");
    const operators = await contract.read.getOperators();

    console.log(`📊 Total operators: ${operators.length}`);

    if (operators.length === 0) {
      console.log("ℹ️ No operators found.");
    } else {
      console.log("👥 Operators:");
      operators.forEach((operator: string, index: number) => {
        console.log(`  ${index + 1}. ${operator}`);
      });
    }

    // Get contract owner
    const owner = await contract.read.owner();
    console.log(`👑 Contract Owner: ${owner}`);

    // Get total games
    const totalGames = await contract.read.totalGames();
    console.log(`🎮 Total Games: ${totalGames}`);
  } catch (error) {
    console.error("❌ Error listing operators:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
