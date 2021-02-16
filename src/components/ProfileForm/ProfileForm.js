import React, { useState, useCallback, useContext } from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import { useDropzone } from 'react-dropzone';
import { BASE_URL } from '../../utils/constants';
import { updateProfileInfo, uploadFIle } from '../../api/profile';
import { Camera } from '../../utils/icons';
import bannerDefault from '../../assets/img/default/banner-default.png';
import avatarDefault from '../../assets/img/default/avatar-default.png';
import { toast } from 'react-toastify';
import { AuthContext } from '../../utils/contexts';

import 'react-datepicker/dist/react-datepicker.css';

export default function ProfileForm(props) {
  const { user, profile, setShowModal } = props;
  const [formData, setFormData] = useState(initialValue(profile));
  const [bannerUrl, setBannerUrl] = useState(
    profile?.banner ? `${BASE_URL}/getBanner?id=${profile?.id}` : bannerDefault
  );
  const [avatarUrl, setAvatarUrl] = useState(
    profile?.avatar ? `${BASE_URL}/getAvatar?id=${profile?.id}` : avatarDefault
  );
  const [bannerFile, setBannerFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);

  const onDropBanner = useCallback((file) => {
    setBannerUrl(URL.createObjectURL(file[0]));
    setBannerFile(file[0]);
  }, []);

  const {
    getRootProps: getRootBannerProps,
    getInputProps: getInputBannerProps,
  } = useDropzone({
    accept: 'image/jpeg, image/jpg, image/png',
    noKeyboard: true,
    multiple: false,
    onDrop: onDropBanner,
  });

  const onDropAvatar = useCallback((file) => {
    setAvatarUrl(URL.createObjectURL(file[0]));
    setAvatarFile(file[0]);
  }, []);
  const {
    getRootProps: getRootAvatarProps,
    getInputProps: getInputAvatarProps,
  } = useDropzone({
    accept: 'image/jpeg, image/jpg, image/png',
    noKeyboard: true,
    multiple: false,
    onDrop: onDropAvatar,
  });

  registerLocale('es', es);
  setDefaultLocale('es');

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (bannerFile) {
      await uploadFIle(profile.id, bannerFile, 'banner')
        .then(() => {
          setUser({ ...user, banenr: bannerUrl });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (avatarFile) {
      await uploadFIle(profile.id, avatarFile, 'avatar')
        .then(() => {
          setUser({ ...user, avatar: avatarUrl });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    await updateProfileInfo(formData)
      .then(() => {
        setUser({ ...user, ...formData });
      })
      .catch((_) => {
        toast.error('No se pudo actualizar la información del perfil.');
      });
    setShowModal(false);
    setLoading(false);
    window.location.reload();
  };

  return (
    <div className="profile-form">
      <div
        className="banner"
        style={{ backgroundImage: `url('${bannerUrl}')` }}
        {...getRootBannerProps()}
      >
        <input {...getInputBannerProps()} />
        <Camera />
      </div>
      <div
        className="avatar"
        style={{ backgroundImage: `url('${avatarUrl}')` }}
        {...getRootAvatarProps()}
      >
        <input {...getInputAvatarProps()} />
        <Camera />
      </div>
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
        <Button type="submit">
          {loading && <Spinner animation="border" size="sm" />}
          Guardar
        </Button>
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
