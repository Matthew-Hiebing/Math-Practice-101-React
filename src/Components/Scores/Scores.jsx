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
                    <h1>Scores and Results Analysis</h1>
                    <hr className="my-2"></hr>
                    <p>
                        Below is a representation of your math game results.
                    </p>
                    {
                        (this.state.logged_in) ?
                            (
                                <div>
                                    <Button id="logout" type='submit' className="btn btn-dark" onClick={this.loginButtonHandler}>Logout</Button>
                                </div>
                            ) :
                            (
                                <div>
                                    <Button id="login" type='submit' className="btn btn-dark" onClick={this.loginButtonHandler}>Login</Button>
                                    <Button id="signup" type='submit' className="btn btn-dark" onClick={this.loginButtonHandler}>Signup</Button>
                                </div>
                            )
                    }
                </Jumbotron>
            </div>
        );
    }
}
