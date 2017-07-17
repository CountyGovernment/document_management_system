import expect from 'expect';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as types from '../../actions/ActionTypes';
import * as documentAction from '../../actions/DocumentActions';

describe('Document action', () => {
  describe('create document', () => {
    it('should create a document CREATE_DOCUMENT_SUCCESS action', () => {
      const document = { title: 'run', content: 'the', access: 'public' };
      const expectedAction = {
        type: types.CREATE_DOCUMENT_SUCCESS,
        document,
      };
      const action = documentAction.createDocumentSuccess(document);

      expect(action).toEqual(expectedAction);
    });
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('sync actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('get all documents', (done) => {
    const expectedAction = [{ type: types.GET_ALL_DOCUMENTS_SUCCESS, body: { documents: [{ id: 1, title: 'elixir', content: 'truth of life', access: 'public' }] } }];
    const store = mockStore({ documents: [] }, expectedAction, done());
    store.dispatch(documentAction.getAllDocuments()).then(() => {
      const action = store.getAction();
      expect(action[0].type).toEqual(types.GET_ALL_DOCUMENTS_SUCCESS);
      done();
    });
  });

  it('create a document', (done) => {
    const expectedAction = [{ type: types.CREATE_DOCUMENT_SUCCESS, body: { documents: [{ title: 'run', content: 'the', access: 'public' }] } }];
    const store = mockStore({ documents: [] }, expectedAction, done());
    store.dispatch(documentAction.createDocument()).then(() => {
      const action = store.getAction();
      expect(action[0].type).toEqual(types.CREATE_DOCUMENT_SUCCESS);
      done();
    });
  });

  it('handles search for a document', (done) => {
    const searchValue = 1;
    const expectedAction = [{ type: types.SEARCH_DOCUMENTS_SUCCESS, body: { documents: [{ title: 'elixir' }] } }];
    const store = mockStore({ documents: [] }, expectedAction, done());
    store.dispatch(documentAction.search(searchValue)).then(() => {
      const action = store.getAction();
      expect(action[0].type).toEqual(types.SEARCH_DOCUMENTS_SUCCESS);
      done();
    });
  });

  it('get one document', (done) => {
    const document = 2;
    const expectedAction = [{ type: types.GET_ONE_DOCUMENT_SUCCESS, body: { documents: [{ id: 7, title: 'elixir' }] } }];
    const store = mockStore({ documents: [] }, expectedAction, done());
    store.dispatch(documentAction.getOneDocument(document)).then(() => {
      const action = store.getAction();
      expect(action[0].type).toEqual(types.GET_ONE_DOCUMENT_SUCCESS);
      done();
    });
  });

  it('paginates documents', (done) => {
    const limit = 2;
    const offset = 0;
    const expectedAction = [{ type: types.GET_PAGINATED_DOCUMENTS_SUCCESS, body: { documents: [{ id: 1, title: 'rock' }] } }];
    const store = mockStore({ documents: [] }, expectedAction, done());
    store.dispatch(documentAction.paginateDocuments(limit, offset)).then(() => {
      const action = store.getAction();
      expect(action[0].type).toEqual(types.GET_PAGINATE_DOCUMENTS_SUCCESS);
      done();
    });
  });

  it('handles deleting a document', (done) => {
    const deletedDocument = 1;
    const expectedAction = [{ type: types.DELETE_DOCUMENT_SUCCESS, body: { documents: [] } }];
    const store = mockStore({ documents: [] }, expectedAction, done());
    store.dispatch(documentAction.deleteDocument(deletedDocument)).then(() => {
      const action = store.getAction();
      expect(action[0].type).toEqual(types.DELETE_DOCUMENT_SUCCESS);
      done();
    });
  });

  it('handles updating a document', (done) => {
    const updatedDocument = { id: 1 };
    const expectedAction = [{ type: types.UPDATE_DOCUMENT_SUCCESS, body: { documents: [{ id: 1 }] } }];
    const store = mockStore({ users: [] }, expectedAction, done());
    store.dispatch(documentAction.updateDocument(updatedDocument)).then(() => {
      const action = store.getAction();
      expect(action[0].type).toEqual(types.UPDATE_DOCUMENT_SUCCESS);
      done();
    });
  });
});
