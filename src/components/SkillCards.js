import React from 'react';
import { connect } from 'react-redux';

const SkillCards = ({ groups, languages }) => (
  <div id="skills" className="skills">
    { groups.map(group => (
      <div key={ group.title }>
        <h3 className="list-title">{ group.title }</h3>
        <p>{ group.items.join(', ') }</p>
      </div>
    )) }
    <div>
      <h3 className="list-title">Langues</h3>
      { languages.map(language => <p key={ language }>{ language }</p>) }
    </div>
  </div>
);

const mapStateToProps = state => ({
  groups: state.skills.groups,
  languages: state.skills.languages,
});

export default connect(mapStateToProps)(SkillCards);
