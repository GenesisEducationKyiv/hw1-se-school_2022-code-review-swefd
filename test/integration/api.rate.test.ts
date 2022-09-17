import * as chai from "chai";
const should = chai.should();
import chaiHttp = require("chai-http");
import server from "../../src/app";
import nock = require("nock");

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

  it("should request rate from second provider, and return HTTP 200 to as response", (done) => {
    const binanceResponseMock = {
      message: "Conflict",
    };

    const coingecoResponceMock = {
      bitcoin: {
        uah: 987654,
      },
    };

    const expectedResponse = {
      rate: 987654,
    };

    nock("https://api.binance.com")
      .get("/api/v3/ticker/price?symbol=BTCUAH")
      .reply(409, binanceResponseMock);

    nock("https://api.coingecko.com")
      .get("/api/v3/simple/price?ids=bitcoin&vs_currencies=uah")
      .reply(200, coingecoResponceMock);

    chai
      .request(server)
      .get("/api/rate")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.deep.equals(expectedResponse);
        done();
      });
  });
});
