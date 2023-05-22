let chai = require('chai');
const { expect } = require("chai");
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
var number = '123456789'
var string = '';
var pass = '';
var phone = '';

for(var i=0; i<8; i++){
    string += chars[Math.floor(Math.random() * chars.length)];
}
for(var i=0; i<8; i++){
    pass += chars[Math.floor(Math.random() * chars.length)];
}
for(var i=0; i<8; i++){
    phone += number[Math.floor(Math.random() * number.length)];
}

let customer = {
    name : "John Doe",
    email: string + '@gmail.com',
    password: pass,
    phone: phone
}

let badRequest = { "nme" : "Samuel Okpe", "emil": "hello@gmail.com"}

describe('/POST customer authentication', () => {
    it('It should respond with bad request for authentication', (done) => {
        
      chai.request(server)
          .post('/api/v1/customer/auth')
          .send(badRequest)
          .end((err, res) => {
                expect(res).to.have.status(400)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('message').eql('Email and password is required for authentication')
                expect(res.body).to.have.property('data').eql([])
                expect(res.body).to.have.property('status').eql(400)
            done();
          });
    });
});

describe('/POST customer authentication', () => {
    it('it should not login that has not been registered', (done) => {
        
      chai.request(server)
          .post('/api/v1/customer/auth')
          .send(customer)
          .end((err, res) => {
                expect(res).to.have.status(409)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('message').eql('Email has not been registered')
                expect(res.body).to.have.property('data').eql([])
                expect(res.body).to.have.property('status').eql(409)
            done();
          });
    });
});

describe('/POST customer authentication', () => {
    it('It should respond with bad request for authentication', (done) => {
        
      chai.request(server)
          .post('/api/v1/customer')
          .send(badRequest)
          .end((err, res) => {
                expect(res).to.have.status(400)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('message').eql('Name, Email and password is required for registration')
                expect(res.body).to.have.property('data').eql([])
                expect(res.body).to.have.property('status').eql(400)
            done();
          });
    });
});


describe('/POST customer', () => {
    it('it should create a new customer', (done) => {
        
      chai.request(server)
          .post('/api/v1/customer')
          .send(customer)
          .end((err, res) => {
                expect(res).to.have.status(201)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('message').eql('Customer Created')
                expect(res.body).to.have.property('data').eql([])
                expect(res.body).to.have.property('status').eql(201)
            done();
          });
    });

    it('it should not create a new customer with the same credentials', (done) => {
        
        chai.request(server)
            .post('/api/v1/customer')
            .send(customer)
            .end((err, res) => {
                  expect(res).to.have.status(409)
                  expect(res.body).to.be.a('object')
                  expect(res.body).to.have.property('message').eql('Email is already in use')
                  expect(res.body).to.have.property('data').eql([])
                  expect(res.body).to.have.property('status').eql(409)
              done();
            });
      });

});

describe('/POST Customer Authentication', () => {
    it('it should allow user to login', (done) => {
        
      chai.request(server)
          .post('/api/v1/customer/auth')
          .send(customer)
          .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('message').eql('Authentication Succesful')
                expect(res.body).to.have.property('data').to.have.property('token')
                expect(res.body).to.have.property('status').eql(200)
            done();
          });
    });



    let newCustomer = {

        email: string + '@gmail.com',
        password: "HIIIIIIIIII",
    }

    it('it should not authenticate customer', (done) => {
        
        chai.request(server)
            .post('/api/v1/customer/auth')
            .send(newCustomer)
            .end((err, res) => {
                  expect(res).to.have.status(401)
                  expect(res.body).to.be.a('object')
                  expect(res.body).to.have.property('message').eql('password is incorrect')
                  expect(res.body).to.have.property('data').eql([])
                  expect(res.body).to.have.property('status').eql(401)
              done();
            });
      });
});


