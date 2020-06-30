import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Profiles from './components/Profiles.js';
import About from './components/About.js';
import SkillCards from './components/SkillCards.js';
import ActivityCards from './components/ActivityCards.js';
import cv, { fetchProfile } from './slices/cv.js';

const App = ({ profile, fetchProfile }) => {

  if (!profile) {
    fetchProfile();
    return 'Loading...';
  }

  const fullname = profile.firstname + ' ' + profile.lastname;

  return (
    <main class="page-content" aria-label="Content">
      <div class="wrapper">
        <section id="cv" class="container-fluid">
          <div class="row">
            <div id="cv-side" class="col">
              <section id="profiles-card" class="mb-4 cv-card">
                <div id="profile-picture" class="zoom mb-3">
                  <img src={ profile.picture } alt={ fullname } />
                </div>
                <Profiles profiles={ profile.profiles } />
              </section>
              <div class="cv-card skills mb-4">
                <SkillCards category="softskills" />
                <SkillCards category="langs" />
              </div>
              <div class="cv-card skills">
                <SkillCards category="tools" />
                <SkillCards category="libraries" />
              </div>
            </div>
            <div class="col">
              <header class="d-flex flex-row mb-2">
                <div>
                  <h1 class="mb-3">{ fullname }</h1>
                  <About profile={ profile } />
                </div>
              </header>

              <ActivityCards category="xppro" />
              <ActivityCards category="scholar" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

const mapStateToProps = state => ({
  profile: state.cv.profile,
});

const mapDispatchToProps = dispatch => ({
  fetchProfile: () => dispatch(fetchProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
