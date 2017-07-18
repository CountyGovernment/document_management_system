import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/UserActions';

/**
 * @desc component used to display the user profile
 * @class UserProfile
 * @extends {Component}
 */
class UserProfile extends Component {

  /**
   * Creates an instance of AllUsers.
   * @param {any} props property of component
   * @param {any} context property of component
   * @returns {*} no return value
   * @memberof AllUsers
   */
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
  }

  /**
   * @desc handles the triggering of the necessary action
   * @returns {null} returns no value
   */
  componentWillMount() {
    console.log('one user');
    this.props.actions.getOneUser(this.state.user.id);
    // if (this.props.match.params.id) {
      // this.props.actions.getOneUser(this.props.match.params.id);
  }
  // }

  /**
   * @desc Renders the user profile
   * @return {*} html
   */
  render() {
    const { user } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12">
            <div className="card">
              <div className="card-image" />
              <div className="card-content">
                <h1 className="center">{user.username} {}</h1>
                <p className="center flow-text">Username: {user.firstName}</p>
                <p className="center flow-text">Username: {user.secondName}</p>
                <p className="center flow-text">Email: {user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 *
 * @param {any} state
 * @param {any} ownProps
 * @returns {*} props
 */
const mapStateToProps = (state) => {
  console.log(state, 'state');
  const user = state.user;

  return (
    user
  );
};

/**
 * @param {any} dispatch
 * @returns {any} actions
 */
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
