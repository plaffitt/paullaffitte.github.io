import React from 'react';
import { connect } from 'react-redux';
import SectionHead from './SectionHead';
import ExternalLink from './ExternalLink';

const ProjectLinks = ({ links }) => links.length === 0 ? null : (
  <p className="project-links">
    { links.map(l => <ExternalLink key={ l.url } href={ l.url }>{ l.label } ↗</ExternalLink>) }
  </p>
);

// The first featured project: dark block, facts on the side.
const Spotlight = ({ project }) => (
  <article id={ project.id } className="spotlight">
    <div className="spotlight-main">
      <p className="project-role">{ project.role }</p>
      <h3 className="spotlight-title">{ project.name }</h3>
      <p className="spotlight-pitch">{ project.pitch }</p>
      <div className="button-row">
        <ExternalLink className="button button-dark-outline" href={ project.link }>GitHub ↗</ExternalLink>
        { project.links.map(l => <ExternalLink key={ l.url } className="button button-dark-outline" href={ l.url }>{ l.label } ↗</ExternalLink>) }
      </div>
    </div>
    <ul className="spotlight-facts">
      { project.facts.map((fact, i) => <li key={ i }>{ fact }</li>) }
    </ul>
  </article>
);

const ProjectCard = ({ project }) => (
  <article id={ project.id } className="project-card">
    <p className="project-role">{ project.role }</p>
    <h3 className="project-title"><ExternalLink href={ project.link }>{ project.name } ↗</ExternalLink></h3>
    <p className="project-pitch">{ project.pitch }</p>
    <ul className="project-facts">
      { project.facts.map((fact, i) => <li key={ i }>{ fact }</li>) }
    </ul>
    <ProjectLinks links={ project.links } />
  </article>
);

// Compact list: contributions show what was done, personal projects their pitch.
const ProjectList = ({ title, projects, describe }) => (
  <div>
    <h3 className="list-title">{ title }</h3>
    <ul className="rule-list">
      { projects.map(p => (
        <li key={ p.id } id={ p.id }>
          <ExternalLink className="mono-link" href={ p.link }>{ p.name }</ExternalLink>
          <p className="rule-list-text">{ describe(p) }</p>
          <ProjectLinks links={ p.links } />
        </li>
      )) }
    </ul>
  </div>
);

const Projects = ({ projects, starsReadOn }) => {
  const [spotlight, ...featured] = projects.filter(p => p.type === 'featured');

  return (
    <section id="projets" className="section container">
      <SectionHead number="02" label="Open source" title="Du code qui tourne en production" />
      <Spotlight project={ spotlight } />
      <div className="project-grid">
        { featured.map(p => <ProjectCard key={ p.id } project={ p } />) }
      </div>
      <div className="project-lists">
        <ProjectList
          title="Contributions à des projets tiers"
          projects={ projects.filter(p => p.type === 'contribution') }
          describe={ p => p.facts.join('. ') }
        />
        <ProjectList
          title="Projets personnels"
          projects={ projects.filter(p => p.type === 'personal') }
          describe={ p => p.pitch }
        />
      </div>
      <p className="note">Nombre d'étoiles relevé en { starsReadOn }.</p>
    </section>
  );
};

const mapStateToProps = state => ({
  projects: state.projects.projects,
  starsReadOn: state.projects.starsReadOn,
});

export default connect(mapStateToProps)(Projects);
