pragma solidity ^0.5.0;

interface IProjectEscrow {
        function deposit(address payee, uint256 amount) external payable;
}