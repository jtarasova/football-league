const express = require("express");
const router = express.Router();
const League = require("../models/league");
const Teams = require("../models/team");
const Users = require("../models/user");
const Players = require("../models/player");
const splitToTeams = require("../scripts/randomizers");

router.get("api/gamestart", async (req, res) => {
  let playerPool = await Players.find();
  splitToTeams(playerPool);
  console.log("success!");
  let teams = await Teams.find();

  res.send(JSON.stringify(teams));
});

module.exports = router;