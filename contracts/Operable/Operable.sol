// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SafeOwnable } from '@solidstate/contracts/access/ownable/safe/SafeOwnable.sol';
import './IOperable.sol';
import './OperableInternal.sol';

/// @title Operable
/// @dev This contract is used to provide operator management functionality to other contracts.
/// Operators are able to perform certain privileged operations, but not at the same level as the owner.
abstract contract Operable is OperableInternal, IOperable, SafeOwnable {
    // Admin
    function addOperator(address operator) external override onlyOwner {
        _addOperator(operator);
    }

    function removeOperator(address operator) external override onlyOwner {
        _removeOperator(operator);
    }

    function isOperator(address operator) external view override returns (bool) {
        return _isOperator(operator);
    }

    function getOperators() external view returns (address[] memory) {
        return _getOperators();
    }
}
