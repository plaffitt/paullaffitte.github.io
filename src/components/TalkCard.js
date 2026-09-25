import React from 'react';
import Text from './Text';

const TalkCard = ({ title, event, location, date, description, link, thumbnail, speaker, speakerName }) => (
  <article className={ 'activity talk talk-' + speaker }>
    <h3 className="activity-title">{ title }</h3>
    <span><small>{ `${event}, ${location}, ${date}` }</small></span>
    { speaker === 'others' ? <span><small>{ ` · Par ${speakerName}` }</small></span> : null }
    <hr/>
    <div className="d-flex">
      <div className={ thumbnail ? 'w-75' : 'w-100' }>
        <Text text={ description } />
        <p><small><a href={ link } target="_blank" rel="noopener">Voir la vidéo</a></small></p>
      </div>
      { !thumbnail ? null :
        <a className="w-25 talk-thumbnail" href={ link } target="_blank" rel="noopener">
          <img src={ thumbnail } alt={ title } />
        </a>
      }
    </div>
  </article>
);

export default TalkCard;
