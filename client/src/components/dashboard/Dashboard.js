import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getCurrentProfile,
  clearCurrentProfile,
  deleteAccount
} from '../../actions/profileActions';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';
import Spinner from '../common/Spinner';

class Dashboard extends Component {
  //get current profile immediately
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick = e => {
    e.preventDefault();
    console.log('delete account clicked');
    this.props.deleteAccount();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    console.log(profile + ' ' + loading);

    let dashboardContent;

    //show spinner.gif if profile is still loading
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //check if logged in user has profile data
      //if there are more than 0 keys, something is there
      if (Object.keys(profile).length > 0) {
        const { handle, skills, status, experience, education } = profile;
        dashboardContent = (
          <div>
            <h3>
              Welcome <Link to={`/profile/${handle}`}> {user.name}</Link>
            </h3>
            <ProfileActions />
            <Experience experience={experience} />
            <Education education={education} />
            <div style={{ marginBottom: '60px' }} />
            <button onClick={this.onDeleteClick} className="btn btn-danger">
              {' '}
              Delete My Account
            </button>
          </div>
        );
      } else {
        //user is logged in but does not have a profile
        dashboardContent = (
          <div>
            <h3 className="lead text-muted">Welcome {user.name}</h3>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.proptypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
