// import React from 'react';
// import { shallow } from 'enzyme';
// import { expect } from 'chai';


// describe('Create Document Test', () => {
//   const props = {
//     document: {
//       docContent: {
//         _id: '1',
//         title: 'Hey',
//         content: 'Test document content',
//         role: '2',
//         email: 'spiderman@gmail.com',
//         roleTitle: 'admin',
//         access: 'public',
//       },
//       isUpdatingDoc: false,
//       isShowingDialog: true,
//     },
//     onCreate: () => Promise.resolve(),
//     setAccess: () => Promise.resolve(),
//     isShowing: false,
//     onChange: () => Promise.resolve(),
//     onSubmit: () => Promise.resolve(),
//     onClose: () => Promise.resolve(),
//   };

//   it('shows create dialog for documents', () => {
//     const wrapper = shallow(<CreateDocument {...props} />);
//     expect(wrapper.find(Dialog)).to.be.defined;
//     expect(wrapper.find(Dialog).props().title).to.eql('Create Document');
//   });

//   it('shows edit dialog for documents', () => {
//     const wrapper = shallow(<CreateDocument
//     />);
//     expect(wrapper.find(Dialog)).to.be.defined;
//     expect(wrapper.find(Dialog).props().title).to.eql('Edit Document');
//   });

//   it('shows two text fields', () => {
//     const wrapper = shallow(<CreateDocument {...props} />);
//     expect(wrapper.find(TextField)).to.have.length(2);
//   });

//   it('shows a select field for roles', () => {
//     const wrapper = shallow(<CreateDocument {...props} />);
//     expect(wrapper.find(SelectField)).to.have.length(1);
//   });
// });
