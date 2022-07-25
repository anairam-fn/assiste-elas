const app = require("../app");
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
        return done();
      });
  });

  test("Create Team", (done) => {
    request(app)
      .post("/team")
      .expect("Content-Type", /json/)
      .send({
        name: "Náutico",
        country: "Brazil",
        type: "Club",
      })
      .expect(201)
      .end((error, res) => {
        if (error) return done(error);
        elementId = res.body.savedTeam._id;
        return done();
      });
  });

  test("Patch Team", (done) => {
    request(app)
      .patch(`/team/${elementId}`)
      .expect("Content-Type", /json/)
      .send({
        name: "Sport",
        country: "Brazil",
        type: "Club",
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toBe(`${team} updated to ${updatedTeam}`);
      })
      .end((error, res) => {
        if (error) return done(error);
        return done();
      });
  });

  test("Delete Team", (done) => {
    request(app)
      .delete(`/team/${elementId}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toBe(
          `${deletedTeam} was successfully deleted`
        );
      })
      .end((error, res) => {
        if (error) return done(error);
        return done();
      });
  });
});
