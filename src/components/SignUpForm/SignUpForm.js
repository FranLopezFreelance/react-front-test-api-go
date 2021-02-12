import React, { useState } from 'react'
import { Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import { values, size } from 'lodash';
import { toast } from 'react-toastify';
import { isEmailValid } from '../../utils/functions';
import { signUp } from '../../api/auth';

export default function SignUpForm(props) {

  const {setShowModal} = props;

  const [formData, setFormData] = useState(initialFormValue());

  const [signUpLoading, setSignUpLoading] = useState(false);

  const onChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    let validCount = 0;
    values(formData).some(value => {
      value && validCount++;
      return null;
    });

    if (validCount !== size(formData)) {
      toast.warning("Faltan completar campos del formulario.");
    } else {
      if (!isEmailValid(formData.email)) {
        toast.warning("Email inválido.");
      } else if (formData.password !== formData.repeatPassword) {
        toast.warning("Las contraseñas no coinciden.");
      } else if (size(formData.password) < 6) {
        toast.warning("Las contraseñas debe ser de al menos 6 caractéres.");
      } else {  
        setSignUpLoading(true);
        signUp(formData).then(res => {
          if (res.code) {
            toast.warning(res.message);
          } else {
            toast.success("El registro ha sido correcto.");
            setFormData(initialFormValue())
            setShowModal(false);
          }
        }).catch((err) => {
          toast.error("Error del servidor");
        }).finally(() => {
          setSignUpLoading(false);
        });
      }
    }
  }

  return (
    <div className="sign-up-form">
      <h2>Crea tu cuenta</h2>
      <Form onChange={onChange} onSubmit={onSubmit} noValidate>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control 
                type="text"
                placeholder="Nombre"
                name="name"
                defaultValue={formData.name}
              />
            </Col>
            <Col>
              <Form.Control 
                type="text"
                placeholder="Apellido"
                name="lastName"
                defaultValue={formData.lastName}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Control 
            type="email"
            placeholder="Email"
            name="email"
            defaultValue={formData.email}
          />
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control 
                type="password"
                placeholder="Contraseña"
                name="password"
                defaultValue={formData.password}
              />
            </Col>
            <Col>
              <Form.Control 
                type="password"
                placeholder="Repetir Cotraseña"
                name="repeatPassword"
                defaultValue={formData.repeatPassword}
              />
            </Col>
          </Row>
        </Form.Group>
        <Button variant="primary" type="submit">
          { !signUpLoading ? 'Registrarme' : <Spinner animation="border" /> }
        </Button>
      </Form>
    </div>
  )
}

function initialFormValue() {
  return {
    name: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: ''
  }
}
