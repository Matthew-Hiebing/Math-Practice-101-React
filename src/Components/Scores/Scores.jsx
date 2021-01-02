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
                </Jumbotron>
            </div>
        );
    }
}
