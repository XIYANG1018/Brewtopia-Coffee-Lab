import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import logo from "../assets/logo.png"
import styles from "./Components.modules.css"
import { LinkContainer } from 'react-router-bootstrap';


const Header = () => {
  return (
    <header>
      <Navbar bg="transparent" variant='dark' expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='header-text'>
              <img className='logo' src={logo} alt='Brewtopia Coffee Lab' />
             Brewtopia Coffee Lab</Navbar.Brand>
          </LinkContainer>
            
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ms-auto'>
                  <LinkContainer to='/cart'>
                    <Nav.Link className='header-text '>
                      <FaShoppingCart className='icon'/>Cart</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/login'>
                    <Nav.Link className='header-text '><FaUser className='icon'/>Sign In</Nav.Link>
                  </LinkContainer>
                    
                </Nav>
            </Navbar.Collapse>

        </Container>
      </Navbar>
    </header>
  )
}

export default Header
