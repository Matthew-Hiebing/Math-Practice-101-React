import React from 'react';
import { Jumbotron, Button, } from 'react-bootstrap';

export default class SignedIn extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>Signed In</h1>
                    <hr className="my-2"></hr>
                    <p>You successfully created an account.  Please login to begin playing the game.</p>
                    <Button id="login" type='submit' className="btn btn-dark" onClick={this.loginButtonHandler}>Login</Button>
                </Jumbotron>
            </div>
        );
    }
}
