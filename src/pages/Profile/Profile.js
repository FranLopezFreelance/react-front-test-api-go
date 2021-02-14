import React, { useContext, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../../utils/contexts';
import MainLayout from '../../layouts/MainLayout';
import { withRouter } from 'react-router-dom';
import { viewProfile } from '../../api/profile';
import { toast } from 'react-toastify';
import BannerAvatar from '../../components/BannerAvatar';
import PageSpinner from '../../components/PageSpinner';
import ProfileTweets from '../../components/ProfileTweets/ProfileTweets';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';

function Profile(props) {
  const { params } = props.match;
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    viewProfile(params.id)
      .then((res) => {
        if (!res) toast.error('El usuario no existe');
        setProfile(res);
        setLoading(false);
      })
      .catch(() => {
        toast.warn('No se pudieron obtener los datos del usuario.');
        setLoading(false);
      });
  }, [params]);

  return (
    <MainLayout className="profile">
      {loading ? (
        <PageSpinner />
      ) : (
        <ViewProfile profile={profile} user={user} />
      )}
    </MainLayout>
  );
}

function ViewProfile(props) {
  const { profile, user } = props;

  return (
    <>
      <BannerAvatar profile={profile} user={user} />
      <ProfileInfo profile={profile} />
      <ProfileTweets profile={profile} />
    </>
  );
}

export default withRouter(Profile);
