const REGEX_GET_META = /.+: (.+)/;
const REGEX_GET_FREQUENCY = /(.+) +(.+)/;
const REGEX_IS_TABLE_SEPARATOR = /\+-+\+/;
const REGEX_IS_TABLE_SEPARATOR_DOUBLE = /\+-+\+\n\+-+\+/;

/**
 * Loads meta from line
 *
 * @param {string} line
 * @param {number}
 */
const getMeta = line => Number(line.match(REGEX_GET_META)[1]);

/**
 * Loads frequency from line
 *
 * @param {string} line
 * @param {Array<Array<string,number>>}
 */
const getFrequency = line => {
    const match = line.match(REGEX_GET_FREQUENCY);

    return [match[1].trim(), parsePercentage(match[2])];
};

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
const splitRows = text =>
    text
    .trim()
    .split("\n")
    .map(row => row.trim());

/**
 * Splits rows
 *
 * @param {string} text
 * @param {Array<string>}
 */
const splitBlocks = text => {
    const textTrimmed = splitRows(text)
        .slice(1, -1)
        .join("\n");
    const arr = textTrimmed.split(REGEX_IS_TABLE_SEPARATOR_DOUBLE);

    return arr.map(block => block
        .split(REGEX_IS_TABLE_SEPARATOR)
        .map(subBlock => splitRows(subBlock))
    );
};

/**
 * Loads fields from markdown table
 *
 * @param {string} text
 * @param {Array<string>}
 */
const splitFields = text => text
    .split("|")
    .map(item => item.trim())
    .filter(item => item.length > 0);

module.exports = {
    getMeta,
    getFrequency,
    parsePercentage,
    splitRows,
    splitBlocks,
    splitFields
};
