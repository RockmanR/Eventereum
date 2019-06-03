import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


class UserPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: ''        
        }
    }
    
    onBuyTokens(e) {
        e.preventDefault();
        this.props.buyTokens(this.state.amount);
    }

    onChange(e) {
        this.setState({
            amount: e.target.value
        })
    }

    onWithdrawTokens(e) {
        e.preventDefault();
        this.props.withdrawTokens();
    }

    onClaimRefund(e) {
        e.preventDefault();
        this.props.claimRefund();
    }

    onVoteToReject(e) {
        e.preventDefault();
        this.props.voteToReject();
    }

    onUndoVoteToReject(e) {
        e.preventDefault();
        this.props.undoVoteToReject();
    }

    render(){

        return(
            <div>
                <h5>You have bought:</h5>
                <h2>{this.props.state.tokenBought} Tokens</h2>
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
                                    <Form.Control placeholder="Number of Token" onChange={e => this.onChange(e)}/>
                                </Form.Group>
                                <Form.Group as={Col} >
                                    <Form.Control plaintext readOnly defaultValue="(amount) ether" />
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={e => this.onBuyTokens(e)}>Buy Token</Button>
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
                                    <td>Withdraw tokens: </td>
                                    <td>
                                        <Form>
                                            <Form.Row>
                                                <Form.Group as={Col} >
                                                    <Button variant="outline-primary" type="submit" onClick={e => this.onWithdrawTokens(e)}>Withdraw Tokens</Button>
                                                </Form.Group>
                                                <Form.Group as={Col} >
                                                    <Form.Control plaintext readOnly defaultValue="Tokens under control: " />
                                                </Form.Group>
                                                <Form.Group as={Col} >
                                                    <Form.Control plaintext readOnly defaultValue={this.props.state.balanceOf} />
                                                </Form.Group>
                                            </Form.Row>
                                        </Form>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Get refund: </td>
                                    <td><Button variant="outline-primary" type="submit" onClick={e => this.onClaimRefund(e)}>Claim refund</Button></td>
                                </tr>
                                <tr>
                                    <td>Instalment plan</td>
                                    <td>
                                        <Form>
                                            <Form.Row>
                                                <Form.Group as={Col} >
                                                    <Button variant="outline-danger" type="submit" onClick={e => this.onVoteToReject(e)}>voteToReject</Button>
                                                </Form.Group>
                                                <Form.Group as={Col} >
                                                    <Button variant="outline-secondary" type="submit" onClick={e => this.onUndoVoteToReject(e)}>undoVoteToReject</Button>
                                                </Form.Group>
                                                <Form.Group as={Col} >
                                                    <Form.Control plaintext readOnly defaultValue="Current vote: " />
                                                </Form.Group>
                                                <Form.Group as={Col} >
                                                    <Form.Control plaintext readOnly defaultValue={this.props.state.myVote} />
                                                </Form.Group>
                                            </Form.Row>
                                        </Form>
                                    </td>
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