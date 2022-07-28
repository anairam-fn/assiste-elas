const app = require("../src/app");
const request = require("supertest");

let elementId;

describe("Teams Test", () => {
  test("Get Teams", (done) => {
    request(app)
      .get("/teams")
      .expect(200)
      .expect((res) => {
        expect(res.body.length).not.toBe(0);
      })
      .end((error, res) => {
        if (error) return done(error);
        idAdmin = res.body._id;
        return done();
      });
  });

  test("Login", (done) => {
    request(app)
      .post("/admin/login")
      .send({
        email: "teste@admin.com",
        password: "amarelinha",
      })
      .expect((res) => {
        token = res.body.token;
      })
      .expect(200)
      .end((error, res) => {
        if (error) return done(error);
        return done();
      });
  });

  test("Create Team", (done) => {
    request(app)
      .post("/team")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .send({
        name: "Náutico",
        country: "Brazil",
        type: "Club",
      })
      .expect(201)
      .end((error, res) => {
        if (error) return done(error);
        elementId = res.body._id;
        return done();
      });
  });

  test("Patch Team", (done) => {
    request(app)
      .patch(`/team/${elementId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .send({
        name: "Sport",
        country: "Brazil",
        type: "Club",
      })
      .expect(200)
      .end((error, res) => {
        if (error) return done(error);
        return done();
      });
  });

  test("Delete Team", (done) => {
    request(app)
      .delete(`/team/${elementId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toBeDefined();
      })
      .end((error, res) => {
        if (error) return done(error);
        return done();
      });
  });
});
