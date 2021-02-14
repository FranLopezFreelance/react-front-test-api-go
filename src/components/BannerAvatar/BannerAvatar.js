import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import bannerUrl from '../../assets/img/default/banner-default.jpg';
// import avatarUrl from '../../assets/img/avatar-default.png';
import avatarUrl from '../../assets/img/avatar-fran.png';
import InfoModal from '../../components/Modals/InfoModal';
import ProfileForm from '../ProfileForm';

export default function BannerAvatar(props) {
  const { profile, user } = props;
  const [showModal, setShowModal] = useState(false);
  return (
    <div
      className="banner-avatar"
      style={{ backgroundImage: `url('${bannerUrl}')` }}
    >
      <div
        className="avatar"
        style={{ backgroundImage: `url('${avatarUrl}')` }}
      ></div>

      {profile && (
        <div className="actions">
          {user._id === profile.id && (
            <Button onClick={() => setShowModal(true)}>Editar Pefil</Button>
          )}
          {user._id !== profile.id && <Button>Seguir</Button>}
        </div>
      )}
      <InfoModal show={showModal} setShow={setShowModal} title="Editar Perfil">
        <ProfileForm profile={profile} setShowModal={setShowModal} />
      </InfoModal>
    </div>
  );
}
