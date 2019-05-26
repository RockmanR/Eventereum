import React from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class AddressDashboard extends React.Component {
    render(){

        let statusMinter;
        let statusDepositer;
        let statusCrowdsale;

        if(this.props.state.isMinter){
            statusMinter = <a>Ready 👍</a>;
        } else {
            statusMinter = <font color="red">Crowdsale contract does not have a minter rights yet</font>
        }
        if(this.props.state.isDepositer){
            statusDepositer = <a>Ready 👍</a>;
        } else {
            statusDepositer = <font color="red">Crowdsale contract does not have a depositer rights yet</font>
        }
        if(this.props.state.isOpen){
            statusCrowdsale = <a>Ready 👍</a>;
        } else {
            if(this.props.state.timeToOpen > 0){
                statusCrowdsale = <a>Crowdsale contract is not opened yet</a>;
            }
            statusCrowdsale = <a>Crowdsale contract is closed</a>
        }

        return(
            <div>
                <h3>
                Relevent Addresses
                </h3>
                These are the addresses of all deployed contracts and the beneficiary, for transpaerncy and integrity. 
                <br/>
                <br/>
                <Container>
                    <Row className="justify-content-sm-center">
                        <Table striped bordered responsive >
                            <thead>
                                <tr>
                                    <th>Address type</th>
                                    <th>Contract Address</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Token contract</td>
                                    <td> {this.props.state.TokenAddr} </td>
                                    <td> {statusMinter} </td>
                                </tr>
                                <tr>
                                    <td>Crowdsale contract</td>
                                    <td> {this.props.state.CrowdsaleAddr} </td>
                                    <td> {statusCrowdsale} </td>
                                </tr>
                                <tr>
                                    <td>Instalment-Plan contract</td>
                                    <td> {this.props.state.InsPlanAddr} </td>
                                    <td> {statusDepositer} </td>
                                </tr>
                                <tr>
                                    <td>Beneficiary address</td>
                                    <td> {this.props.state.CrowdsaleAddr} </td>
                                    <td> (later) </td>
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

export default AddressDashboard;