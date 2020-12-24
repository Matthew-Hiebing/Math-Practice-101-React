import React from 'react';
import {Container, Navbar} from 'react-bootstrap';
import Home from './Components/Home/Home';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div>
        <Container>
          <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
              <a className="navbar-brand" href="/">Home</a>
              <a className="navbar-brand" href="/game">Game</a>
              <a className="navbar-brand" href="/scores">Scores</a>
              <a className="navbar-brand" href="/admin">Admin</a>
            </div>
          </Navbar>
          <Home {...this.state} />

        </Container>
      </div>
    );
  }

}

export default App;
