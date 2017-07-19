// Change to test environment
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');


const should = chai.should();
chai.use(chaiHttp);

let token = '';
describe('Users controller methods', () => {
  // chai.request(server)
  //   .post('/api/users')
  //   .send({ username: 'tester', firstName: 'tester', secondName: 'tester', email: 'tester3@gmail.com', password: 'tester', roletitle: 'regular' })
  //   .then((res) => {
  //     // console.log('res >>>>', res.body);
  //   });


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
  describe('/GET user', () => {
    it('it should GET all users', (done) => {
      chai.request(server)
        .get('/api/users')
        .set('authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id user', () => {
    it('it should GET a user by the given id', (done) => {
      chai.request(server)
        .get('/api/users/2')
        .set('authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('username');
          res.body.should.have.property('firstName');
          res.body.should.have.property('secondName');
          res.body.should.have.property('email');
          res.body.should.have.property('password');
          res.body.should.have.property('roletitle');
          done();
        });
    });
  });

  /*
   * Test the /PUT/:id route
   */
  describe('/PUT/:id user', () => {
    it('it should UPDATE a user by the given id if an admin', (done) => {
      const user = {
        email: 'batman@cave.com',
      };
      chai.request(server)
        .put('/api/users/1')
        .set('authorization', token)
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User Successfully updated!');
          done();
        });
    });

    it('it should UPDATE a user by the given id if id matches current userId', (done) => {
      const user = {
        email: 'batman@cave.com',
      };
      chai.request(server)
        .put('/api/users/1')
        .set('authorization', token)
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User Successfully updated!');
          done();
        });
    });
  });

  /*
   * Test the /GET/?limit={integer}?offset={integer} route
   */
  describe('/GET/?limit={integer}?offset={integer} for user', () => {
    it('it should GET users based on query', (done) => {
      chai.request(server)
        .get('/api/users/?limit=1&offset=2')
        .set('authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  /*
   * Test the /GET/?username route
   */
  describe('/GET/?username search user', () => {
    it('it should GET a user by the given username', (done) => {
      chai.request(server)
        .get('/api/search/users/?q=Batman')
        .set('authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].should.have.property('username').eql('Batman');
          done();
        });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe('/DELETE/:id user', () => {
    it('it should DELETE a user given the id if user is an admin', (done) => {
      chai.request(server)
        .delete('/api/users/3')
        .set('authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User successfully deleted');
          done();
        });
    });
  });
});
