import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

class AdminPanel extends React.Component {

    onFinalize(e) {
        e.preventDefault();
        this.props.finalize();
    }

    onReleaseInstallment(e) {
        e.preventDefault();
        this.props.releaseInstallment();
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
                <h5>Withdraw installment</h5>
                <Container>
                    <Row className="justify-content-sm-center bordered">
                        <Button variant="outline-primary" type="submit" onClick={(e) => this.onReleaseInstallment(e)}>Release Installment</Button>
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