import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SideBar from '../../components/SideBar';

export default function MainLayout(props) {
  const { className, children } = props;
  return (
    <Container className={`main-layout ${className}`}>
      <Row>
        <Col xs={3} className="main-layout__menu">
          <SideBar />
        </Col>
        <Col xs={9} className="main-layout__content">
          {children}
        </Col>
      </Row>
    </Container>
  );
}
