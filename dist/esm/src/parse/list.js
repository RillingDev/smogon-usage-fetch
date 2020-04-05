import * as cheerio from "cheerio";
const PARENT_DIRECTORY_LINK = "../";
const DIRECTORY_LINK_SELECTOR = "pre a";
/**
 * Parses a list of links from the default apache2 directory listing.
 *
 * @private
 * @param html Html of the directory list.
 * @return List of page entries
 */
const parseApacheDirectoryListing = (html) => {
    const $ = cheerio.load(html);
    return $(DIRECTORY_LINK_SELECTOR)
        .map((i, el) => $(el).text()) // Only use link text
        .get()
        .filter((text) => text !== PARENT_DIRECTORY_LINK); // Filter out link to parent directory;
};
export { parseApacheDirectoryListing };
//# sourceMappingURL=list.js.map