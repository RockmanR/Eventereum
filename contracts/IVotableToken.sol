pragma solidity ^0.5.0;

interface IVotableToken {
        function majorityRejection() external view returns (bool);
}