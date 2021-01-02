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
                    splash_screen_preference: false
                },

            }
        }
    }

    loginButtonHandler = () => {
        this.setState({ logged_in: !this.state.logged_in });
    }

    componentDidMount() {
        axiosInstance.get('/api/game-properties/math')
        .then((response) => {
             this.setState({ game_properties: response.data });
        });
    }

    splashScreenHandler = (event) => {
        axiosInstance.post('api/user_preferences/set_preference', {
            splash_screen_name: "Math",
            display_on_refresh: !event.target.value
        })
        .then((response) => {
            if (response.status === 200) {
                this.setState({
                    game_properties: {
                        splash_screen: {
                            splash_screen_preference: this.state.game_properties.splash_screen.splash_screen_preference
                        }
                    }
                })
            } else {
                console.log(response.data)
            }
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
                                <input name="splash" type="checkbox" value={this.state.game_properties.splash_screen.splash_screen_preference} onChange={this.splashScreenHandler} /> Don't show this message again.
                            </p>
                        </div>
                    ) : (null)
                    }
                    {
                        (this.state.logged_in) ?
                            (
                                <div>
                                    <Button id="logout" type='submit' className="btn btn-dark" onClick={this.loginButtonHandler}>Logout</Button>
                                </div>
                            ) :
                            (
                                <div>
                                    <Button id="login" type='submit' className="btn btn-dark" onClick={() => this.props.history.push('/login')}>Login</Button>
                                    <Button id="signup" type='submit' className="btn btn-dark" onClick={this.loginButtonHandler}>Signup</Button>
                                </div>
                            )
                    }
                </Jumbotron>
            </div>
        );
    }
}
