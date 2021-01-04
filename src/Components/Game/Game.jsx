import axios from 'axios';
import React from 'react';
import { Jumbotron, Button, Form } from 'react-bootstrap';
import axiosInstance from '../../helpers/axiosInstance';
import {multiplication, division, randomFunc, randomProblemGenerator} from './MathProblemGenerator';

export default class Game extends React.Component {
    constructor(props) {
        super(props);

        // this.userInput = React.createRef();

        this.state = {
            game_properties: {
                splash_screen: {
                    splash_screen_text: null,
                    splash_screen_preference: false,
                    checkbox_state: false
                },
                problem: {
                    problem_string: "Press START to begin",
                    problem_answer: null,
                    user_input: "",
                    status: "not_answered"
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

    submitHandler = (event) => {
        // Prevent form from sending.
        event.preventDefault();
    }

    startButtonHandler = (event) => {
        // Show random math problem.
        let problem = randomProblemGenerator();
        console.log(problem);
        let tempState = this.state;
        tempState.game_properties.problem.status = "not_answered"
        tempState.game_properties.problem = { ...tempState.game_properties.problem, ...problem }
        tempState.game_properties.problem.user_input = ""
        this.userInput.focus();

        this.setState(tempState);
    }

    checkButtonHandler = (event) => {
        // Check if user's answer is corrrect.
        let input = parseInt(this.state.game_properties.problem.user_input);
        let answer = parseInt(this.state.game_properties.problem.problem_answer);
        let tempState = this.state;

        if (input === answer) {
            console.log("Correct");
            tempState.game_properties.problem.status = "correct"
        } else {
            console.log("Incorrect")
            tempState.game_properties.problem.status = "incorrect"
        }

        this.setState(tempState);
    }

    answerChangeHandler = (event) => {
        // Grab the user's answer string.
        let input = event.target.value
        let tempState = this.state;
        tempState.game_properties.problem.user_input = input

        this.setState(tempState);
        console.log(input)
    }

    enterPressHandler = (event) => {
        // If the key pressed was enter
        // Execute the checkHandlerGunction
        // Else do nothing
        if ((event.key === 'Enter')) {
            this.checkButtonHandler()
        } else {

        }
    }

    sendMathResult = (event) => {
        // problem_string, problem_answer, user_input, status
        axiosInstance.post('/api/scoring/submit_score_details', {
            "math_problem": this.state.game_properties.problem.problem_string,
            "true_answer": this.state.game_properties.problem.problem_answer,
            "user_answer": this.state.game_properties.problem.user_input,
            "question_status": this.state.game_properties.problem.status
        });
        console.log(`Axios sent math_problem: ${this.state.game_properties.problem.problem_string}`);
        console.log(`Axios sent true_answer: ${this.state.game_properties.problem.problem_answer}`);
        console.log(`Axios sent user_answer: ${this.state.game_properties.problem.user_input}`);
        console.log(`Axios sent question_status: ${this.state.game_properties.problem.status}`);
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
                                <p id="math_problem">{this.state.game_properties.problem.problem_string}</p>
                                <Form.Group controlId="exampleForm.ControlInput1" >
                                        <Form.Control
                                            ref={(input) => { this.userInput = input; }}
                                            name="input"
                                            type="input"
                                            placeholder="Enter your answer here"
                                            autoComplete="off"
                                            onChange={this.answerChangeHandler}
                                            onKeyPress={this.enterPressHandler}
                                            value={this.state.game_properties.problem.user_input}
                                        />
                                </Form.Group>
                                <Button id="checkButton" type="button" className={"btn btn-lg " + (
                                        (this.state.game_properties.problem.status === "correct") ?
                                            ("btn-success") :
                                            (this.state.game_properties.problem.status == "incorrect") ?
                                                ("btn-danger") :
                                                ("btn-primary")
                                )} onClick={this.checkButtonHandler}>
                                        {
                                            (this.state.game_properties.problem.status === "correct") ?
                                                ("Correct") :
                                                (this.state.game_properties.problem.status == "incorrect") ?
                                                    ("Incorrect") :
                                                    ("Check")
                                        }
                                </Button>
                                <p>Graph of results will show here.  Graph data is generated as the user plays the game.</p>
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
