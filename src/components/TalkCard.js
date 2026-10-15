import React from 'react';
import Text from './Text';
import ExternalLink from './ExternalLink';

const TalkCard = ({ title, event, location, date, description, link, speaker, speakerName }) => (
  <article className={ 'dated-row talk-' + speaker }>
    <p className="dated-row-date">{ date }</p>
    <div className="dated-row-body">
      <h3 className="talk-title"><ExternalLink href={ link }>{ title } ↗</ExternalLink></h3>
      <p className="talk-meta">
        { `${event}, ${location}` }
        { speaker === 'others' ? ` · Par ${speakerName}` : null }
      </p>
      <div className="talk-description">
        <Text text={ description } />
      </div>
    </div>
  </article>
);

export default TalkCard;
