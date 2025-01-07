import React from 'react';

const Text = ({ text }) => {
  const paragraphs = text.split('\n');
  return paragraphs.map((text, i) => <p key={ i } dangerouslySetInnerHTML={{ __html: text }}></p>);
};

export default Text;
