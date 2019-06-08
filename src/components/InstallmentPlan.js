import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';


class InstallmentPlan extends React.Component {
    render(){
        let currentTime = new Date();
        let withdrawn_stat1 = (this.props.state.installment_1.withdrawn).toString();
        let withdrawn_stat2 = (this.props.state.installment_2.withdrawn).toString();
        let withdrawn_stat3 = (this.props.state.installment_3.withdrawn).toString();
        let amount1 = this.props.state.installment_1.amount;
        let amount2 = this.props.state.installment_2.amount;
        let amount3 = this.props.state.installment_3.amount;
        let dueTime1_unix = this.props.state.installment_1.dueTime;
        let dueTime2_unix = this.props.state.installment_2.dueTime;
        let dueTime3_unix = this.props.state.installment_3.dueTime;
        let dueTime1 = this.props.timeConverter(dueTime1_unix);
        let dueTime2 = this.props.timeConverter(dueTime2_unix);
        let dueTime3 = this.props.timeConverter(dueTime3_unix);  
        let timeLeft1_uinx = Math.ceil(dueTime1_unix - (currentTime/1000));
        let timeLeft2_uinx = Math.ceil(dueTime2_unix - (currentTime/1000));
        let timeLeft3_uinx = Math.ceil(dueTime3_unix - (currentTime/1000));


        return(
            <div>
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
                                    <td> {amount1} wei</td>
                                    <td> {dueTime1} </td>
                                    <td> {timeLeft1_uinx} sec</td>
                                    <td> {withdrawn_stat1} </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td> {amount2} wei</td>
                                    <td> {dueTime2} </td>
                                    <td> {timeLeft2_uinx} sec</td>
                                    <td> {withdrawn_stat2} </td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td> All the rest </td>
                                    <td> {dueTime3} </td>
                                    <td> {timeLeft3_uinx} sec</td>
                                    <td> {withdrawn_stat3} </td>
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

export default InstallmentPlan;