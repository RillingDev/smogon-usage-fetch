const getMeta = line => Number(line.match(/.+: (.+)/)[1]);

const parsePercentage = str => Number(str.replace("%", ""));

const splitRows = text => text.trim().split("\n");

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
