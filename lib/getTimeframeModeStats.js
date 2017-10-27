const fetch = require("node-fetch");
const {
    URL_BASE
} = require("./constants");
const parseTable = require("./parseTable");

module.exports = (timeframe, modes) => new Promise((resolve, reject) => {
    fetch(`${URL_BASE}${timeframe}/${modes}.txt`)
        .then(res => res.text())
        .then(text => resolve(parseTable(text)))
        .catch(reject);
});
