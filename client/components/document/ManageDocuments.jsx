import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
   * @desc handles the rendering of the select box.
   * @returns {null} returns no value
   */
  static componentDidMount() {
    $('select').material_select();
  }

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
      // document: [],
      document: Object.assign({}, props.document),
      errors: {},
      saving: false,
    };
  }

  /**
   * @desc handles the triggering of the necessary action
   * @returns {null} returns no value
   */
  componentWillMount() {
    if (this.props.documentId) {
      console.log('wwwwwwwwwwww', this.props.documentId);
      this.props.actions.getOneDocument(this.props.documentId);
    }
  }

  /**
   * @desc handles the triggering of the necessary action when the page reloads
   * @returns {null} returns no value
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.document.id !== nextProps.document.id) {
      // Necessary to repopulate the form when document is loaded directly
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
    const authorId = 'userId';
    const document = this.state.document;
    document[field] = event.target.value;
    // document[authorId] = this.props.userId;
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
    .then(() => this.redirect())
    .then(() => this.state.document)
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
      this.state.document.id, this.state.document)
    // .then(() => this.redirect())
    .then(() => this.state.document)
    .then(() => this.redirect())
    .catch(() => {
      this.setState({ saving: false });
      toastr.error(this.props.message);
    });
  }

  /**
   * @desc handles the redirecting to the dashboard on success
   * @returns {null} returns no value
   */
  redirect() {
    this.setState({ saving: false });
    toastr.success('saved!');
    this.context.router.push('/document');
  }

  /**
   * React Render
   * @return {object} html
   */
  render() {
    // console.log('render check');
    // console.log('this.props', this.props);
    const isUpdate = this.props.documents.id;
    const documentTitle = this.props.documents.title;
    return (
      <div className="section">
        <div className="container">
          <h1 className="center flow-text">
            {isUpdate ? `Edit: ${documentTitle}`
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
 * @desc Set the contextTypes
 */
ManageDocument.contextTypes = {
  router: PropTypes.object,
};

/**
 *
 * @param {any} state
 * @returns {*} props
 */
const mapStateToProps = (state) => {
  const documentId = state.documents.id;

  let document = { id: '', title: '', content: '', access: '' };

  if (documentId && (state.documents.id === documentId)) {
    document = state.documents;
  }

  return {
    documentId,
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
