import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Pagination from 'react-bootstrap/Pagination';


class CrowdsalePhases extends React.Component {
    render(){

        let currentState;
        let states = ['Not Started','Started','Closed','Refunding','Beneficiary withdraw'];
        let paginationItems = [];
    
        if(this.props.state.timeToOpen > 0) {
            currentState = 0;
        } else if(this.props.state.isOpen) {
            currentState = 1;
        } else if (!this.props.state.finalized) {
            currentState = 2;
        } else if (!this.props.state.goalReached) {
            currentState = 3;
        } else {
            currentState = 4;
        }
        for (let n = 0; n <= states.length-1; n++) {
        paginationItems.push(
            <Pagination.Item key={n} active={n === currentState}>
            {states[n]}
            </Pagination.Item>,
        );
        }

        const paginationBasic = (
            <div>
              <Pagination size="lg">{paginationItems}
              </Pagination>
            </div>
          );

        return(
            <div>
                <h5>Contract Phase</h5>
                <Container>
                    <Row className="justify-content-sm-center bordered">
                    {paginationBasic}
                    </Row>
                </Container>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}

export default CrowdsalePhases;