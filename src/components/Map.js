import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import mapStyle from '../mapStyle'
import * as placeLocations from '../placeLocations'
import Marker from './Marker'

class Map extends Component {

    componentDidMount() {
        this.loadMap();
    }
    
    loadMap() {
        if (this.props && this.props.google) {
            const { google } = this.props;
            const maps = google.maps;
            const mapRef = this.refs.map;
            const divMapElement = ReactDOM.findDOMNode(mapRef);
            const lat = 30.0444196;
            const lng = 31.2357116;
            const center = new maps.LatLng(lat, lng);
            const mapObj = Object.assign({}, {
                center: center,
                zoom: mapStyle.zoom,
                styles: mapStyle.styles,
                mapTypeControl: mapStyle.mapTypeControl
            })

            this.map = new maps.Map(divMapElement, mapObj);
            this.bounds = new google.maps.LatLngBounds();
            this.showInfoWindow = new google.maps.InfoWindow();

            this.forceUpdate();
        } else {
            console.log('Ops! Something went wrong with Google Maps!')
            let mapContainerElemt = document.querySelector('.map-container');
            mapContainerElemt.innerHTML = '<div class="error">Ops! Something went wrong with Google Maps! </div>'
        }
    }

    render() {
        const style = {
            width: '100vw',
            height: '100vh'
        }

        const { currentMarker } = this.props;

        return (
            <div ref='map' style={style} className="map-container" >
               Start Loading map...
                {placeLocations.locations.map((location, index) => (
                    <Marker key={index}
                        google={this.props.google}
                        map={this.map}
                        title={location.title}
                        address={location.address}
                        crossStreet={location.crossStreet}
                        position={location.location}
                        bounds={this.bounds}
                        showInfoWindow={this.showInfoWindow}
                        currentMarker={currentMarker}
                    >            
                    </Marker>
                ))}
            </div>
        )
    }
}

export default Map;