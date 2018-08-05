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
            //Request related TIPs and Photos by Foursquare API
            let venueId = null;
            let tipsList = null;
            let ClientID = 'QOB1KS5RBLWEVVKEVHNPW5GLPUDWVV5FE3AQ0NZMLQ3OXAWC';
            let  ClientSecret = 'RY0DR5P3PWQH3BQQBBYIIQ5T11XTJWLWFURBUMBXM4HM1KNI';
            let  api = 'https://api.foursquare.com';
           //let v = '20180731';
            fetch(`${api}/v2/venues/search?30.0444196,31.2357116&v=20180731&query=flower&limit=1&client_id=${ClientID}&client_secret=${ClientSecret}`)
                .then(response => response.json())
                .then(data => {
                    venueId = data.response.venues[0].id;
                    return fetch(`${api}/v2/venues/${venueId}/tips?v=20180731&limit=4&client_id=${ClientID}&client_secret=${ClientSecret}`);
                })
                .then(response => response.json())
                .then(dataTips => {
                    tipsList = dataTips;
                    return fetch(`${api}/v2/venues/${venueId}/photos?v=20180731&limit=2&client_id=${ClientID}&client_secret=${ClientSecret}`);
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
                    showInfo = '<div class="infowindow-content"><h4>' + title + '</h4>';

                    //Photos
                    showInfo += '<h6> Some Photos </h6> <div id="photos-places">';
                    for (let i = 0; i < photosData.length; i++) {
                        const photo = photosData[i];
                        showInfo += `<img alt="${title}, photo ${i + 1} by a visitor" style="width: 30%; margin-right: 5px;" src="${photo.prefix}150x150${photo.suffix}" />`;
                    }

                    //Tips
                    showInfo += '</div><h6> Some Tips for location </h6> <ul id="tips-places">';
                    tipsData.forEach(tip => {
                        showInfo += '<li>' + tip.text + ' </li>';
                    })
                    showInfo += '</ul> <p style="float: right; padding-right: 10px;"><i><small>provided by Foursquare</small></i></p> </div>';
                } else {
                    showInfo = '<p> no <i>TIPs</i> was returned for your search.</p>';
                }
                infowindow.setContent(showInfo);
            }
            //if Error in Request
            function requestError(err, part) {
                console.log(err);
                infowindow.setContent(`<p> Oh! There was an error for the ${part}.</p>`);
            }
            infowindow.marker = marker;

            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function () {
                infowindow.marker = null;
            });

            infowindow.setContent('Loading...');
                  
          //  showInsideInfow += 
          //      '<div class ="info"> <h1> 🎕  ' + title + ' 🎕  <h1/> <p>' + address + '<br/> <hr/>' + crossStreet+'<p></div>';
            infowindow.setContent(showInsideInfow);
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
