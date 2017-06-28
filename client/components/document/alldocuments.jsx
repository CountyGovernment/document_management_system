import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import { browserHistory } from 'react-router';
import DocumentList from './DocumentList';
import DocumentSearch from './DocumentSearch';
import * as actions from '../../actions/documentActions';

/**
 * @desc component used to display all public documents
 * @class AllDocuments
 * @extends {Component}
 */
class AllDocuments extends Component {
  /**
   * Creates an instance of AllDocuments.
   * @param {any} props property of component
   * @param {any} context property of component
   * @returns {*} no return value
   * @memberof AllDocuments
   */
  constructor(props, context) {
    super(props, context);

    this.redirectToManageDocument = this.redirectToManageDocument.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.state = {
      documents: [],
      searchResults: [],
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
      this.props.actions.getAllDocuments(this.props.documents);
    }
  }

  /**
   * @desc handles change of the search form
   * @param {any} event html event
   * @returns {*} no return value
   */
  onSearchChange(event) {
    this.setState({ searchValue: event.target.value });
    this.props.actions.search(event.target);
    // .catch(() => toastr.error(this.props.message));
  }


  /**
   * @desc handles the redirecting to the manage documents page
   * @returns {null} returns no value
   */
  redirectToManageDocument() {
    browserHistory.push('/document');
  }

  /**
   * @desc Renders the Document holder
   * @return {*} render the Document holder
   */
  render() {
    const { documents, searchResults, metaData } = this.props;
    let documentsInfo;
    if (!documents || this.props.message === 'no document found') {
      return (documentsInfo = (
        <div className="section">
          <div className="container">
            <div className="col s12 m8 offset-m2 l6 offset-l3">
              <div className="card-panel orange lighten-3 z-depth-1">
                <div className="row valign-wrapper">
                  <div className="col s10">
                    <h3>You have not created any documents</h3>
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
        </div>));
    }

    if (documents) {
      return (
        <div className="section">
          <div className="container">
            <div className="row">
              <div className="col l12 m12 s12">
                <hr />
                <h1 className="center">All Documents</h1>
                <hr />
              </div>
            </div>

            <DocumentSearch
              redirectToManageDocument={this.redirectToManageDocument}
              onViewAccessChange={this.onViewAccessChange}
              onSearchChange={this.onSearchChange}
              sitewide="All Documents"
            />

            <div className="row">
              <div className="col s12">
                {documents.map(document =>
                  (<DocumentList
                    loggedInUserID={this.props.loggedInUserID.id}
                    key={document.id}
                    document={document}
                  />),
                )}
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
AllDocuments.propTypes = {
  documents: PropTypes.array,
  searchResults: PropTypes.array,
  loggedInUserID: PropTypes.object,
  search: PropTypes.string,
  message: PropTypes.string,
  actions: PropTypes.object,
};

/**
 *
 * @param {any} state
 * @returns {*} props
 */
function mapStateToProps(state) {
  return {
    isAuth: state.isAuth,
    message: state.message,
    documents: state.documents,
    metaData: state.documents.metaData,
    loggedInUserID: state.isAuth.loggedInUser,
  };
}

/**
 * @param {any} dispatch
 * @returns {any} actions
 */
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllDocuments);
