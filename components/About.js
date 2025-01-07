import React, { useState } from 'react';
import Text from './Text';

const About = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="about">
      <Text text={ profile.bio }/>
    </div>
  );
};

export default About;
