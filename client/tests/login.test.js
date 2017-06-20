import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Login from '../components/main/Login';


describe('Login form', () => {
  const props = {
    auth: {
      isAuthenticated: true,
      isFetching: false,
      credentials: {
        email: 'spiderman.com',
        password: 'spidey33',
      },
      validations: {
        isValid: true,
        errorMessage: {},
      },
      error: {},
    },
    onLogin: () => Promise.resolve(),
    onChange: () => Promise.resolve(),
    onBlur: () => Promise.resolve(),
    reset: () => Promise.resolve(),
  };
  it('renders a container', () => {
    const wrapper = shallow(<Login {...props} />);
    expect(wrapper.find(container)).to.have.length(2);
  });
  it('renders a email text field', () => {
    const wrapper = shallow(<Login {...props} />);
    expect(wrapper.find('.email')).to.have.length(1);
  });

  it('renders a password field', () => {
    const wrapper = shallow(<Login {...props} />);
    expect(wrapper.find('.password')).to.have.length(1);
  });

  it('renders a log in button', () => {
    const wrapper = shallow(<Login {...props} />);
    expect(wrapper.find('.loginButton')).to.have.length(1);
  });
});

