import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Table from 'react-bootstrap/Table';

class Timelines extends React.Component {
    render(){
        let percTimeToStart = this.props.state.timeToStart/this.props.state.contractPeriod;
        let percTimeToClose = this.props.state.timeToClose/this.props.state.contractPeriod;
        
        const progressInstance = (
          <ProgressBar>
            <ProgressBar striped now={percTimeToStart} variant="success" key={1}/>
            <ProgressBar striped now={percTimeToClose} variant="warning" key={2}/>
          </ProgressBar>
        );

        return(
            <div>
                <h5>Contract timelines</h5>
                <Container>
                    <Row className="justify-content-sm-center">
                        <Table bordered responsive >
                            <tbody>
                                <tr>
                                    <td colSpan="2">{progressInstance}</td>
                                </tr>
                                <tr>
                                    <td>Time left to close: {this.props.state.timeToClose}</td>
                                    <td>Time left to start: {this.props.state.timeToStart}</td>
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

export default Timelines;