import React from 'react';
import { Row, Column, Form, Button, Spinner} from 'react-bootstrap';

export default function SignInForm(props) {

  const {setShowModal} = props;

  const onSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
  }

  return (
    <div className="sign-in-form">
      <h2>Ingresa</h2>
      <Form onSubmit={onSubmit}>
        <Button variant="primary" type="submit">
          Ingresar
        </Button>
      </Form>
    </div>
  )
}
