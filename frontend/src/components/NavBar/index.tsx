import { useContext } from 'react'
// import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'
import { CanAccess } from '../CanAccess'

export function NavBar () {
  const { isAuthenticated, user, signOut } = useContext(AuthContext)

  return (
    <div>
      {/* <Link to="/login">Login</Link>
      <Link to="/">Home</Link>

      <CanAccess permissions={['users.list']}>
        <Link to="/users">Users</Link>
      </CanAccess>

      <CanAccess permissions={['metrics.list']}>
        <Link to="/metrics">Metrics</Link>
      </CanAccess>

      {isAuthenticated && (
        <>
          <span>{user?.email}</span>
          <button data-testid="logout-button" onClick={() => signOut()}>Logout</button>
        </>
      )} */}
          <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
      <CanAccess permissions={['users.list']}>
        <Nav.Link as={Link} to="/users">Users</Nav.Link>
      </CanAccess>

      <CanAccess permissions={['metrics.list']}>
        <Nav.Link as={Link} to="/metrics">Metrics</Nav.Link>
      </CanAccess>
          </Nav>
          {isAuthenticated && (
        <>
          <span>{user?.email}</span>
          <button data-testid="logout-button" onClick={() => signOut()}>Logout</button>
        </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}
