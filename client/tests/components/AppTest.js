import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import expect from 'expect';
import App from '../components/AppTest';

// function setup(loading) {
//   const props = {
//     children: {},
//   };

//   return shallow(<App />);
// }
// describe('App component Test via Enzyme', () => {
//   it('should render a `container-fluid` element', () => {
//     const wrapper = setup();
//     expect(wrapper.find('div').props().className).toBe('container-fluid');
//   });

//   it('should have a `Header` children component', () => {
//     const wrapper = setup();
//     expect(wrapper.find('Header').length).toBe(0);
//   });
// });

describe('<MyComponent />', () => {
  it('should render three <Foo /> components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('div').props().className).toBe('container-fluid');
  });
});
