const cheerio = require("cheerio");
const {
    URL_BASE
} = require("./constants");

module.exports = function (text) {
    const $ = cheerio.load(text);

    return $("pre a")
        .filter((i, el) => $(el).text() !== "../")
        .map((i, el) => {
            const $el = $(el);

            return {
                name: $el.text(),
                link: [URL_BASE, $el.attr("href")].join("")
            };
        })
        .get();
};
