const cheerio = require("cheerio");

module.exports = function (text) {
    const $ = cheerio.load(text);

    return $("pre a")
        .filter((i, el) => $(el).text() !== "../")
        .map((i, el) => $(el).text())
        .get();
};
