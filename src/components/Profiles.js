import React from 'react';

const Profiles = ({ profiles }) => {
  return (
    <ul id="profiles" class="mb-3">
      { profiles.map(profile => (
        <li class={ 'profile-service-' + profile.service }>
          <img class="profile-icon" src={ profile.icon } /><a href={ profile.url } target="_blank">{ profile.label }</a>
        </li>
      )) }
    </ul>
  );
};

export default Profiles;
