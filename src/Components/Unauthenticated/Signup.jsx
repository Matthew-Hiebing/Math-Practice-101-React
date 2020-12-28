import React from 'react';
import { Jumbotron, Button, } from 'react-bootstrap';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            passwordConfirmation: "",
        }
    }

    render() {
        return (
            <div>
                <form className="site-form" action="" method='POST'>
                    <input type="hidden" name="next" value="" />
                    <button type="submit" className="btn btn-dark">Signup</button>
                </form>
            </div>
        )
    }
}
