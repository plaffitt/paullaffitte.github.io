import React from 'react';
import { connect } from 'react-redux';
import ProfilePicture from './components/ProfilePicture.js';
import Profiles from './components/Profiles.js';
import Hero from './components/Hero.js';
import Footer from './components/Footer.js';
import Offers from './components/Offers.js';
import Projects from './components/Projects.js';
import Talks from './components/Talks.js';
import Articles from './components/Articles.js';
import About from './components/About.js';
import ActivityCards from './components/ActivityCards.js';
import SkillCards from './components/SkillCards.js';

// Page blocks, top to bottom: hero, offers, projects, talks, articles,
// about, experience and education, skills, legal footer.
const App = ({ profile, legal, activityCategories }) => {
  const fullname = profile.firstname + ' ' + profile.lastname;

  return (
    <main className="page-content" aria-label="Content">
      <div className="wrapper">
        <section id="cv" className="container-fluid">
          <div className="row">
            <div id="cv-side" className="col">
              <section id="profiles-card" className="mb-4 cv-card">
                <ProfilePicture picture={ profile.picture } fullname={ fullname } />
                <Profiles profiles={ profile.profiles } website={ profile.website } />
              </section>
            </div>
            <div className="col">
              <Hero profile={ profile } />
            </div>
          </div>

          <div className="row"><div className="col"><Offers /></div></div>
          <div className="row"><div className="col"><Projects /></div></div>
          <div className="row"><div className="col"><Talks /></div></div>
          <div className="row"><div className="col"><Articles /></div></div>
          <div className="row"><div className="col"><About bio={ profile.bio } /></div></div>
          <div className="row">
            <div className="col">
              { activityCategories.map(categoryId => <ActivityCards key={ categoryId } categoryId={ categoryId } />) }
            </div>
          </div>
          <div className="row"><div className="col"><SkillCards /></div></div>

          <div className="row">
            <div className="col">
              <Footer legal={ legal } />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

const mapStateToProps = state => ({
  profile: state.profile,
  legal: state.legal,
  activityCategories: Object.keys(state.activities),
});

export default connect(mapStateToProps)(App);
