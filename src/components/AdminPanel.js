import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


class AdminPanel extends React.Component {

    onFinalize(e) {
        e.preventDefault();
        this.props.finalize();
    }

    render(){

        return(
            <div>
                <h5>Finalize</h5>
                <Container>
                    <Row className="justify-content-sm-center bordered">
                        <Button variant="outline-primary" type="submit" onClick={(e) => this.onFinalize(e)}>Finalize contract</Button>
                    </Row>
                </Container>
                <br/>
                <br/>
                <br/>

                <h5>
                Instalment Plan
                </h5>
                These are the instalment details that will be withdrawn by the beneficiary at their due date. 
                <br/>
                <br/>
                <Container>
                    <Row className="justify-content-sm-center">
                        <Table striped bordered responsive >
                            <thead>
                                <tr>
                                    <th>Instalment #</th>
                                    <th>Amount</th>
                                    <th>due date</th>
                                    <th>time left</th>
                                    <th>status</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                    <td>1</td>
                                    <td> (amount) </td>
                                    <td> (due date) </td>
                                    <td> (time left) </td>
                                    <td> (status) </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td> (amount) </td>
                                    <td> (due date) </td>
                                    <td> (time left) </td>
                                    <td> (status) </td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td> (amount) </td>
                                    <td> (due date) </td>
                                    <td> (time left) </td>
                                    <td> (status) </td>
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

export default AdminPanel;