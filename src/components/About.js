import React, { useState } from 'react';
import { Collapse } from 'reactstrap';

const About = ({ profile, more }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="about">
      <p>{ profile.bio }</p>
      { more
        ? (<p>profile.bioMore</p>)
        : (
          <React.Fragment>
            <Collapse isOpen={ isOpen }>
              <p>{ profile.bioMore }</p>
            </Collapse>
            <small className="toggle-more" onClick={toggle}>{ isOpen ? 'less' : 'more' }...</small>
          </React.Fragment>
        )
      }
    </div>
  );
};

export default About;
