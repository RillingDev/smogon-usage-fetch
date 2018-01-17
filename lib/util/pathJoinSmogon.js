const path = require("path");
const { URL_BASE, URL_PROTOCOL } = require("../constants");

module.exports = (arr = []) => URL_PROTOCOL + path.join(URL_BASE, ...arr);