let order = {"billing_address":"No 1/3 Olurunfunmi Street Oworoshoki Lagos",
"total_price": "17405.80",
"no_of_products": 8,
"payment_method": "Cash"}

let badRequestOrder = { "billing_addess" : "Samuel Okpe", "total_prce": "hello@gmail.com"}



describe('/POST Create Order and Get Orders', () => {
    it('It should not allow an unauthorized use rto access api', (done) => {
        
        chai.request(server)
            .post('/api/v1/customer/1/order')
            .send(badRequestOrder)
            .end((err, res) => {
                  expect(res).to.have.status(401)
                  expect(res.body).to.be.a('object')
                  expect(res.body).to.have.property('message').eql('Unauthorized')
                  expect(res.body).to.have.property('status').eql(401)
              done();
            });
      });

    it('it should allow user to login', (done) => {
        
        chai.request(server)
            .post('/api/v1/customer/auth')
            .send(customer)
            .end((err, res) => {
                  expect(res).to.have.status(200)
                  expect(res.body).to.be.a('object')
                  expect(res.body).to.have.property('message').eql('Authentication Succesful')
                  expect(res.body).to.have.property('data').to.have.property('token')
                  expect(res.body).to.have.property('status').eql(200)
              done();
              token = res.body.data.token;
            });
      });

    it('It should respond with bad request for creating order', (done) => {
        
      chai.request(server)
          .post('/api/v1/customer/1/order')
          .send(badRequestOrder)
          .set({ "Authorization": `Bearer ${token}` })
          .end((err, res) => {
                expect(res).to.have.status(400)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('message').eql('All fields are required')
                expect(res.body).to.have.property('data').eql([])
                expect(res.body).to.have.property('status').eql(400)
            done();
          });
    });
    let token;
    

    for(let i = 0; i < 8; i++){
        it('it should create order 8 times', (done) => {

        
            chai.request(server)
            .post('/api/v1/customer/1/order')
            .set({ "Authorization": `Bearer ${token}` })
            .send(order)
            .end((err, res) => {
                  expect(res).to.have.status(201)
                  expect(res.body).to.be.a('object')
                  expect(res.body).to.have.property('message').eql('Order Created')
                  expect(res.body).to.have.property('status').eql(201)
              done();
            });

        
      });
    }

    

      it('it should get orders 5 per page', (done) => {

            chai.request(server)
            .get('/api/v1/customer/1/order?page=1')
            .set({ "Authorization": `Bearer ${token}` })
            .send(order)
            .end((err, res) => {
                  expect(res).to.have.status(200)
                  expect(res.body).to.be.a('object')
                  expect(res.body).to.have.property('message').eql('Orders Retrieved')
                  expect(res.body).to.have.property('data').to.have.property('order').to.have.length(5)
                  expect(res.body).to.have.property('status').eql(200)
              done();
            });
        
      });

      it('it should not get orders 5 per page because page does not exist', (done) => {

        chai.request(server)
        .get('/api/v1/customer/1/order?page=3')
        .set({ "Authorization": `Bearer ${token}` })
        .send(order)
        .end((err, res) => {
              expect(res).to.have.status(200)
              expect(res.body).to.be.a('object')
              expect(res.body).to.have.property('message').eql('Orders Retrieved')
              expect(res.body).to.have.property('data').to.have.property('order').eql([])
              expect(res.body).to.have.property('status').eql(200)
          done();
        });
    
  });

  it('Invalid page or limit value', (done) => {

    chai.request(server)
    .get('/api/v1/customer/1/order?page=hello')
    .set({ "Authorization": `Bearer ${token}` })
    .send(order)
    .end((err, res) => {
          expect(res).to.have.status(400)
          expect(res.body).to.be.a('object')
          expect(res.body).to.have.property('message').eql('Invalid page or limit value')
          expect(res.body).to.have.property('data').eql([])
          expect(res.body).to.have.property('status').eql(400)
      done();
    });

});


});
