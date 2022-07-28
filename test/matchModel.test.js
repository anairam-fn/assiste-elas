const Match = require("../src/models/matchModel");

describe("Match Model Test", () => {
  const match = new Match({
    team1: "62d753222aa6b10849692dd6",
    team2: "62e1dff725e2ba9b09127d16",
    local: "Bucaramanga - Colombia",
    date: "2022-07-30",
    time: "21h30",
    type: "Copa América",
    streaming: "SBT, SporTV",
  });

  test("Must call the schema and return a new match", () => {
    expect(match.type).toBe("Copa América");
  });

  test("Must save a new match in the database", () => {
    match.save().then((data) => {
      expect(data.local).toBe("Bucaramanga - Colombia");
    });
  });

  test("Must delete the new match", () => {
    match.deleteOne({ _id: match._id }).then((err, res) => {
      expect(res.message).toBe(`Match ${deletedMatch._id} was successfully deleted!`);
    });
  });
});
