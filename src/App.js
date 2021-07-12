import React, { Component } from "react";
import './App.css';
import GMaps from 'gmaps'

/* eslint eqeqeq: "off", "no-unused-vars": "off", curly: "error" */

class App extends Component {

  constructor() {
    super();
    this.state = {
      mapCoordinates: {
        lat: '',
        lng: ''
      }
    }
  }

  geo() {
    var favorites = [];
    var self = this;

    if (localStorage.favorites) {
      favorites = JSON.parse(localStorage.favorites);
    }

    GMaps.geolocate({
      success: function (position) {
        var userLat = position.coords.latitude;
        var userLng = position.coords.longitude;
        self.setState({
          mapCoordinates: {
            lat: userLat,
            lng: userLng
          }
        });
      }
    })
  }

  componentDidMount() {
    this.geo();
  }

  render() {
    return (
      <div className="conteudo" style={{ overflowX: 'hidden', }}>

      </div>
    );
  }
}



export default App;
