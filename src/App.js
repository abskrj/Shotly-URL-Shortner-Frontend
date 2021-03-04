import React, { Suspense } from "react";
import { NavBarSuper } from "./components/navbar";
import { ShortForm } from "./components/form";
import { Container } from "react-bootstrap";
import { ToastProvider } from 'react-toast-notifications';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


const Analytics = React.lazy(() => import("./components/Analytics/Analytics"));

export default function App() {
  return (
    <Router>
      <ToastProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <NavBarSuper />
          <Container className="mt-5">
            <Switch>
              <Route path="/analytics">
                <Analytics />
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
