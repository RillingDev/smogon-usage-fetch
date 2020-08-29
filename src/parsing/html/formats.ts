import { parseApacheDirectoryListing } from "./list";
import { formatFromString } from "../format";
import { Format } from "../../model/format";

/**
 * Removes file extension from a string.
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
export const parseFormatsPage = (html: string): Format[] =>
    parseApacheDirectoryListing(html)
        .filter((str: string): boolean => !str.endsWith("/"))
        .map(removeExtension)
        .map(formatFromString);
