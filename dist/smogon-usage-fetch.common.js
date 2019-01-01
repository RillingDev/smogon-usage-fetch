'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fetch = _interopDefault(require('node-fetch'));
var cheerio = require('cheerio');
var lightdash = require('lightdash');

/**
 * Off-brand path.join().
 *
 * @param args URL paths to join.
 * @return Joined URL.
 */
const urlJoin = (...args) => args.join("/");

const URL_BASE = "http://www.smogon.com";
const URL_PATH_STATS = "stats";
const URL_STATS = urlJoin(URL_BASE, URL_PATH_STATS);

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
        .get();
};

/**
 * Removes trailing sequences from a string.
 *
 * @param str String to use.
 * @param seq Sequence to remove.
 * @return String without trailing sequence.
 */
const removeTrailing = (str, seq) => {
    if (lightdash.isRegExp(seq)) {
        return str.replace(seq, "");
    }
    return str.includes(seq) ? str.substr(0, str.lastIndexOf(seq)) : str;
};
/**
 * Removes trailing slashes from a string.
 *
 * @param str String to use.
 * @return String without trailing slash.
 */
const removeTrailingSlash = (str) => removeTrailing(str, "/");
/**
 * Removes file extension from a string
 *
 * @param str String to use.
 * @return String without file extension.
 */
const removeExtension = (str) => removeTrailing(str, /\..+$/);
/**
 * Checks if a file name is a directory.
 *
 * @param str String to check.
 * @return If the file is a directory.
 */
const isFile = (str) => !str.endsWith("/");

/**
 * Loads a list of all available timeframes.
 *
 * @return List of timeframe names.
 */
const fetchTimeframes = async () => fetch(urlJoin(URL_STATS))
    .then(res => res.text())
    .then(html => parseList(html).map(removeTrailingSlash));

/**
 * Loads a list of all available formats for a given timeframe.
 *
 * @return List of format names.
 */
const fetchFormats = async (timeframe) => fetch(urlJoin(URL_STATS, timeframe))
    .then(res => res.text())
    .then(html => parseList(html)
    .filter(isFile)
    .map(removeExtension));

const URL_PATH_CHAOS = "chaos";
/**
 * Loads the chaos data for a given timeframe and format.
 *
 * @return Object containing chaos data.
 */
const fetchChaos = async (timeframe, format) => fetch(urlJoin(URL_STATS, timeframe, URL_PATH_CHAOS, `${format}.json`)).then(res => res.json());

exports.fetchTimeframes = fetchTimeframes;
exports.fetchFormats = fetchFormats;
exports.fetchChaos = fetchChaos;
