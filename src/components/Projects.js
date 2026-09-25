import React from 'react';
import { connect } from 'react-redux';

const ProjectCard = ({ project }) => (
  <article className={ 'project project-' + project.type }>
    <h3 className="project-title">
      <a href={ project.link } target="_blank" rel="noopener">{ project.name }</a>
      <small className="project-role">, { project.role.toLowerCase() }</small>
    </h3>
    <p className="project-pitch">{ project.pitch }</p>
    <ul className="project-facts">
      { project.facts.map((fact, i) => <li key={ i }>{ fact }</li>) }
    </ul>
    { project.links.length === 0 ? null :
      <p className="project-links">
        <small>
          { project.links.map((l, i) => (
            <span key={ l.url }>
              { i > 0 ? ' · ' : '' }
              <a href={ l.url } target="_blank" rel="noopener">{ l.label }</a>
            </span>
          )) }
        </small>
      </p>
    }
  </article>
);

const GROUPS = [
  { type: 'featured', title: 'Projets open source' },
  { type: 'contribution', title: 'Contributions à des projets tiers' },
  { type: 'personal', title: 'Projets personnels' },
];

const Projects = ({ projects, starsReadOn }) => (
  <section id="projects" className="cv-card mb-4">
    { GROUPS.map(group => (
      <div key={ group.type } className="project-group">
        <h2 className="section-title">{ group.title }</h2>
        { projects.filter(p => p.type === group.type).map(p => <ProjectCard key={ p.id } project={ p } />) }
      </div>
    )) }
    <p className="projects-note"><small>Nombre d'étoiles relevé en { starsReadOn }.</small></p>
  </section>
);

const mapStateToProps = state => ({
  projects: state.projects.projects,
  starsReadOn: state.projects.starsReadOn,
});

export default connect(mapStateToProps)(Projects);
