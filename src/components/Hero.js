import React from 'react';
import Text from './Text';
import ExternalLink from './ExternalLink';
import { ArrowIcon, serviceIcons } from './Icons';

// The first "Kubernetes" of the headline takes the accent color.
const Headline = ({ text }) => {
  const word = 'Kubernetes';
  const at = text.indexOf(word);
  if (at < 0) return <h1 className="hero-title">{ text }</h1>;

  return (
    <h1 className="hero-title">
      { text.slice(0, at) }<span className="accent">{ word }</span>{ text.slice(at + word.length) }
    </h1>
  );
};

const ProfileCard = ({ profile, fullname }) => {
  const links = [
    ...profile.profiles,
    { service: 'website', label: profile.website, url: 'https://' + profile.website },
  ];

  return (
    <div className="profile-card">
      { /* src/index.js makes the picture follow the mouse with a spring */ }
      <div id="profile-picture">
        <img src={ profile.picture } alt={ 'Portrait de ' + fullname } width="460" height="460" />
      </div>
      <div className="profile-card-footer">
        <div>
          <div className="profile-name">{ fullname }</div>
          <ExternalLink className="profile-website" href={ 'https://' + profile.website }>{ profile.website }</ExternalLink>
        </div>
        <ul className="profile-links">
          { links.map(link => {
            const Icon = serviceIcons[link.service];
            return (
              <li key={ link.service }>
                <ExternalLink className="icon-button" href={ link.url } aria-label={ `${link.service} : ${link.label}` }><Icon /></ExternalLink>
              </li>
            );
          }) }
        </ul>
      </div>
    </div>
  );
};

const Hero = ({ profile }) => {
  const fullname = profile.firstname + ' ' + profile.lastname;

  return (
    <section id="top" className="hero container">
      <div className="hero-main">
        <div className="hero-text">
          <p className="hero-eyebrow"><span className="nav-mark" aria-hidden="true"></span>{ fullname } · { profile.location } et télétravail</p>
          <Headline text={ profile.headline } />
          <div className="hero-tagline">
            <Text text={ profile.tagline } />
          </div>
          <div className="button-row">
            <ExternalLink className="button button-accent" href={ profile.bookingUrl }>{ profile.bookingLabel }<ArrowIcon /></ExternalLink>
            <a className="button button-outline" href={ 'mailto:' + profile.emailAddress }>{ profile.emailAddress }</a>
          </div>
          <p className="hero-mission">{ profile.missionFrame }</p>
        </div>
        <ProfileCard profile={ profile } fullname={ fullname } />
      </div>
      <ul className="highlights">
        { profile.highlights.map(h => (
          <li key={ h.value } className="highlight">
            <span className="highlight-value">{ h.value }</span>
            <span className="highlight-label">{ h.label }</span>
          </li>
        )) }
      </ul>
    </section>
  );
};

export default Hero;
