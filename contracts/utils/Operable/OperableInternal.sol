// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { EnumerableSet } from '@solidstate/contracts/data/EnumerableSet.sol';
import './OperableStorage.sol';

abstract contract OperableInternal {
    using EnumerableSet for EnumerableSet.AddressSet;

    // Events
    event OperatorAdded(address operator);
    event OperatorRemoved(address operator);

    function _addOperator(address operator) internal {
        OperableStorage.layout().operators.add(operator);
        emit OperatorAdded(operator);
    }

    function _removeOperator(address operator) internal {
        OperableStorage.layout().operators.remove(operator);
        emit OperatorRemoved(operator);
    }

    function _isOperator(address operator) internal view returns (bool) {
        return OperableStorage.layout().operators.contains(operator);
    }

    function _getOperators() internal view returns (address[] memory) {
        return OperableStorage.layout().operators.toArray();
    }
}
