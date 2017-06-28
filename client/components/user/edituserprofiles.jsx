import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as userActions from '../../actions/userActions';

class EditUserProfile extends Component {
  /**
   * Creates an instance of ManageDocuments.
   * @param {any} props property of component
   * @param {any} context property of component
   * @returns {*} no return value
   * @memberof ManageDocuments
   */
  constructor(props, context) {
    super(props, context);

    this.updateUserState = this.updateUserState.bind(this);
    this.updateProfile = this.updateProfile.bind(this);

    this.state = {
      user: Object.assign({}, this.props.user),
      errors: {},
      saving: false,
    };
    console.log('user state', this.state.user);
  }

  /**
   * @desc handles the triggering of the necessary action
   * @returns {null} returns no value
   */
  componentWillMount() {
    if (this.props.userId) {
      this.props.userActions.getOneUser(this.props.userId);
    }
  }

  /**
   * @desc handles the triggering of the necessary action when the page reloads
   * @returns {null} returns no value
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.user.id !== nextProps.user.id) {
      // Necessary to repopulate the form when document is loaded directly
      this.setState({ user: Object.assign({}, nextProps.user) });
    }
  }

  /**
   * @desc handles form element changes
   * @param {any} event html event
   * @returns {*} no return value
   */
  updateUserState(event) {
    const field = event.target.name;
    const user = this.state.user;

    user[field] = event.target.value;
    user.id = this.props.userId;
    return this.setState({ user });
  }

  /**
   * @desc handles user profile update form action
   * @param {any} event html event
   * @returns {*} no return value
   */
  updateProfile(event) {
    event.preventDefault();
    this.setState({
      saving: true,
    });
    this.props.userActions.updateUser(this.state.user.id, this.state.user)
    .then(() => this.redirect())
    .catch(() => {
      this.setState({ saving: false });
      toastr.error(this.props.message);
    });
  }

  // /**
  //  * @desc handles the redirecting to the dashboard on success
  //  * @returns {null} returns no value
  //  */
  redirect() {
    this.setState({ saving: false });
    toastr.success(this.props.message);
    browserHistory.push('/dashboard');
  }

  /**
   * React Render
   * @return {object} html
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
                <h1 className="center">Edit User profile</h1>
                <form>
                  <div className="row">
                    <div className="col s6 offset-s3">
                      <p className="flow-text">FirstName:</p>
                      <input
                        name="firstname"
                        type="text"
                        value={this.state.user.firstName || user.firstName}
                        onChange={this.updateUserState}
                        placeholder="Your firstname here"
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col s6 offset-s3">
                      <p className="flow-text">secondName:</p>
                      <input
                        name="lastname"
                        type="text"
                        value={this.state.user.secondName || user.secondName}
                        onChange={this.updateUserState}
                        placeholder="Your lastname here"
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col s6 offset-s3">
                      <p className="flow-text">Username:</p>
                      <input
                        name="username"
                        type="text"
                        value={this.state.user.username || user.username}
                        onChange={this.updateUserState}
                        placeholder="Your username here"
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col s6 offset-s3">
                      <p className="flow-text">Email:</p>
                      <input
                        name="email"
                        type="email"
                        value={user.email}
                        disabled
                        placeholder="Your email here"
                        required
                      />
                    </div>
                  </div>

                  <div className="card-action">
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          id="updateProfile"
                          type="submit"
                          onClick={this.updateProfile}
                          className="btn waves-effect waves-light col s2 offset-s5 pink darken-1"
                        />

                        <Link to="/dashboard" className="right btn red">
                          Cancel
                        </Link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * @desc Set the PropTypes
 */
EditUserProfile.propTypes = {
  userActions: PropTypes.object.isRequired,
  user: PropTypes.object,
  userId: PropTypes.number.isRequired,
  message: PropTypes.string,
};

/**
 * @desc Set the contextTypes
 */
EditUserProfile.contextTypes = {
  router: PropTypes.object,
};

/**
 *  map state to props
 *
 * @param {state} state
 * @returns {object} props
 */
function mapStateToProps(state, ownProps) {
  const userId = ownProps.params.id;
  let user = { id: '', firstName: '', secondName: '', username: '', email: '', password: '' };

  if (userId && (state.user.length > 0)) {
    user = state.user;
  }

  return {
    user,
    userId,
    message: state.message,
    isAuthenticated: state.isAuth.isAuthenticated,
  };
}

/**
 * @param {any} dispatch
 * @returns {any} actions
 */
const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUserProfile);
