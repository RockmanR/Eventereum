pragma solidity ^0.5.0;

import "./EventCrowdToken.sol";

contract EventCrowdTokenImpl is EventCrowdToken {

    uint256 private cap_ = 100 ether;

    constructor() public EventCrowdToken(cap_){
        //empty constructor
    }
}