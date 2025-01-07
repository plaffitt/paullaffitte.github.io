import React from 'react';

const ProfilePicture = ({ picture, fullname}) => {
  return (
    <div
      id="profile-picture"
      className="mb-3"
    >
      <img src={ picture } alt={ fullname } />
    </div>
  )
}

export default ProfilePicture;
