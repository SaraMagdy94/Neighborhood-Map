import React, { Component } from 'react'

class Header extends Component {

    showSideBar() {
        let locationFilter = document.getElementsByTagName('aside');
        if (locationFilter[0]) {locationFilter[0].classList.add('open')
          }
    }
 
  
    render() {
        return (
            <nav className="navbar">
    
                <a id="menu" tabIndex="0" role="button"
                  aria-label="neighbourhood places to search for favourit flower places at cairo"
                  className="header-menu"
                  onClick={() => this.showSideBar()}
                >
                <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"></path>
                </svg>
                </a>

                <span> 
                    <h1 tabIndex="0" className="nav-title"> 
                        <span> 🎕 </span>  Flower Location at Cairo , Egypt   <span> 🎕 </span> 
                    </h1>
                </span>

            </nav>
        )
    }
}

export default Header;