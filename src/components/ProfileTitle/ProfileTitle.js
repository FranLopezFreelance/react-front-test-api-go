import React from 'react';

export default function ProfileTitle(props) {
  const { profile } = props;
  return (
    <div className="profile-title">
      {!profile && <h2>Usuario inexistente</h2>}
    </div>
  );
}
