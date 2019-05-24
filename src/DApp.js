/*global web3*/

import './App.css';
import React from 'react';

//importing web3 API
import EmbarkJS from './embarkArtifacts/embarkjs';

//importing contracts
import Token from './embarkArtifacts/contracts/EventCrowdTokenImpl';
import InsPlan from './embarkArtifacts/contracts/InstalmentPlanImpl';
import Crowdsale from './embarkArtifacts/contracts/EventCrowdCrowdsaleImpl';

//importing components
import AddressDashboard from './components/AddressDashboard';
import CrowdsalePhases from './components/CrowdsalePhases';
import Timelines from './components/Timelines';
import FundingStatus from './components/FundingStatus';


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
      currentState: 0,
      openingTime: '',
      timeToOpen: 0,
      timeToClose: '',
      closingTime: '',
      contractPeriod: '',
      cap: '',
      goal: '',
      goalReached: '',
      finalized: '',
      contractBalance: ''
    };
  }

  componentDidMount() {
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
        } 
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
      web3.eth.getBalance(Crowdsale.address).then((result) => {
        this.setState({contractBalance : result});
      });
      this.setState({
          TokenAddr: Token.address,
          InsPlanAddr: InsPlan.address,
          CrowdsaleAddr: Crowdsale.address
      });
    });
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
      </div>
    );
  }
}

export default App;
