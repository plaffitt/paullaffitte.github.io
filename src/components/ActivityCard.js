import React from 'react';
import Text from './Text';

const ActivityCard = ({ title, role, location, from, to, summary, highlights, links }) => (
  <article className="activity">
    <h3 className="activity-title">{ title }<small className="activity-role">{ `, ${role}` }</small></h3>
    <span><small>{ `${location}, de ${from} à ${to ?? "aujourd'hui"}` }</small></span>
    <hr/>
    <Text text={ summary } />
    { highlights.length === 0 ? null :
      <ul className="activity-highlights">
        { highlights.map((h, i) => <li key={ i }>{ h }</li>) }
      </ul>
    }
    { links.length === 0 ? null :
      <p className="activity-links">
        <small>
          { links.map((l, i) => (
            <span key={ l.url }>
              { i > 0 ? ' · ' : '' }
              <a href={ l.url } target="_blank" rel="noopener">{ l.label }</a>
            </span>
          )) }
        </small>
      </p>
    }
  </article>
);

export default ActivityCard;
