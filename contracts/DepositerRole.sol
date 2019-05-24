pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/access/Roles.sol";

contract DepositerRole {
    using Roles for Roles.Role;

    event DepositerAdded(address indexed account);
    event DepositerRemoved(address indexed account);

    Roles.Role private _depositers;

    constructor () internal {
        _addDepositer(msg.sender);
    }

    modifier onlyDepositer() {
        require(isDepositer(msg.sender), "DepositerRole: caller does not have the Capper role");
        _;
    }

    function isDepositer(address account) public view returns (bool) {
        return _depositers.has(account);
    }

    function addDepositer(address account) public onlyDepositer {
        _addDepositer(account);
    }

    function renounceDepositer() public {
        _removeDepositer(msg.sender);
    }

    function _addDepositer(address account) internal {
        _depositers.add(account);
        emit DepositerAdded(account);
    }

    function _removeDepositer(address account) internal {
        _depositers.remove(account);
        emit DepositerRemoved(account);
    }
}