import React, { Component } from 'react';
import web3 from '../web3';
import RentHouse from '../demo';

let accounts;

class Buyers extends Component {
  constructor(props){
    super(props);
    this.state = {
      buyerName: '',
      accountAddress: '',
      no_of_beds: '',
      listOfBuyersAddress: []
    };
    this.onPress = this.onPress.bind(this);
    this.buyersAccount = this.buyersAccount.bind(this);
  };

  async componentDidMount() {
    accounts = await web3.eth.getAccounts();
    // await RentHouse.methods.getListOfHouseBuyers().call().then((address) => {
    //   this.setState({
    //     listOfBuyersAddress: [...address]
    //   });
    // });
  };
  
  async onPress(ev){
    ev.preventDefault();

    const { buyerName, accountAddress, no_of_beds, cost} = this.state;

    console.log('commiting transaction');
    await RentHouse.methods.setBuyer(
        buyerName, accountAddress, parseInt(no_of_beds)).send({
        from: accounts[0],
        gas: '3000000'
      });
    console.log('commiting transaction... done');
  };

  async buyersAccount(event) {
    event.preventDefault();
    await RentHouse.methods.getListOfHouseBuyers().call().then((address) => {
      this.setState({
        listOfBuyersAddress: [...address]
      });
    });
  }

  render() {
    const {listOfBuyersAddress} = this.state;
    const address = listOfBuyersAddress.map((value) => <li key={value.toString()}>{value}</li>)
    return (
        <div>
          <div style={{marginLeft: '10px'}}>
            
            <div className="input-group" style={{marginLeft: '50%', marginTop: '-480px'}}>
            <h3>Add House Buyers</h3>
              <div>
                <label>Enter Buyer Name:</label>
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Buyer's Name" 
                    aria-describedby="basic-addon1" 
                    onChange={(ev) => {this.setState({buyerName: ev.target.value})}}
                  />
              </div>
              <label>Enter Buyer's Account Address</label>
              <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Buyer's Address" 
                    aria-describedby="basic-addon1" 
                    onChange={(ev) => {this.setState({accountAddress: ev.target.value})}}
                  />
              <div className="input-group">
                <label>Enter Required No Of Beds:</label>
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="No. of Bed" 
                    aria-describedby="basic-addon1" 
                    onChange={ev => this.setState({no_of_beds: ev.target.value})}
                  />
              </div>
              <button type="submit" class="btn btn-primary" 
                      style={{marginTop: '10px'}}
                      onClick={this.onPress}> Submit </button>
                <div style={{marginLeft: '10px'}}>
                <h3>Get ALL Buyers Account Address</h3>
                  <button onClick={this.buyersAccount} class="btn btn-primary">Get List OF Houses ID</button>
                    <ul>
                      {address}
                    </ul>
                </div>
              </div>
              
          </div>
      </div>
    );
  }
}

export default Buyers;
