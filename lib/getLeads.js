const fetch = require("make-fetch-happen");
const pathJoinSmogon = require("./util/pathJoinSmogon");
const {
    splitRows,
    getMeta,
    splitFields,
    parsePercentage
} = require("./parse/parseTable");
const {
    FETCH_OPTIONS
} = require("./constants");

/**
 * Loads row into object
 *
 * @private
 * @param {Array<string>} row
 * @returns {object}
 */
const mapLeadRows = row => {
    const rowFields = splitFields(row);

    return {
        rank: Number(rowFields[0]),
        pokemon: rowFields[1],
        usage: parsePercentage(rowFields[2]),
        raw: {
            total: Number(rowFields[3]),
            percentage: parsePercentage(rowFields[4])
        }
    };
};

/**
 * Fetches leads available for a given timeframe + format
 *
 * @param {string} timeframe
 * @param {string} format
 * @returns {object}
 */
module.exports = (timeframe, format) =>
    new Promise((resolve, reject) => {
        fetch(
                pathJoinSmogon([timeframe, "leads/", `${format}.txt`]),
                FETCH_OPTIONS
            )
            .then(res => res.text())
            .then(text => {
                const lines = splitRows(text);
                const result = {
                    total: getMeta(lines[0]),
                    stats: lines.slice(4, lines.length - 1).map(mapLeadRows)
                };

                resolve(result);
            })
            .catch(reject);
    });
