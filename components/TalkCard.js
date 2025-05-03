import React from 'react';
import Text from './Text';

const TalkCard = ({ title, location, date, description, link, thumbnail }) => {
  return (
    <article className="activity">
      <h3 className="activity-title">{ title }<small className="activity-role"></small></h3>
      <span><small>Localisation: { location } - le { date }</small></span>
      <hr/>
      { !thumbnail ? <Text text={ description }/> :
        <div class="d-flex">
          <div class="w-75">
            <Text text={ description }/>
          </div>
          <a class="w-25 h-25" href={ link } target="_blank">
            <img src={ thumbnail } alt={ title + " thumbnail" }/>
          </a>
        </div>
      }
      <p><small>{ !link ? null : <>source : <a href={ link } target="_blank">{ link }</a></> }</small></p>
    </article>
  );
};

export default TalkCard;
