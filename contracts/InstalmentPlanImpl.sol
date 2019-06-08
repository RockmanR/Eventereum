pragma experimental ABIEncoderV2;

import "./InstalmentPlan.sol"; 

contract InstalmentPlanImpl is InstalmentPlan {

    address payable private _beneficiary = 0xC9A457743d3f5c6742E2944Ee4539ECBe2Bd5De9;
    uint256 private _amount1 = 100;
    uint256 private _due1 = now+1; // now+1 for testing
    uint256 private _amount2 = 100;
    uint256 private _due2 = _due1+60; // _due1+6 for testing
    uint256 private _lastDue = _due2+600; // _due2+5 for testing

    constructor (IVotableToken vToken) public
    InstalmentPlan(_beneficiary, vToken, _amount1, _due1, _amount2, _due2, _lastDue) {
        //empty constructor
    }
}