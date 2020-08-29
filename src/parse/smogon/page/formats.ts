import { parseApacheDirectoryListing } from "../../list";
import { Format, formatFromString } from "../format";

/**
 * Checks if a file name is a directory.
 *
 * @private
 * @param str String to check.
 * @return If the file is a directory.
 */
const isFile = (str: string): boolean => !str.endsWith("/");

/**
 * Removes file extension from a string
 *
 * @private
 * @param str String to use.
 * @return String without file extension.
 */
const removeExtension = (str: string): string => str.replace(/\..+$/, "");

/**
 * Parses a smogon format list page.
 *
 * @private
 * @param html HTML of the format list page.
 * @returns Parsed formats.
 */
const parseFormatsPage = (html: string): Format[] =>
    parseApacheDirectoryListing(html)
        .filter(isFile)
        .map(removeExtension)
        .map(formatFromString);

export { parseFormatsPage };
