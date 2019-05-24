pragma experimental ABIEncoderV2;

import "./InstalmentPlan.sol";

contract InstalmentPlanImpl is InstalmentPlan {

    address payable private _beneficiary = 0xC9A457743d3f5c6742E2944Ee4539ECBe2Bd5De9;
    uint256 private _amount1 = 1;
    uint256 private _due1 = now+1;
    uint256 private _amount2 = 1;
    uint256 private _due2 = _due1+6;
    uint256 private _lastDue = _due2+5;

    constructor (IVotableToken vToken) public
    InstalmentPlan(_beneficiary, vToken, _amount1, _due1, _amount2, _due2, _lastDue) {
        //empty constructor
    }
}