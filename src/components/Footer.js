import React from 'react';
import ExternalLink from './ExternalLink';

const Footer = ({ legal }) => (
  <footer id="legal" className="legal">
    <h2 className="legal-title">Mentions légales</h2>
    <p>
      { legal.name }, { legal.status.toLowerCase() }, SIRET { legal.siret }. { legal.address }.
      Contact : <a href={ 'mailto:' + legal.email }>{ legal.email }</a>.
    </p>
    <p>
      Hébergeur : <ExternalLink href={ legal.host.url }>{ legal.host.name }</ExternalLink>, { legal.host.address }.
    </p>
  </footer>
);

export default Footer;
