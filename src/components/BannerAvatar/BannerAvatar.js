import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Camera } from '../../utils/icons';
import bannerDefault from '../../assets/img/default/banner-default.png';
import avatarDefault from '../../assets/img/default/avatar-default.png';
import InfoModal from '../../components/Modals/InfoModal';
import ProfileForm from '../ProfileForm';
import { BASE_URL } from '../../utils/constants';

export default function BannerAvatar(props) {
  const { profile, user } = props;
  const [showModal, setShowModal] = useState(false);

  function showBanner() {
    if (profile?.banner) {
      return `${BASE_URL}/getBanner?id=${profile.id}`;
    } else {
      return bannerDefault;
    }
  }

  function showAvatar() {
    if (profile?.avatar) {
      return `${BASE_URL}/getAvatar?id=${profile.id}`;
    } else {
      return avatarDefault;
    }
  }

  return (
    <div
      className="banner-avatar"
      style={{ backgroundImage: `url('${showBanner()}')` }}
    >
      <div
        className="avatar"
        style={{ backgroundImage: `url('${showAvatar()}')` }}
      ></div>

      {profile && (
        <div className="actions">
          {user._id === profile.id && (
            <Button onClick={() => setShowModal(true)}>Editar Pefil</Button>
          )}
          {user._id !== profile.id && <Button>Seguir</Button>}
        </div>
      )}
      <Button className="banner-edit" variant="outline-light">
        <Camera />
      </Button>
      <InfoModal show={showModal} setShow={setShowModal} title="Editar Perfil">
        <ProfileForm profile={profile} setShowModal={setShowModal} />
      </InfoModal>
    </div>
  );
}
