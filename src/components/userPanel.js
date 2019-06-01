import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Token from '../embarkArtifacts/contracts/EventCrowdTokenImpl';
import Crowdsale from '../embarkArtifacts/contracts/EventCrowdCrowdsaleImpl';

 

class UserPanel extends React.Component {

    voteToReject() {
        Token.methods.voteToReject().send().then( response => {
            console.log('voteToReject respons: ',response);
        })
    }

    undoVoteToReject() {
        Token.methods.undoVoteToReject().send().then( response => {
            console.log('undoVoteToReject respons: ',response);
        })
    }

    buyTokens(e) {
        e.preventDefault();
        let address = this.props.state.web3Account0;
        let amount = 10000000000;
        Crowdsale.methods.buyTokens(address).send({from: address, value: amount}).then( response => {
            //console.log('buyToken respons: ',response);
            console.log('buyToken respons: ');
        })
    }

    render(){

        return(
            <div>
                <h5>You are currently have:</h5>
                <h2>{this.props.state.tokenBalance} Tokens</h2>
                <br/>
                <br/>
                <br/>
                <h5>Make sure you are using the right account:</h5>
                <Container>
                    <Row className="justify-content-sm-center bordered">
                        <Table striped bordered responsive >
                            <thead>
                                <tr>
                                    <th>Your selected address</th>
                                    <th>Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.props.state.web3Account0}</td>
                                    <td>{this.props.state.web3Account0_bal}</td>
                                </tr>
                            </tbody>
                        </Table>                    
                    </Row>
                </Container>
                <br/>
                <br/>
                <br/>
                <h5>Would you like to buy Tokens?</h5>

                <Container>
                    <Row className="justify-content-sm-center bordered">
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} >
                                    <Form.Control placeholder="Number of Token" />
                                </Form.Group>
                                <Form.Group as={Col} >
                                    <Form.Control plaintext readOnly defaultValue="(amount) ether" />
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={(e)=>{this.buyTokens(e)}}>Buy Token</Button>
                            </Form.Row>
                        </Form>
                    </Row>
                </Container>
                <br/>
                <br/>
                <br/>
                <h5>Other controls</h5>
                <Container>
                    <Row className="justify-content-sm-center bordered">
                        <Table bordered responsive >
                            <tbody>
                            <tr>
                                    <td>Instalment plan</td>
                                    <td><Button variant="outline-danger" type="submit">voteToReject</Button> <Button variant="outline-primary" type="submit">undoVoteToReject</Button></td>
                                </tr>
                                <tr>
                                    <td>Get refund: </td>
                                    <td><Button variant="outline-primary" type="submit">Refund</Button></td>
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

export default UserPanel;