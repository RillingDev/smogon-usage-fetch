import { removeTrailingSlash } from "../../../util/strUtil";
import { parseApacheDirectoryListing } from "../../list";
import { mapTimeframes, MultiTimeframeData } from "../timeframe";

/**
 * Parses a smogon timeframes list page.
 *
 * @private
 * @param html HTML of the timeframes list page.
 * @returns Parsed timeframes.
 */
const parseTimeframesPage = (html: string): MultiTimeframeData =>
    mapTimeframes(parseApacheDirectoryListing(html).map(removeTrailingSlash));

export { parseTimeframesPage };
