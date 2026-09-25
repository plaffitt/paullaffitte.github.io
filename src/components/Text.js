import React from 'react';

// Renders one paragraph per line. Free text never contains HTML.
const Text = ({ text }) => {
  const paragraphs = text.split('\n');
  return paragraphs.map((paragraph, i) => <p key={ i }>{ paragraph }</p>);
};

export default Text;
