import * as cheerio from "cheerio";

/**
 * Loads a list of strings from the default apache2 directory listing.
 *
 * @private
 * @param html Html of the directory list.
 * @return List of page entries
 */
const parseApacheDirectoryListing = (html: string): string[] => {
    const $ = cheerio.load(html);

    return $("pre a")
        .filter((i, el) => $(el).text() !== "../") // Filter Link to previous directory
        .map((i, el) => $(el).text()) // Only use link text
        .get();
};

export { parseApacheDirectoryListing };
