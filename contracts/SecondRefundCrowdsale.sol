pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "./IProjectEscrow.sol";

contract SecondRefundCrowdsale is Crowdsale {

    /**
     * @dev second refund escrow, used to hold funds while gradually releasing payments to beneficiary, as stated in the InstalmentPlan contract.
     * It become in use after a successful crowdsale, and after transfering the funds from the first escrow to this one
     */
    IProjectEscrow private _instalmentPlan;

    constructor (address payable projectEscrow)
        public
        {
             _instalmentPlan = IProjectEscrow(projectEscrow);
        }

    // overriding 'buyTokens' to record the amount of ether deposited into a second escrow account for the InstalmentPlan (second phase) purpose.
    function buyTokens(address beneficiary) public payable {
        super.buyTokens(beneficiary);
        uint256 value = msg.value;
        _instalmentPlan.deposit(beneficiary, value);
    }
}
