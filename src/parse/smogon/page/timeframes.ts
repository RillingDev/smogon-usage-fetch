import { removeTrailing } from "../../../util/strUtil";
import { parseApacheDirectoryListing } from "../../list";
import { mapTimeframes, TimeframeData } from "../timeframe";

/**
 * Removes trailing slashes from a string.
 *
 * @private
 * @param str String to use.
 * @return String without trailing slash.
 */
const removeTrailingSlash = (str: string): string => removeTrailing(str, "/");

/**
 * Parses a smogon timeframes list page.
 *
 * @private
 * @param html HTML of the timeframes list page.
 * @returns Parsed timeframes.
 */
const parseTimeframesPage = (html: string): TimeframeData =>
    mapTimeframes(parseApacheDirectoryListing(html).map(removeTrailingSlash));

export { parseTimeframesPage };
