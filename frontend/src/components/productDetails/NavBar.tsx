import React from 'react'
import { Navbar, Nav, NavDropdown, Container, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './NavBar.scss'

const NavBar: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand href='/'>MyApp</Navbar.Brand>
        <Nav className='ml-auto'>
          <NavDropdown
            title={
              <span className='d-flex align-items-center'>
                <Image
                  src={'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png'}
                  alt='User Avatar'
                  roundedCircle
                  width='30'
                  height='30'
                  className='mr-2'
                />
                {'Addo Kofi'}
              </span>
            }
            id='navbar-nav-dropdown'
            className='no-caret'
          >
            <NavDropdown.Item onClick={() => navigate('/Product')}>Add New Product</NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate('/carts')}>Cart</NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate('/orders')}>Order</NavDropdown.Item>
            <NavDropdown.Item onClick={() => console.log('hello world')}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar
