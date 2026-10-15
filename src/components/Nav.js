import React from 'react';

const LINKS = [
  { id: 'offres', label: 'Offres' },
  { id: 'projets', label: 'Projets' },
  { id: 'talks', label: 'Talks' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'contact', label: 'Contact' },
];

const Nav = ({ profile }) => (
  <header className="site-header">
    <nav className="nav container" aria-label="Navigation principale">
      <a className="nav-brand" href="#top"><span className="nav-mark" aria-hidden="true"></span>plaffitt</a>
      <div className="nav-links">
        { LINKS.map(link => <a key={ link.id } className="nav-link" href={ '#' + link.id }>{ link.label }</a>) }
        <a className="button button-dark button-small" href={ profile.bookingUrl } target="_blank" rel="noopener">{ profile.bookingLabel }</a>
      </div>
    </nav>
  </header>
);

export default Nav;
