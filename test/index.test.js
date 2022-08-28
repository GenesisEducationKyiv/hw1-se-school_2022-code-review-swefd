const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../app");

chai.use(chaiHttp);

// eslint-disable-next-line no-undef
describe("Endpoint /api/rate", () => {
  // eslint-disable-next-line no-undef
  it("should successfully request rate from binance, and send to client as response", (done) => {
    chai
      .request(server)
      .get("/api/rate")
      .end((err, res) => {
        res.should.have.status(200);
        //res.body.should.be.a("object")
        console.log(res.text.should.be.not.empty);
        done();
      });
  });
});

// eslint-disable-next-line no-undef
describe("Endpoint /api/subscribe", () => {
  // eslint-disable-next-line no-undef
  it("should successfully request rate from binance, and send to client as response", (done) => {
    // const unixTime = Date.now()

    chai
      .request(server)
      .post("/api/subscribe")
      .field({ email: "asd@mail.com" })
      .end((err, res) => {
        res.should.have.status(200);
        console.log(res.body);
        done();
      });
  });
});

// describe('User Service Unit Tests', function () {
// 	describe('Save User functionality', function () {
// 		it('should successfully add a user if the number of users in the DB with the same profiled is zero', async function () {
//
// 		})
// 		it('should throw an error if the number of users with the same profileId is not zero', async function () {
// 		})
// 	})
// })
