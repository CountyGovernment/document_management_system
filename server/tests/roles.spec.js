// Change to test environment
process.env.NODE_ENV = 'test';

// Dev Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
// const expect = require('chai');
const expect = require('expect');
const server = require('../../app');

const should = chai.should();
chai.use(chaiHttp);


let token = '';

describe('role contoller methods', () => {
  chai.request(server)
  .post('/api/users')
  .send({ username: 'tester', firstName: 'tester', secondName: 'tester', email: 'tester@gmail.com', password: 'tester', roletitle: 'admin' })
  .then((res) => {
    // console.log('got here');
    // console.log('res >>>>', res.body);
  });


  beforeEach('login', (done) => {
    const admin = {
      email: 'tester@gmail.com',
      password: 'tester',
    };
    chai.request(server)
      .post('/api/users/login')
      .send(admin)
      .end((err, res) => {
        // console.log('res >>>>>>>>>', res.body);
        token = res.body.token;
        // console.log('token', token);
        done();
      });
  });

  /*
   * Test the /GET route
   */
  describe('/GET roles', () => {
    it('it should GET all roles', (done) => {
      chai.request(server)
        .get('/api/roles')
        .set('authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  /*
   * Test the /POST route
   */
  describe('/POST roles', () => {
    it('it should create a role', (done) => {
      const role = {
        title: 'staff',
      };
      chai.request(server)
        .post('/api/roles')
        .set('authorization', token)
        .send(role)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('You have created a role!');
          done();
        });
    });
  });
});
