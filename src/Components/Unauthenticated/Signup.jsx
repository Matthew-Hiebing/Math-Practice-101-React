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

        //this.inputFieldHandler = this.inputFieldHandler.bind(this);
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

    submitButtonHandler() {
        axios.post('/accounts/signup/', {
            username
        })
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control name="username" type="input" placeholder="Enter a username" onChange={this.inputFieldHandler} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" onChange={this.inputFieldHandler} isValid={this.state.passwordsMatch} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPasswordConfirmation">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control name="passwordConfirmation" type="password" placeholder="Password confirmation" onChange={this.inputFieldHandler} isValid={this.state.passwordsMatch} />
                        <Form.Text className="text-muted">Passwords don't match</Form.Text>
                    </Form.Group>

                    <Button className="btn btn-dark" type="submit">Submit</Button>
                </Form>
            </div>
        )
    }
}
