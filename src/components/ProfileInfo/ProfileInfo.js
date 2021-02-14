import React from 'react';
import moment from 'moment';
import localization from 'moment/locale/es';
import { Location, Link, BirthDate } from '../../utils/icons';

export default function ProfileInfo(props) {
  const { profile } = props;

  return (
    <div className="profile-info">
      <h2 className="profile-info__name">
        {profile?.name} {profile?.lastName}
      </h2>
      <p className="profile-info__email">{profile?.email}</p>
      {profile?.biography && (
        <div className="profile-info__biography">{profile.biography}</div>
      )}
      <div className="profile-info__more-info">
        {profile?.birthDate && (
          <p>
            <BirthDate />
            {moment(profile.birthDate)
              .add('hours', 3)
              .locale('es', localization)
              .format('LL')}
          </p>
        )}
        {profile?.location && (
          <p>
            <Location />
            {profile.location}
          </p>
        )}
        {profile?.webSite && (
          <>
            <Link />
            <a href={profile.webSite} target="_blank" rel="noreferrer">
              {profile.webSite}
            </a>
          </>
        )}
      </div>
    </div>
  );
}
