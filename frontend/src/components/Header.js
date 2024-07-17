import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import logo from "../assets/logo.png"
import styles from "./Components.modules.css"
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import {logout} from '../slices/authSlice'


const Header = () => {

  // destructure what we need from the state by using useSelector
  const { cartItems } = useSelector(state => state.cart);

  // get the userInfo from the state
  const { userInfo } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();


  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout: ', error);
    }
  } 

  console.log(cartItems);
  
  return (
    <header>
      <Navbar variant='light' expand="md" collapseOnSelect>
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
                      <FaShoppingCart className='icon'/>Cart {
                        cartItems.length > 0 && (
                          <Badge pill bg='dark' style={{marginLeft: '5px'}}>
                            { cartItems.reduce((acc, item) => acc + item.qty, 0 )}
                          </Badge>
                        )
                      
                      }</Nav.Link>
                  </LinkContainer>
                  

                  {/**if user is logged in, it will show a dropdown nav, else will show sign in button */}
                  {userInfo ? (
                    <NavDropdown className='header-text ' title={userInfo.name} id='username'>
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>


                      <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <LinkContainer to='/login'>
                    <Nav.Link className='header-text '><FaUser className='icon'/>Sign In</Nav.Link>
                  </LinkContainer>
                  ) }

                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title='Admin' id='adminmenu'>
                      <LinkContainer to='/admin/userlist'>
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to='/admin/productlist'>
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to='/admin/orderlist'>
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )
                    }

                  
                    
                </Nav>
            </Navbar.Collapse>

        </Container>
      </Navbar>
    </header>
  )
}

export default Header
