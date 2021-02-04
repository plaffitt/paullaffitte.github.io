import React from 'react';
import { connect } from 'react-redux'
import SkillCard from './SkillCard'

const SkillCards = ({ categoryId, categories, skills }) => {
  const skillsList = Object.values(skills[categoryId]).sort((a, b) => (b.value - a.value));
  const category = categories[categoryId];

  return (
    <section className={ `mb-4 skill-cards skills-${categoryId}` }>
      <h4>{ category }</h4>
      { skillsList.map((skill, i) => <SkillCard key={ i } { ...skill } />) }
    </section>
  );
};

const mapStateToProps = state => ({
  skills: state.skills,
  categories: state.categories,
});

export default connect(mapStateToProps)(SkillCards)
