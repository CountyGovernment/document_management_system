import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router';
import toastr from 'toastr';
import Pagination from 'react-js-pagination';
import DocumentList from './DocumentList';
import DocumentSearch from './DocumentSearch';
import * as actions from '../../actions/DocumentActions';

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
  constructor(props) {
    super(props);

    this.redirectToManageDocument = this.redirectToManageDocument.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);

    this.state = {
      documents: [],
      search: '',
      offset: 0,
      activePage: 1,
      limit: 6,
      redirect: false,
      isLoading: false,
    };
  }

  /**
   * @desc handles the triggering of the necessary action
   * @returns {null} returns no value
   */
  componentWillMount() {
    if (this.props.isAuth.isAuthenticated) {
      this.props.actions.getAllDocuments(this.props.documents);
      this.props.actions.paginateDocuments(this.state.limit, 0);
    }
  }

  /**
   * @desc handles change of the search form
   * @param {any} event html event
   * @returns {*} no return value
   */
  onSearchChange(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    this.setState({ search: event.target.value });
    this.props.actions.search(event.target.value)
    .then(() => {
      this.setState({ isLoading: false });
    })
    .catch(() => {
      this.setState({ isLoading: false });
      toastr.error(this.props.message);
    });
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    this.props.actions.paginateDocuments(this.state.limit, (this.state.limit * (pageNumber - 1)));
  }

  /**
   * @desc handles the redirecting to the manage documents page
   * @returns {null} returns no value
   */
  redirectToManageDocument() {
    return <Redirect to="/document" />;
  }

  /**
   * @desc Renders the Document holder
   * @return {*} render the Document holder
   */
  render() {
    const totalItems = this.props.documents;
    const paginatedDocuments = this.props.paginatedDocuments;
    const { documents, metaData } = this.props;
    if (!documents || this.props.message === 'no document found') {
      return (
        <div className="section">
          <div className="container">
            <div className="col s12 m8 offset-m2 l6 offset-l3">
              <div className="card-panel grey lighten-3 z-depth-1">
                <div className="row valign-wrapper">
                  <div className="col s10">
                    <h3>You have not created any documents</h3>
                    <div className="row">
                      <div className="col l4 m4 s1 offset-l3">
                        <a
                          onClick={this.redirectToManageDocument}
                          className="waves-effect waves-light btn #1b5e20 green darken-4"
                        >ADD
                      </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>);
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
              onSearchChange={this.onSearchChange}
            />

            <div className="row">
              <div className="col s12">
                {paginatedDocuments.map(document =>
                  (<DocumentList
                    loggedInUserID={this.props.loggedInUserID.id}
                    key={document.id}
                    document={document}
                  />),
                )}
              </div>
            </div>
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.limit}
              totalItemsCount={totalItems}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
            />
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
  documents: PropTypes.number,
  loggedInUserID: PropTypes.object,
  search: PropTypes.string,
  message: PropTypes.string,
  actions: PropTypes.object,
  paginatedDocuments: PropTypes.array,
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
    documents: state.documents.length,
    metaData: state.documents.metaData,
    loggedInUserID: state.isAuth.loggedInUser,
    paginatedDocuments: state.paginatedDocuments,
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
