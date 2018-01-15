const { URL_BASE, FETCH_OPTIONS } = require("./constants");
const fetch = require("make-fetch-happen");
const parseList = require("./parseList");

module.exports = () =>
    new Promise((resolve, reject) => {
        fetch(URL_BASE, FETCH_OPTIONS)
            .then(res => res.text())
            .then(text =>
                resolve(
                    parseList(text).map(item => item.substr(0, item.length - 1))
                )
            )
            .catch(reject);
    });
