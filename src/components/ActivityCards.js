import React from 'react';
import { connect } from 'react-redux'
import ActivityCard from './ActivityCard';

const ActivityCards = ({ categoryId, categories, activities }) => {
  const category = categories[categoryId];

  return (
    <section className={ `activity-cards cv-card mb-4` }>
      <h2 className="section-title">{ category }</h2>
      { Object.entries(activities[categoryId]).map(([id, activity]) => <ActivityCard key={ id } { ...activity } />) }
    </section>
  );
};

const mapStateToProps = state => ({
  activities: state.activities,
  categories: state.categories,
});

export default connect(mapStateToProps)(ActivityCards);
