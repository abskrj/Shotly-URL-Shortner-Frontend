import React from "react";
import { NavBarSuper } from "./components/navbar";
import { ShortForm } from "./components/form";
import { Container } from "react-bootstrap";

export default function App() {
  return (
    <div>
      <NavBarSuper />
      <Container className="mt-5">
        <ShortForm />
      </Container>
    </div>
  );
}
