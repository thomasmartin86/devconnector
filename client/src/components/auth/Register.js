import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
  }

  //if we're logged in, don't allow user to see /register page
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  //if errors are present and included in props, set the component state to props state
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  //handle on change
  //using arrow to avoid binding this
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFileUpload = e => {
    const file = e.target.files[0];
    this.setState({ file: file });
    console.log(file);
  };
  //prevent default behavior on form
  onSubmit = e => {
    e.preventDefault();

    //register user
    //@todo use redux

    //destructuring
    const { name, email, password, password2 } = this.state;
    const newUser = {
      name,
      email,
      password,
      password2
    };

    //imported actions will be accessible via this.props
    //the second parameter of this.props.history allows us to redirect from within an action
    //this is the purpose of importing withRouter
    this.props.registerUser(newUser, this.props.history);

    //console.log(newUser);
  };
  render() {
    const { name, email, password, password2, errors } = this.state;
    //<input type="file" onChange={this.onFileUpload} />

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image use a gravatar email"
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <input
                  type="submit"
                  id="button-test"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//proptypes
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

//map the state to props
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

//export using connect since we're using redux
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
