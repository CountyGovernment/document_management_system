import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Link } from 'react-router';
import toastr from 'toastr';
import * as userActions from '../../actions/userActions';
import UserProfile from '../user/userprofile';
import DocumentList from '../document/DocumentList';
import DocumentSearch from '../document/DocumentSearch';
import * as actions from '../../actions/documentActions';

/**
 * @desc component used to display user's documents
 * @class Dashboard
 * @extends {Component}
 */
class Dashboard extends Component {
  /**
   * Creates an instance of Dashboard.
   * @param {any} props property of component
   * @param {any} context property of component
   * @returns {*} no return value
   * @memberof Dashboard
   */
  constructor(props) {
    super(props);

    this.redirectToManageDocument = this.redirectToManageDocument.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);

    this.state = {
      documents: [],
      searchResults: [],
      search: '',
      redirect: false,
    };
  }

  /**
   * @desc handles the triggering of the necessary action
   * @returns {null} returns no value
   */
  componentDidMount() {
    if (this.props.isAuth.isAuthenticated) {
      this.props.actions.getUserDocuments(this.props.loggedInUserID, this.props.documents);
    }
  }

  /**
   * @desc handles change of the search form
   * @param {any} event html event
   * @returns {*} no return value
   */
  onSearchChange(event) {
    this.setState({ search: event.target.value });
    if (event.target.value === '') {
      this.props.actions.getUserDocuments(this.props.loggedInUserID);
    }
    this.props.actions.search(event.target.value)
    .catch(() => {
      toastr.error(this.props.message);
    });
  }

  /**
   * @desc handles the redirecting to the manage documents page
   * @returns {null} returns no value
   */
  redirectToManageDocument() {
    this.setState({ redirect: true });
  }

   /**
   * @desc Renders the Document holder
   * @return {*} render the Document holder
   */
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/document" />;
    }
    const { documents, searchResults, metaData, user } = this.props;
    console.log('documents:', documents);
    if (!documents) {
      return (<div className="section">
        <div className="container">
          <div className="col s12 m8 offset-m2 l6 offset-l3">
            <div className="card-panel pink lighten-3 z-depth-1">
              <div className="row valign-wrapper">
                <div className="col s10">
                  <h3>Add a Document</h3>
                  <div className="row">
                    <div className="col l4 m4 s1 offset-l3">
                      <a
                        onClick={this.redirectToManageDocument}
                        className="waves-effect waves-light btn-large green"
                      >
                        <i className="material-icons left">add</i>Add New Document
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
    } else {
      return (
        <div className="section white">
          <div className="container">
            <div className="row">
              <div className="col l12 m12 s12">
                <hr />
                <h3 className="center">My Dashboard</h3>
                <hr />
              </div>
            </div>

            <DocumentSearch
              onSearchChange={this.onSearchChange}
              onViewAccessChange={this.onViewAccessChange}
            />

            <div className="row">
              <div className="col s12">
                `{documents.map(document =>
                (<DocumentList
                  loggedInUserID={this.props.loggedInUserID.id}
                  key={document.id}
                  document={document}
                />),
              )}`
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

/**
 * @desc Set the PropTypes
 */
Dashboard.propTypes = {
  // documents: PropTypes.array,
  searchResults: PropTypes.array,
  search: PropTypes.string,
  message: PropTypes.string,
  actions: PropTypes.object,
};


/**
 *
 * @param {any} state
 * @returns {boolean} isAuthenticated
 * @returns {*} isAdmin
 */
function mapStateToProps(state) {
  return {
    user: state.users,
    isAuth: state.isAuth,
    message: state.message,
    documents: state.documents,
    metaData: state.documents.metaData,
    loggedInUserID: state.isAuth.loggedInUser.id,
  };
}

/**
 * @param {any} dispatch
 * @returns {any} actions
 */
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  userActions: bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
