import React from 'react';
import { connect } from 'react-redux';

const Articles = ({ articles }) => (
  <section id="articles" className="cv-card mb-4">
    <h2 className="section-title">Articles</h2>
    <ul className="articles-list">
      { articles.map((article, i) => (
        <li key={ i }>
          <a href={ article.link } target="_blank" rel="noopener">{ article.title }</a>
          <small>{ ` · ${article.publisher}, ${article.date}` }</small>
        </li>
      )) }
    </ul>
  </section>
);

const mapStateToProps = state => ({ articles: state.articles });

export default connect(mapStateToProps)(Articles);
