const fetch = require("node-fetch");
const {
    URL_BASE
} = require("./constants");
const parseList = require("./parseList");

module.exports = () => new Promise((resolve, reject) => {
    fetch(URL_BASE)
        .then(res => res.text())
        .then(text => resolve(parseList(text)
            .map(item => item.substr(0, item.length - 1))
        ))
        .catch(reject);
});
