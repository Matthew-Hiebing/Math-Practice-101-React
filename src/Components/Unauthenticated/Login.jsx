import React from 'react';
import { Jumbotron, Button, } from 'react-bootstrap';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        }
    }

    render () {
        return (
            <div>
                <form className="site-form" action="" method='POST'>
                    <input type="hidden" name="next" value=""/>
                    <button type="submit" className="btn btn-dark">Login</button>
                </form>
            </div>
        )
    }
}
