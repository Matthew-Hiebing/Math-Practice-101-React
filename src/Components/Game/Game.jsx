import React from 'react';
import { Jumbotron, Button, Form } from 'react-bootstrap';
import axiosInstance from '../../helpers/axiosInstance';
import {randomProblemGenerator} from './MathProblemGenerator';
import GameChart from './GameChart';

export default class Game extends React.Component {
    constructor(props) {
        super(props);

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
                },
                chartData: {
                    correctCounter: 0,
                    incorrectCounter: 0,
                    totalCounter: 0
                },
                startButtonState: {
                    value: false
                },
                checkButtonState: {
                    value: true
                },
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

    startButtonHandler = () => {
        // Show random math problem.
        let problem = randomProblemGenerator();
        // console.log(problem);
        let tempState = this.state;
        tempState.game_properties.problem.status = "not_answered"
        tempState.game_properties.problem = { ...tempState.game_properties.problem, ...problem }
        tempState.game_properties.problem.user_input = ""
        this.userInput.focus();
        tempState.game_properties.startButtonState.value = true
        tempState.game_properties.checkButtonState.value = false

        this.setState(tempState);
    }

    checkButtonHandler = () => {
        // Check if user's answer is corrrect.
        let input = parseInt(this.state.game_properties.problem.user_input);
        let answer = parseInt(this.state.game_properties.problem.problem_answer);
        let tempState = this.state;

        console.log(typeof this.state.game_properties.problem.user_input)

        if (input === answer) {
            tempState.game_properties.problem.status = "correct"
            this.tallyBarChartData("correct")
        } else {
            tempState.game_properties.problem.status = "incorrect"
            this.tallyBarChartData("incorrect")
        }
        tempState.game_properties.startButtonState.value = false
        tempState.game_properties.checkButtonState.value = true

        this.setState(tempState, this.sendMathResults());
    }

    answerChangeHandler = (event) => {
        // Grab the user's answer string.
        let input = event.target.value
        let tempState = this.state;
        tempState.game_properties.problem.user_input = input

        this.setState(tempState);
    }

    enterPressHandler = (event) => {
        if ((event.key === 'Enter')) {
            this.checkButtonHandler()
        }
    }

    tallyBarChartData = (status) => {
        // Tally user's current math results.  Data is wiped on refresh.
        let tempState = this.state;

        switch (status) {
            case "incorrect":
                tempState.game_properties.chartData.incorrectCounter += 1;
                break;
            case "correct":
                tempState.game_properties.chartData.correctCounter += 1;
                break;
            default:
                break;
        }
        tempState.game_properties.chartData.totalCounter += 1;

        this.setState(tempState);
    }

    sendMathResults = () => {
        axiosInstance.post('/api/scoring/submit_score_details', {
            "math_problem": this.state.game_properties.problem.problem_string,
            "true_answer": this.state.game_properties.problem.problem_answer,
            "user_answer": this.state.game_properties.problem.user_input,
            "question_status": this.state.game_properties.problem.status
        });
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
                                <input
                                name="splash"
                                type="checkbox"
                                checked={this.state.game_properties.splash_screen.checkbox_state}
                                onChange={this.splashScreenHandler}
                                /> Don't show this message again.
                            </p>
                        </div>
                    ) : (null) // if user does not want to see spashscreen show nothing.
                    }

                    {
                    (this.props.is_logged_in) ? // if logged in show logout button.
                        (
                            <div>
                                <Button
                                    type="button"
                                    disabled={this.state.game_properties.startButtonState.value}
                                    className="btn btn-primary btn-lg"
                                    onClick={this.startButtonHandler}>Start
                                </Button>
                                <p>{this.state.game_properties.problem.problem_string}</p>
                                <Form.Group controlId="exampleForm.ControlInput1" >
                                        <Form.Control
                                            placeholder="Enter your answer here"
                                            type="input"
                                            autoComplete="off"
                                            value={this.state.game_properties.problem.user_input}
                                            ref={(input) => {this.userInput = input}}
                                            onChange={this.answerChangeHandler}
                                            // onKeyPress={this.enterPressHandler}
                                            onSubmit={this.submitHandler}
                                        />
                                </Form.Group>
                                <Button
                                type="button"
                                disabled={this.state.game_properties.checkButtonState.value}
                                className={"btn btn-lg " + (
                                    (this.state.game_properties.problem.status === "correct") ?
                                        ("btn-success") :
                                    (this.state.game_properties.problem.status === "incorrect") ?
                                        ("btn-danger") :
                                        ("btn-primary")
                                )}
                                onClick={this.checkButtonHandler}>
                                    {
                                    (this.state.game_properties.problem.status === "correct") ?
                                        ("Correct") :
                                    (this.state.game_properties.problem.status === "incorrect") ?
                                        ("Incorrect") :
                                        ("Check")
                                    }
                                </Button>
                                {/* <p>Correct: {this.state.game_properties.chartData.correctCounter}</p>
                                <p>Incorrect: {this.state.game_properties.chartData.incorrectCounter}</p>
                                <p>Total: {this.state.game_properties.chartData.totalCounter}</p> */}
                                <div>
                                    <GameChart chartData={this.state.game_properties.chartData} />
                                </div>
                                <br/>
                                <div>
                                    <Button
                                    type="button"
                                    className="btn btn-dark"
                                    onClick={() => this.props.history.push('/logged-out')}>Logout
                                    </Button>
                                </div>
                            </div>
                        ) : // if not logged in show login button.
                        (
                            <div>
                                <Button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => this.props.history.push('/login')}>Login
                                </Button>
                            </div>
                        )
                    }
                </Jumbotron>
            </div>
        );
    }
}
