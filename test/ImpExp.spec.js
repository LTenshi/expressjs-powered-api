var chai = require("chai");
var chaiHttp = require("chai-http");
var app = require("../dist");

var expect = chai.expect;

chai.use(chaiHttp);

describe("API", function() {

  describe("post", function() {

    describe("export", function() {

      it("responds with status 200", function(done) {
        chai.request(app)
          .post("/api/ImpExp/export")
          .send({
            "bookId": "Don Quichotte",
            "type": "epub"
          })
          .end(function(err, res) {
            expect(res).to.have.status(200);
            done();
          });
      });
  
      it("responds with status 400", function(done) {
        chai.request(app)
          .post("/api/ImpExp/export")
          .send({
            "bookId": "Don Quichotte"
          })
          .end(function(err, res) {
            expect(res).to.have.status(400);
            done();
          });
      });
  
    });

    describe("import", function() {

      it("responds with status 200", function(done) {
        chai.request(app)
          .post("/api/ImpExp/import")
          .send({
            "bookId": "Don Quichotte",
            "type": "epub",
            "url": "http://localhost:8080"
          })
          .end(function(err, res) {
            expect(res).to.have.status(200);
            done();
          });
      });
  
      it("responds with status 400", function(done) {
        chai.request(app)
          .post("/api/ImpExp/import")
          .send({
            "bookId": "Don Quichotte",
            "url": "http://localhost:8080"
          })
          .end(function(err, res) {
            expect(res).to.have.status(400);
            done();
          });
      });
  
    });

  });
  
  describe("get", function() {

    describe("export", function() {

      it("responds with status 200", function(done) {
        chai.request(app)
          .get("/api/ImpExp/exportRequests")
          .query({state: "finished"})
          .end(function(err, res) {
            expect(res).to.have.status(200);
            done();
          });
      });

      it("responds with status 400", function(done) {
        chai.request(app)
          .get("/api/ImpExp/exportRequests")
          .query("aaa")
          .end(function(err, res) {
            expect(res).to.have.status(400);
            done();
          });
      });

    });

    describe("import", function() {

      it("responds with status 200", function(done) {
        chai.request(app)
          .get("/api/ImpExp/importRequests")
          .query({state: "finished"})
          .end(function(err, res) {
            expect(res).to.have.status(200);
            done();
          });
      });

      it("responds with status 400", function(done) {
        chai.request(app)
          .get("/api/ImpExp/importRequests")
          .query("aaa")
          .end(function(err, res) {
            expect(res).to.have.status(400);
            done();
          });
      });
  
    });

  });

});