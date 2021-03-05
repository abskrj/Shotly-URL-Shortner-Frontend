import React, { useRef, useState } from "react";
import { Row, Button, Form, Col } from "react-bootstrap";
import axios from "axios";
import { useToasts } from 'react-toast-notifications';

import "../static/css/main.css";

export default function ShortForm() {
  const [urlReceived, setUrlReceived] = useState("");
  const [urlCode, setUrlCode] = useState("");
  const [shortedUrl, setShortedUrl] = useState("");
  const [analyticsID, setAnalyticsID] = useState("");
  const shortedEl = useRef(null);
  const analyticsEl = useRef(null);
  const { addToast } = useToasts();

  const onSubmit = (e) => {
    e.preventDefault();

    addToast("Request Processing, Please Wait!", {
      appearance: "info",
      autoDismiss: true,
    });

    axios
      .post(
        "https://codedoc.tech/api/v1/shorten",
        {
          urlReceived: urlReceived,
          urlCode: urlCode,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        if (res.data.statusCode === 200) {

          addToast(res.data.statusTxt, {
            appearance: "success",
            autoDismiss: true,
          });
          

          setShortedUrl(`https://codedoc.tech/${res.data.shortCode}`);
          setAnalyticsID(res.data.urlID);
          addToast("Click the fields to Copy", {
            appearance: "info",
            autoDismiss: false,
          });
        }

        else if (res.data.statusCode === 400) {
          addToast(res.data.statusTxt, {
            appearance: "warning",
            autoDismiss: true,
          });
          setShortedUrl('');
          setAnalyticsID('');
        }
        else {
          addToast(res.data.statusTxt, {
            appearance: "error",
            autoDismiss: true,
          });
          setShortedUrl('');
          setAnalyticsID('');
        }
      })
      .catch((res) => {
        addToast("Something Went Wrong", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const copyShortedUrl = e => {
    if(!shortedUrl) return;
    shortedEl.current.select();
    document.execCommand("copy");
    e.target.focus();
    addToast("Shorted URL Copied", {
      appearance: "success",
      autoDismiss: true,
    });
  };

  const copyAnalyticsID = e => {
    if(!analyticsID) return;
    analyticsEl.current.select();
    document.execCommand("copy");
    e.target.focus();
    addToast("Analytics ID Copied", {
      appearance: "success",
      autoDismiss: true,
    });
  }

  return (
    <div className="form__main">
      <center><h3>Short URLs <span>Anonymously</span></h3> <h4>With Awesome Analytics <span>(No Login/Register)</span></h4></center>

      <Form.Group>
        <Row>
          <Col>
            <Form.Control
              className="mb-3"
              type="text"
              onChange={e => setUrlReceived(e.target.value)}
              name="urlReceived"
              value={urlReceived}
              placeholder="URL"
              autoComplete="off"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control
              className="mb-3"
              type="text"
              onChange={e => setUrlCode(e.target.value)}
              name="urlCode"
              value={urlCode}
              placeholder="Alias (Optional)"
              autoComplete="off"
            />
          </Col>
        </Row>
        <Row>

          <Col>
            <Button disabled={!urlReceived} onClick={onSubmit} variant="success" type="submit" block>Short</Button>
          </Col>

        </Row>
      </Form.Group>

      <div className="mt-5">
        <Row>
          <Col>
            <Form.Control
              ref={shortedEl}
              onChange={e => setShortedUrl(e.target.value)}
              onClick={copyShortedUrl}
              name="shortedUrl"
              value={shortedUrl}
              placeholder="Shorted URL"
              readOnly
            />
            </Col>
            <Col>
            <Form.Control
              ref={analyticsEl}
              onChange={e => setAnalyticsID(e.target.value)}
              onClick={copyAnalyticsID}
              name="analyticsID"
              value={analyticsID}
              placeholder="Analytics ID"
              readOnly
            />
          </Col>
        </Row>

      </div>
    </div>
  )
}