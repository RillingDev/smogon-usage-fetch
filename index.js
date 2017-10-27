const fetch = require("node-fetch");

fetch("http://www.smogon.com/stats/2017-09/gen7oususpecttest-0.txt")
    .then(res => res.text())
    .then(d => console.log(d));
