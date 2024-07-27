import React from 'react';
import logo from './logo.svg';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <h2>Bootstrap</h2>
        </Col>
        <Col>
          <h2>is</h2>
        </Col>
        <Col>
          <h2>working</h2>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2>Bootstrap</h2>
        </Col>
        <Col>
          <h2>is</h2>
        </Col>
        <Col>
          <h2>working</h2>
        </Col>
        <Col>
          <Button variant="primary">Primary</Button>{' '}
        </Col>
      </Row>

      <Row>
        <Col>
          <h2>Bootstrap</h2>
        </Col>
        <Col>
          <h2>is</h2>
        </Col>
        <Col>
          <h2>working</h2>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
