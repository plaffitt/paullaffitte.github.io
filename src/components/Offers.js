import React from 'react';
import { connect } from 'react-redux';
import SectionHead from './SectionHead';
import ExternalLink from './ExternalLink';

const Offer = ({ offer, index, projectsById }) => (
  <article className="offer">
    <div className="offer-number">{ String(index + 1).padStart(2, '0') }</div>
    <h3 className="offer-title">{ offer.title }</h3>
    <p className="offer-summary">{ offer.summary }</p>
    <ul className="plus-list">
      { offer.points.map((point, i) => <li key={ i }>{ point }</li>) }
    </ul>
    <ul className="chips" aria-label="Projets qui en témoignent">
      { offer.proofs.map(id => {
        const project = projectsById[id];
        return <li key={ id }><ExternalLink className="chip" href={ project.link }>{ project.id }</ExternalLink></li>;
      }) }
    </ul>
  </article>
);

const Offers = ({ offers, closing, projects }) => {
  const projectsById = Object.fromEntries(projects.map(p => [p.id, p]));

  return (
    <section id="offres" className="section section-alt">
      <div className="container">
        <SectionHead number="01" label="Offres" title="Ce que je fais pour vous">
          <p className="section-aside">{ closing }</p>
        </SectionHead>
        <div className="offers">
          { offers.map((offer, i) => <Offer key={ offer.id } offer={ offer } index={ i } projectsById={ projectsById } />) }
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  offers: state.offers.offers,
  closing: state.offers.closing,
  projects: state.projects.projects,
});

export default connect(mapStateToProps)(Offers);
