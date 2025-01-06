import React from 'react';
import Text from './Text';

// TODO: add related skills
const ActivityCard = ({ title, role, location, from, to="aujourd'hui", description, link }) => {
  return (
    <article className="activity">
      <h3 className="activity-title">{ title }<small className="activity-role">, { role }</small></h3>
      <span><small>Localisation: { location } - de {from } à { to }</small></span>
      <p>{ !link ? null : <a href={ 'https://' + link } target="_blank">{ link }</a> }</p>
      <hr/>
      <Text text={ description }/>
    </article>
  );
};

export default ActivityCard;
