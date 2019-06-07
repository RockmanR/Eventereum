pragma experimental ABIEncoderV2;

import "./ProjectEscrow.sol"; 

contract InstalmentPlan is ProjectEscrow {

    // creating a 'struct' to hold the details that releates to an instalment.
    struct Instalments {
        uint256 amount;
        uint256 dueTime;
    }

    // to keep a record of all instalments in an array of 'Instalments'
    Instalments[] private _instalments;

    // The number of the next instalment due. For each payment it gets decreased until reachs zero.
    uint256 private _nextInstalmentNo;

    // The beneficiary that will get the released funds
    address payable private _beneficiary;

    // Announcing an instalment that was sent to a beneficiary
    event InstalmentSent(address beneficiary, uint256 value);

    /**
     * @dev Constructor, creating a new GradRelease contract with all the instalment details (payment plans)
     * param amount1 due1 are amount and time respectively, for first instalment
     * param amount2 due2 are amount and time respectively, for second instalment
     * param lastDue is the time for the final payment. There is no amount to the last payment. The contract will pay whatever left in the balance.
     */
    constructor (
        address payable beneficiary, IVotableToken vToken, uint256 amount1, uint256 due1, uint256 amount2, uint256 due2, uint256 lastDue
        )
    public ProjectEscrow(vToken) {
        _beneficiary = beneficiary;
        _instalments.push(Instalments(0,0));
        _instalments.push(Instalments(0, lastDue));
        _instalments.push(Instalments(amount2, due2));
        _instalments.push(Instalments(amount1, due1));
        _nextInstalmentNo = _instalments.length-1;
    }

    /**
     * @dev To receive ether from Crowdsale contract, or anywhere.
     */
    function () external payable {}

    /**
     * @dev To receive extra ether for the gas shortage
     */
    function gasTip() external payable {}

    /**
     * @return The total number of instalments
     */
    function noOfInstalments() public view returns (uint256) {
        return _instalments.length-1;
    }

    /**
     * @return The number of the next instalment
     */
    function nextInstalmentNo() public view returns (uint256) {
        require(_nextInstalmentNo != 0, "InstalmentPlan: there is no more isntalments.");
        return _nextInstalmentNo;
    }

    /**
     * @dev Getting the details of an instalment
     * @param no The number of instalment to get the detail of
     * @return The details of the instalment in a 'struct' format/memory
     */
    function instalmentDetails(uint256 no) public view returns (uint256 amount, uint256 dueTime) {
        require(no <= noOfInstalments(), "InstalmentPlan: there is no such instalment number.");
        return (_instalments[no].amount, _instalments[no].dueTime);
    }

    /**
     * @return The number of seconds left to the next instalment
     */
    function nextInstalmentDueLeft() public view returns (uint256) {
        uint256 no = nextInstalmentNo();
        require(no != 0, "InstalmentPlan: there is no more isntalments.");

        if(block.timestamp <= _instalments[no].dueTime){
            uint256 time = _instalments[no].dueTime;
            return time.sub(block.timestamp);
        } else{
            return 0;
        }
    }

    /**
     * **This function should be protected from reentrancy attacks.
     * @dev to release a next instalment to a beneficiary.
     * This function can be improved with a beneficiary Role, for modularity purposes.
     */
    function releaseInstalment() public returns (bool)  {
        require(_beneficiary == msg.sender, "InstalmentPlan: only beneficiary can request to release an instalment.");
        require(refundingState() == false, "InstalmentPlan: can't release instalment, due to majority rejection.");
        uint256 no = nextInstalmentNo();
        require(no != 0, "InstalmentPlan: there is no more instalment to release.");
        require(_instalments[no].dueTime < now, "InstalmentPlan: The next instalment is not due yet.");

        if(no > 1) {
            uint256 amount = _instalments[no].amount;
            require(amount < address(this).balance, "InstalmentPlan: this contract's balance does not have the required amount.");
            _releasePayment(_beneficiary, amount);
        } else {
            _releasePayment(_beneficiary, (address(this).balance));
        }
        _nextInstalmentNo = _nextInstalmentNo.sub(1);
    }
}