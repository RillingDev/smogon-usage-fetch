const fetch = require("make-fetch-happen");
const parseList = require("./parse/parseList");
const { URL_FULL, FETCH_OPTIONS } = require("./constants");

/**
 * Fetches list of available timeframes
 *
 * @returns {Array<string>}
 */
module.exports = () =>
    new Promise((resolve, reject) => {
        fetch(URL_FULL, FETCH_OPTIONS)
            .then(res => res.text())
            .then(text =>
                resolve(
                    parseList(text).map(item => item.substr(0, item.length - 1))
                )
            )
            .catch(reject);
    });
