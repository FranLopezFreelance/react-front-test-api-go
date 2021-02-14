import React from 'react';

export default function ProfileTitle(props) {
  const { profile } = props;
  return (
    <div className="profile-title">
      <h2>
        {profile
          ? `${profile?.name} ${profile?.lastName}`
          : 'Uusario inexistente'}
      </h2>
    </div>
  );
}
