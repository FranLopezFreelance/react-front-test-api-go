import React from 'react';
import { Button } from 'react-bootstrap';
import bannerUrl from '../../assets/img/default/banner-default.jpg';
// import avatarUrl from '../../assets/img/avatar-default.png';
import avatarUrl from '../../assets/img/avatar-fran.png';

export default function BannerAvatar(props) {
  const { profile, user } = props;

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
          {user._id === profile.id && <Button>Editar Pefil</Button>}
          {user._id !== profile.id && <Button>Seguir</Button>}
        </div>
      )}
    </div>
  );
}
