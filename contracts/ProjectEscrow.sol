pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./DepositerRole.sol";
import "./IVotableToken.sol";

contract ProjectEscrow is DepositerRole {
    using SafeMath for uint256;

    /**
     * If this turened true, the beneficiary won't be able to get anymore payments and the funders can get the remaining of their funds.
     * and if it turned true, it won't be reversable.
     */
    bool private _refundingState;

    event RefundsEnabled();
    event Deposited(address indexed payee, uint256 weiAmount);

    // will only be emitted for refund transfers
    event Withdrawn(address indexed payee, uint256 weiAmount);

    // will be emitted whenever a payment gets released to a beneficiary
    event ReleasePayment(address indexed beneficiary, uint256 weiAmount);

    // to record the deposits in ether
    mapping(address => uint256) private _deposits;

    // to access the token contract and get the voting status
    IVotableToken private _vToken;

    /**
     * @dev Constructor.
     * @dev This contract is highly insprired by 'RefundEscrow' (from OpenZeppelin: https://github.com/OpenZeppelin/openzeppelin-solidity/tree/master/contracts/payment/escrow)
     * I've modified it to fit the use of gradual payments to beneficiary, while keeping the refunding option possible in case the funders wants to stop paying to a beneficiary.
     */
    constructor (IVotableToken vToken) public {
        _refundingState = false;
        _vToken = IVotableToken(vToken);
    }

    function () external payable {
        // empty
    }

    /**
     * @return The address of the votable token
     */
    function getTokenAddress() public view returns (address) {
        return address(_vToken);
    }

    /**
     * @return The current state of the ProjectEscrow.
     */
    function refundingState() public view returns (bool) {
        return _refundingState;
    }

    /**
     * @return the balance deposited by the payees/funders
     */
    function depositsOf(address payee) public view returns (uint256) {
        return _deposits[payee];
    }

    /**
     * @return the balance of the escrow
     */
    function escrowBalance() public view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @dev Stores funds that may later be refunded.
     */
    function deposit(address payee, uint256 amount) public onlyDepositer payable {
        require(_refundingState == false, "ProjectEscrow: can not deposit. This escrow is at refunding state.");
        _deposits[payee] = _deposits[payee].add(amount);

        emit Deposited(payee, amount);
    }

    /**
     * @dev Allows for refunds to take place, rejecting further beneficiary payments or deposits.
     * It will only be triggered if the majority of token holders have voted to 'reject' in the VotableToken.
     */
    function enableRefunds() public returns (bool) {
        require(_vToken.majorityRejection() == true, "GradRelease: Can't reject Beneficiary, since majority are not rejecting.");
        require(_refundingState == false, "ProjectEscrow: refunds are already enabled");

        _refundingState = true;
        emit RefundsEnabled();
        return true;
    }

    /**
     * @dev refunds will only be on the amount that is left in this 'ProjectEscrow' contract.
     */
    function withdraw() public {
        require(_refundingState == true, "ProjectEscrow: can only withdraw while refunding state is 'true'");
        uint256 payment = _deposits[msg.sender];
        require(address(this).balance >= payment, "ProjectEscrow: there is not enough balance to do a refund of this amount");

        _deposits[msg.sender] = 0;
        (msg.sender).transfer(payment);
        emit Withdrawn(msg.sender, payment);
    }

    /**
     * @dev to be used by the owner/primary to release payments to a beneficiary account
     * @param beneficiary that will get the ether amount
     * @param value the value of ether in wei
     *
     * NOTE: the parent contract should define a strict procedure for using this function. otherwise, payments could be released in unintended ways.
     */
    function _releasePayment(address payable beneficiary, uint256 value) internal {
        beneficiary.transfer(value);
        emit ReleasePayment(beneficiary, value);
    }
}