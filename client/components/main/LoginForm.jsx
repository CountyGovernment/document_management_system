import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * @desc component used to display the document form
 */
const SigninForm = ({ onChange, onSubmit, loading, errors }) =>
  (<div className="grey lighten-3 col s6 offset-s3 z-depth-5 card">
    <div className="card-image">
      <h2 className="center">LOGIN</h2>
    </div>
    <form className="login-form">
      <div className="card-content">
        <div className="row">
          <div className="col s6 offset-s3">
            <h6>Username/Email</h6>
            <input
              name="email"
              type="email"
              onChange={onChange}
              placeholder="Your email here"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col s6 offset-s3">
            <h6>Password</h6>
            <input
              name="password"
              type="password"
              onChange={onChange}
              placeholder="Your password here"
              required
            />
          </div>
        </div>
      </div>
      <div className="card-action">
        <div className="row">
          <div className="input-field col s12">
            <input
              type="submit"
              disabled={loading}
              value={loading ? 'Please wait...' : 'Login'}
              className="btn waves-effect waves-light col s4 offset-s4 pink darken-1"
              onClick={onSubmit}
            />
          </div>
          <div className="input-field col s12">
            <p className="margin center medium-small sign-up">
                Do not have an account?
                <Link to="/signup"> Signup</Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  </div>)
  ;

/**
 * @desc Set the PropTypes
 */
SigninForm.propTypes = {
  user: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.object,
};

export default SigninForm;
