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
import InstalmentPlan from './components/InstalmentPlan';

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
      instalment_1: '',
      // The details of the 2nd instalment (as object) from the InstamentPlan contract
      instalment_2: '',
      // The details of the 3rd instalment (as object) from the InstamentPlan contract
      instalment_3: '',
      // The default account in web3 (i.e. MetaMask)
      web3Account0: '',
      // The balance of the default account in web3
      web3Account0_bal: '',
      // The token balance for the default account
      balanceOf: '',
      tokenPrice: 1000000000000000,
    };
  }

  componentDidMount() {
    // To get the details for the 3 main contracts involved (Token, Crowdsale, InstalmentPlan)
    this.getContractData();
    // To get the details of the default account in use (i.e. MetaMask)
    this.getAccountData();
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
        console.log('delete: Instalment details: ', obj)
        this.setState({
          instalment_1: obj
        })
      });
      InsPlan.methods.instalmentDetails(2).call().then(obj => {
        this.setState({
          instalment_2: obj
        })
      });
      InsPlan.methods.instalmentDetails(1).call().then(obj => {
        this.setState({
          instalment_3: obj
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
        // To calculate the number of purchased tokens by a the user. To do so, we need to get the amount of ether deposited in 'InstalmentPlan' 
        // by that user then convert it to Token numbers (by calculating the price of the token)
        // Note: we can't calculate the number of tokends directly from the Token contract, since they are locked until the contract gets finalized with a success goal.
        InsPlan.methods.depositsOf(accounts[0]).call().then(deposit => {
          // The big number object is needed to do calcualtions for very large numbers.
          let tokenPrice = new BigNumber(this.state.tokenPrice);
          let deposit_BIG = new BigNumber(deposit);
          let tokenBought_BIG = deposit_BIG.div(tokenPrice);
          // the 'tokenBought_BIG' is a BigNumber object that needs to be converted to normal number/float
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

  // To buy Tokens from Crowdsale contract
  // This function gets enabled only when the Crowdsale contract status is 'open'
  // To be accessed from UserPanel.js
  buyTokens(amount) {
    //amount is multiplied by the price of the token
    let weiAmount = this.state.tokenPrice*amount;
    let address = this.state.web3Account0;
    // The gas price might need to be revised later on
    Crowdsale.methods.buyTokens(address).send({from: address, value: weiAmount, gasPrice: "200000000000", gas: "200000"}).then( response => {
        console.log('buyToken respons: ',response);
    })
  }

  // To withdraw tokens by the users/funders.
  // This function gets enabled if the contract got finalized the the goal got reached. 
  // This function is to be accessed from UserPanel.js
  withdrawTokens() {
    let address = this.state.web3Account0;
    Crowdsale.methods.withdrawTokens(address).send().then( response => {
      console.log('withdrawTokens respons: ',response);
    })
  }

  // To claim refund by the users/funders 
  // This function gets enabled if the Crowdsale contract was 'closed', 'finalized', and the goal didn't reach
  // to be accessed from UserPanel.js
  claimRefund() {
    let address = this.state.web3Account0;
    Crowdsale.methods.claimRefund(address).send().then( response => {
      console.log('claimRefund respons: ',response);
    })
  }

  // To vote againsed releasing the payments to beneficiary during the Instalment Plan phase
  // This function gets enabled if the Tokens were already withdrawn by the user/funder. If the user have already voted, then it won't work as well.
  // To be accessed from UserPanel.js
  voteToReject() {
    Token.methods.voteToReject().send().then( response => {
        console.log('voteToReject respons: ',response);
    })
  }

  // To reverse/undo the vote againsed releasing the payments to beneficiary
  // This function gets enabled if the user have voted before. If the user have already un-voted, then it won't work.
  // To be accessed from UserPanel.js  
  undoVoteToReject() {
    Token.methods.undoVoteToReject().send().then( response => {
        console.log('undoVoteToReject respons: ',response);
    })
  }

  // A switch change the Corwdsale status to 'finalized'
  // This function gets enabled if the Corwdsale contract have passed the closing time
  // To be accessed from AdminPanel.js
  finalize() {
    Crowdsale.methods.finalize().send().then( response => {
      console.log('finalize respons: ', response);
    })
  }

  // To release the instalments/payments to the beneficiary based on the 'InstalmentPlan' contract
  // This function gets enabled if the instalments mentioned under the InstalmentPlan contract were due
  // To be accessed from AdminPanel.js
  releaseInstalment() {
    InsPlan.methods.releaseInstalment().send().then( response => {
      console.log('release instalment respons: ', response);
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
        <h5>A free and open source platform to tokenize events</h5>
        feel free to contribute
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
              <InstalmentPlan state={this.state} timeConverter={this.timeConverter}/>
            </Tab>
            <Tab eventKey="userPanel" title="User Panel">
              <UserPanel state={this.state} buyTokens={this.buyTokens} withdrawTokens={this.withdrawTokens} claimRefund={this.claimRefund} voteToReject={this.voteToReject} undoVoteToReject={this.undoVoteToReject}/> 
            </Tab>
            <Tab eventKey="adminPanel" title="Admin Panel">
              <br/>
              <br/>
              <AdminPanel finalize={this.finalize} releaseInstalment={this.releaseInstalment} />
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
