import React, { Component } from 'react';
import './App.css';
import { GoogleApiWrapper } from 'google-maps-react'
import * as placeLocations from './placeLocations'
// import child component
import MapContainer from './components/MapContainer'
import Header from './components/Header'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: []
    }
    this.flowerMarkers = [];
    this.currentMarker = this.currentMarker.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
  }

  currentMarker(marker) {

    this.flowerMarkers.push(marker);

    if (this.flowerMarkers.length === placeLocations.locations.length) {
      this.setState({ places: this.flowerMarkers })
    }
  }

  updateQuery(query) {
    let response = this.state.places.map(location => {
     let matched = location.props.title.toLowerCase().indexOf(query) >= 0;
      if (location.marker) {
        location.marker.setVisible(matched);
      }
      return location;
    })

    this.setState({ places: response });
  }

  render() {
    
    return (
      <div className="App">
        <Header />

        <MapContainer
          updateQuery={this.updateQuery}
          google={this.props.google}
          currentMarker={this.currentMarker}
          places={this.state.places} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAmaZOaOXDljDzMahqTN6ypkaBiGU0yll0',
})(App)