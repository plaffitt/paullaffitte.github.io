import React from 'react';
import { connect } from 'react-redux';
import SectionHead from './SectionHead';
import TalkCard from './TalkCard';
import Articles from './Articles';

const Talks = ({ talks }) => (
  <section id="talks" className="section section-alt">
    <div className="container">
      <SectionHead number="03" label="Talks et articles" title="J'explique ce que je construis" />
      <div className="dated-rows">
        { talks.map((talk, i) => <TalkCard key={ i } { ...talk } />) }
      </div>
      <Articles />
    </div>
  </section>
);

const mapStateToProps = state => ({ talks: state.talks });

export default connect(mapStateToProps)(Talks);
