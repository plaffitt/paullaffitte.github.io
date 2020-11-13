import React from 'react';
import Text from './Text';

// TODO: add related skills
const ActivityCard = ({ title, role, location, from, to, description }) => {
  return (
    <article className="activity">
      <h3 className="activity-title">{ title }<small className="activity-role">, { role }</small></h3>
      <span><small>Location: { location } - from {from } to { to }</small></span>
      <hr/>
      <Text text={ description }/>
    </article>
  );
};

export default ActivityCard;
