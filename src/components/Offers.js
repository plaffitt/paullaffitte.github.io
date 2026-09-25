import React from 'react';
import { connect } from 'react-redux';

const Offer = ({ offer, projectsById }) => (
  <article className="offer">
    <h3 className="offer-title">{ offer.title }</h3>
    <p className="offer-summary">{ offer.summary }</p>
    <ul className="offer-points">
      { offer.points.map((point, i) => <li key={ i }>{ point }</li>) }
    </ul>
    <p className="offer-proofs">
      <small>
        Preuves :{ ' ' }
        { offer.proofs.map((id, i) => {
          const project = projectsById[id];
          return (
            <span key={ id }>
              { i > 0 ? ', ' : '' }
              <a href={ project.link } target="_blank" rel="noopener">{ project.name }</a>
            </span>
          );
        }) }
      </small>
    </p>
  </article>
);

const Offers = ({ offers, closing, projects }) => {
  const projectsById = Object.fromEntries(projects.map(p => [p.id, p]));

  return (
    <section id="offers" className="cv-card mb-4">
      <h2 className="section-title">Ce que je fais pour vous</h2>
      <div className="offers-grid">
        { offers.map(offer => <Offer key={ offer.id } offer={ offer } projectsById={ projectsById } />) }
      </div>
      <p className="offers-closing">{ closing }</p>
    </section>
  );
};

const mapStateToProps = state => ({
  offers: state.offers.offers,
  closing: state.offers.closing,
  projects: state.projects.projects,
});

export default connect(mapStateToProps)(Offers);
