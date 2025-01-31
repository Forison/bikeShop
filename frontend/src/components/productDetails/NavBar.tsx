import React, { useContext } from 'react'
import { Navbar, Nav, NavDropdown, Container, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../authentication/AuthContext'

import './NavBar.scss'
import { logout } from '../../utils/helper/tokenHandler'

const NavBar: React.FC = () => {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)
  const user = authContext?.user
  const handleLogout = () => {
    logout()
    navigate('login')
  }
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
                {user?.name}
              </span>
            }
            id='navbar-nav-dropdown'
            className='no-caret'
          >

            {user?.name ? (
              <>
                {user?.admin && (
                  <NavDropdown.Item onClick={() => navigate('/Product')}>Add New Product</NavDropdown.Item>
                )}
                <NavDropdown.Item onClick={() => navigate('/carts')}>Cart</NavDropdown.Item>
                <hr />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </>
            ) : (
              <NavDropdown.Item onClick={() => navigate('/login')}>LogIn</NavDropdown.Item>
            )}
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar
