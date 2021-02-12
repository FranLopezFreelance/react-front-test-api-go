import React, { useState } from 'react';
import { Form, Button, Spinner} from 'react-bootstrap';
import { values, size } from 'lodash';
import { toast } from 'react-toastify';
import { isEmailValid } from '../../utils/functions';
import { signIn, setToken } from '../../api/auth';

export default function SignInForm(props) {

  const {setShowModal, setLoginState} = props;

  const [formData, setFormData] = useState(initialFormValue());
  const [signInLoading, setSignInLoading] = useState(false);

  const onChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    let validCount = 0;
    values(formData).some(value => {
      value && validCount ++;
      return null;
    });

    if (validCount !== size(formData)) {
      toast.warning("Faltan completar campos del formulario.");
    } else {
      if (!isEmailValid(formData.email)) {
        toast.warning("Email inválido.");
      } else {
        setSignInLoading(true);
        signIn(formData).then(res => {
          if (res.code) {
            toast.warning(res.message);
          } else {
            toast.success("Bienvenido!");
            setToken(res.token);
            setLoginState(true);
            setFormData(initialFormValue());
            setShowModal(false);
          }
        }).finally(() => {
          setSignInLoading(false);
        });
      }
    }
    // setShowModal(false);
  }

  return (
    <div className="sign-in-form">
      <h2>Ingresar</h2>
      <Form onChange={onChange} onSubmit={onSubmit} noValidate>
        <Form.Group>
          <Form.Control 
            type="email"
            placeholder="Email"
            name="email"
            defaultValue={formData.email} 
          />
          <Form.Control 
            type="password"
            name="password" 
            placeholder="Contraseña"
            defaultValue={formData.password}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          { !signInLoading ? 'Iniciar sesión' : <Spinner animation="border" /> }
        </Button>
      </Form>
    </div>
  )
}

function initialFormValue() {
  return {
    email: '',
    password: ''
  }
}
