import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export function Header({showFormCb}) {
  return (
    <Navbar bg="light" fixed="top">
      <Container className="justify-content-stretch">
      <Navbar.Brand href="#">Certificate by V</Navbar.Brand>
        <Row>
          <Col>
            <Button variant="success" onClick={() => showFormCb(true)}>Upload</Button>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}
