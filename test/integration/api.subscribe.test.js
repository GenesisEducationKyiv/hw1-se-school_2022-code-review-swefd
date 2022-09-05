const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const MockFS = require("mock-fs");
const server = require("../../app");

chai.use(chaiHttp);

describe("Endpoint /api/subscribe", () => {
  beforeEach(() => {
    MockFS({
      src: {
        models: {
          "db.txt": "exist@mail.com" + "\n",
        },
      },
    });
  });

  afterEach(() => {
    MockFS.restore();
  });

  it("should successfully subscribe email", (done) => {
    const newEmail = "new@email.com";
    chai
      .request(server)
      .post("/api/subscribe")
      .field({ email: newEmail })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message");
        res.body.message.should.eqls(`${newEmail} successfully subscribed`);
        done();
      });
  });

  it("should return message 'email already exist' with http status 409", (done) => {
    chai
      .request(server)
      .post("/api/subscribe")
      .field({ email: "exist@mail.com" })
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.have.property("message");
        res.body.message.should.eqls("already subscribed");
        done();
      });
  });
});
