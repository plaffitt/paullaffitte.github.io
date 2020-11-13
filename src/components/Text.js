import React from 'react';

const Text = ({ text }) => {
  const paragraphs = text.split('\n');
  return paragraphs.map((text, i) => <p key={ i }>{ text }</p>);
};

export default Text;
