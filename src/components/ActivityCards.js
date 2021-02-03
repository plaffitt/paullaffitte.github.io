import React from 'react';
import { connect } from 'react-redux'
import ActivityCard from './ActivityCard';

const ActivityCards = ({ categoryId, categories, activities }) => {
  const activitiesList = Object.values(activities[categoryId]);
  const category = categories[categoryId];

  return (
    <section className={ `activity-cards activities-${categoryId} cv-card mb-4` }>
      <h2 className="section-title">{ category }</h2>
      { activitiesList.map((activity, i) => <ActivityCard key={ i } { ...activity } />) }
    </section>
  );
};

const mapStateToProps = state => ({
  activities: state.activities,
  categories: state.categories,
});

export default connect(mapStateToProps)(ActivityCards);
