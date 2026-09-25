import React from 'react';
import { connect } from 'react-redux';
import TalkCard from './TalkCard';

const Talks = ({ talks }) => (
  <section id="talks" className="activity-cards cv-card mb-4">
    <h2 className="section-title">Conférences</h2>
    { talks.map((talk, i) => <TalkCard key={ i } { ...talk } />) }
  </section>
);

const mapStateToProps = state => ({ talks: state.talks });

export default connect(mapStateToProps)(Talks);
