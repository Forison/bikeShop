import React, { useEffect, useState } from 'react'
import { Navbar, Nav, NavDropdown, Container, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getCookie } from '../../utils/helper/tokenHandler'
import './NavBar.scss'
import { User } from '../../utils/interface/user'

const NavBar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACK_END_API_URL}/api/v1/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie()}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setUser(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

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
                <NavDropdown.Item onClick={() => navigate('/orders')}>Order</NavDropdown.Item>
                <hr />
                <NavDropdown.Item onClick={() => console.log('hello world')}>Logout</NavDropdown.Item>
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
