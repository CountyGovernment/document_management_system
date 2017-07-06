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
describe('before login', () => {
  it('asserts that documents cannot be accessed if not logged in', (done) => {
    chai.request(server)
      .get('/api/documents')
      .end((err, res) => {
        expect(res.body.message).toBe('Token required to access this route');
        done();
      });
  });
});

describe('documents contoller methods', () => {
  chai.request(server)
  .post('/api/users')
  .send({ username: 'tester', firstName: 'tester', secondName: 'tester', email: 'tester@gmail.com', password: 'tester', roleId: '1' })
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

    // const regular = {
    //   email: 'blackpanther@gmail.com',
    //   password: 'blackpanther33',
    // };
  //   chai.request(server)
  //   .get('/api/users/login')
  //   .send(regular)
  //   .end((err, res) => {
  //     token = res.body.token;
  //     done();
  //   });
  // });

  /*
   * Test the /GET route
   */
  describe('/GET document', () => {
    it('it should GET all documents', (done) => {
      chai.request(server)
        .get('/api/documents')
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
  describe('/POST document', () => {
    it('it should POST a document', (done) => {
      const document = {
        title: 'Girl with the dragon tattoo',
        content: 'Be a great hacker and steal from rich folks',
        access: 'public',
        userId: 4,
      };
      chai.request(server)
        .post('/api/documents')
        .set('authorization', token)
        .send(document)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Document created successfully!');
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id document', () => {
    it('it should GET a document by the given id', (done) => {
      chai.request(server)
        .get('/api/documents/1')
        .set('authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('content');
          res.body.should.have.property('access');
          res.body.should.have.property('userId');
          done();
        });
    });

    it('it should not return a document', (done) => {
      chai.request(server)
        .get('/api/documents/0')
        .set('authorization', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Document is not available');
          done();
        });
    });
  });

  /*
   * Test the /PUT/:id route
   */
  describe('/PUT/:id document', () => {
    it('it should UPDATE a document given the id', (done) => {
      const document = {
        title: 'Girl with the dragon tattoo update',
      };
      chai.request(server)
        .put('/api/documents/7')
        .set('authorization', token)
        .send(document)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Document Successfully updated!');
          done();
        });
    });

    it('it should UPDATE a document by the given id if an admin', (done) => {
      const document = {
        title: 'Knowledge',
      };
      chai.request(server)
        .put('/api/documents/2')
        .set('authorization', token)
        .send(document)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Document Successfully updated!');
          done();
        });
    });

    it('it should UPDATE a document by the given id if userId matches owners id', (done) => {
      const document = {
        title: 'Songs',
      };
      chai.request(server)
        .put('/api/documents/3')
        .set('authorization', token)
        .send(document)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Document Successfully updated!');
          done();
        });
    });
  });

  describe('/GET/?limit={integer}?offset={integer} pagination for documents', () => {
    it('it should GET documents based on query', (done) => {
      chai.request(server)
        .get('/api/documents/?limit=1&offset=1')
        .set('authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  /*
   * Test the /GET/?title route
   */
  describe('/GET/?title search documents', () => {
    // it('it should not GET a document by the given title', (done) => {
    //   chai.request(server)
    //     .get('/api/search/documents/?q=people')
    //     .set('authorization', token)
    //     .end((err, res) => {
    //       res.should.have.status(401);
    //       res.body.should.have.property('message').eql('Document is not available');
    //       done();
    //     });
    // });

    it('it should GET a document by the given title', (done) => {
      chai.request(server)
        .get('/api/search/documents/?q=Girl with the dragon tattoo')
        .set('authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].should.have.property('title').eql('Girl with the dragon tattoo');
          done();
        });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe('/DELETE/:id document', () => {
    it('it should DELETE a document given the id', (done) => {
      chai.request(server)
        .delete('/api/documents/6')
        .set('authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Document successfully deleted!');
          done();
        });
    });

    it('it should DELETE a document if an admin or owner is deleting it', (done) => {
      chai.request(server)
        .delete('/api/documents/5')
        .set('authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Document successfully deleted!');
          done();
        });
    });
  });
});
