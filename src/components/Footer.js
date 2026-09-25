import React from 'react';

const Footer = ({ legal }) => (
  <footer id="legal" className="mt-4 pt-3">
    <h2 className="h6">Mentions légales</h2>
    <p>
      <small>
        { legal.name }, { legal.status.toLowerCase() }, SIRET { legal.siret }. { legal.address }.
        Contact : <a href={ 'mailto:' + legal.email }>{ legal.email }</a>.
      </small>
    </p>
    <p>
      <small>
        Hébergeur : <a href={ legal.host.url } target="_blank" rel="noopener">{ legal.host.name }</a>, { legal.host.address }.
      </small>
    </p>
  </footer>
);

export default Footer;
