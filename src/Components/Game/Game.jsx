import React from 'react';
import { Jumbotron, Button, Link } from 'react-bootstrap';

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
                    <h1>Welcome to Math 101!</h1>
                    <hr className="my-4"></hr>
                    <div className= "alert alert-primary">
                        <p>
                            <input type="checkbox" value="0"/> Don't show this message again.
                        </p>
                    </div>
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
                                    <a className="btn btn-dark" id="signup" href="#">Signup Page</a>
                                </div>
                            )
                    }
                </Jumbotron>
            </div>
        );
    }
}
