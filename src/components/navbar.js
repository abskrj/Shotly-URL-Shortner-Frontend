import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import axios from 'axios';

export class NavBarSuper extends Component {
  constructor() {
    super();
    this.state = {
      reqCount: 0
    }
  }

  componentDidMount() {
    axios.get('https://codedoc.tech/api/v1/count')
      .then((result) => {
        this.setState({reqCount: result.data[0].count})
      })
  }


  render() {
    return (
      <div>
        <Navbar bg="light" variant="light">
          <Navbar.Brand href="#home">
            <img
              src="/favicon.ico"
              width="150"
              height="40"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav className="ml-auto">
            <span className="navbar-text">Total Req Served: {this.state.reqCount}</span>
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
          {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-primary">Search</Button>
          </Form> */}
        </Navbar>
      </div>
    );
  }
}
