// import React from 'react';
// import sinon, { spy } from 'sinon';
// import expect from 'expect';
// import { shallow, mount, render } from 'enzyme';
// import { Signup } from '../../components/main/SignUp';

// let wrapper;

// /**
//  * @desc handles the triggering of the necessary action
//  * @param {*} isAuthenticated
//  * @returns {null} returns no value
//  */
// function setup(isAuthenticated) {
//   const props = {
//     isAuthenticated,
//     userActions: {
//       createUser: spy(() => new Promise((resolve) => { resolve(); })),
//     //   signup: spy(() => new Promise((resolve) => { resolve(); })),
//     },
//     message: '',
//   };

// //   const context = { router: [] };

//   return shallow(<Signup {...props} />);
// }

// describe('Signup component', () => {
//   it('should display the redirected component', () => {
//     wrapper = setup(true);
//     expect(wrapper).toExist();
//   });

//   it('should display the signup form', () => {
//     wrapper = setup(false);
//     expect(wrapper).toExist();
//   });

//   it('should change state when form is filled', () => {
//     wrapper = setup(false);
//     const firstname = wrapper.find('input[name="firstName"]');
//     firstname.simulate('change', {
//       preventDefault: () => {
//       },
//       target: { value: 'wanja', name: 'firstname' } });
//     const email = wrapper.find('input[name="email"]');
//     email.simulate('change', {
//       preventDefault: () => {
//       },
//       target: { value: 'wanja@wanja.com', name: 'email' } });
//     const password = wrapper.find('input[name="password"]');
//     password.simulate('change', {
//       preventDefault: () => {
//       },
//       target: { value: 'wanja', name: 'password' } });
//     expect(wrapper.state().user.firstname).toEqual('wanja');
//     expect(wrapper.state().user.email).toEqual('wanja@wanja.com');
//     expect(wrapper.state().user.password).toEqual('wanja');
//   });

// //   it('should compare the password fields', () => {
// //     const confirmPassword = wrapper.find('input[name="confirmPassword"]');
// //     confirmPassword.simulate('blur', {
// //       target: { value: 'pass', name: 'confirmPassword' } });
// //     expect(wrapper.state().wrongPassword).toBeTruthy();
// //   });

// //   it('should compare the password fields', () => {
// //     const confirmPassword = wrapper.find('input[name="confirmPassword"]');
// //     confirmPassword.simulate('blur', {
// //       target: { value: 'password', name: 'confirmPassword' } });
// //     expect(wrapper.state().wrongPassword).toBeFalsy();
// //   });

//   it('should submit the form when button is clicked', () => {
//     const form = wrapper.find('form[id="login-form"]');
//     form.simulate('submit', {
//       preventDefault: () => {
//       },
//     });
//     expect(wrapper.state().isLoading).toBeTruthy();
//   });

// //   it('should submit the form when button is clicked', () => {
// //     const confirmPassword = wrapper.find('input[name="confirmPassword"]');
// //     confirmPassword.simulate('blur', {
// //       target: { value: 'pass', name: 'confirmPassword' } });
// //     const form = wrapper.find('form[id="signupForm"]');
// //     form.simulate('submit', {
// //       preventDefault: () => {
// //       },
// //     });
// //     expect(wrapper.state().isLoading).toBeFalsy();
// //   });
// });
