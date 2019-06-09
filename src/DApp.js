// below line is actually a command to make the global web3 available
/* global web3 */

// Importing React
import React from 'react';
import './App.css';

// Importing react-bootstrap components
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

// Importing the web3 API
import EmbarkJS from './embarkArtifacts/embarkjs';

// Importing contract artifacts
import Token from './embarkArtifacts/contracts/EventCrowdTokenImpl';
import InsPlan from './embarkArtifacts/contracts/InstalmentPlanImpl';
import Crowdsale from './embarkArtifacts/contracts/EventCrowdCrowdsaleImpl';

// Importing components
import AddressDashboard from './components/AddressDashboard';
import CrowdsalePhases from './components/CrowdsalePhases';
import Timelines from './components/Timelines';
import FundingStatus from './components/FundingStatus';
import UserPanel from './components/UserPanel';
import AdminPanel from './components/AdminPanel';
import InstallmentPlan from './components/InstallmentPlan';

// Importing BigNumber for big number calculations
import BigNumber from 'bignumber.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // A status to load the page
      loading: true,
      // An error message, used if EmbarkJS failed to launch
      error: '',
      // To set the address of the Token contract
      TokenAddr: '',
      // To set the address of the InstalmentPlan contract
      InsPlanAddr: '',
      // To set the address of the Crowdsale contract
      CrowdsaleAddr: '',
      // To set the beneficiary of the InstalmentPlan contract
      beneficiary: '',
      // To set the isMinter status for the Crowdsale contract. If true, then Crowdsale can mint the tokens in Token contract
      isMinter: false,
      // To set the isDepositer status for the Crowdsale contract. If true, then Crowdesale can deposit ether in InstalmentPlan contract
      isDepositer: false,
      // To set the opening status for the Crowdsale contract. If false, then no one can buy tokens/send ether to Crowdsale contract
      isOpen: false,
      // The date and time to open the Crowdsale contract
      openingTime: '',
      // The date and time to close the Crowdsale contract
      closingTime: '',
      // The number of seconds left to open the Crowdsale contract
      timeToOpen: 0,
      // The number of seconds left to close the Crowdsale contract
      timeToClose: '',
      // The number of seconds from the time the contract gets deployed to the time it gets closed
      contractPeriod: '',
      // A cap for Crowdsale contract, to limit the number of ether/funding received
      cap: '',
      // The funding goal of the Crowdsale contract
      goal: '',
      // The status of the Crowdsale funding goal (boolean)
      goalReached: '',
      // The 'finalized' status of the Crowdsale (refer to the contract for more details)
      finalized: '',
      // The amount of ether (as wei) raised by Crowdsale contract
      weiRaised: '',
      // The number of token bought
      tokenBought: '',
      // The vote of the default account for the InstalmentPlan contract
      myVote: '',
      // The details of the 1st instalment (as object) from the InstamentPlan contract
      installment_1: '',
      // The details of the 2nd instalment (as object) from the InstamentPlan contract
      installment_2: '',
      // The details of the 3rd instalment (as object) from the InstamentPlan contract
      installment_3: '',
      // The default account in web3 (i.e. MetaMask)
      web3Account0: '',
      // The balance of the default account in web3
      web3Account0_bal: '',
      // The token balance for the default account
      balanceOf: '',
    };
  }

  componentDidMount() {
    // To get the details for the 3 main contracts involved (Token, Crowdsale, InstalmentPlan)
    this.getContractData();
    // To get the details of the default account in use (i.e. MetaMask)
    this.getAccountData();

    //this.getInstalmentPlanData();
  }

    // To get the details for the 3 main contracts involved (Token, Crowdsale, InstalmentPlan)
    getContractData(){
    // I guess this checks if the Ethereum node is connected and functional
    EmbarkJS.onReady((err) => {
      if (err) {
        this.setState({
          loading: false,
          error: 'Error while loading the Dapp: ' + err.message || err
        });
      } else {
        this.setState({
          loading: false
        });
      }

      // Getting data from the Token contract
      Token.methods.isMinter(Crowdsale.address).call().then((result) => {
        if(result){
          this.setState({isMinter : true});
          console.log('delete me: The minder is: ', result)
        } 
      });
      Token.methods.balanceOf(this.state.web3Account0).call().then((result) => {
        this.setState({balanceOf : result});
      });
      Token.methods.myVote().call().then((result) => {
        this.setState({myVote : result});
      });

      // Getting data from the InstalmentPlan contract
      InsPlan.methods.isDepositer(Crowdsale.address).call().then((result) => {
        if(result){
          this.setState({isDepositer : result});
        }
      });
      InsPlan.methods.getBeneficiary().call().then((result) => {
        if(result){
          this.setState({beneficiary : result});
        }
      });
      InsPlan.methods.instalmentDetails(3).call().then(obj => {
        this.setState({
          installment_1: obj
        })
      });
      InsPlan.methods.instalmentDetails(2).call().then(obj => {
        this.setState({
          installment_2: obj
        })
      });
      InsPlan.methods.instalmentDetails(1).call().then(obj => {
        this.setState({
          installment_3: obj
        })
      });
  
      // Getting data from the Crowdsale contract
      Crowdsale.methods.isOpen().call().then((result) => {
        if(result){
          this.setState({isOpen : result});
        }
      });
      Crowdsale.methods.openingTime().call().then((result) => {
        this.setState({openingTime : result});
      });
      Crowdsale.methods.timeToOpen().call().then((result) => {
          this.setState({timeToOpen : result});
      });
      Crowdsale.methods.closingTime().call().then((result) => {
        this.setState({closingTime : result});
      });
      // This call needs to be removed, and replaced by JS's Date() function to find out the 'now'
      Crowdsale.methods.timeToClose().call().then((result) => {
        this.setState({timeToClose : result});
      });
      Crowdsale.methods.contractPeriod().call().then((result) => {
        this.setState({contractPeriod : result});
      });
      Crowdsale.methods.goal().call().then((result) => {
        this.setState({goal : result});
      });
      Crowdsale.methods.cap().call().then((result) => {
        this.setState({cap : result});
      });
      Crowdsale.methods.goalReached().call().then((result) => {
        this.setState({goalReached : result});
      });
      Crowdsale.methods.finalized().call().then((result) => {
        this.setState({finalized : result});
      });
      Crowdsale.methods.weiRaised().call().then((result) => {
        this.setState({weiRaised : result});
      });
      this.setState({
          TokenAddr: Token.address,
          InsPlanAddr: InsPlan.address,
          CrowdsaleAddr: Crowdsale.address
      });
    });
  }

    // To get the details of the default account in use (i.e. MetaMask)
    getAccountData() {
    web3.eth.getAccounts( (error, accounts) => {
      if(error) {
        console.log('Can not connect to web3 accounts..',error);
      } else {
        web3.eth.getBalance(accounts[0]).then( balance => {
          this.setState({
            web3Account0 : accounts[0],
            web3Account0_bal: balance
          });
        });
        InsPlan.methods.depositsOf(accounts[0]).call().then(deposit => {
          let tokenPrice = new BigNumber(1000000000000000);
          let deposit_BIG = new BigNumber(deposit);
          let tokenBought_BIG = deposit_BIG.div(tokenPrice);
          this.setState({tokenBought: tokenBought_BIG.toNumber()});
        });
      }
    });
  }

  timeConverter(unix_timestamp){
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(unix_timestamp*1000);
        // Months from Date() will be in array
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = date.getFullYear();
        var month = months[date.getMonth()];
        var day = date.getDate(); 
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        // Will display time in dd mm yyyy - hh:mm:ss format
        var formattedTime = day + ' ' + month + ' ' + year + ' - ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        // return the time as string
        return formattedTime;
  }

  //to be accessed from UserPanel.js
  buyTokens(amount) {
    //amount is multiplied by the price of the token
    let weiAmount = 1000000000000000*amount;
    let address = this.state.web3Account0;
    console.log("delele me: attempt to buy tokens by: ", address)
    Crowdsale.methods.buyTokens(address).send({from: address, value: weiAmount, gasPrice: "200000000000", gas: "200000"}).then( response => {
        console.log('buyToken respons: ',response);
    })
  }

  //to be accessed from UserPanel.js
  withdrawTokens() {
    let address = this.state.web3Account0;
    Crowdsale.methods.withdrawTokens(address).send().then( response => {
      console.log('withdrawTokens respons: ',response);
    })
  }

  //to be accessed from UserPanel.js
  claimRefund() {
    let address = this.state.web3Account0;
    Crowdsale.methods.claimRefund(address).send().then( response => {
      console.log('claimRefund respons: ',response);
    })
  }

  //to be accessed from UserPanel.js
  voteToReject() {
    Token.methods.voteToReject().send().then( response => {
        console.log('voteToReject respons: ',response);
    })
  }

  //to be accessed from UserPanel.js
  undoVoteToReject() {
    Token.methods.undoVoteToReject().send().then( response => {
        console.log('undoVoteToReject respons: ',response);
    })
  }

  //to be accessed from AdminPanel.js
  finalize() {
    Crowdsale.methods.finalize().send().then( response => {
      console.log('finalize respons: ', response);
    })
  }

  //to be accessed from AdminPanel.js
  releaseInstallment() {
    InsPlan.methods.releaseInstallment().send().then( response => {
      console.log('release installment respons: ', response);
    })
  }

  render() {
    if (this.state.error) {
      return <p>{this.state.error}</p>;
    }
    if (this.state.loading) {
      return <p>Loading...</p>;
    }

    return (
      <div className='App'>
        <br/>
        <h1>Eventereum</h1>
        <h5>An open source platform for tokenizing events</h5>
        <br/>
        <br/>
          <Tabs defaultActiveKey="contractStatus" id="uncontrolled-tab-example">
            <Tab eventKey="contractStatus" title="Contract status">
              <br/>
              <br/>
              <CrowdsalePhases state={this.state}/>
              <Timelines state={this.state} timeConverter={this.timeConverter} />
              <FundingStatus state={this.state}/>
              <AddressDashboard state={this.state}/>
              <InstallmentPlan state={this.state} timeConverter={this.timeConverter}/>
            </Tab>
            <Tab eventKey="userPanel" title="User Panel">
              <UserPanel state={this.state} buyTokens={this.buyTokens} withdrawTokens={this.withdrawTokens} claimRefund={this.claimRefund} voteToReject={this.voteToReject} undoVoteToReject={this.undoVoteToReject}/> 
            </Tab>
            <Tab eventKey="adminPanel" title="Admin Panel">
              <br/>
              <br/>
              <AdminPanel finalize={this.finalize} releaseInstallment={this.releaseInstallment} />
            </Tab>
          </Tabs>
        <br/>
        <br/>
        <br/>
      </div>
    );
  }
}


export default App;
