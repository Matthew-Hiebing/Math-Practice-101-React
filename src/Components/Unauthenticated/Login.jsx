import axiosInstance from '../../helpers/axiosInstance';
import React from 'react';
import { Button, Form } from 'react-bootstrap';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        }
    }

    inputFieldHandler = (event) => {
        let tempState = this.state;
        tempState[event.target.name] = event.target.value;

        this.setState(tempState);
    }

    loginButtonHandler = (event) => {
        event.preventDefault();
        axiosInstance.post('token/obtain/', {
            username: this.state.username,
            password: this.state.password
        })
        .then((response) => {
            // Store the keys
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            // Navigate to the home page
            this.props.history.push('/');
            this.props.loginHandler();
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render () {
        return (
            <div>
                <Form>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control name="username" type="input" placeholder="Enter your username here" onChange={this.inputFieldHandler} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Enter your password here" onChange={this.inputFieldHandler} />
                    </Form.Group>

                    <Button className="btn btn-dark" type="submit" onClick={this.loginButtonHandler}>Login</Button>
                </Form>
            </div>
        )
    }
}
