import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import toastr from 'toastr';
import UserList from './UserList';
import UserSearch from './UserSearch';
import * as actions from '../../actions/UserActions';

/**
 * @desc component used to display all users
 * @class AllUsers
 * @extends {Component}
 */
class AllUsers extends Component {
  /**
   * Creates an instance of AllUsers.
   * @param {any} props property of component
   * @param {any} context property of component
   * @returns {*} no return value
   * @memberof AllUsers
   */
  constructor(props, context) {
    super(props, context);

    this.onSearchChange = this.onSearchChange.bind(this);

    this.state = {
      users: [],
      search: '',
      offset: 0,
    };
  }

  /**
   * @desc handles the triggering of the necessary action
   * @returns {null} returns no value
   */
  componentWillMount() {
    if (this.props.isAuth.isAuthenticated) {
      this.props.actions.getAllUsers(this.props.users);
    }
  }

  /**
   * @desc handles change of the search form
   * @param {any} event html event
   * @returns {*} no return value
   */
  onSearchChange(event) {
    this.setState({ search: event.target.value });
    this.props.actions.search(event.target.value)
    .catch(() => toastr.error(this.props.message));
  }

  /**
   * React Render
   * @return {object} html
   */
  render() {
    const { users, metaData } = this.props;

    if (users) {
      return (
        <div className="section">
          <div className="container">
            <div className="row">
              <div className="col l12 m12 s12">
                <hr />
                <h1 className="center">All Users</h1>
                <hr />
              </div>
            </div>

            <UserSearch
              onSearchChange={this.onSearchChange}
            />

            <div className="row">
              <div className="col s12">
                {users.map(user =>
                  (<UserList
                    loggedInUserID={this.props.loggedInUserID}
                    key={user.id}
                    user={user}
                  />),
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

/**
 * @desc Set the PropTypes
 */
AllUsers.propTypes = {
  users: PropTypes.array,
  loggedInUserID: PropTypes.number,
  search: PropTypes.string,
  message: PropTypes.string,
  actions: PropTypes.object,
};

/**
 *
 * @param {any} state
 * @param {any} ownProps
 * @returns {*} props
 */
const mapStateToProps = state => ({
  isAuth: state.isAuth,
  message: state.message,
  users: state.users,
  metaData: state.users.metaData,
  loggedInUserID: state.isAuth.loggedInUser.id,
});

/**
 * @param {any} dispatch
 * @returns {any} actions
 */
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
