'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fetch = _interopDefault(require('node-fetch'));
var cheerio = require('cheerio');

const STAT_URL = "http://www.smogon.com/stats/";

/**
 * Loads a list of strings from the default apache2 directory listing.
 *
 * @param html Html of the directory list.
 * @return List of page entries
 */
const parseList = (html) => {
    const $ = cheerio.load(html);
    return $("pre a")
        .filter((i, el) => $(el).text() !== "../") // Filter Link to previous directory
        .map((i, el) => $(el).text()) // Only use link text
        .get()
        .map((linkText) => linkText.substr(0, linkText.length - 1)); // Cut of trailing slash;
};

/**
 * Loads a list of all available timeframes.
 *
 * @return List of timeframe names.
 */
const fetchTimeframes = () => fetch(STAT_URL)
    .then(res => res.text())
    .then(parseList);

exports.fetchTimeframes = fetchTimeframes;
