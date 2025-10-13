import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { toFunctionSelector } from "viem";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

enum FacetCutAction {
  Add,
  Replace,
  Remove,
}

// Helper function to extract function selectors from ABI (like in your example)
function getFunctionSelectors(abi: any[]): string[] {
  return abi
    .filter((item) => item.type === "function")
    .map((func) => {
      const signature = `${func.name}(${func.inputs
        .map((input: any) => input.type)
        .join(",")})`;
      return toFunctionSelector(signature);
    });
}

export default buildModule("ChainCraft", (m) => {
  // Deploy the Diamond contract first
  const diamond = m.contract("ChainCraftDiamond", [], {
    id: "ChainCraftDiamond",
  });

  // Deploy the CCERC721Facet
  const ccERC721Facet = m.contract("CCERC721Facet", [], {
    id: "CCERC721Facet",
  });

  // Load ABIs for both contracts
  const ccERC721FacetAbi =
    require("../../artifacts/contracts/facets/CCERC721Facet.sol/CCERC721Facet.json").abi;
  const diamondAbi =
    require("../../artifacts/contracts/ChainCraftDiamond.sol/ChainCraftDiamond.json").abi;

  // Get selectors for CCERC721Facet
  const allSelectors = getFunctionSelectors(ccERC721FacetAbi);

  // Get selectors that are already added by the diamond (from SolidstateDiamondProxy)
  const alreadyAddedSelectors = getFunctionSelectors(diamondAbi);

  // Filter out selectors that are already added by the diamond
  const ccERC721FacetSelectors = allSelectors.filter(
    (selector) => !alreadyAddedSelectors.includes(selector)
  );

  // Add CCERC721Facet to the diamond
  m.call(
    diamond,
    "diamondCut",
    [
      [
        {
          target: ccERC721Facet,
          action: FacetCutAction.Add,
          selectors: ccERC721FacetSelectors,
        },
      ],
      "0x0000000000000000000000000000000000000000",
      "0x",
    ],
    { id: "DiamondCut" }
  );

  // Get CCERC721Facet interface at diamond address for initialization
  const ccERC721FacetInterface = m.contractAt("CCERC721Facet", diamond, {
    id: "CCERC721FacetInterface",
  });

  // Initialize the CCERC721Facet
  m.call(
    ccERC721FacetInterface,
    "initialize",
    ["ChainCraft Game Registry", "CCGR"],
    {
      id: "Initialize",
    }
  );

  return {
    diamond,
    ccERC721Facet,
    ccERC721FacetInterface,
  };
});
