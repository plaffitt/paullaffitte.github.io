import React from 'react';
import Text from './Text';
import ExternalLink from './ExternalLink';

const ActivityCard = ({ title, role, location, from, to, summary, highlights, links }) => (
  <article className="dated-row">
    <div className="dated-row-date">
      <p>{ `${from} → ${to ?? "aujourd'hui"}` }</p>
      <p className="dated-row-place">{ location }</p>
    </div>
    <div className="dated-row-body">
      <h3 className="activity-title">{ title } <span className="activity-role">· { role }</span></h3>
      <div className="activity-summary">
        <Text text={ summary } />
      </div>
      { highlights.length === 0 ? null :
        <ul className="activity-highlights">
          { highlights.map((h, i) => <li key={ i }>{ h }</li>) }
        </ul>
      }
      { links.length === 0 ? null :
        <p className="project-links">
          { links.map(l => <ExternalLink key={ l.url } href={ l.url }>{ l.label } ↗</ExternalLink>) }
        </p>
      }
    </div>
  </article>
);

export default ActivityCard;
