import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Components/Home/Home';
import Game from './Components/Game/Game';
import Scores from './Components/Scores/Scores';
import Login from './Components/Unauthenticated/Login';
import Signup from './Components/Unauthenticated/Signup';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Container>
            {
              (false) ? // if logged in see below
                (
                  <div>
                    <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
                      <div className="container">
                        <Link className="navbar-brand" to="/">Home</Link>
                        <Link className="navbar-brand" to="/game">Game</Link>
                        <Link className="navbar-brand" to="/scores">Scores</Link>
                        <Link className="navbar-brand" to="/admin">Admin</Link>
                      </div>
                    </Navbar>

                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route path="/game">
                        <Game {...this.state} />
                      </Route>
                      <Route path="/scores">
                        <Scores {...this.state} />
                      </Route>
                    </Switch>
                  </div>
                ) : // else show
                (
                  <div>
                    <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
                      <div className="container">
                        <Link className="navbar-brand" to="/">Home</Link>
                      </div>
                    </Navbar>

                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route path="/login" component={Login} />
                      <Route path="/signup" component={Signup} />
                    </Switch>
                  </div>
                )
            }
          </Container>
        </div>
      </Router>
    );
  }

}

export default App;
