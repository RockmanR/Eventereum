import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Pagination from 'react-bootstrap/Pagination';


class CrowdsalePhases extends React.Component {
    render(){

        let currentState = this.props.state.currentState;
        let states = ['Not Started','Started','Closed','Finalized','Refunding','Fund Withdrawn'];
        let paginationItems = [];
    
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