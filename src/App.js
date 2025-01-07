import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import ProfilePicture from './components/ProfilePicture.js';
import Profiles from './components/Profiles.js';
import About from './components/About.js';
import SkillCards from './components/SkillCards.js';
import ActivityCards from './components/ActivityCards.js';
import TalkCard from './components/TalkCard.js';

const App = ({ profile, activityCategories, talks }) => {
  const fullname = profile.firstname + ' ' + profile.lastname;

  return (
    <main className="page-content" aria-label="Content">
      <div className="wrapper">
        <section id="cv" className="container-fluid">
          <div className="row">
            <div id="cv-side" className="col">
              <section id="profiles-card" className="mb-4 cv-card">
                <ProfilePicture picture={ profile.picture } fullname={ fullname } />
                <Profiles
                  profiles={ profile.profiles }
                  website={ profile.website }
                  emailAddress={ profile.emailAddress }
                  phoneNumber={ profile.phoneNumber }
                />
              </section>
            </div>
            <div className="col">
              <header className="d-flex flex-row mb-2">
                <div>
                  <h1 className="mb-3">{ fullname }</h1>
                  <About profile={ profile } />
                </div>
              </header>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col">
            <div id="skills" className="cv-card">
              <SkillCards categoryId="speaks" />
              <SkillCards categoryId="uses" />
            </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              { activityCategories.map(categoryId => <ActivityCards categoryId={ categoryId } />) }
            </div>
          </div>

          <div className="row">
            <div className="col">
              <section className={ `activity-cards cv-card mb-4` }>
                <h2 className="section-title">Talks</h2>
                { talks.map((talk, i) => <TalkCard key={ i } { ...talk } />) }
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

const mapStateToProps = state => ({
  profile: state.profile,
  activityCategories: Object.keys(state.activities),
  talks: state.talks,
});

export default connect(mapStateToProps)(App)
