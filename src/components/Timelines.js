import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Table from 'react-bootstrap/Table';

class Timelines extends React.Component {
    render(){

        let percTimeToOpen = (this.props.state.timeToOpen/this.props.state.contractPeriod)*100;
        let percTimeToClose = (this.props.state.timeToClose/this.props.state.contractPeriod)*100;
        let closingTime = this.props.timeConverter(this.props.state.closingTime);
        let openingTime = this.props.timeConverter(this.props.state.openingTime);
        let timeToClose = this.props.state.timeToClose;
        let timeToOpen = this.props.state.timeToOpen;

        const progressInstance = (
          <ProgressBar>
            <ProgressBar striped now={percTimeToClose} variant="success" key={1}/>
            <ProgressBar striped now={percTimeToOpen} variant="warning" key={2}/>
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
                                    <td colSpan="4">{progressInstance}</td>
                                </tr>
                                <tr>
                                    <td>Closing Time: {closingTime}</td>
                                    <td>Time left to close: {timeToClose} sec</td>
                                    <td>Opening Time: {openingTime}</td>
                                    <td>Time left to open: {timeToOpen} sec</td>
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