const fetch = require("make-fetch-happen");
const pathJoinSmogon = require("./util/pathJoinSmogon");
const { FETCH_OPTIONS } = require("./constants");

/**
 * Fetches chaos data available for a given timeframe + format
 *
 * @param {string} timeframe
 * @param {string} format
 * @returns {object}
 */
module.exports = (timeframe, format) =>
    new Promise((resolve, reject) => {
        fetch(
            pathJoinSmogon([timeframe, "chaos", `${format}.json`]),
            FETCH_OPTIONS
        )
            .then(res => res.text())
            .then(text => {
                const data = JSON.parse(text);

                resolve(data);
            })
            .catch(reject);
    });
