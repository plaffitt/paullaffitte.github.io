import React from 'react';
import Text from './Text';

const About = ({ bio }) => (
  <div id="about" className="about">
    <Text text={ bio } />
  </div>
);

export default About;
