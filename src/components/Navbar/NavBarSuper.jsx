import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Navbar.css";

export class NavBarSuper extends Component {
  render() {
    return (
      <div className="navbar">
        <Link to="/">
          <img
            src="/sotly200.png"
            width="70"
            height="50"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Link>
          <div className="nav__right">
            <Link to="/about" ><Button variant="link">About</Button></Link>
            <Link to="/analytics" ><Button variant="outline-secondary">Analytics</Button></Link>
          </div>
        </div>
    );
  }
}
