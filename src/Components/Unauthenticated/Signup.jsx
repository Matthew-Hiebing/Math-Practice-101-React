import React from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';


export default class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            passwordConfirmation: "",
            passwordsMatch: false
        }
    }

    inputFieldHandler = (event) => {
        let tempState = this.state;
        tempState[event.target.name] = event.target.value;

        if (event.target.name.includes('password')) {
            this.passwordMatchCheck();
        }

        this.setState(tempState);
    }

    passwordMatchCheck = () => {
        let tempState = this.state;

        if (this.state.password === this.state.passwordConfirmation) {
            tempState.passwordsMatch = true;
            this.setState(tempState);
        } else {
            tempState.passwordsMatch = false;
            this.setState(tempState);
        }
    }

    submitButtonHandler = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/accounts/signup/', {
            username: this.state.username,
            password: this.state.password
        })
        .then((response) => {
            console.log(response);
            if (response.status === 201) {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                // this.props.history.push('/')
                window.location.href = '/';
            } else {
                console.log(response.data);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control name="username" type="input" placeholder="Enter your username here" onChange={this.inputFieldHandler} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Enter your password here" onChange={this.inputFieldHandler} isValid={this.state.passwordsMatch} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPasswordConfirmation">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control name="passwordConfirmation" type="password" placeholder="Enter your password here" onChange={this.inputFieldHandler} isValid={this.state.passwordsMatch} />
                        <Form.Text className="text-muted">Passwords don't match</Form.Text>
                    </Form.Group>

                    <Button className="btn btn-dark" type="submit" onClick={this.submitButtonHandler}>Submit</Button>
                </Form>
            </div>
        )
    }
}
