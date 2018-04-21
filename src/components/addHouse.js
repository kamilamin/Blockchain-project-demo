import React, { Component } from 'react';
import web3 from '../web3';
import RentHouse from '../demo';
import './css/addHouse.css';

let accounts;

class AddHouse extends Component {
  constructor(props){
    super(props);
    this.state = {
      propertyID: '',
      SellerName: '',
      no_of_beds: '',
      accountAddress: '',
      cost: '',
      listOfHouses: []
    };
    this.onPress = this.onPress.bind(this);
    this.getHousesID = this.getHousesID.bind(this);
  };

  async componentDidMount() {
    accounts = await web3.eth.getAccounts();

  };
  
  async onPress(event){
    event.preventDefault();

    const {propertyID, SellerName, no_of_beds, accountAddress, cost} = this.state;

    console.log('commiting transaction');
    await RentHouse.methods.setHouse(
      SellerName,
      parseInt(propertyID),
      parseInt(no_of_beds),
      accountAddress,
      web3.utils.toWei(cost, 'ether')).send({
        from: accounts[0],
        gas: '3000000'
      });
    console.log('commiting transaction... done');
  };

  async getHousesID(event) {
    event.preventDefault();
    await RentHouse.methods.getListOfHouses().call().then( (list) => {
      this.setState({
        listOfHouses: [...list]
      });
    });
  };


  render() {
    const {listOfHouses} = this.state;
    const housesID = listOfHouses.map((value) => <li key={value.toString()}>{value}</li>);
    return (
        <div>
        <nav class="navbar navbar-inverse">
          <div class="container-fluid">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="#">Airbnb Demo</a>
            </div>
          </div>
        </nav>
        <div style={{padding: '10px'}}>
          <h1 style={{textAlign: 'center'}}>
            Welcome to Airbnb Demo
          </h1>
          <h4 style={{textAlign: 'center'}}>
            We're providing service for those who want rented house services in other cities
          </h4>
        </div>
        <div style={{marginLeft: '10px'}}>
            <h3>Add Seller's New House</h3>
            <div className="input-group">
              <div>
                <label>Enter Property ID:</label>
                <input
                    type="text"
                    class="form-control"
                    placeholder="Property ID"
                    aria-describedby="basic-addon1"
                    required
                    onChange={(ev) => {this.setState({propertyID: ev.target.value})}}
                  />
              </div>
              <label>Enter Sellers Name:</label>
              <input
                    type="text"
                    class="form-control"
                    placeholder="Seller Name"
                    aria-describedby="basic-addon1"
                    required
                    onChange={(ev) => {this.setState({SellerName: ev.target.value})}}
                  />
              </div>
              <div className="input-group">
                <label>Enter Numbers of Bed:</label>
                <input
                    type="text"
                    class="form-control"
                    placeholder="No. of Bed"
                    aria-describedby="basic-addon1"
                    required
                    onChange={ev => this.setState({no_of_beds: ev.target.value})}
                  />
              </div>
              <div className="input-group">
                <label>Enter Account Address:</label>
                <input
                    type="text" 
                    class="form-control" 
                    placeholder="Account Address" 
                    aria-describedby="basic-addon1" 
                    onchange={ev => {this.setState({accountAddress: ev.target.value})}}
                  />
              </div>
              <div className="input-group">
                <label>Enter Cost Of House:</label>
                <input
                    type="text"
                    class="form-control"
                    placeholder="Cost of House"
                    aria-describedby="basic-addon1"
                    required
                    onChange={(ev) => {this.setState({cost: ev.target.value})}}
                  />
              </div>
              <button type="submit" class="btn btn-primary" 
                      style={{marginTop: '10px'}}
                      onClick={this.onPress}> Submit </button>
          </div>
          <div className='GetHouses'>
            <h3 className="GetHouseText">Get ALL House IDs</h3>
              <button onClick={this.getHousesID} class="btn btn-primary">Get List OF Houses ID</button>
                <ul>
                  {housesID}
                </ul>
          </div>
      </div>
    );
  }
}

export default AddHouse;
