import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import { useDropzone } from 'react-dropzone';

import 'react-datepicker/dist/react-datepicker.css';

export default function ProfileForm(props) {
  const { profile, setShowModal } = props;
  const [formData, setFormData] = useState(initialValue(profile));
  registerLocale('es', es);
  setDefaultLocale('es');

  console.log(profile);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    console.log(formData);
  };

  return (
    <div className="profile-form">
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Nombre"
                name="name"
                defaultValue={formData.name}
                onChange={onChange}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Apellido"
                name="lastName"
                defaultValue={formData.lastName}
                onChange={onChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <DatePicker
                placeholder="Fecha de Nacimiento"
                locale="es"
                dateFormat="dd/MM/yyyy"
                selected={new Date(formData.birthDate)}
                onChange={(date) =>
                  setFormData({ ...formData, birthDate: date })
                }
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Ubicación"
                name="location"
                defaultValue={formData.location}
                onChange={onChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Sitio Web"
            name="webSite"
            defaultValue={formData.webSite}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="textarea"
            row="3"
            placeholder="Cuéntanos sobre ti ..."
            name="biography"
            defaultValue={formData.biography}
            onChange={onChange}
          />
        </Form.Group>
        <Button type="submit">Guardar</Button>
      </Form>
    </div>
  );
}

function initialValue(profile) {
  return {
    name: profile.name || '',
    lastName: profile.lastName || '',
    location: profile.location || '',
    biography: profile.biography || '',
    webSite: profile.webSite || '',
    birthDate: profile.birthDate || '',
  };
}
