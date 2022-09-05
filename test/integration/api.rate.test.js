const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../../app");
const nock = require("nock");

chai.use(chaiHttp);

describe("Endpoint /api/rate", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("should successfully request rate from binance, and send to client as response", (done) => {
    chai
      .request(server)
      .get("/api/rate")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("rate");
        res.body.rate.should.satisfy(Number.isInteger);
        res.body.rate.should.be.greaterThanOrEqual(0);
        done();
      });
  });

  it("should successfully request rate from MOCK, and send to client as response", (done) => {
    const binanceResponseMock = {
      symbol: "BTCUSDT",
      price: "987654.32100000",
    };

    const expectedResponse = {
      rate: 987654,
    };

    nock("https://api.binance.com")
      .get("/api/v3/ticker/price?symbol=BTCUAH")
      .reply(200, binanceResponseMock);

    chai
      .request(server)
      .get("/api/rate")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("rate");
        res.body.rate.should.satisfy(Number.isInteger);
        res.body.rate.should.be.greaterThanOrEqual(0);
        res.body.should.be.deep.equal(expectedResponse);
        done();
      });
  });

  it("should request rate from MOCK, and return HTTP 409 to as response", (done) => {
    const binanceResponseMock = {
      message: "Conflict",
    };
    
    nock("https://api.binance.com")
      .get("/api/v3/ticker/price?symbol=BTCUAH")
      .reply(409, binanceResponseMock);

    chai
      .request(server)
      .get("/api/rate")
      .end((err, res) => {
        res.should.have.status(409);
        done();
      });
  });
});
