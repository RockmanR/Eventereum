/*global web3*/

import './App.css';
import React from 'react';

//importing web3 API
import EmbarkJS from './embarkArtifacts/embarkjs';

//importing other nesesities
import BigNumber from 'bignumber.js';

//importing contracts
import Token from './embarkArtifacts/contracts/EventCrowdTokenImpl';
import InsPlan from './embarkArtifacts/contracts/InstalmentPlanImpl';
import Crowdsale from './embarkArtifacts/contracts/EventCrowdCrowdsaleImpl';

//importing components
import AddressDashboard from './components/AddressDashboard';
import CrowdsalePhases from './components/CrowdsalePhases';
import Timelines from './components/Timelines';
import FundingStatus from './components/FundingStatus';
import UserPanel from './components/UserPanel';
import AdminPanel from './components/AdminPanel';
import InstallmentPlan from './components/InstallmentPlan';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: '',
      TokenAddr: '',
      InsPlanAddr: '',
      CrowdsaleAddr: '',
      isMinter: false,
      isDepositer: false,
      isOpen: false, 
      openingTime: '',
      timeToOpen: 0,
      timeToClose: '',
      closingTime: '',
      contractPeriod: '',
      cap: '',
      goal: '',
      goalReached: '',
      finalized: '',
      weiRaised: '',
      web3Account0: '',
      web3Account0_bal: '',
      tokenBought: '',
      myVote: '',
      balanceOf: '',
      installment_1: '',
      installment_2: '',
      installment_3: ''
    };
  }

  componentDidMount() {
    this.getContractData();
    this.getAccountData();
    this.getInstalmentPlanData();
  }

  getContractData(){
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
      InsPlan.methods.isDepositer(Crowdsale.address).call().then((result) => {
        if(result){
          this.setState({isDepositer : true});
        }
      });
      Crowdsale.methods.isOpen().call().then((result) => {
        if(result){
          this.setState({isOpen : true});
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
      Crowdsale.methods.timeToClose().call().then((result) => {  // I can eleminate this function and use JS's Date() function to find out 'now'
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

  getInstalmentPlanData() {
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
  }

  timeConverter(unix_timestamp){
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(unix_timestamp*1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();
        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        // return the time in string
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
        <h1>Event Crowd</h1>
        <br/>
        <br/>
        <CrowdsalePhases state={this.state}/>
        <Timelines state={this.state}/>
        <FundingStatus state={this.state}/>
        <AddressDashboard state={this.state}/>
        <InstallmentPlan state={this.state} timeConverter={this.timeConverter}/>
        <UserPanel state={this.state} buyTokens={this.buyTokens} withdrawTokens={this.withdrawTokens} claimRefund={this.claimRefund} voteToReject={this.voteToReject} undoVoteToReject={this.undoVoteToReject}/> 
        <AdminPanel finalize={this.finalize} releaseInstallment={this.releaseInstallment} />
      </div>
    );
  }
}
//
//
export default App;
