import React, { Suspense } from "react";
import { NavBarSuper } from "./components/Navbar/NavBarSuper";
import { Container } from "react-bootstrap";
import { ToastProvider } from 'react-toast-notifications';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";

export default function App() {
  return (
    <Router>
      <ToastProvider placement="top-center">
        <Suspense fallback={<div>Loading...</div>}>
          <NavBarSuper />
          <Container className="mt-5">
            <Routes />
          </Container>
        </Suspense>
      </ToastProvider>
    </Router>
  );
}
