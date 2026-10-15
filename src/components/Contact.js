import React from 'react';
import ExternalLink from './ExternalLink';
import Footer from './Footer';
import { ArrowIcon } from './Icons';

const Contact = ({ profile, legal }) => (
  <section id="contact" className="contact">
    <div className="container">
      <div className="contact-main">
        <div className="contact-text">
          <p className="eyebrow eyebrow-dark">05 / Contact</p>
          <h2 className="contact-title">{ profile.contactTitle }</h2>
          <p className="contact-mission">{ profile.missionFrame }</p>
        </div>
        <div className="contact-actions">
          <ExternalLink className="button button-light" href={ profile.bookingUrl }>{ profile.bookingLabel }<ArrowIcon /></ExternalLink>
          <a className="button button-dark-outline button-mono" href={ 'mailto:' + profile.emailAddress }>{ profile.emailAddress }</a>
        </div>
      </div>
      <Footer legal={ legal } />
    </div>
  </section>
);

export default Contact;
