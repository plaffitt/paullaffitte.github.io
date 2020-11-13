import React, { useState } from 'react';
import { Collapse } from 'reactstrap';

const About = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [bio, ...bioMore] = profile.bio.split('\n');

  return (
    <div className="about">
      <p>{ bio }</p>
      <Collapse isOpen={ isOpen }>
        { bioMore.map((text, i) => <p key={ i }>{ text }</p> )}
      </Collapse>
      <small className="toggle-more" onClick={ toggle }>{ isOpen ? 'less' : 'more' }...</small>
    </div>
  );
};

export default About;
