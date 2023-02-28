import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


export default function Header() {

    const handleLogOut = () => {
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('id');
        window.location.pathname = "/user/login";
      }
  return (
    <>

<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='pt-3 pb-3'>
      <Container>
        <Navbar.Brand href="/"><img
              src={require("../image/orange.png")}
              width="{30}"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/user/about">About</Nav.Link>
            <Nav.Link href="/user/contact">Contact</Nav.Link>
            <Nav.Link href="/users">users</Nav.Link>
            <Nav.Link href="/groups">groups</Nav.Link>
            <Nav.Link href="/myGroups">my groups</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="contact">Contact</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
          { !window.localStorage.getItem('email')?<>   
            <Nav.Link href="/user/login">Log in</Nav.Link>
            <Nav.Link eventKey={2} href="/user/signup">
              Sign up
            </Nav.Link></>
            :<Nav.Link onClick={handleLogOut}>logout</Nav.Link>}
            {/* <Nav.Link href="/user/login">Log in</Nav.Link>
            <Nav.Link eventKey={2} href="/user/signup">
              Sign up
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </>
  )
}
