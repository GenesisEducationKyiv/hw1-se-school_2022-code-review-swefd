const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const MockFS = require("mock-fs");
const server = require("../../app");

chai.use(chaiHttp);

// FIXME: refactor this test
describe("Endpoint /api/sendEmails", () => {
  before(() => {
    MockFS({
      src: {
        models: {
          "db.txt": "test@mail.com" + "\n" + "test2@mail.com",
        },
      },
    });
  });

  after(() => {
    MockFS.restore();
  });

  it("should successfully send an email", (done) => {
    chai
      .request(server)
      .post("/api/sendEmails")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message");
        done();
      });
  });

  it("should successfully send an email", (done) => {
    chai
      .request(server)
      .post("/api/sendEmails")
      .end((err, res) => {
        res.should.have.status(200);
        chai // FIXME: Temp solution
          .request("mailtrap.io")
          .get("/api/accounts/1308792/inboxes/1834424/messages")
          .set("Api-Token", "18d835bdd157c727fe7603dec4424e6e")
          .end((err, res) => {
            let emails = [];

            emails.push(res.body[0]["to_email"]);
            emails.push(res.body[1]["to_email"]);

            emails.should.contain("test@mail.com");
            emails.should.contain("test2@mail.com");
            done();
          });
      });
  });
});
