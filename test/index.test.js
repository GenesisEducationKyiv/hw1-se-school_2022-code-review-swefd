const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../app");

chai.use(chaiHttp);

describe("Endpoint /api/rate", () => {
  it("should successfully request rate from binance, and send to client as response", (done) => {
    chai
      .request(server)
      .get("/api/rate")
      .end((err, res) => {
        res.should.have.status(200);
        console.log(res.text.should.be.not.empty);
        done();
      });
  });
});

describe("Endpoint /api/subscribe", () => {
  it("should successfully request rate from binance, and send to client as response", (done) => {
    chai
      .request(server)
      .post("/api/subscribe")
      .field({ email: "asd@mail.com" })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
