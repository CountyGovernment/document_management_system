// Change to test environment
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('expect');
const server = require('../../app');

const should = chai.should();
chai.use(chaiHttp);


let token = '';

describe('role contoller methods', () => {
  beforeEach('login', (done) => {
    const admin = {
      email: 'batman@cave.com',
      password: 'batman',
    };
    chai.request(server)
      .post('/api/users/login')
      .send(admin)
      .end((err, res) => {
        token = res.body.token;
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
        roletitle: 'super admin',
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
