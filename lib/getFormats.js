const fetch = require("make-fetch-happen");
const parseList = require("./parse/parseList");
const pathJoinSmogon = require("./util/pathJoinSmogon");
const {
    FETCH_OPTIONS
} = require("./constants");

/**
 * Fetches formats available for a given timeframe
 *
 * @param {string} timeframe
 * @returns {Array<string>}
 */
module.exports = timeframe =>
    new Promise((resolve, reject) => {
        fetch(pathJoinSmogon([timeframe, "/"]), FETCH_OPTIONS)
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
