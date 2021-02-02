import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Profiles from './components/Profiles.js';
import About from './components/About.js';
import SkillCards from './components/SkillCards.js';
import ActivityCards from './components/ActivityCards.js';

const App = ({ profile }) => {
  const fullname = profile.firstname + ' ' + profile.lastname;

  return (
    <main className="page-content" aria-label="Content">
      <div className="wrapper">
        <section id="cv" className="container-fluid">
          <div className="row">
            <div id="cv-side" className="col">
              <section id="profiles-card" className="mb-4 cv-card">
                <div id="profile-picture" className="zoom mb-3">
                  <img src={ profile.picture } alt={ fullname } />
                </div>
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

              <ActivityCards categoryId="xppro" />
              <ActivityCards categoryId="academic" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(App)
