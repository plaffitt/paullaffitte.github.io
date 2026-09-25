import React from 'react';
import { connect } from 'react-redux';
import ProfilePicture from './components/ProfilePicture.js';
import Profiles from './components/Profiles.js';
import Hero from './components/Hero.js';
import Footer from './components/Footer.js';
import Offers from './components/Offers.js';
import Projects from './components/Projects.js';

// Page blocks, top to bottom. Later tasks insert Offers, Projects, Talks,
// Articles, About, ActivityCards and Skills between Hero and Footer.
const App = ({ profile, legal }) => {
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
          {/* BLOCKS: talks, articles, about, activities, skills */}

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
});

export default connect(mapStateToProps)(App);
