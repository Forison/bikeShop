import React, { useContext } from 'react'
import { Navbar, Nav, NavDropdown, Container, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AuthContext } from '../authentication/AuthContext'
import { logout } from '../../utils/helper/tokenHandler'
import SearchBar from '../../presentational/SearchBar'

import './NavBar.scss'

const NavBar: React.FC = () => {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)
  const user = authContext?.user
  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  return (
    <Navbar bg='light' expand='lg' className='shadow sticky-top mb-5'>
      <Container>
        <Navbar.Brand href='/'>MyApp</Navbar.Brand>
        <SearchBar />
        {user && !user?.admin && (
          <FontAwesomeIcon
            className='mx-4 cursor-pointer'
            icon={faShoppingCart}
            onClick={() => navigate('/carts')}
          />
        )}
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
              </span>
            }
            id='navbar-nav-dropdown'
            className='no-caret small'
          >

            {!!user ? (
              <>
                <NavDropdown.Item className='fs-6'><strong>Hi,</strong> {user?.name}</NavDropdown.Item>
                <hr />
                {user?.admin && (
                  <>
                    <NavDropdown.Item onClick={() => navigate('/Product')}>New Product</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigate('/category')}>Add Category</NavDropdown.Item>
                    <hr />
                  </>
                )}
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
