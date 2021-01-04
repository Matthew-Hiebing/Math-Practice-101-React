import React from 'react';
import { Jumbotron, Button, } from 'react-bootstrap';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
                    <p>
                        Graph of results will show here.  Data for graph is pulled from database.
                    </p>
                    {
                        (this.props.is_logged_in) ? // if logged in show logout button.
                            (
                                <div>
                                    <Button id="logout" type='submit' className="btn btn-dark" onClick={() => this.props.history.push('/logged-out')}>Logout</Button>
                                </div>
                            ) : // if logged in show login button.
                            (
                                <div>
                                    <Button id="login" type='submit' className="btn btn-dark" onClick={() => this.props.history.push('/login')}>Login</Button>
                                </div>
                            )
                    }
                </Jumbotron>
            </div>
        );
    }
}
