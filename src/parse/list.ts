import * as cheerio from "cheerio";

/**
 * Parses a list of links from the default apache2 directory listing.
 *
 * @private
 * @param html Html of the directory list.
 * @return List of page entries
 */
const parseApacheDirectoryListing = (html: string): string[] => {
    const $ = cheerio.load(html);

    return $("pre a")
        .filter((i, el) => $(el).text() !== "../") // Filter out link to parent directory
        .map((i, el) => $(el).text()) // Only use link text
        .get();
};

export { parseApacheDirectoryListing };
