import React, { Suspense } from "react";
import { NavBarSuper } from "./components/Navbar/NavBarSuper";
import ShortForm from "./components/ShortForm";
import { Container } from "react-bootstrap";
import { ToastProvider } from 'react-toast-notifications';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const About = React.lazy(() => import("./components/About/About"));
const Terms = React.lazy(() => import("./components/Terms/Terms"));
const Analytics = React.lazy(() => import("./components/Analytics/Analytics"));

export default function App() {
  return (
    <Router>
      <ToastProvider placement="top-center">
        <Suspense fallback={<div>Loading...</div>}>
          <NavBarSuper />
          <Container className="mt-5">
            <Switch>

              <Route path="/analytics">
                <Analytics />
              </Route>

              <Route path="/terms">
                <Terms />
              </Route>

              <Route path="/about">
                <About />
              </Route>

              <Route path="/">
                <ShortForm />
              </Route>
            </Switch>
          </Container>
        </Suspense>
      </ToastProvider>
    </Router>
  );
}
