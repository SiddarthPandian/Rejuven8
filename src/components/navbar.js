import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="https://www.aa.com/homePage.do">
          American Airlines
          <div className="logo-image">
            <img src="aaLogo.png" alt=""></img>
          </div>
        </a>
      </nav>
    );
  }
}

export default NavBar;
