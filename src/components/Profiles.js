import React from 'react';

const Profiles = ({ profiles }) => {
  return (
    <ul id="profiles" className="mb-3">
      { profiles.map(profile => (
        <li key={ profile.service } className={ 'profile-service-' + profile.service }>
          <img className="profile-icon" src={ profile.icon } /><a href={ profile.url } target="_blank">{ profile.label }</a>
        </li>
      )) }
    </ul>
  );
};

export default Profiles;
