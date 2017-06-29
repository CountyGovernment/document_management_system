import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router';
import toastr from 'toastr';
import * as documentActions from '../../actions/documentActions';
import DocumentForm from './DocumentForm';

/**
 * @desc component used to display the document form
 * @class ManageDocuments
 * @extends {Component}
 */
class ManageDocument extends Component {

  /**
   * Creates an instance of ManageDocuments.
   * @param {any} props property of component
   * @param {any} context property of component
   * @returns {*} no return value
   * @memberof ManageDocuments
   */
  constructor(props, context) {
    super(props, context);

    this.updateDocumentState = this.updateDocumentState.bind(this);
    this.createDocument = this.createDocument.bind(this);
    this.updateDocument = this.updateDocument.bind(this);

    this.state = {
      document: Object.assign({}, props.document),
      errors: {},
      saving: false,
      redirect: false,
    };
  }

  /**
   * @desc handles the triggering of the necessary action
   * @returns {null} returns no value
   */
  componentWillMount() {
    if (this.props.match.params.id) {
      this.props.actions.getOneDocument(this.props.match.params.id);
    }
  }

  /**
   * @desc handles the triggering of the necessary action when the page reloads
   * @returns {null} returns no value
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.document.id) {
      this.setState({ document: Object.assign({}, nextProps.document) });
    }
  }

  /**
   * @desc handles form element changes
   * @param {any} event html event
   * @returns {*} no return value
   */
  updateDocumentState(event) {
    const field = event.target.name;
    const document = this.state.document;
    document[field] = event.target.value;
    return this.setState({ document });
  }

  /**
   * @desc handles create form actions
   * @param {any} event html event
   * @returns {*} no return value
   */
  createDocument(event) {
    event.preventDefault();
    this.setState({ errors: {}, saving: true });
    this.props.actions.createDocument(this.state.document)
    .then(() => this.setState({ redirect: true }))
    .catch(() => {
      this.setState({ saving: false });
      toastr.success(this.props.message);
    });
  }

  /**
   * @desc handles update form actions
   * @param {any} event html event
   * @returns {*} no return value
   */
  updateDocument(event) {
    event.preventDefault();
    this.setState({ saving: true });
    this.props.actions.updateDocument(
      this.state.document.id)
    .then(() => this.setState({ redirect: true }))
    .catch(() => {
      this.setState({ saving: false });
      toastr.success(this.props.message);
    });
  }

  /**
   * React Render
   * @return {object} html
   */
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/dashboard" />;
    }
    const isUpdate = this.props.match.params.id;
    const documentTitle = this.props.match.params.title;
    return (
      <div className="section">
        <div className="container">
          <h1 className="center flow-text">
            {isUpdate ? 'Edit Document'
              : 'Add new document'}
          </h1>
          <DocumentForm
            document={this.state.document}
            onChange={this.updateDocumentState}
            onEditorChange={this.onEditorChange}
            onSave={isUpdate ? this.updateDocument : this.createDocument}
            errors={this.state.errors}
            saving={this.state.saving}
          />
        </div>
      </div>
    );
  }
}

/**
 * @desc Set the PropTypes
 */
ManageDocument.propTypes = {
  actions: PropTypes.object,
  document: PropTypes.object,
};

/**
 *
 * @param {any} state
 * @returns {*} props
 */
const mapStateToProps = (state) => {
  return {
    document: state.document,
    documents: state.documents,
    loggedInUserID: state.isAuth.loggedInUser,
  };
};

/**
 * @param {any} dispatch
 * @returns {any} actions
 */
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(documentActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageDocument);
