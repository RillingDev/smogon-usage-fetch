import { load } from "cheerio";

/**
 * Parses a list of links from the default apache httpd directory listing.
 *
 * @internal
 * @param html HTML of the directory list.
 * @return List of page entries
 */
export const parseApacheDirectoryListing = (html: string): string[] => {
    const parentDirectoryLink = "../";
    const $ = load(html);

    const links = $("pre a")
        .map((_i, el) => $(el).text()) // Only use link text
        .get() as string[];
    return links.filter((text) => text !== parentDirectoryLink); // Filter out link to parent directory;
};
