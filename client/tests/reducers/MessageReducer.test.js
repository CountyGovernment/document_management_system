import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../../reducers/rootReducer';
import initialState from '../../reducers/initialState';
import * as actions from '../../actions/documentActions';
import * as userActions from '../../actions/userActions';

describe('Message reducer', () => {
  it('should add a success message when a document is created.', () => {
    const store = createStore(rootReducer, initialState);

    const successMessage = 'Document created successfully!';

    const action = actions.passSuccessMessage(successMessage);
    store.dispatch(action);

    const actual = store.getState().message;
    const expected = successMessage;

    expect(actual).toEqual(expected);
    expect(typeof actual).toBe('string');
  });

  it('should add a failure message when a document is not created.', () => {
    const store = createStore(rootReducer, initialState);

    const failureMessage = 'Document did not update';

    const action = actions.passFailureMessage(failureMessage);
    store.dispatch(action);

    const actual = store.getState().message;
    const expected = failureMessage;

    expect(actual).toEqual(expected);
    expect(typeof actual).toBe('string');
  });

  it('should add a success message when a user is created.', () => {
    const store = createStore(rootReducer, initialState);

    const successMessage = 'User created successfully';

    const action = userActions.passSuccessMessage(successMessage);
    store.dispatch(action);

    const actual = store.getState().message;
    const expected = successMessage;

    expect(actual).toEqual(expected);
    expect(typeof actual).toBe('string');
  });

  it('should add a failure message when a user is not successfully created.', () => {
    const store = createStore(rootReducer, initialState);

    const failureMessage = 'User Not created';

    const action = userActions.passFailureMessage(failureMessage);
    store.dispatch(action);

    const actual = store.getState().message;
    const expected = failureMessage;

    expect(actual).toEqual(expected);
    expect(typeof actual).toBe('string');
  });
});
