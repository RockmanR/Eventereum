import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Table from 'react-bootstrap/Table';
import BigNumber from 'bignumber.js';
//import { compileFunction } from 'vm';

class FundingStatus extends React.Component {
    render(){
        let weiRaised_BIG = new BigNumber(this.props.state.weiRaised);
        let cap_BIG = new BigNumber(this.props.state.cap);
        let percWeiRaised = (weiRaised_BIG.div(cap_BIG))*100;
        let percWeiRaised_BIG = new BigNumber(percWeiRaised);
        let percWeiRaised_BIG_num = percWeiRaised_BIG.toNumber();
        let percGoalRached = 0;
        let progressBar;
        if (this.props.state.goalReached) {
            let goal_BIG = new BigNumber(this.props.state.goal);
            percGoalRached = (goal_BIG.div(cap_BIG))*100;
            percWeiRaised_BIG_num = percWeiRaised_BIG_num - percGoalRached;
            progressBar = (
                <ProgressBar>
                    <ProgressBar striped now={percGoalRached} key={2}/>
                    <ProgressBar striped now={percWeiRaised_BIG_num} variant='info' key={1}/>
                </ProgressBar>                
            );
        } else {
            progressBar = (
                <ProgressBar>
                    <ProgressBar striped now={percWeiRaised_BIG_num} key={1}/>
                </ProgressBar>
            );
        }
        let tokenPrice = new BigNumber(1000000000000000);
        let tokenBought = weiRaised_BIG.div(tokenPrice);
        //console.log(percGoalRached);

        return(
            <div>
                <h5>Funding Status</h5>
                <Container>
                    <Row className="justify-content-sm-center">
                        <Table bordered responsive >
                            <tbody>
                                <tr>
                                    <td colSpan="5">{progressBar}</td>
                                </tr>
                                <tr>
                                    <td>Token bought: {tokenBought.toNumber()}</td> 
                                    <td>Raised: {this.props.state.weiRaised} wei</td>
                                    <td>Goal: {this.props.state.goal} wei</td>
                                    <td>Hard Cap: {this.props.state.cap} wei</td> 
                                    <td>Goal reached: {(this.props.state.goalReached).toString()}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Row>
                </Container>

                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}

export default FundingStatus;