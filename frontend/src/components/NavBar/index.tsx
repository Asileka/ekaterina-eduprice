import { useContext } from 'react'
import { Button } from 'react-bootstrap'
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
          <Navbar bg="light" variant='light' expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Eduprise</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {!isAuthenticated && (<>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </>)}
      <CanAccess permissions={['users.list']}>
        <Nav.Link as={Link} to="/users">Users</Nav.Link>
      </CanAccess>
      {isAuthenticated && (
        <>
        <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
        <Nav.Link as={Link} to="/metrics">Metrics</Nav.Link>
        </>
      )}
          </Nav>
          {isAuthenticated && (
        <>
        <Navbar.Text className='me-2'>
            Signed in as: {user?.email}
          </Navbar.Text>
          <Button size="sm" variant="outline-primary" data-testid="logout-button" onClick={() => signOut()}>Logout</Button>
        </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}
