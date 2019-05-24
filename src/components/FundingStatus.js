import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Table from 'react-bootstrap/Table';

class FundingStatus extends React.Component {
    render(){
        let percGoalReached = this.props.state.contractBalance/this.props.state.cap;
        //let percAboveGoal = this.props.state.timeToClose/this.props.state.contractPeriod;  // <ProgressBar striped now={percAboveGoal} variant="info" key={2}/>
        
        const progressInstance = (
          <ProgressBar>
            <ProgressBar striped now={percGoalReached} key={1}/>

          </ProgressBar>
        );

        return(
            <div>
                <h5>Funding Status</h5>
                <Container>
                    <Row className="justify-content-sm-center">
                        <Table bordered responsive >
                            <tbody>
                                <tr>
                                    <td colSpan="4">{progressInstance}</td>
                                </tr>
                                <tr>
                                    <td>Contract balance: {this.props.state.contractBalance}</td>
                                    <td>Goal: {this.props.state.goal}</td>
                                    <td>Goal reached: {(this.props.state.goalReached).toString()}</td>
                                    <td>Hard Cap: {this.props.state.cap}</td>
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