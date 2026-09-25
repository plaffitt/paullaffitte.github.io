import React from 'react';
import Text from './Text';

const About = ({ bio }) => (
  <section id="about" className="about cv-card mb-4">
    <h2 className="section-title">À propos</h2>
    <div className="about-body">
      <Text text={ bio } />
    </div>
  </section>
);

export default About;
