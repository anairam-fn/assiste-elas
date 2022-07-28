const app = require("../src/app");
const request = require("supertest");

let elementId;

describe("Matches Test", () => {
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

  test("Create Match", (done) => {
    request(app)
      .post("/match")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .send({
        team1Id: "62d753222aa6b10849692dd6",
        team2Id: "62e1dff725e2ba9b09127d16",
        local: "Bucaramanga - Colombia",
        date: "2022-07-30",
        time: "21h30",
        type: "Copa América",
        streaming: "SBT, SporTV",
      })
      .expect(201)
      .end((error, res) => {
        if (error) return done(error);
        elementId = res.body._id;
        return done();
      });
  });

  test("Get Matches", (done) => {
    request(app)
      .get("/matches")
      .expect(200)
      .expect((res) => {
        expect(res.body.length).not.toBe(0);
      })
      .end((error, res) => {
        if (error) return done(error);
        return done();
      });
  });

  test("Get Match By Team", (done) => {
    request(app)
      .get("/matches/team")
      .query({ name: "Brazil" })
      .expect(200)
      .expect((res) => {
        expect(res.body.length).not.toBe(0);
      })
      .end((error, res) => {
        if (error) return done(error);
        return done();
      });
  });

  test("Get Match By Day", (done) => {
    request(app)
      .get("/matches/day")
      .query({ date: "2022-07-30" })
      .expect(200)
      .expect((res) => {
        expect(res.body.length).not.toBe(0);
      })
      .end((error, res) => {
        if (error) return done(error);
        return done();
      });
  });

  test("Patch Match", (done) => {
    request(app)
      .patch(`/match/${elementId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .send({
        time: "21h00",
        type: "Final Copa América",
      })
      .expect(200)
      .end((error, res) => {
        if (error) return done(error);
        return done();
      });
  });

  test("Delete Match", (done) => {
    request(app)
      .delete(`/match/${elementId}`)
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
