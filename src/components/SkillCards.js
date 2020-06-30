import React from 'react';
import { connect } from 'react-redux'
import { fetchCategoryById } from '../slices/cv.js';
import { fetchSkills } from '../slices/cv.js';

// {% assign category = site.data.categories[include.category] %}
// {% assign skills = site.data.skills[include.category] %}

// <section class="mb-4 skill-cards skills-{{include.category}}">
//   <h4>{{ category.label }}</h4>
//   {% for skill in skills %}
//     {% if skill.hidden != true %}
//       {% include skillCard.html category=category skill=skill %}
//     {% endif %}
//   {% endfor %}
// </section>


const SkillCards = ({ category, categories, skills }) => {
  return (
    <section class={ `mb-4 skill-cards skills-${category}` }>
    </section>
  );
};


const mapStateToProps = state => ({
  skills: state.cv.skills,
  categories: state.cv.categories,
});

const mapDispatchToProps = dispatch => ({
  fetchSkills: () => dispatch(fetchSkills()),
  fetchCategoryById: () => dispatch(fetchCategoryById()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SkillCards)
