import React from 'react';
import { Jumbotron, Button, } from 'react-bootstrap';
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

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>Welcome to Math 101!</h1>
                    <hr className="my-4"></hr>
                    {
                        (this.state.game_properties.splash_screen.splash_screen_preference) ?
                    (
                        <div className= "alert alert-primary">
                            <p>{this.state.game_properties.splash_screen.splash_screen_text}</p>
                            <p>
                                <input name="splash" type="checkbox" checked={this.state.game_properties.splash_screen.checkbox_state} onChange={this.splashScreenHandler} /> Don't show this message again.
                            </p>
                        </div>
                    ) : (null)
                    }
                    {
                    (this.props.is_logged_in) ? // if logged in show logout button.
                        (
                            <div>
                                <Button id="logout" type='submit' className="btn btn-dark" onClick={() => this.props.history.push('/logged-out')}>Logout</Button>
                            </div>
                        ) : // if logged in show login button.
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
