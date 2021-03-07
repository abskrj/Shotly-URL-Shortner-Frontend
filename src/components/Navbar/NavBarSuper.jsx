import React, { Component } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export class NavBarSuper extends Component {
  render() {
    return (
      <div>
        <Navbar bg="light" variant="light">
          <Link to="/">
            <Navbar.Brand>
              <img
                src="/sotly200.png"
                width="70"
                height="50"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
          </Link>
          <Nav className="ml-auto">
            <Link to="/about" ><Button variant="link">About</Button></Link>
            <Link to="/analytics" ><Button variant="outline-secondary">Analytics</Button></Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
