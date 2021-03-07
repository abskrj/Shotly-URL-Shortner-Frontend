import React, { Component } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export class NavBarSuper extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Navbar bg="light" variant="light">
          <Link to="/">
            <Navbar.Brand>
              <img
                src="/sotly200.png"
                width="100"
                height="50"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
          </Link>
          <Nav className="ml-auto">
            {/* <span className="navbar-text">Total Req Served: {this.state.reqCount}</span> */}
            <Link to="/analytics" ><Button variant="outline-secondary">Analytics</Button></Link>
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
          {/* <Form inline>
            <FormControl type="text" placeholder="Analytics ID" className="mr-sm-2" />
            <Button variant="outline-primary">Search</Button>
          </Form> */}
        </Navbar>
      </div>
    );
  }
}
