pragma solidity ^0.5.0;

import "./EventCrowdCrowdsale.sol";

contract EventCrowdCrowdsaleImpl is EventCrowdCrowdsale  {

    uint256 private _openingTime = now+120;
    uint256 private _closingTime = now+10240;
    uint256 private _rate = 1;
    uint256 private _goal = 0.5 ether;
    uint256 private _cap = 1 ether;

    constructor (IERC20 token, address payable projectEscrow)
        public
        EventCrowdCrowdsale( token, projectEscrow, _openingTime, _closingTime, _rate, _goal, _cap) {
            //empty constructor
        } 
}