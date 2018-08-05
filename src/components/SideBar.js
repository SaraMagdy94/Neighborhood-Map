import React, { Component } from 'react'

class SideBar extends Component {

    closeSideBar() {
        const locationFilter = document.getElementsByTagName('aside');
        locationFilter[0].classList.remove('open')
    }

    rendeMarker(place) {
        place.populateInfoWindow(place.marker, place.props.showInfoWindow)
    }

    render() {
        const { places } = this.props;
        const { updateQuery } = this.props;

        return (
            <aside className="list-box" >
                <button aria-label="Close button of the filter places"
                id="close-btn" 
                className="close-box-btn"
                onClick={() => this.closeSideBar()}>
                 X  
                </button>

                <div className="navbar-form navbar-left" role="search">
                    <div className="form-group">
                        <input
                            aria-label="Input filter places:"
                            className="form-control"
                            id="search-input"
                            type="search"
                            placeholder="Filter Flower locations.."
                            onChange={(event) => updateQuery(event.target.value)}
                        />
                    </div>
                 </div>
                <div className="sidebar-content">
                    <ul tabIndex="0" role="menu" aria-label="List of favorites flower places in cairo" 
                        id="list-of-places">
                        {places
                        .filter(location => location.marker.visible === true)
                        .map((location, index) => (
                            <li tabIndex="0"  
                                key={index} 
                                onClick={(e) => this.rendeMarker(location)}
                                >
                               {location.props.title}
                           </li>
                        ))}
                    </ul>
                </div>
            </aside>
        )
    }
}

export default SideBar;