import { Component } from 'react';
import PropTypes from 'prop-types'

//import * as placeLocations from '../placeLocations'
import * as data from '../data/credentials'

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
      // let showInsideInfow = '';
        // If infowindow is not opened on the marker.
        if (infowindow.marker !== marker) {
            let { map, google, bounds, title, address, crossStreet} = this.props;
            //Animation when Marker on cliked
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () {
                marker.setAnimation(null);
            }, 500);
            infowindow.setContent('Loading...');

            let venueId = null;
            let tipsList = null;
         //  let v = "20182507";
            let  v = "20180731";

            fetch(`https://api.foursquare.com/v2/venues/search?ll=30.0444196,31.2357116&query=${title}&limit=1&client_id=${data.client_id}&client_secret=${data.client_secret}&v=v`)
                .then(response => response.json())
                .then(data => {
                    venueId = data.response.venues[0].id;
                    return fetch(`https://api.foursquare.com/v2/venues/${venueId}/tips?&limit=4&client_id=${data.client_id}&client_secret=${data.client_secret}&v=v`);
                })
                .then(response => response.json())
                .then(dataTips => {
                    tipsList = dataTips;
                    return fetch(`https://api.foursquare.com/v2/venues/${venueId}/photos?&limit=2&client_id=${data.client_id}&client_secret=${data.client_secret}&v=v`);
                })
                .then(response => response.json())
                .then(dataPhotos => addVenuesInfos(tipsList, dataPhotos))
                .catch(err => requestError(err, 'Foursquare'));

            //if sucess in Request
            function addVenuesInfos(tipsList, dataPhotos) {
                let showInfo = '';

                if (tipsList && tipsList.response.tips.items) {
                    const tipsData = tipsList.response.tips.items;
                    const photosData = dataPhotos.response.photos.items;
                    showInfo = '<div class="info"><h2> 🎕' + title + ' 🎕 </h2>';
                    showInfo =  '<div class ="info"> <p>' + address + '<br/> <hr/>' + crossStreet + '<p></div>';
                    //Photos
                    showInfo += '<h6> Photos </h6>';
                    for (let i = 0; i < photosData.length; i++) {
                        const photo = photosData[i];
                        showInfo += `<img alt="${title}, photo ${i + 1} by a visitor" style="width: 30%; margin-right: 5px;" src="${photo.prefix}200x200${photo.suffix}" />`;
                    }

                    //Tips
                    showInfo += '</div><h6> Some Tips </h6> <ul id="tips-places">';
                    tipsData.forEach(tip => {
                        showInfo += '<li>' + tip.text + ' 🎕 ' + tip.likes.count + ' </li>';
                    })
                    showInfo += '</ul> <p style="float: right; padding-right: 10px;"><i><small>provided by Foursquare</small></i></p> </div>';
                } else {
                    showInfo = '<p class="network-warning">Unfortunately, no <i>TIPs</i> was returned for your search.</p>';
                }
                infowindow.setContent(showInfo);
            }
            //if Error in Request
            function requestError(err, part) {
                console.log(err);
                infowindow.setContent(`<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
            }
            infowindow.marker = marker;

            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function () {
                infowindow.marker = null;
            });

           // infowindow.setContent(showInfo);

         //  showInsideInfow += 
           //    '<div class ="info"> <h1> 🎕  ' + title + ' 🎕  <h1/> <p>' + address + '<br/> <hr/>' + crossStreet+'<p></div>';
           // infowindow.setContent(showInsideInfow);
            infowindow.open(map, marker);
            map.fitBounds(bounds);
        }

    }

    makeMarkerIcon(markerColor) {
        var markerImage = new this.props.google.maps.MarkerImage(
            'https://s33.postimg.cc/wy9yg23bj/31070973_2060577387552340_1560286190421147648_n.jpg' + markerColor +
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
Marker.propTypes = {
    map: PropTypes.object
}
