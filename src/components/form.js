import React, { Component } from "react";
import { Row, Button, Form, Col } from "react-bootstrap";
import axios from "axios";

export class ShortForm extends Component {
  constructor() {
    super();
    this.state = {
      urlReceived: "",
      urlCode: "",
      shortedUrl: "",
      copySuccess: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(
        "https://sotly.herokuapp.com/api/v1/shorten",
        {
          urlReceived: this.state.urlReceived,
          urlCode: this.state.urlCode,
        },
        config
      )
      .then((respose) => {
        console.log(respose);
        this.setState({
          shortedUrl: `https://sotly.herokuapp.com/${respose.data.shortCode}`,
        });
        return respose;
      })
      .catch((respose) => {
        console.log(respose);
        return respose;
      });
  };

  copyToClipboard = (e) => {
    this.textArea.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    this.setState({ copySuccess: "Copied!" });
  };

  render() {
    const urlReceived = this.state.urlReceived;
    const urlCode = this.state.urlCode;
    const shortedUrl = this.state.shortedUrl;

    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <Row>
            <Col>
              <Form.Control
                type="text"
                onChange={this.onChange}
                name="urlReceived"
                value={urlReceived}
                placeholder="URL"
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                onChange={this.onChange}
                name="urlCode"
                value={urlCode}
                placeholder="Alias (Optional)"
              />
            </Col>
            <Col>
              <Button type="submit">Short</Button>
            </Col>
          </Row>
        </Form>

        <div className="mt-5">
          <Row>
            <Col>
              <Form.Control
                ref={(textarea) => (this.textArea = textarea)}
                onChange={this.onChange}
                name="shortedUrl"
                value={shortedUrl}
                placeholder="Shorted URL"
                readOnly
              />
            </Col>
            <Col>
              <Button onClick={this.copyToClipboard}>Click to Copy</Button>
              <p>{this.state.copySuccess}</p>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
