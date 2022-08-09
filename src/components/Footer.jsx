import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';


export function Footer() {
  return (
    <Navbar bg="dark" fixed="bottom">
      <Container className="justify-content-center">
        <Row className="py-2">
          <a id="github-link" href="https://github.com/icapistrano/certificate-task">Github Repo</a>
        </Row>
      </Container>
    </Navbar>
  );
}
