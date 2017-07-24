import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import LoginForm from '../../components/main/SigninForm';

function setup(loading) {
  const props = {
    loading,
    user: {},
    onSubmit: () => {},
    onChange: () => {},
  };

  return shallow(<LoginForm {...props} />);
}

describe('LoginForm test via Enzyme', () => {
  it('renders a form element', () => {
    const wrapper = setup(false);
    expect(wrapper.find('form').length).toBe(1);
  });

  it('Login button is labeled "Loading" when not loading', () => {
    const wrapper = setup(false);
    expect(wrapper.find('#login').props().value).toBe('Login');
  });

  it('Login button is labeled "Please wait..." when loading', () => {
    const wrapper = setup(true);
    expect(wrapper.find('#login').props().value).toBe('Please wait...');
  });
});
