const REGEX_META = /.+: (.+)/;

/**
 * Loads meta from line
 *
 * @param {string} line
 * @param {number}
 */
const getMeta = line => Number(line.match(REGEX_META)[1]);

/**
 * Parses percentage as number
 *
 * @param {string} text
 * @param {number}
 */
const parsePercentage = str => Number(str.replace("%", ""));

/**
 * Splits rows
 *
 * @param {string} text
 * @param {Array<string>}
 */
const splitRows = text => text.trim().split("\n");

/**
 * Loads fields from markdown table
 *
 * @param {string} text
 * @param {Array<string>}
 */
const splitFields = text =>
    text
        .split("|")
        .map(item => item.trim())
        .filter(item => item.length > 0);

module.exports = {
    getMeta,
    parsePercentage,
    splitRows,
    splitFields
};
