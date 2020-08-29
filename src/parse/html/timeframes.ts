import { parseApacheDirectoryListing } from "./list";
import { Timeframe, timeframeFromString } from "../timeframe";
import { removeEnd } from "lightdash";

/**
 * Removes trailing slashes from a string.
 *
 * @private
 * @param str String to use.
 * @return String without trailing slash.
 */
const removeTrailingSlash = (str: string): string => removeEnd(str, "/");

/**
 * Parses a smogon timeframes list page.
 *
 * @private
 * @param html HTML of the timeframes list page.
 * @returns Parsed timeframes.
 */
const parseTimeframesPage = (html: string): Timeframe[] =>
    parseApacheDirectoryListing(html)
        .map(removeTrailingSlash)
        .map(timeframeFromString);

export { parseTimeframesPage };
