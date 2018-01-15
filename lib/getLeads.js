const { URL_BASE, FETCH_OPTIONS } = require("./constants");
const fetch = require("make-fetch-happen");
const {
    splitRows,
    getMeta,
    splitFields,
    parsePercentage
} = require("./parseTable");

const mapUsageRows = row => {
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

module.exports = (timeframe, modes) =>
    new Promise((resolve, reject) => {
        fetch(`${URL_BASE + timeframe}/leads/${modes}.txt`, FETCH_OPTIONS)
            .then(res => res.text())
            .then(text => {
                const lines = splitRows(text);
                const result = {
                    total: getMeta(lines[0]),
                    stats: lines.slice(4, lines.length - 1).map(mapUsageRows)
                };

                resolve(result);
            })
            .catch(reject);
    });
