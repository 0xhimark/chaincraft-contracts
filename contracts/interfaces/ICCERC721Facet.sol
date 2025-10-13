// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title ICCERC721Facet
 * @dev Interface for CCERC721Facet - game publishing as NFTs
 */
interface ICCERC721Facet {
    // Events
    event GamePublished(uint256 indexed tokenId, address indexed publisher, string gameURI);
    event GameURIUpdated(uint256 indexed tokenId, string newURI);

    // Game-specific functions
    function initialize(string memory name, string memory symbol) external;
    function publishGame(address to, string memory gameURI) external returns (uint256);
    function updateGameURI(uint256 tokenId, string memory newURI) external;
}
