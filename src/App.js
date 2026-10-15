import React from 'react';
import { connect } from 'react-redux';
import Nav from './components/Nav.js';
import Hero from './components/Hero.js';
import Offers from './components/Offers.js';
import Projects from './components/Projects.js';
import Talks from './components/Talks.js';
import SectionHead from './components/SectionHead.js';
import About from './components/About.js';
import ActivityCards from './components/ActivityCards.js';
import SkillCards from './components/SkillCards.js';
import Contact from './components/Contact.js';

// Page blocks, top to bottom: navigation, hero with key figures, offers,
// open source projects, talks and articles, career and skills, contact
// with the legal notice.
const App = ({ profile, legal, activityCategories }) => (
  <>
    <Nav profile={ profile } />
    <main>
      <Hero profile={ profile } />
      <Offers />
      <Projects />
      <Talks />
      <section id="parcours" className="section container">
        <SectionHead number="04" label="Parcours" title="Entre développement et exploitation" />
        <About bio={ profile.bio } />
        { activityCategories.map(categoryId => <ActivityCards key={ categoryId } categoryId={ categoryId } />) }
        <SkillCards />
      </section>
    </main>
    <Contact profile={ profile } legal={ legal } />
  </>
);

const mapStateToProps = state => ({
  profile: state.profile,
  legal: state.legal,
  activityCategories: Object.keys(state.activities),
});

export default connect(mapStateToProps)(App);
