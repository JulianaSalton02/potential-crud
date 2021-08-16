// import React, { Component } from "react";
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { IoIosPeople } from "react-icons/io";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand className="ms-3">
          <IoIosPeople size="30px" />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link>
            <Link to="/cadastrar" style={{ textDecoration: "none", color: "#fff" }} >
              Cadastrar
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link
              to="/dashboard"
              style={{ textDecoration: "none", color: "#fff" }} >
              Listagem
            </Link>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Menu;