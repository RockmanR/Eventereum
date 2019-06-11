import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';


class InstalmentPlan extends React.Component {
    render(){
        let currentTime = new Date();

        let withdrawn_stat1;
        let withdrawn_stat2;
        let withdrawn_stat3;
        let amount1;
        let amount2;
        // the third amount  
        //let amount3 = this.props.state.instalment_3.amount;
        let dueTime1_unix;
        let dueTime2_unix;
        let dueTime3_unix;
        let dueTime1;
        let dueTime2;
        let dueTime3;  
        let timeLeft1_uinx;
        let timeLeft2_uinx;
        let timeLeft3_uinx;

        // I'm keeping the variable difinitions inside this 'if' statement to make sure the state in DApp.js gets updated before they gets assigned here. 
        // otherwise we get an error that the 'instalment_x' object is undifined.
        // I'm sure there is a better solution for this, but I'm bad at React at the moment
        if (this.props.state.instalment_1 && this.props.state.instalment_2 && this.props.state.instalment_3) {
            withdrawn_stat1 = (this.props.state.instalment_1.withdrawn).toString();
            withdrawn_stat2 = (this.props.state.instalment_2.withdrawn).toString();
            withdrawn_stat3 = (this.props.state.instalment_3.withdrawn).toString();
            amount1 = this.props.state.instalment_1.amount;
            amount2 = this.props.state.instalment_2.amount;
            // the third amount  
            //let amount3 = this.props.state.instalment_3.amount;
            dueTime1_unix = this.props.state.instalment_1.dueTime;
            dueTime2_unix = this.props.state.instalment_2.dueTime;
            dueTime3_unix = this.props.state.instalment_3.dueTime;
            dueTime1 = this.props.timeConverter(dueTime1_unix);
            dueTime2 = this.props.timeConverter(dueTime2_unix);
            dueTime3 = this.props.timeConverter(dueTime3_unix);  
            timeLeft1_uinx = Math.ceil(dueTime1_unix - (currentTime/1000));
            timeLeft2_uinx = Math.ceil(dueTime2_unix - (currentTime/1000));
            timeLeft3_uinx = Math.ceil(dueTime3_unix - (currentTime/1000));
        } else {
            console.log('The instalment details are not populated yet...')
        }



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

export default InstalmentPlan;