pragma solidity ^0.5.0;

import "./EventCrowdCrowdsale.sol";

contract EventCrowdCrowdsaleImpl is EventCrowdCrowdsale  {

    uint256 private _openingTime = now+2;
    uint256 private _closingTime = now+4;
    uint256 private _rate = 1;
    uint256 private _goal = 100;
    uint256 private _cap = 100 ether;

    constructor (IERC20 token, address payable projectEscrow)
        public
        EventCrowdCrowdsale( token, projectEscrow, _openingTime, _closingTime, _rate, _goal, _cap) {
            //empty constructor
        }
}