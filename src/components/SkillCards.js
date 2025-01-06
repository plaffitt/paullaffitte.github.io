import React from 'react';
import { connect } from 'react-redux'

const SkillCards = ({ categoryId, categories, skills, className }) => {
  const skillsList = Object.values(skills[categoryId]).sort((a, b) => (b.value - a.value));
  const category = categories[categoryId];

  return (
    <section className={ `skill-cards skills-${categoryId} ${className}` }>
      <h2>{ category }</h2>
        { skillsList.map((skill, i) => <p key={ i }>{ skill }</p>) }
    </section>
  );
};

const mapStateToProps = state => ({
  skills: state.skills,
  categories: state.categories,
});

export default connect(mapStateToProps)(SkillCards)
