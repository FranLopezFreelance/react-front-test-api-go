import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faUsers, 
  faComment  
} from "@fortawesome/free-solid-svg-icons";
import BasicModal from '../../components/Modals';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import SignInForm from '../../components/SignInForm/SignInForm';
import LogoBlue from '../../assets/img/logo-blue.png';
import LogoWhite from '../../assets/img/logo-white.png';

export default function Auth(props) {

  const { setLoginState } = props;

  const [ showModal, setShowModal ] = useState(false);
  const [ contentModal, setContentModal ] = useState(null);
  
  const openModal = content => {
    setShowModal(true);
    setContentModal(content);
  }

  return (
    <>
      <Container className="auth" fluid>
        <Row>
          <LeftComponent />
          <RightComponent 
            openModal={openModal}
            setShowModal={setShowModal}
            setLoginState={setLoginState}
          />
        </Row>
      </Container>
      <BasicModal 
        show={showModal}
        setShow={setShowModal}
      >
        { contentModal }
      </BasicModal> 
    </>
  )
}

function LeftComponent() {
  return (
    <Col className="auth__left" xs={6}>
      <img src={LogoBlue} alt="Twittor" />
      <div>
        <h2>
          <FontAwesomeIcon icon={faSearch} />
          Sigue lo te interesa
        </h2>
        <h2>
          <FontAwesomeIcon icon={faUsers} />
          Entérate de qué está hablando la gente
        </h2>
        <h2>
          <FontAwesomeIcon icon={faComment} />
          Únete a la conversación
        </h2>
      </div>
    </Col>
  )
}

function RightComponent(props) {

  const { openModal, setShowModal, setLoginState } = props;

  return (
    <Col className="auth__right" xs={6}>
      <div>
        <img src={LogoWhite} alt="Twittor" />
        <h2>Mira lo que pasa en el mundo en este momento.</h2>
        <h3>Únete a Twittor hoy mismo.</h3>
        <Button 
          variant="primary"
          onClick={() => openModal(
            <SignUpForm setShowModal={setShowModal} />
          )}
        >
          Registrate
        </Button>
        <Button 
          variant="outline-primary"
          onClick={() => openModal(
            <SignInForm 
              setShowModal={setShowModal} 
              setLoginState={setLoginState}
            />
          )}
        >
          Iniciar sesión
        </Button>
      </div>
    </Col>
  )
}
