import React from 'react';
import Text from './Text';

const ActivityCard = ({ title, role, location, from, to="aujourd'hui", description, link }) => {
  return (
    <article className="activity">
      <h3 className="activity-title">{ title }<small className="activity-role">, { role }</small></h3>
      <span><small>Localisation: { location } - de {from } à { to }</small></span>
      <hr/>
      <Text text={ description }/>
      <p><small>{ !link ? null : <>source : <a href={ link } target="_blank">{ link }</a></> }</small></p>
    </article>
  );
};

export default ActivityCard;
