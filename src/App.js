import React, { Component } from "react";
import "./App.css";
import Map from "./components/Map";

class App extends Component {
  state = {
    locations: [
      {
        id: "4be59594cf200f47d760133c",
        name: "Glonojad",
        lat: 50.06620123676282,
        lng: 19.94211332703833
      },
      {
        id: "4d8dec3cd265236aaf07fd16",
        name: "Karma",
        lat: 50.063395,
        lng: 19.930564
      },
      {
        id: "514a32cf582f79f38dc2a565",
        name: "Pod Norenami",
        lat: 50.0635011801023,
        lng: 19.931314734000782
      },
      {
        id: "5659cff4498e8316341276ba",
        name: "Vegab",
        lat: 50.05843279002551,
        lng: 19.943310465562334
      },
      {
        id: "56b5022c498e16a72d2cc6ba",
        name: "Krowarzywa",
        lat: 50.063535555196204,
        lng: 19.93734361084591
      },
      {
        id: "4bbf956d920eb7136697172c",
        name: "Chimera",
        lat: 50.06182551124878,
        lng: 19.934927963784688
      },
      {
        id: "5780ceab498ef49b1353286c",
        name: "Veganic",
        lat: 50.06462349578763,
        lng: 19.927123676879855
      },
      {
        id: "52627b13498eeae52f3cac16",
        name: "Nova Krova",
        lat: 50.04859765967974,
        lng: 19.94466577650298
      },
      {
        id: "5a914d088496ca6efef43637",
        name: "Bhajan Cafe",
        lat: 50.05258,
        lng: 19.940086
      },
      {
        id: "5a50be3d3d479178c3b3d6c5",
        name: "Massolit Cooks",
        lat: 50.051299,
        lng: 19.94796
      }
    ]
  };

  render() {
    return (
      <div className="App">
        <header className="header">
          <h1 className="header-title">Vegan Restaurants in Cracow</h1>
        </header>

        <Map mylocations={this.state.locations} />
        <footer className="footer">
          <span>Used Foursquare API for restaurants data</span>
        </footer>
      </div>
    );
  }
}

export default App;
