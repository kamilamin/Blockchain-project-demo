import React, { Component } from 'react';
import './App.css';
import AddHouse from './components/addHouse';
import Buyers from './components/buyer';
// import payRent from './components/payRent';

class App extends Component {
  render() {
    return (
      <div>
          <AddHouse />
          <Buyers />
          {/* <div>
            <payRent />
          </div> */}
      </div>
    );
  }
}

export default App;
