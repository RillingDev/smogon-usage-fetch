const fetch = require("make-fetch-happen");
const pathJoinSmogon = require("./util/pathJoinSmogon");
const {
    splitRows,
    getMeta,
    splitFields,
    parsePercentage
} = require("./parse/parseTable");
const { FETCH_OPTIONS } = require("./constants");

/**
 * Loads row into object
 *
 * @private
 * @param {Array<string>} row
 * @returns {object}
 */
const mapUsageRows = row => {
    const rowFields = splitFields(row);

    return {
        rank: Number(rowFields[0]),
        pokemon: rowFields[1],
        usage: parsePercentage(rowFields[2]),
        raw: {
            total: Number(rowFields[3]),
            percentage: parsePercentage(rowFields[4])
        },
        real: {
            total: Number(rowFields[5]),
            percentage: parsePercentage(rowFields[6])
        }
    };
};

/**
 * Fetches stats available for a given timeframe + format
 *
 * @param {string} timeframe
 * @param {string} format
 * @returns {object}
 */
module.exports = (timeframe, format) =>
    new Promise((resolve, reject) => {
        fetch(pathJoinSmogon([timeframe, `${format}.txt`]), FETCH_OPTIONS)
            .then(res => res.text())
            .then(text => {
                const lines = splitRows(text);
                const result = {
                    total: getMeta(lines[0]),
                    averageWeightPerTeam: getMeta(lines[1]),
                    stats: lines.slice(5, lines.length - 1).map(mapUsageRows)
                };

                resolve(result);
            })
            .catch(reject);
    });
