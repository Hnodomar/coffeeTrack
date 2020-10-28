import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './Style.css';
import Employee from '../Employee/Employee';
import Home from '../Home/Home';
import Menu from '../Menu/Menu';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <Link to="/" className="logo">
              coffeeTrack
            </Link>
          </header>
            <Route exact path="/" component={Home} />
            <Route path="/menus/:id" component={Menu} />
            <Route path="/employees/:id" component={Employee} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
