import React from 'react';
import {Container, Navbar} from 'react-bootstrap';
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
              (false) ?
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
                      <Route exact path="/">
                        <Home {...this.state} />
                      </Route>
                      <Route path="/game">
                        <Game {...this.state} />
                      </Route>
                      <Route path="/scores">
                        <Scores {...this.state} />
                      </Route>
                    </Switch>
                </div>
              ) :
              (
                <div>
                    <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
                      <div className="container">
                        <Link className="navbar-brand" to="/">Home</Link>
                      </div>
                    </Navbar>

                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route path="/login">
                        <Login />
                      </Route>
                      <Route path="/signup">

                      </Route>
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
