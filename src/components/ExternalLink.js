import React from 'react';

// Link to another site, opened in a new tab.
const ExternalLink = ({ href, className, children, ...props }) => (
  <a href={ href } className={ className } target="_blank" rel="noopener" { ...props }>{ children }</a>
);

export default ExternalLink;
