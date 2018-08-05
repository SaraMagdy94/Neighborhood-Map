import { Component } from 'react';
//import * as placeLocations from '../placeLocations'

class Marker extends Component {
    
    componentDidUpdate(prevProps) {

        if ((this.props.map !== prevProps.map) ||
            (this.props.position !== prevProps.position)) {
           this.renderMarker();
        }
    }
    
    renderMarker() {
        
        if (this.marker) {
            this.marker.setMap(null);
        }
        let { map, google, position, bounds, showInfoWindow, currentMarker } = this.props;
        let pos = position;
        position = new google.maps.LatLng(pos.lat, pos.lng);

        const pref = {
            map: map,
            position: position,
            icon: this.makeMarkerIcon('01c152')

        };
        this.marker = new google.maps.Marker(pref);
        const marker = this.marker;

        // Create an onclick event to open the large infowindow at each marker.
        let infoFlowerTitle = this;
        marker.addListener('click', function () {
            infoFlowerTitle.populateInfoWindow(this, showInfoWindow);
        });
        currentMarker(this);
        bounds.extend(marker.position);
        map.fitBounds(bounds);
    }

    populateInfoWindow(marker, infowindow) {
        let showInsideInfow = '';
        // If infowindow is not opened on the marker.
        if (infowindow.marker !== marker) {
            let { map, google, bounds, title, address, crossStreet} = this.props;
            //Animation when Marker on cliked
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () {
                marker.setAnimation(null);
            }, 500);


            infowindow.setContent('Loading...');
                  
            showInsideInfow += 
                '<div class ="info"> <h1> 🎕  ' + title + ' 🎕  <h1/> <p>' + address + '<br/> <hr/>' + crossStreet+'<p></div>';
            infowindow.setContent(showInsideInfow);
            infowindow.open(map, marker);
            map.fitBounds(bounds);
        }

    }

    makeMarkerIcon(markerColor) {
        var markerImage = new this.props.google.maps.MarkerImage(
            'https://s22.postimg.cc/3zaweimfl/31045296_2060577330885679_610565395383844864_n.jpg' + markerColor +
            '|40|_|%E2%80%A2',
            new this.props.google.maps.Size(50, 50),
            new this.props.google.maps.Point(0, 0),
            new this.props.google.maps.Point(10, 34),
            new this.props.google.maps.Size(50, 50));
        return markerImage;
    }

    render() {
        return null;

    }
}

export default Marker;
