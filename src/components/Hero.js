import React from 'react';
import Text from './Text';

const Hero = ({ profile }) => {
  const fullname = profile.firstname + ' ' + profile.lastname;

  return (
    <header id="hero" className="mb-2">
      <h1 className="mb-2">{ fullname }</h1>
      <p className="hero-headline">{ profile.headline }</p>
      <div className="hero-tagline">
        <Text text={ profile.tagline } />
      </div>
      <p className="hero-actions">
        <a className="btn btn-primary btn-lg" href={ profile.bookingUrl } target="_blank" rel="noopener">
          { profile.bookingLabel }
        </a>
        <a className="btn btn-link" href={ 'mailto:' + profile.emailAddress }>{ profile.emailAddress }</a>
      </p>
      <p className="hero-mission"><small>{ profile.missionFrame }</small></p>
    </header>
  );
};

export default Hero;
