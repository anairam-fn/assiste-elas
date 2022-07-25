const Team = require("../src/models/teamModel");

describe("Team Model Test", () => {
  const team = new Team({
    _id: 1,
    name: "Náutico",
    country: "Brazil",
    type: "Club",
  });

  test("Must call the schema and return a new team", () => {
    expect(team.name).toBe("Náutico");
  });

  test("Must save a new team in the database", () => {
    team.save().then((data) => {
      expect(data.country).toBe("Brazil");
    });
  });

  test("Must delete the new team", () => {
    team.deleteOne({ _id: team._id }).then((err, res) => {
      expect(res.message).toBe(`${team} was successfully deleted`);
    });
  });
});
