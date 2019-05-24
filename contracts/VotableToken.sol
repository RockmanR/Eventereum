pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract VotableToken is ERC20 {

    // to record the value of the vote. voting 'true' means rejection.
    mapping(address => bool) private _vote;

    //total rejection weighted by the amount of token being held.
    uint256 private _totalRejection;

    /**
     * @return total rejection weighted by the amount of tokens being held.
     */
    function getTotalRejection() public view returns (uint256) {
        return _totalRejection;
    }

    /**
     * @return the vote value of the sender.
     */
    function myVote() public view returns (bool) {
        return _vote[msg.sender];
    }

    /**
     * @return the result of the total votes.
     */
    function majorityRejection() public view returns (bool) {
        return _totalRejection*2 > totalSupply();
    }

    // please refer to the original function @ ERC20 regarding the parameters and other discription.
    // @dev if the new tokens are sent to an account that voted, then increase the total value of the vote.
    function _mint(address account, uint256 value) internal {
        super._mint(account, value);

        if(_vote[account] == true) {
            _totalRejection += value;
        }
    }

    // please refer to the original function @ ERC20 regarding the parameters and other discription.
    // @dev if the sender or receiver have already voted, then adjust the total value of the votes accordingly.
    function _transfer(address from, address to, uint256 value) internal {
        super._transfer(from, to, value);

        if(_vote[from] == true) {
            _totalRejection -= value;
        }
        if(_vote[to] == true) {
            _totalRejection += value;
        }
    }

    /**
     * @dev submiting a vote 'to STOP releasing funds to beneficiary', weighted by the tokens being held.
     */
    function voteToReject() public returns (bool) {
        uint256 amount = balanceOf(msg.sender);
        require(amount != 0, "VotableToken: you do not have any tokens to vote with.");
        require(_vote[msg.sender] == false, "OverallVoting: you have already voted to reject.");

        _vote[msg.sender] = true;
        _totalRejection += amount;
        return true;
    }

    /**
     * @dev undo a submited vote 'to CONTINUE releasing funds to beneficiary'.
     */
    function undoVoteToReject() public returns (bool) {
    uint256 amount = balanceOf(msg.sender);
    require(_vote[msg.sender] == true, "OverallVoting: your vote is alrady not to reject.");

    _vote[msg.sender] = false;
    _totalRejection -= amount;
    return true;
    }
}