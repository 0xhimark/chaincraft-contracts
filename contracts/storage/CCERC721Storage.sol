// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { sslot } from '@solidstate/contracts/data/StorageSlot.sol';

/**
 * @title CCERC721Storage
 * @dev Storage layout for ERC721Facet using SolidState pattern
 */
library CCERC721Storage {
    /**
     * @custom:storage-location erc7201:chaincraft.layout.ERC721
     */
    struct Layout {
        // Game-specific state
        uint256 nextTokenId;
        mapping(uint256 => string) gameURIs;
    }

    sslot internal constant DEFAULT_STORAGE_SLOT =
        sslot.wrap(
                keccak256(
                abi.encode(
                    uint256(keccak256(bytes('chaincraft.layout.ERC721'))) - 1
                )
            ) & ~bytes32(uint256(0xff))
        );

    function layout() internal pure returns (Layout storage $) {
        $ = layout(DEFAULT_STORAGE_SLOT);
    }

    function layout(sslot slot) internal pure returns (Layout storage $) {
        assembly {
            $.slot := slot
        }
    }
}
