import React from 'react';
import { connect } from 'react-redux'
import ActivityCard from './ActivityCard';

const ActivityCards = ({ categoryId, categories, activities }) => (
  <div className="activity-group">
    <h3 className="list-title">{ categories[categoryId] }</h3>
    <div className="dated-rows">
      { Object.entries(activities[categoryId]).map(([id, activity]) => <ActivityCard key={ id } { ...activity } />) }
    </div>
  </div>
);

const mapStateToProps = state => ({
  activities: state.activities,
  categories: state.categories,
});

export default connect(mapStateToProps)(ActivityCards);
