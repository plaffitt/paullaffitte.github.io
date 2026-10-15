import React from 'react';

// Numbered eyebrow ("01 / Offres") above a section title.
const SectionHead = ({ number, label, title, children }) => (
  <div className="section-head">
    <div>
      <p className="eyebrow">{ number } / { label }</p>
      <h2 className="section-title">{ title }</h2>
    </div>
    { children }
  </div>
);

export default SectionHead;
