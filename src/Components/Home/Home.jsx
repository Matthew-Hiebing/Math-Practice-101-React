import React from 'react';
import {Jumbotron, Button, } from 'react-bootstrap';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return(
            <div>
                <Jumbotron>
                    <h1>Welcome!</h1>
                    <hr className="my-2"></hr>
                    <p>
                        Welcome to the homepage.  If you haven't already signed up for an account, please do so.  If you are not already logged in, please login to gain full access to the site.

                        If you want to test the game without creating your own set of credentials here is a username and password you can use.
                    </p>
                    <p>Username: userTest</p>
                    <p>Password: testPassword3456</p>
                    {
                        (this.props.is_logged_in) ?
                        (
                            <div>
                                <Button
                                    id="logout"
                                    type='submit'
                                    className="btn btn-dark"
                                    onClick={() => this.props.history.push('/logged-out')}>Logout
                                </Button>
                            </div>
                        ) :
                        (
                            <div>
                                <Button
                                    id="login"
                                    type='submit'
                                    className="btn btn-dark"
                                    onClick={() => this.props.history.push('/login')}>Login
                                </Button>
                                <Button
                                    id="signup"
                                    type='submit'
                                    className="btn btn-dark"
                                    onClick={() => this.props.history.push('/signup')}>Signup
                                </Button>
                            </div>
                        )
                    }
                </Jumbotron>
            </div>
        );
    }
}
