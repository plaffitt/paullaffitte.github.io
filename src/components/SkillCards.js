import React from 'react';
import { connect } from 'react-redux';

const SkillCards = ({ groups, languages }) => (
  <section id="skills" className="cv-card mb-4">
    <div className="skill-groups">
      { groups.map(group => (
        <div key={ group.title } className="skill-cards">
          <h2>{ group.title }</h2>
          <p>{ group.items.join(', ') }</p>
        </div>
      )) }
      <div className="skill-cards">
        <h2>Langues</h2>
        { languages.map(language => <p key={ language }>{ language }</p>) }
      </div>
    </div>
  </section>
);

const mapStateToProps = state => ({
  groups: state.skills.groups,
  languages: state.skills.languages,
});

export default connect(mapStateToProps)(SkillCards);
