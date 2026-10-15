import React from 'react';
import { connect } from 'react-redux';
import ExternalLink from './ExternalLink';

const Articles = ({ articles }) => (
  <div id="articles" className="articles">
    <h3 className="list-title">Articles</h3>
    <ul className="article-grid">
      { articles.map((article, i) => (
        <li key={ i }>
          <ExternalLink className="article" href={ article.link }>
            <span className="article-title">{ article.title }</span>
            <span className="article-meta">{ `${article.publisher} · ${article.date}` }</span>
          </ExternalLink>
        </li>
      )) }
    </ul>
  </div>
);

const mapStateToProps = state => ({ articles: state.articles });

export default connect(mapStateToProps)(Articles);
