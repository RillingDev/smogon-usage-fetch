import { parseApacheDirectoryListing } from "./list";
import { Timeframe, timeframeFromString } from "../timeframe";
import { removeEnd } from "lightdash";

/**
 * Parses a smogon timeframes list page.
 *
 * @private
 * @param html HTML of the timeframes list page.
 * @returns Parsed timeframes.
 */
const parseTimeframesPage = (html: string): Timeframe[] =>
    parseApacheDirectoryListing(html)
        .map((str: string): string => removeEnd(str, "/"))
        .map(timeframeFromString);

export { parseTimeframesPage };
