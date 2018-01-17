const fetch = require("make-fetch-happen");
const pathJoinSmogon = require("./util/pathJoinSmogon");
const {
    splitRows,
    getMeta,
    splitFields,
    parsePercentage
} = require("./parse/parseTable");
const { FETCH_OPTIONS } = require("./constants");

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

module.exports = (timeframe, modes) =>
    new Promise((resolve, reject) => {
        fetch(pathJoinSmogon([timeframe, `${modes}.txt`]), FETCH_OPTIONS)
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
