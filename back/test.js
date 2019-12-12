const mongoose = require("mongoose");
mongoose.connect(`mongodb://localhost:27017/football-league`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const Teams = require("./models/team");

let arr = [];

for (let i = 1; i <= 30; i++) {
  arr.push(`Player${i}`);
}

function randomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

function randomPair(array) {
  if (array.length > 1) {
    let ind1 = randomInt(0, array.length);
    let pl1 = array[ind1];
    array.splice(ind1, 1);
    let ind2 = randomInt(0, array.length);
    let pl2 = array[ind2];
    array.splice(ind2, 1);

    let pair = [pl1, pl2];
    return pair;
  } else {
    let pair = [...array];
    return pair;
  }
}

function splitToTeams(array) {
  let i = 1;
  if (array.length > 1) {
    let pair = randomPair(array);
    let team = new Teams({
      title: i,
      participants: [...pair]
    }).save();
    i++;
    splitToTeams(array);
  } else if (array.length === 1) {
    console.log("array's length is 1");

    let team = new Teams({
      title: i,
      participants: [...array]
    }).save();
  }
}

splitToTeams(arr);
