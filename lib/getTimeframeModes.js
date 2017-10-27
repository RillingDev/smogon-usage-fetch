const fetch = require("node-fetch");
const {
    URL_BASE
} = require("./constants");
const parseList = require("./parseList");

module.exports = (timeframe) => new Promise((resolve, reject) => {
    fetch(URL_BASE + timeframe)
        .then(res => res.text())
        .then(text => resolve(parseList(text).map(item => {
            item.name = item.name.replace(".txt", "");

            return item;
        })))
        .catch(reject);
});
