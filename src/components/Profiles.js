import React from 'react';

const Profiles = ({ profiles, website }) => {
  const entries = [
    !website ? null : {
      label: website,
      service: 'website',
      url: 'https://' + website,
      icon: '/assets/images/website.svg',
    },
    ...profiles,
  ].filter(Boolean);

  return (
    <ul id="profiles" className="mb-3">
      { entries.map(profile => (
        <li key={ profile.service } className={ 'profile-service-' + profile.service }>
          <img className="profile-icon" src={ profile.icon } alt="" />
          <a href={ profile.url } target="_blank" rel="noopener">{ profile.label }</a>
        </li>
      )) }
    </ul>
  );
};

export default Profiles;
