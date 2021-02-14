import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoWhite from '../../assets/img/logos/logo-white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faUsers,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import { logOut } from '../../utils/functions';
import { AuthContext } from '../../utils/contexts';

export default function SideBar() {
  const { setUser, user } = useContext(AuthContext);

  const logout = () => {
    logOut();
    setUser(null);
  };

  return (
    <div className="side-bar">
      <img className="logo" src={LogoWhite} alt="Twittor" />
      <Link to="/">
        <FontAwesomeIcon icon={faHome} /> Inicio
      </Link>
      <Link to="/usuarios">
        <FontAwesomeIcon icon={faUsers} /> Usuarios
      </Link>
      <Link to={`/perfil/${user?._id}`}>
        <FontAwesomeIcon icon={faUser} /> Mi perfil
      </Link>
      <Link to="" onClick={logout}>
        <FontAwesomeIcon icon={faPowerOff} /> Cerrar Sesión
      </Link>
      <Button>Publicar</Button>
    </div>
  );
}
