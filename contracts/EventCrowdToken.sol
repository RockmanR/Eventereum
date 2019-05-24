pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Capped.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Pausable.sol";
import "./VotableToken.sol";

contract EventCrowdToken is ERC20Burnable, ERC20Capped, ERC20Pausable, VotableToken { //(also includes Mintable)
    constructor(uint256 cap) public ERC20Capped(cap){
        //empty constructor
    }
}