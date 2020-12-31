import React from 'react';
import { Jumbotron, Button, } from 'react-bootstrap';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            logged_in: false
        }
    }

    loginButtonHandler = () => {
        this.setState({ logged_in: !this.state.logged_in });
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>Logged In</h1>
                    <hr className="my-2"></hr>
                    <p>You successfully logged in!  Head over to the game page to start playing.</p>
                    <Button className="btn btn-dark" type="submit" onClick={this.loginButtonHandler}>Login</Button>
                </Jumbotron>
            </div>
        );
    }
}
