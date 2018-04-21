import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import RentHouse from './demo';
import AddHouse from './components/addHouse';
import Buyers from './components/buyer';
// import payRent from './components/payRent';

let accounts;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      sellerAccount: '',
      buyersAccount: '',
      houseID: '',
      amount: ''
    }
    this.onPress = this.onPress.bind(this);
  };

  async componentDidMount() {
    accounts = await web3.eth.getAccounts();
    console.log(accounts);
    
  };
  
  async onPress(ev){
    ev.preventDefault();
    const { sellerAccount, buyersAccount, houseID, amount } = this.state;
    console.log('commiting payment');
    await RentHouse.methods.payRent(
      sellerAccount,
      buyersAccount,
      parseInt(houseID)
    ).send({
      from: accounts[0],
      value: web3.utils.toWei(amount, 'ether')
    });
    console.log('commiting payment.... done')
  };
  render() {
    return (
      <div>
          <AddHouse />
          <Buyers />
          {/* <div>
            <payRent />
          </div> */}
          <div>
          <div>
            <div style={{marginLeft: '10px'}}>
              <div className="input-group">
              <h3>ADD Payment</h3>
                <div>
                  <label>Enter Seller's Account Address:</label>
                  <input 
                      type="text" 
                      class="form-control" 
                      placeholder="Seller's Account" 
                      aria-describedby="basic-addon1" 
                      onChange={(ev) => {this.setState({sellerAccount: ev.target.value})}}
                    />
                </div>
                <label>Enter Buyer's Account Address</label>
                <input 
                      type="text" 
                      class="form-control" 
                      placeholder="Buyer's Address" 
                      aria-describedby="basic-addon1" 
                      onChange={(ev) => {this.setState({buyersAccount: ev.target.value})}}
                    />
                <div className="input-group">
                  <label>Enter ID Of House:</label>
                  <input 
                      type="text" 
                      class="form-control" 
                      placeholder="House ID" 
                      aria-describedby="basic-addon1" 
                      onChange={ev => this.setState({houseID: ev.target.value})}
                    />
                </div>
                <div className="input-group">
                  <label>Enter Amount:</label>
                  <input 
                      type="text"
                      class="form-control" 
                      placeholder="Amount"
                      aria-describedby="basic-addon1"
                      value={this.state.amount}
                      onChange={ev => this.setState({amount: ev.target.value})}
                    />
                </div>
                <button type="submit" class="btn btn-primary" 
                        style={{marginTop: '10px'}}
                        onClick={this.onPress}> Submit </button>
                </div>
            </div>
          </div>
          </div>
      </div>
    );
  }
}

export default App;
