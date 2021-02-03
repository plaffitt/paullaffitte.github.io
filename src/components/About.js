import React, { useState } from 'react';
import { Collapse } from 'reactstrap';
import Text from './Text';

const About = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [bio, ...bioMore] = profile.bio.split('\n');

  return (
    <div className="about">
      <p>{ bio }</p>
      <Collapse isOpen={ isOpen }>
        <Text text={ bioMore.join('\n') }/>
      </Collapse>
      <small className="toggle-more" onClick={ toggle }>{ isOpen ? 'less' : 'more' }...</small>
    </div>
  );
};

export default About;
