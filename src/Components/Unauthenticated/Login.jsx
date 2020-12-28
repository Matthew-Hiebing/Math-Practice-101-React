import React from 'react';

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
            <h1>Login Page</h1>
        )
    }
}
