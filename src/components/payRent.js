import React, { Component } from 'react';
import web3 from '../web3';
import RentHouse from '../demo';

let accounts;

class payRent extends Component {
  constructor(props){
    super(props);
    this.state = {}
    this.onPress = this.onPress.bind(this);
  };

  async componentDidMount() {
    accounts = await web3.eth.getAccounts();
    
  };
  
  async onPress(ev){
    ev.preventDefault();


  };

  render() {
    return (
        <div style={{marginTop: '50%'}}>
          <div style={{marginLeft: '10px'}}>
            
            <div className="input-group" style={{marginLeft: '50%'}}>
            <h3>Payment</h3>
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
              <button type="submit" class="btn btn-primary" 
                      style={{marginTop: '10px'}}
                      onClick={this.onPress}> Submit </button>
              </div>
          </div>
      </div>
    );
  }
}

export default payRent;
