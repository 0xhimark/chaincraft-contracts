// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IOperable {
    function addOperator(address operator) external;
    function removeOperator(address operator) external;
    function isOperator(address operator) external view returns (bool);
}
