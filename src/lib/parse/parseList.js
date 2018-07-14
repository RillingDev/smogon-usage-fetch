const cheerio = require("cheerio");

/**
 * Loads content of a html list
 *
 * @param {string} html
 * @param {Array<string>}
 */
module.exports = html => {
    const $ = cheerio.load(html);

    return $("pre a")
        .filter((i, el) => $(el).text() !== "../") // Filter Link to previous directory
        .map((i, el) => $(el).text()) // Only use link text
        .get(); // Return as array of strings
};
