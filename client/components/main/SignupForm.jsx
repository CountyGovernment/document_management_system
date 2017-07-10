import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * @desc component used to display the signup form
 */
const SignupForm = ({ onChange, onSubmit, loading, errors }) =>
  (<form className="login-form">
    <div className="card-content">
      <div className="row">
        <div className="col s4 offset-s2">
          <input
            name="firstName"
            type="text"
            onChange={onChange}
            placeholder="Your firstname here"
            required
          />
        </div>
        <div className="col s4">
          <input
            name="secondName"
            type="text"
            onChange={onChange}
            placeholder="Your lastname here"
            required
          />
        </div>
      </div>
      <div className="row">
        <div className="col s4 offset-s2">
          <input
            name="username"
            type="text"
            onChange={onChange}
            placeholder="Your username here"
            required
          />
        </div>
        <div className="col s4">
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
        <div className="col s4 offset-s4">
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
            id="saveProfile"
            type="submit"
            disabled={loading}
            value={loading ? 'Creating user profile...' : 'Signup'}
            className="btn waves-effect waves-light col s2 offset-s5 pink darken-1"
            onClick={onSubmit}
          />
        </div>

        <div className="input-field col s12">
          <nav>
            <p className="center medium-small sign-up">
              Already have an account?
            <Link to="/login" replace> Login</Link>
            </p>
          </nav>
        </div>
      </div>
    </div>
  </form>)
;

/**
 * @desc Set the PropTypes
 */
SignupForm.propTypes = {
  user: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.object,
};

export default SignupForm;
