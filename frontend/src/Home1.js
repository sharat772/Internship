import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export const Home1 = ({ isSignup }) => {
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Navbar.Brand>ADMIN</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {isSignup && (
            <>
              <Nav.Link href="/Master">Master</Nav.Link>
              <Nav.Link href="/Transactions">Transactions</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Home1;
