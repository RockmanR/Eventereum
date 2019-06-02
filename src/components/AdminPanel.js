import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


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
            </div>
        )
    }
}

export default AdminPanel;