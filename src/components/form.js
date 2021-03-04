import React, { Component } from "react";
import { Row, Button, Form, Col, Alert } from "react-bootstrap";
import axios from "axios";

import "../static/css/main.css";

export class ShortForm extends Component {
  constructor() {
    super();
    this.state = {
      urlReceived: "",
      urlCode: "",
      shortedUrl: "",
      copySuccess: "",
      alert: null,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createAlert = (variant, message) => {
    this.setState({
      alert: <Alert variant={variant}>{message}</Alert>,
    });
  };

  deleteAlert = () => {
    this.setState({
      alert: null,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.createAlert("info", "Request Processing, Please Wait!");

    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(
        "https://codedoc.tech/api/v1/shorten",
        {
          urlReceived: this.state.urlReceived,
          urlCode: this.state.urlCode,
        },
        config
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          this.createAlert("success", res.data.statusTxt);

          this.setState({
            shortedUrl: `https://codedoc.tech/${res.data.shortCode}`,
          });
        }

        else if (res.data.statusCode === 400) {
          this.createAlert("warning", res.data.statusTxt);
          this.setState({
            shortedUrl: '',
          });
        }
        else {
          this.createAlert("danger", res.data.statusTxt);
          this.setState({
            shortedUrl: '',
          });
        }
      })
      .catch((res) => {
        this.deleteAlert();

        console.log("catched: ");
        console.log(res);

        this.createAlert("danger", "Something Went Wrong");
      });
  };

  copyToClipboard = (e) => {
    this.textArea.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    this.setState({
      copySuccess: "Copied!",
    });

    setInterval(() => {
      this.setState({
        copySuccess: "",
      });
    }, 5000);
  };

  render() {
    const urlReceived = this.state.urlReceived;
    const urlCode = this.state.urlCode;
    const shortedUrl = this.state.shortedUrl;
    const alert = this.state.alert;

    return (
      <div className="form__main">
        <center><h3>Short URLs <span>Anonymously</span></h3> <h4>With Awesome Analytics <span>(No Login/Register)</span></h4></center>
        
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                className="mb-3"
                type="text"
                onChange={this.onChange}
                name="urlReceived"
                value={urlReceived}
                placeholder="URL"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                className="mb-3"
                type="text"
                onChange={this.onChange}
                name="urlCode"
                value={urlCode}
                placeholder="Alias (Optional)"
              />
            </Col>
          </Row>
          <Row>

            <Col>
              <Button disabled={!urlReceived} onClick={this.onSubmit} variant="success" type="submit" block>Short</Button>
            </Col>

          </Row>
        </Form.Group>

        <div className="mt-5">{alert}</div>

        <div className="mt-5">
          <Row>
            <Col>
              <Form.Control
                className="mb-3"
                ref={(textarea) => (this.textArea = textarea)}
                onChange={this.onChange}
                name="shortedUrl"
                value={shortedUrl}
                placeholder="Shorted URL"
                readOnly
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button disabled={!shortedUrl} variant="info" onClick={this.copyToClipboard} block>Copy</Button>
              <p className="text-muted">{this.state.copySuccess}</p>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
