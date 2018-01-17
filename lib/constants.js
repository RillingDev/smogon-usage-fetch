const URL_BASE = "www.smogon.com/stats/";
const URL_PROTOCOL = "http://";
const URL_FULL = URL_PROTOCOL + URL_BASE;
const FETCH_OPTIONS = { cacheManager: "./.cache/" };

module.exports = { URL_BASE, URL_PROTOCOL, URL_FULL, FETCH_OPTIONS };
