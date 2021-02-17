import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import bannerDefault from '../../assets/img/default/banner-default.png';
import avatarDefault from '../../assets/img/default/avatar-default.png';
import InfoModal from '../../components/Modals/InfoModal';
import ProfileForm from '../ProfileForm';
import { BASE_URL } from '../../utils/constants';
import { getRelation, follow, unfollow } from '../../api/relations';

export default function BannerAvatar(props) {
  const { profile, user } = props;
  const [showModal, setShowModal] = useState(false);
  const [following, setFollowing] = useState(null);

  useEffect(() => {
    getRelation(profile?.id).then((res) => {
      if (res.status) {
        setFollowing(true);
      } else {
        setFollowing(false);
      }
    });
  }, [profile]);

  function setUnfollowUser() {
    unfollow(profile?.id).then(() => {
      setFollowing(false);
    });
  }

  function setFollowUser() {
    follow(profile?.id).then(() => {
      setFollowing(true);
    });
  }

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
          {user._id !== profile.id &&
            following !== null &&
            (following === true ? (
              <Button onClick={() => setUnfollowUser()}>Dejar de seguir</Button>
            ) : (
              <Button onClick={() => setFollowUser()}>Seguir</Button>
            ))}
        </div>
      )}
      <InfoModal show={showModal} setShow={setShowModal} title="Editar Perfil">
        <ProfileForm
          user={user}
          profile={profile}
          setShowModal={setShowModal}
        />
      </InfoModal>
    </div>
  );
}
