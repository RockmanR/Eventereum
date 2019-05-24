pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "../node_modules/openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "../node_modules/openzeppelin-solidity/contracts/crowdsale/validation/PausableCrowdsale.sol";
import "../node_modules/openzeppelin-solidity/contracts/crowdsale/distribution/RefundablePostDeliveryCrowdsale.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "./SecondRefundCrowdsale.sol";

/**
 * The crowdesale also includes TimedCrowdsale, FinalizableCrowdsale, PostDeliveryCrowdsale.
 * and does not include WhitelistCrowdsale, IndividuallyCappedCrowdsale, AllawanceCrowdsale, IncreasingPriceCrowdsale
 */
contract EventCrowdCrowdsale is RefundablePostDeliveryCrowdsale, MintedCrowdsale, CappedCrowdsale, PausableCrowdsale, SecondRefundCrowdsale  {

    uint deploymentTime;

    constructor (IERC20 token, address payable projectEscrow, uint256 openingTime, uint256 closingTime, uint256 rate, uint256 goal, uint256 cap)
        public
        Crowdsale(rate, projectEscrow, token)
        CappedCrowdsale(cap)
        TimedCrowdsale(openingTime,closingTime)
        RefundableCrowdsale(goal)
        SecondRefundCrowdsale(projectEscrow)
    {
        deploymentTime = block.timestamp;
    }

    /**
     * @return The number of seconds left to close the crowdsale.
     */
    function timeToClose() public view returns (uint256) {
        if(block.timestamp <= closingTime()){
            uint256 time = closingTime();
            return time.sub(block.timestamp);
        } else{
            return 0;
        }
    }

    /**
     * @return The number of seconds left to start the crowdsale.
     */
    function timeToStart() public view returns (uint256) {
        if(block.timestamp <= openingTime()){
            uint256 time = openingTime();
            return time.sub(block.timestamp);
        } else{
            return 0;
        }
    }

    /**
     * @return Contract duration, which is the number of seconds from the deployment time until the contract closure.
     * this is needed to show deadlines based on a % format. ultimatly this should be done in JS and not in the contrct itself.
     */
    function contractPeriod() public view returns (uint256) {
            uint256 time = closingTime();
            return time.sub(deploymentTime);
    }
}