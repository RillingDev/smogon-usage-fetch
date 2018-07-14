const path = require("path");
const {
    URL_BASE,
    URL_PROTOCOL
} = require("../constants");

/**
 * Creates full url for a path
 *
 * @param {Array<string>} [arr=[]]
 * @param {string}
 */
module.exports = (arr = []) => URL_PROTOCOL + path.join(URL_BASE, ...arr);
