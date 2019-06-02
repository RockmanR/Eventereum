// this is a configuraiton button to be DELETED later by replacing it with a better configuration right after the deployment
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


class ConfigButton extends React.Component {

    onContractConfig(e){
        e.preventDefault();
        this.props.contractConfig();
    }

    render(){

        return(
            <div>
                <h5>config button</h5>
                <Container>
                    <Row className="justify-content-sm-center bordered">
                        <Button variant="outline-primary" type="submit" onClick={(e) => this.onContractConfig(e)}>contract config</Button>
                    </Row>
                </Container>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}

export default ConfigButton;
