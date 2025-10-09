// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { sslot } from '@solidstate/contracts/data/StorageSlot.sol';
import { EnumerableSet } from '@solidstate/contracts/data/EnumerableSet.sol';

/**
 * @title OperableStorage
 * @dev Storage layout for Operable functionality using EIP-7201 namespaced storage
 */
library OperableStorage {
    /**
     * @custom:storage-location erc7201:chaincraft.layout.Operable
     */
    struct Layout {
        EnumerableSet.AddressSet operators;
    }

    sslot internal constant DEFAULT_STORAGE_SLOT =
        sslot.wrap(
            keccak256(
                abi.encode(
                    uint256(keccak256(bytes('chaincraft.layout.Operable'))) - 1
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
