import React from 'react';

const Profiles = ({ profiles, website, emailAddress, phoneNumber }) => {
  website = website.split('#').pop().split('?').pop();
  profiles = [
    !website ? null : {
      label: website,
      service: 'website',
      url: 'https://' + website,
      icon: '/assets/images/website.svg',
    },
    !emailAddress ? null : {
      label: emailAddress,
      service: 'mail',
      url: 'mailto:' + emailAddress,
      icon: '/assets/images/email.svg',
    },
    !phoneNumber ? null : {
      label: phoneNumber,
      service: 'phone',
      url: 'tel:' + phoneNumber,
      icon: '/assets/images/phone.svg',
    },
    ...profiles,
  ].filter(Boolean);

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
