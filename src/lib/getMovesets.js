const fetch = require("make-fetch-happen");
const pathJoinSmogon = require("./util/pathJoinSmogon");
const {
    splitBlocks,
    getMeta,
    splitFields,
    getFrequency
} = require("./parse/parseTable");
const { FETCH_OPTIONS } = require("./constants");

/**
 * Loads row into object
 *
 * @private
 * @param {Array<Array<string>>} block
 * @returns {object}
 */
const mapMovesetBlocks = block => {
    const blockFields = block.map(subBlock =>
        subBlock.map(splitFields).map(subRow => subRow[0])
    );

    return {
        pokemon: blockFields[0][0],
        meta: {
            raw: getMeta(blockFields[1][0]),
            averageWeight: getMeta(blockFields[1][1]),
            viabilityRanking: getMeta(blockFields[1][2])
        },
        abilities: blockFields[2].slice(1).map(getFrequency),
        items: blockFields[3].slice(1).map(getFrequency),
        spreads: blockFields[4].slice(1).map(getFrequency),
        moves: blockFields[5].slice(1).map(getFrequency),
        teammates: blockFields[6].slice(1).map(getFrequency)
        // counters: blockFields[7].slice(1) // Weird format and encoding
    };
};

/**
 * Fetches movesets available for a given timeframe + format
 *
 * @param {string} timeframe
 * @param {string} format
 * @returns {object}
 */
module.exports = (timeframe, format) =>
    new Promise((resolve, reject) => {
        fetch(
            pathJoinSmogon([timeframe, "moveset/", `${format}.txt`]),
            FETCH_OPTIONS
        )
            .then(res => res.text())
            .then(text => {
                const blocks = splitBlocks(text).map(mapMovesetBlocks);

                resolve(blocks);
            })
            .catch(reject);
    });
