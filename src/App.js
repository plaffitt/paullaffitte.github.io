import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import ProfilePicture from './components/ProfilePicture.js';
import Profiles from './components/Profiles.js';
import About from './components/About.js';
import SkillCards from './components/SkillCards.js';
import ActivityCards from './components/ActivityCards.js';

const App = ({ profile, activityCategories }) => {
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
              <div className="cv-card skills mb-4">
                <SkillCards categoryId="softskills" />
                <SkillCards categoryId="langs" />
              </div>
              <div className="cv-card skills">
                <SkillCards categoryId="tools" />
                <SkillCards categoryId="libraries" />
              </div>
            </div>
            <div className="col">
              <header className="d-flex flex-row mb-2">
                <div>
                  <h1 className="mb-3">{ fullname }</h1>
                  <About profile={ profile } />
                </div>
              </header>
              { activityCategories.map(categoryId => <ActivityCards categoryId={ categoryId } />) }
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
});

export default connect(mapStateToProps)(App)
