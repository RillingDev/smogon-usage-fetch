const { URL_BASE, FETCH_OPTIONS } = require("./constants");
const fetch = require("make-fetch-happen");
const parseList = require("./parseList");

module.exports = timeframe =>
    new Promise((resolve, reject) => {
        fetch(`${URL_BASE + timeframe}/`, FETCH_OPTIONS)
            .then(res => res.text())
            .then(text =>
                resolve(
                    parseList(text)
                        .filter(item => !item.endsWith("/")) // Exclude sub-directories
                        .map(item => item.replace(".txt", ""))
                )
            )
            .catch(reject);
    });
