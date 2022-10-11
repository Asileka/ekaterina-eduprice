import { Container, Row, Col } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'

import { NavBar } from './components/NavBar'
import { AuthProvider } from './context/AuthContext'
import { RouteList } from './routes'

// import Container from "react-bootstrap/Container";
// import Button from 'react-bootstrap/Button';
// import Card from "react-bootstrap/Card";
// import CardGroup from 'react-bootstrap/CardGroup';
// import Alert from 'react-bootstrap/Alert';
// import Spinner from 'react-bootstrap/Spinner';

const App = () => (
  <>
    <style type="text/css">
        {`
    .btn-primary {
      --bs-btn-color: #fff;
      --bs-btn-bg: #20c997;
      --bs-btn-border-color: #004d40;
      --bs-btn-hover-color: #fff;
      --bs-btn-hover-bg: #127457;
      --bs-btn-hover-border-color: #004d40;
      --bs-btn-active-color: #fff;
      --bs-btn-active-bg: #0c4937;
      --bs-btn-active-border-color: #0c4937;
      --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
      --bs-btn-disabled-color: #fff;
      --bs-btn-disabled-bg: #0c4937;
      --bs-btn-disabled-border-color: #0c4937;
    }
    .btn-outline-primary {
      --bs-btn-color: #20c997;
      --bs-btn-border-color: #20c997;
      --bs-btn-hover-color: #004d40;
      --bs-btn-hover-border-color: #004d40;
      --bs-btn-hover-bg: #20c997;
    }
    :root {
      --bs-link-color: #c92052;
      --bs-link-hover-color: #c92052;
    }
    `}
      </style>
  <BrowserRouter>
    <AuthProvider>
      <NavBar />
      <Container>
        <Row>
          <Col>
            <RouteList />
          </Col>
        </Row>
      </Container>
    </AuthProvider>
  </BrowserRouter>
  </>
)

export default App
