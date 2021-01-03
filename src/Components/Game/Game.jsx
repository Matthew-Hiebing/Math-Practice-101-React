import React from 'react';
import { Jumbotron, Button, Form } from 'react-bootstrap';
import axiosInstance from '../../helpers/axiosInstance';

export default class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            game_properties: {
                splash_screen: {
                    splash_screen_text: null,
                    splash_screen_preference: false,
                    checkbox_state: false
                }
            }
        }
    }

    componentDidMount() {
        axiosInstance.get('/api/game-properties/math')
        .then((response) => {
            let tempState = this.state;
            tempState.game_properties.splash_screen.splash_screen_text = response.data.splash_screen.splash_screen_text;
            tempState.game_properties.splash_screen.splash_screen_preference = response.data.splash_screen.splash_screen_preference;

            this.setState(tempState);
        });
    }

    loginButtonHandler = () => {
        this.setState({ logged_in: !this.state.logged_in });
    }

    splashScreenHandler = (event) => {
        let tempState = this.state;
        tempState.game_properties.splash_screen.checkbox_state = event.target.checked;

        this.setState(tempState);

        axiosInstance.post('api/user_preferences/set_preference', {
            splash_screen_name: "Math",
            display_on_refresh: !this.state.game_properties.splash_screen.checkbox_state
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    submitHandler(event) {
        // Prevent enter key from refreshing page.
        event.preventDefault();
    }

    startButtonHandler(event) {
        // Show random math problem.
    }

    checkButtonHandler(event) {
        // Check if user's answer is corrrect.
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>Welcome to Math 101!</h1>
                    <hr className="my-4"></hr>
                    {
                    (this.state.game_properties.splash_screen.splash_screen_preference) ? // if user wants to see splash screen show splash screen.
                    (
                        <div className= "alert alert-primary">
                            <p>{this.state.game_properties.splash_screen.splash_screen_text}</p>
                            <p>
                                <input name="splash" type="checkbox" checked={this.state.game_properties.splash_screen.checkbox_state} onChange={this.splashScreenHandler} /> Don't show this message again.
                            </p>
                        </div>
                    ) : (null) // if user does not want to see spashscreen show nothing.
                    }

                    {
                    (this.props.is_logged_in) ? // if logged in show logout button.
                        (
                            <div>
                                <Button id="startButton" type="button" className="btn btn-primary btn-lg" onClick={this.startButtonHandler}>Start</Button>
                                <p id="math_problem">Problem will show here.</p>
                                <Form onSubmit={this.submitHandler}>
                                    <Form.Group controlId="exampleForm.ControlInput1" >
                                        <Form.Control name="input" type="input" placeholder="Enter your answer here" autoComplete="off"/>
                                    </Form.Group>
                                </Form>
                                <Button id="checkButton" type="button" className="btn btn-primary btn-lg" onClick={this.checkButtonHandler}>Check</Button>
                                <p>Results graph goes here</p>
                                <Button id="logout" type='submit' className="btn btn-dark" onClick={() => this.props.history.push('/logged-out')}>Logout</Button>
                            </div>
                        ) : // if not logged in show login button.
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
